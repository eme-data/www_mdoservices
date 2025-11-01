import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { DollarSign, FileText, LogOut, Home, Users } from 'lucide-react'
import { logout } from '@/lib/api'

export function PartnerNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur est admin
    const adminStatus = localStorage.getItem("partner-admin") === "true"
    setIsAdmin(adminStatus)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/partner')
  }

  const isActive = (path) => location.pathname.startsWith(path)

  return (
    <div className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-lg flex items-center gap-2">
              <Home className="w-5 h-5" />
              MDO Services
            </Link>
            <span className="ml-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              Espace Partenaire
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link to="/partner/pricing">
              <Button
                variant={isActive('/partner/pricing') ? 'default' : 'ghost'}
                className={`text-white ${isActive('/partner/pricing') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Tarifs
              </Button>
            </Link>
            {/* 🔹 BLOG DÉSACTIVÉ - Décommenter pour réactiver
            <Link to="/partner/blog">
              <Button
                variant={isActive('/partner/blog') ? 'default' : 'ghost'}
                className={`text-white ${isActive('/partner/blog') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Blog
              </Button>
            </Link>
            */}
            {isAdmin && (
              <Link to="/partner/users">
                <Button
                  variant={isActive('/partner/users') ? 'default' : 'ghost'}
                  className={`text-white ${isActive('/partner/users') ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Utilisateurs
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
