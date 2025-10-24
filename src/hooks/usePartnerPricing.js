import { useState, useEffect, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { fetchPricingItems, createPricingItem, updatePricingItem, deletePricingItem, updatePricingOrder } from "@/lib/api"
import { calculatePrices } from "@/lib/partner-pricing-utils"
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core'

export function usePartnerPricing() {
  const [items, setItems] = useState([])
  const [newSolution, setNewSolution] = useState("")
  const [newPrixPartenaire, setNewPrixPartenaire] = useState("")
  const [newCommission, setNewCommission] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const loadPricingItems = useCallback(async () => {
    try {
      const data = await fetchPricingItems()
      if (data) {
        setItems(data)
      } else {
        setItems([]) 
        toast({
          title: "Information",
          description: "Aucune donnée de tarification trouvée ou erreur lors du chargement.",
          variant: "default",
        })
      }
    } catch (error) {
      setItems([])
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les données de tarification. Vérifiez votre connexion ou contactez l'administrateur. (Détails en console)",
        variant: "destructive",
      })
      console.error("Detailed error loading pricing items:", error)
    }
  }, [toast])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("partner-authenticated")
    if (!isAuthenticated) {
      navigate("/partner")
      return
    }
    setIsAdmin(localStorage.getItem("partner-admin") === "true")
    loadPricingItems()
  }, [navigate, loadPricingItems])

  const handleDragEnd = async (event) => {
    if (!isAdmin) return
    
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      
      if (oldIndex === -1 || newIndex === -1) return;

      const newItemsOrder = arrayMove(items, oldIndex, newIndex)
      setItems(newItemsOrder)

      try {
        await updatePricingOrder(newItemsOrder.map((item, index) => ({ ...item, display_order: index })))
        toast({
          title: "Succès",
          description: "Ordre mis à jour",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour l'ordre",
          variant: "destructive",
        })
        loadPricingItems() 
      }
    }
  }

  const handleAddSolution = async () => {
    if (!isAdmin) return
    
    if (!newSolution || !newPrixPartenaire || !newCommission) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont requis pour une solution",
        variant: "destructive",
      })
      return
    }

    try {
      const { prix_revendeur, prix_public } = calculatePrices(newPrixPartenaire, newCommission)
      
      const newItemData = {
        type: "solution",
        solution: newSolution,
        prix_partenaire: String(newPrixPartenaire).replace('.',','),
        commission: String(newCommission).replace('.',','),
        prix_revendeur,
        prix_public,
        display_order: items.length
      }

      const createdItem = await createPricingItem(newItemData)
      if (createdItem) {
        setItems(prevItems => [...prevItems, createdItem])
        setNewSolution("")
        setNewPrixPartenaire("")
        setNewCommission("")
        toast({
          title: "Succès",
          description: "Solution ajoutée",
        })
      } else {
         throw new Error("Failed to create item in database")
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la solution",
        variant: "destructive",
      })
    }
  }

  const handleAddSubtitle = async () => {
    if (!isAdmin) return
    
    if (!newSolution) {
      toast({
        title: "Erreur",
        description: "Le sous-titre est requis",
        variant: "destructive",
      })
      return
    }

    try {
      const newItemData = {
        type: "subtitle",
        solution: newSolution,
        prix_partenaire: "",
        commission: "",
        prix_revendeur: "",
        prix_public: "",
        display_order: items.length
      }

      const createdItem = await createPricingItem(newItemData)
      if (createdItem) {
        setItems(prevItems => [...prevItems, createdItem])
        setNewSolution("")
        toast({
          title: "Succès",
          description: "Sous-titre ajouté",
        })
      } else {
        throw new Error("Failed to create subtitle in database")
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le sous-titre",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id) => {
    if (!isAdmin) return
    
    try {
      await deletePricingItem(id)
      setItems(items.filter(item => item.id !== id))
      toast({
        title: "Succès",
        description: "Élément supprimé",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive",
      })
    }
  }

  const handleUpdateItem = async (id, updates) => {
    if (!isAdmin) return
    
    try {
      let finalUpdates = { ...updates }
      if (finalUpdates.type !== 'subtitle' && (updates.prix_partenaire !== undefined || updates.commission !== undefined)) {
        const currentItem = items.find(item => item.id === id);
        if (!currentItem) throw new Error("Item not found for update");

        const prixPartenaire = updates.prix_partenaire !== undefined ? updates.prix_partenaire : currentItem.prix_partenaire;
        const commission = updates.commission !== undefined ? updates.commission : currentItem.commission;
        const { prix_revendeur, prix_public } = calculatePrices(prixPartenaire, commission);
        finalUpdates = { 
          ...finalUpdates, 
          prix_partenaire: String(prixPartenaire).replace('.',','),
          commission: String(commission).replace('.',','),
          prix_revendeur, 
          prix_public 
        };
      }

      const updatedItem = await updatePricingItem(id, finalUpdates)
      if (updatedItem) {
        setItems(items.map(item => item.id === id ? updatedItem : item))
        toast({
          title: "Succès",
          description: "Élément mis à jour",
        })
      } else {
        throw new Error("Failed to update item in database")
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'élément",
        variant: "destructive",
      })
    }
  }

  const handleCsvImport = async (data) => {
    if (!isAdmin) return
    
    try {
      const newItemsFromCsv = []
      let currentDisplayOrder = items.length;
      for (const row of data) {
        const { prix_revendeur, prix_public } = calculatePrices(row.prix_partenaire, row.commission)
        const newItemData = {
          type: row.type || "solution",
          solution: row.solution,
          prix_partenaire: String(row.prix_partenaire || "").replace('.',','),
          commission: String(row.commission || "").replace('.',','),
          prix_revendeur,
          prix_public,
          display_order: currentDisplayOrder++
        }
        const createdItem = await createPricingItem(newItemData)
        if (createdItem) {
          newItemsFromCsv.push(createdItem)
        } else {
          console.warn("Failed to import row:", row)
        }
      }
      setItems(prevItems => [...prevItems, ...newItemsFromCsv])
      
      toast({
        title: "Succès",
        description: `${newItemsFromCsv.length} éléments importés sur ${data.length}`,
      })
    } catch (error) {
      toast({
        title: "Erreur d'import CSV",
        description: "Erreur lors de l'import CSV. Vérifiez le format du fichier et les données.",
        variant: "destructive",
      })
      console.error("CSV Import error:", error)
    }
  }

  return {
    items,
    newSolution,
    setNewSolution,
    newPrixPartenaire,
    setNewPrixPartenaire,
    newCommission,
    setNewCommission,
    isAdmin,
    handleDragEnd,
    handleAddSolution,
    handleAddSubtitle,
    handleDelete,
    handleUpdateItem,
    handleCsvImport,
    sensors: useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    )
  }
}