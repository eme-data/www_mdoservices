import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  HardDrive,
  FolderOpen,
  TrendingUp,
  ArrowLeft,
  Database,
  FileText,
  AlertCircle,
  RefreshCw,
  PieChart as PieChartIcon
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts"
import { getSharePointStats, formatSize, getChartColor } from "@/lib/sharepoint-api"

export default function SharePointStats() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const siteId = searchParams.get('site_id')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("client-authenticated")
    if (!isAuthenticated) {
      navigate("/client")
      return
    }

    loadStats()
  }, [siteId, navigate])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSharePointStats(siteId ? parseInt(siteId) : null)
      setStats(data)
      if (data.site) {
        setSelectedSite(data.site)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSiteClick = (site) => {
    navigate(`/client/sharepoint?site_id=${site.id}`)
  }

  const handleBackToOverview = () => {
    navigate('/client/sharepoint')
  }

  // Composant Card pour les KPIs
  const StatCard = ({ icon: Icon, label, value, subValue, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-sm text-slate-600">{label}</p>
      {subValue && <p className="text-xs text-slate-500 mt-1">{subValue}</p>}
    </div>
  )

  // Affichage du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  // Affichage des erreurs
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Erreur</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button onClick={loadStats}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  // Pas de données disponibles
  if (!stats || (!stats.site && (!stats.sites || stats.sites.length === 0))) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-md text-center">
          <Database className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">Aucune donnée disponible</h2>
          <p className="text-slate-600 mb-4">
            Aucune statistique SharePoint n'est disponible pour le moment.
            Contactez votre administrateur pour plus d'informations.
          </p>
          <Button onClick={() => navigate('/client/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au dashboard
          </Button>
        </div>
      </div>
    )
  }

  // Vue d'ensemble (tous les sites)
  if (!selectedSite) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Helmet>
          <title>Statistiques SharePoint - MDO SERVICES</title>
          <meta name="description" content="Consultez vos statistiques d'utilisation SharePoint" />
        </Helmet>

        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/client/dashboard')}
                  variant="outline"
                  className="border-slate-300"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Statistiques SharePoint
                </h1>
              </div>
              <Button onClick={loadStats} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* KPIs Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <StatCard
              icon={Database}
              label="Sites SharePoint"
              value={stats.overview.total_sites}
              color="from-purple-500 to-purple-600"
            />
            <StatCard
              icon={HardDrive}
              label="Stockage Total"
              value={formatSize(stats.overview.total_storage_gb)}
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={TrendingUp}
              label="Stockage Utilisé"
              value={formatSize(stats.overview.total_used_gb)}
              subValue={`${stats.overview.usage_percentage}% utilisé`}
              color="from-indigo-500 to-indigo-600"
            />
            <StatCard
              icon={FolderOpen}
              label="Dossiers Volumineux"
              value={stats.top_folders.length}
              subValue="Top 10"
              color="from-violet-500 to-violet-600"
            />
          </motion.div>

          {/* Sites List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-12"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-600" />
              Vos Sites SharePoint
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.sites.map((site) => (
                <div
                  key={site.id}
                  onClick={() => handleSiteClick(site)}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                      {site.site_name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      site.usage_percentage > 80 ? 'bg-red-100 text-red-700' :
                      site.usage_percentage > 60 ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {site.usage_percentage}%
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Utilisé:</span>
                      <span className="font-medium">{formatSize(site.used_storage_gb)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Total:</span>
                      <span className="font-medium">{formatSize(site.total_storage_gb)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          site.usage_percentage > 80 ? 'bg-red-500' :
                          site.usage_percentage > 60 ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(site.usage_percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top 10 Dossiers */}
          {stats.top_folders && stats.top_folders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <FolderOpen className="h-5 w-5 mr-2 text-purple-600" />
                Top 10 des Dossiers les Plus Volumineux
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Dossier</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Site</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Taille</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Fichiers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.top_folders.map((folder, index) => (
                      <tr key={folder.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center mr-3 font-semibold">
                              {index + 1}
                            </span>
                            <span className="text-slate-800 font-medium">{folder.folder_name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{folder.site_name}</td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-800">
                          {formatSize(folder.size_gb)}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-600">
                          {folder.file_count.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    )
  }

  // Vue détaillée d'un site spécifique
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>{selectedSite.site_name} - Statistiques SharePoint - MDO SERVICES</title>
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleBackToOverview}
                variant="outline"
                className="border-slate-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tous les sites
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{selectedSite.site_name}</h1>
                <p className="text-sm text-slate-600">{selectedSite.site_url}</p>
              </div>
            </div>
            <Button onClick={loadStats} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* KPIs Site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <StatCard
            icon={HardDrive}
            label="Stockage Total"
            value={formatSize(selectedSite.total_storage_gb)}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Stockage Utilisé"
            value={formatSize(selectedSite.used_storage_gb)}
            subValue={`${selectedSite.usage_percentage}% utilisé`}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            icon={FolderOpen}
            label="Nombre de Dossiers"
            value={stats.folders.length}
            color="from-indigo-500 to-indigo-600"
          />
        </motion.div>

        {/* Graphique de répartition par dossier */}
        {stats.folders && stats.folders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-12"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Répartition du Stockage par Dossier
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top 10 Bar Chart */}
              <div>
                <h3 className="text-sm font-semibold text-slate-600 mb-4">Top 10 Dossiers</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.folders.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="folder_name" angle={-45} textAnchor="end" height={100} />
                    <YAxis label={{ value: 'Taille (GB)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => formatSize(value)} />
                    <Bar dataKey="size_gb" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div>
                <h3 className="text-sm font-semibold text-slate-600 mb-4">Répartition (Top 5)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.folders.slice(0, 5)}
                      dataKey="size_gb"
                      nameKey="folder_name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={(entry) => `${entry.folder_name} (${entry.percentage_of_site}%)`}
                    >
                      {stats.folders.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatSize(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Liste détaillée des dossiers */}
        {stats.folders && stats.folders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-6">Tous les Dossiers</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Dossier</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Chemin</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Taille</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">% du site</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Fichiers</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.folders.map((folder, index) => (
                    <tr key={folder.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <FolderOpen className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-slate-800 font-medium">{folder.folder_name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-sm">{folder.folder_path || '-'}</td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-800">
                        {formatSize(folder.size_gb)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {folder.percentage_of_site}%
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {folder.file_count.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
