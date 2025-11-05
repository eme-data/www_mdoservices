import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Plus, Ticket, Filter, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import TicketList from "./TicketList"
import CreateTicketModal from "./CreateTicketModal"
import TicketDetail from "./TicketDetail"
import { listTickets } from "@/lib/tickets-api"

/**
 * Page principale de gestion des tickets de support
 */
export default function Tickets() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // Vérifier l'authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("client-authenticated")
    if (!isAuthenticated) {
      navigate("/client")
    }
  }, [navigate])

  // Charger les tickets au montage et quand le filtre change
  useEffect(() => {
    loadTickets()
  }, [activeFilter])

  const loadTickets = async () => {
    try {
      setLoading(true)

      const filters = {}
      if (activeFilter !== 'all') {
        filters.status = activeFilter
      }

      const result = await listTickets(filters)
      setTickets(result.tickets)
      setStats(result.stats)

    } catch (error) {
      console.error("Erreur lors du chargement des tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTicketCreated = (newTicket) => {
    // Recharger la liste des tickets
    loadTickets()
  }

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket)
  }

  const handleBackToList = () => {
    setSelectedTicket(null)
    // Recharger la liste pour avoir les dernières mises à jour
    loadTickets()
  }

  const handleLogout = () => {
    localStorage.removeItem("client-authenticated")
    localStorage.removeItem("client-name")
    localStorage.removeItem("client-admin")
    navigate("/client")
  }

  // Si un ticket est sélectionné, afficher les détails
  if (selectedTicket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ticket className="h-6 w-6 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Support Client</h1>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TicketDetail
            ticketId={selectedTicket.id}
            onBack={handleBackToList}
          />
        </main>
      </div>
    )
  }

  // Afficher la liste des tickets
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ticket className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Mes Tickets de Support</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/client/dashboard")}
                variant="outline"
              >
                Tableau de bord
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={Ticket}
              label="Total"
              value={stats.total}
              color="blue"
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            />
            <StatCard
              icon={AlertCircle}
              label="Ouverts"
              value={parseInt(stats.open_count) + parseInt(stats.in_progress_count)}
              color="orange"
              active={activeFilter === 'open' || activeFilter === 'in_progress'}
              onClick={() => setActiveFilter('open')}
            />
            <StatCard
              icon={CheckCircle2}
              label="Résolus"
              value={stats.resolved_count}
              color="green"
              active={activeFilter === 'resolved'}
              onClick={() => setActiveFilter('resolved')}
            />
            <StatCard
              icon={XCircle}
              label="Fermés"
              value={stats.closed_count}
              color="gray"
              active={activeFilter === 'closed'}
              onClick={() => setActiveFilter('closed')}
            />
          </motion.div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {activeFilter === 'all' ? 'Tous les tickets' : `Tickets ${getFilterLabel(activeFilter)}`}
            </span>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Créer un ticket
          </Button>
        </div>

        {/* Tickets List */}
        <TicketList
          tickets={tickets}
          loading={loading}
          onTicketClick={handleTicketClick}
        />

        {/* Info Box */}
        {!loading && tickets.length === 0 && activeFilter === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Besoin d'aide ?
            </h3>
            <p className="text-blue-800 mb-4">
              Créez votre premier ticket de support en cliquant sur le bouton "Créer un ticket".
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>✓ Réponse rapide de notre équipe technique</li>
              <li>✓ Suivi en temps réel de votre demande</li>
              <li>✓ Historique complet de vos échanges</li>
              <li>✓ Numéro de ticket unique pour chaque demande</li>
            </ul>
          </motion.div>
        )}
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTicketCreated={handleTicketCreated}
      />
    </div>
  )
}

/**
 * Composant carte de statistique
 */
function StatCard({ icon: Icon, label, value, color, active, onClick }) {
  const colorClasses = {
    blue: active ? "bg-blue-50 border-blue-300 text-blue-900" : "bg-white border-gray-200 text-gray-900 hover:bg-blue-50",
    orange: active ? "bg-orange-50 border-orange-300 text-orange-900" : "bg-white border-gray-200 text-gray-900 hover:bg-orange-50",
    green: active ? "bg-green-50 border-green-300 text-green-900" : "bg-white border-gray-200 text-gray-900 hover:bg-green-50",
    gray: active ? "bg-gray-50 border-gray-300 text-gray-900" : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
  }

  const iconColorClasses = {
    blue: "text-blue-600",
    orange: "text-orange-600",
    green: "text-green-600",
    gray: "text-gray-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${colorClasses[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className={`h-10 w-10 ${iconColorClasses[color]}`} />
      </div>
    </motion.div>
  )
}

/**
 * Helper pour récupérer le label d'un filtre
 */
function getFilterLabel(filter) {
  const labels = {
    open: 'ouverts',
    in_progress: 'en cours',
    waiting_client: 'en attente',
    resolved: 'résolus',
    closed: 'fermés',
  }
  return labels[filter] || filter
}
