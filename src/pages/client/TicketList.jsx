import React from "react"
import { motion } from "framer-motion"
import { Clock, MessageCircle, AlertCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getStatusLabel, getStatusColor, getPriorityLabel, getPriorityColor } from "@/lib/tickets-api"

/**
 * Composant pour afficher la liste des tickets
 */
export default function TicketList({ tickets, loading, onTicketClick }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Chargement des tickets...</span>
      </div>
    )
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-2">Aucun ticket trouvé</p>
        <p className="text-gray-500 text-sm">Créez votre premier ticket de support ci-dessus</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket, index) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          index={index}
          onClick={() => onTicketClick(ticket)}
        />
      ))}
    </div>
  )
}

/**
 * Composant carte de ticket individuel
 */
function TicketCard({ ticket, index, onClick }) {
  const statusColor = getStatusColor(ticket.status)
  const priorityColor = getPriorityColor(ticket.priority)

  // Mapper les couleurs aux classes Tailwind
  const statusColorClasses = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    green: "bg-green-100 text-green-800 border-green-200",
    gray: "bg-gray-100 text-gray-800 border-gray-200",
    red: "bg-red-100 text-red-800 border-red-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
  }

  const priorityColorClasses = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
  }

  // Icon pour le statut
  const StatusIcon = {
    open: AlertCircle,
    in_progress: Loader2,
    waiting_client: Clock,
    resolved: CheckCircle2,
    closed: XCircle,
  }[ticket.status] || AlertCircle

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-gray-500">
              #{ticket.ticket_number}
            </span>
            <Badge className={`${statusColorClasses[statusColor]} border`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {getStatusLabel(ticket.status)}
            </Badge>
            <Badge className={priorityColorClasses[priorityColor]}>
              {getPriorityLabel(ticket.priority)}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {ticket.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {ticket.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(ticket.created_at)}
            </span>

            {ticket.comment_count > 0 && (
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {ticket.comment_count} commentaire{ticket.comment_count > 1 ? 's' : ''}
              </span>
            )}

            <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
              {ticket.category}
            </span>
          </div>
        </div>
      </div>

      {ticket.last_comment_at && (
        <div className="text-xs text-gray-500 border-t pt-3">
          Dernière activité: {formatDate(ticket.last_comment_at)}
        </div>
      )}
    </motion.div>
  )
}

/**
 * Formater une date en français
 */
function formatDate(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "À l'instant"
  if (diffMins < 60) return `Il y a ${diffMins} min`
  if (diffHours < 24) return `Il y a ${diffHours}h`
  if (diffDays < 7) return `Il y a ${diffDays}j`

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  }).format(date)
}
