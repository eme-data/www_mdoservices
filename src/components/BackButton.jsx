import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function BackButton({ to = "/" }) {
  const navigate = useNavigate()

  return (
    <Button 
      onClick={() => navigate(to)} 
      className="fixed top-24 left-4 z-50 bg-white hover:bg-gray-100"
      variant="outline"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Retour
    </Button>
  )
}