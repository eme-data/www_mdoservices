import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { AppRoutes } from "@/routes"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster />
    </Router>
  )
}