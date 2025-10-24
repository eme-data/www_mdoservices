import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Lock, Eye, EyeOff, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
import { verifyResetToken, resetPassword } from "@/lib/api"
import { motion } from "framer-motion"

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const token = searchParams.get('token')

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [tokenError, setTokenError] = useState("")
  const [email, setEmail] = useState("")
  const [resetSuccess, setResetSuccess] = useState(false)

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenError("Lien invalide : aucun token fourni")
        setIsVerifying(false)
        return
      }

      try {
        const result = await verifyResetToken(token)

        if (result.valid) {
          setTokenValid(true)
          setEmail(result.email || "")
        } else {
          setTokenError(result.message || "Lien invalide ou expiré")
        }
      } catch (error) {
        setTokenError("Erreur lors de la vérification du lien")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (password.length < 8) {
      toast({
        title: "Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive"
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Mots de passe différents",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      await resetPassword(token, password)

      setResetSuccess(true)

      toast({
        title: "Mot de passe réinitialisé",
        description: "Votre mot de passe a été changé avec succès",
      })

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/partner')
      }, 3000)

    } catch (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de réinitialiser le mot de passe",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-slate-300">Vérification du lien...</p>
        </div>
      </div>
    )
  }

  // Invalid token
  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl"
        >
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Lien invalide</h2>
            <p className="mt-4 text-gray-600 dark:text-slate-300">
              {tokenError}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link to="/partner/forgot-password">
                Demander un nouveau lien
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link to="/partner">
                Retour à la connexion
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Success state
  if (resetSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl"
        >
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
              Mot de passe réinitialisé !
            </h2>
            <p className="mt-4 text-gray-600 dark:text-slate-300">
              Votre mot de passe a été changé avec succès.
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              Redirection vers la page de connexion...
            </p>
          </div>

          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link to="/partner">
              Se connecter maintenant
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  // Reset password form
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
            Nouveau mot de passe
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
            Choisissez un nouveau mot de passe pour <strong>{email}</strong>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Minimum 8 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pr-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && password.length < 8 && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  Le mot de passe doit contenir au moins 8 caractères
                </p>
              )}
            </div>

            {/* Confirm password field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Retapez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="pr-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  Les mots de passe ne correspondent pas
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading || password.length < 8 || password !== confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-300">
            🔒 <strong>Conseil :</strong> Utilisez un mot de passe fort contenant des lettres, des chiffres et des caractères spéciaux.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
