import React, { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  User,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  getTicket,
  addComment,
  updateTicketStatus,
  getStatusLabel,
  getStatusColor,
  getPriorityLabel,
  getPriorityColor,
} from "@/lib/tickets-api"

/**
 * Composant pour afficher les détails d'un ticket et gérer les commentaires
 */
export default function TicketDetail({ ticketId, onBack }) {
  const [ticket, setTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const commentsEndRef = useRef(null)
  const { toast } = useToast()

  // Charger le ticket et ses commentaires
  useEffect(() => {
    loadTicket()
  }, [ticketId])

  const loadTicket = async () => {
    try {
      setLoading(true)
      const result = await getTicket(ticketId)
      setTicket(result.ticket)
      setComments(result.comments || [])
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger le ticket",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Scroll automatique vers le dernier commentaire
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (comments.length > 0) {
      scrollToBottom()
    }
  }, [comments])

  // Ajouter un commentaire
  const handleSubmitComment = async (e) => {
    e.preventDefault()

    if (!newComment.trim()) {
      return
    }

    try {
      setSubmitting(true)
      const result = await addComment(ticketId, newComment)

      setComments(prev => [...prev, result.comment])
      setNewComment('')

      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été ajouté avec succès",
      })

      // Recharger le ticket pour mettre à jour le statut si nécessaire
      loadTicket()

    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'ajouter le commentaire",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Mettre à jour le statut du ticket
  const handleUpdateStatus = async (newStatus) => {
    try {
      setUpdatingStatus(true)
      await updateTicketStatus(ticketId, newStatus)

      toast({
        title: "Statut mis à jour",
        description: `Le ticket a été marqué comme ${getStatusLabel(newStatus).toLowerCase()}`,
      })

      // Recharger le ticket
      loadTicket()

    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut",
        variant: "destructive",
      })
    } finally {
      setUpdatingStatus(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Chargement du ticket...</span>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Ticket non trouvé</p>
        <Button onClick={onBack} className="mt-4">
          Retour à la liste
        </Button>
      </div>
    )
  }

  const statusColor = getStatusColor(ticket.status)
  const priorityColor = getPriorityColor(ticket.priority)

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

  const canAddComments = ticket.status !== 'closed'
  const canResolve = ticket.status !== 'resolved' && ticket.status !== 'closed'
  const canClose = ticket.status !== 'closed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
      </div>

      {/* Ticket Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-mono text-gray-500">
                #{ticket.ticket_number}
              </span>
              <Badge className={`${statusColorClasses[statusColor]} border`}>
                {getStatusLabel(ticket.status)}
              </Badge>
              <Badge className={priorityColorClasses[priorityColor]}>
                {getPriorityLabel(ticket.priority)}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {ticket.title}
            </h1>
            <p className="text-gray-600 mb-4">{ticket.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-1">Catégorie</p>
            <p className="font-medium text-gray-900">{ticket.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Créé le</p>
            <p className="font-medium text-gray-900">
              {new Date(ticket.created_at).toLocaleString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Dernière mise à jour</p>
            <p className="font-medium text-gray-900">
              {new Date(ticket.updated_at).toLocaleString('fr-FR')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
          {canResolve && (
            <Button
              onClick={() => handleUpdateStatus('resolved')}
              disabled={updatingStatus}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Marquer comme résolu
            </Button>
          )}
          {canClose && ticket.status !== 'resolved' && (
            <Button
              onClick={() => handleUpdateStatus('closed')}
              disabled={updatingStatus}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Fermer le ticket
            </Button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Historique des échanges ({comments.length})
            </h2>
          </div>
        </div>

        {/* Comments List */}
        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aucun commentaire pour le moment</p>
          ) : (
            comments.map((comment, index) => (
              <CommentItem key={comment.id} comment={comment} index={index} />
            ))
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Add Comment Form */}
        {canAddComments ? (
          <form onSubmit={handleSubmitComment} className="border-t border-gray-200 p-6 bg-gray-50">
            <Label className="text-sm font-semibold text-gray-700 mb-2 block">
              Ajouter un commentaire
            </Label>
            <div className="flex gap-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Écrivez votre message ici..."
                rows={3}
                disabled={submitting}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 self-end"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <p className="text-center text-gray-600">
              Ce ticket est fermé. Vous ne pouvez plus ajouter de commentaires.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Composant pour afficher un commentaire individuel
 */
function CommentItem({ comment, index }) {
  const isClient = comment.author_type === 'client'

  return (
    <motion.div
      initial={{ opacity: 0, x: isClient ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-4 ${isClient ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isClient ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
      }`}>
        <User className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className={`flex-1 ${isClient ? 'text-right' : ''}`}>
        <div className={`inline-block ${isClient ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4 max-w-[80%]`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`font-semibold ${isClient ? 'text-blue-900' : 'text-purple-900'}`}>
              {comment.author_name}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded ${
              isClient ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {isClient ? 'Vous' : 'Support'}
            </span>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap">{comment.message}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {new Date(comment.created_at).toLocaleString('fr-FR')}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Import Label component
import { Label } from "@/components/ui/label"
