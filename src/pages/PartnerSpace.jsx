import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Lock } from "lucide-react"

export default function PartnerSpace() {
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === "BUsWKJEvxQC7C4") {
      localStorage.setItem("partner-authenticated", "true")
      localStorage.setItem("partner-admin", "true")
      navigate("/partner/pricing")
    } else if (password === "MDOPartner2025!") {
      localStorage.setItem("partner-authenticated", "true")
      localStorage.setItem("partner-admin", "false")
      navigate("/partner/pricing")
    } else {
      toast({
        title: "Erreur d'authentification",
        description: "Mot de passe incorrect",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <Lock className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-slate-100">Espace Partenaire</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
            Accédez à votre espace partenaire MDO SERVICES
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              type="password"
              required
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-600 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
            >
              Accéder
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}