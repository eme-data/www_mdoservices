import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Lock, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { requestPasswordReset } from "@/lib/api"
import { motion } from "framer-motion"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await requestPasswordReset(email)

      setEmailSent(true)

      toast({
        title: "Email envoyé",
        description: "Si cette adresse email existe dans notre système, vous recevrez un lien de réinitialisation.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl"
        >
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Email envoyé !</h2>
            <p className="mt-4 text-gray-600 dark:text-slate-300">
              Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec un lien pour réinitialiser votre mot de passe.
            </p>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                📧 Vérifiez votre boîte mail (et vos spams) dans les prochaines minutes.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link to="/partner">
                <ArrowLeft size={18} className="mr-2" />
                Retour à la connexion
              </Link>
            </Button>

            <button
              onClick={() => {
                setEmailSent(false)
                setEmail("")
              }}
              className="w-full text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
            >
              Renvoyer un email
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-7 w-7 text-blue-600 dark:text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            Mot de passe oublié ?
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
            Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
            >
              <Link to="/partner">
                <ArrowLeft size={18} className="mr-2" />
                Retour à la connexion
              </Link>
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-slate-400 text-center">
            💡 <strong>Astuce :</strong> Si vous ne recevez pas d'email, vérifiez votre dossier spam ou contactez l'administrateur.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
