import React, { useState, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GripVertical, Trash2, Save, Edit3, X } from "lucide-react"

export function DraggableTableRow({ item, onDelete, onUpdate, isAdmin }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValues, setEditedValues] = useState({
    id: item.id,
    type: item.type,
    solution: item.solution,
    prix_partenaire: item.prix_partenaire || "",
    commission: item.commission || "",
    prix_public: item.prix_public || "",
    prix_revendeur: item.prix_revendeur || ""
  })

  useEffect(() => {
    setEditedValues({
      id: item.id,
      type: item.type,
      solution: item.solution,
      prix_partenaire: item.prix_partenaire || "",
      commission: item.commission || "",
      prix_public: item.prix_public || "",
      prix_revendeur: item.prix_revendeur || ""
    });
  }, [item]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: String(item.id) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "rgb(243, 244, 246, 0.1)" : undefined,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : undefined,
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate(item.id, editedValues) 
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedValues({
      id: item.id,
      type: item.type,
      solution: item.solution,
      prix_partenaire: item.prix_partenaire || "",
      commission: item.commission || "",
      prix_public: item.prix_public || "",
      prix_revendeur: item.prix_revendeur || ""
    });
    setIsEditing(false);
  }

  const handleInputChange = (field, value) => {
    setEditedValues(prev => {
      const newValues = { ...prev, [field]: value }
      if (item.type !== 'subtitle' && (field === 'prix_partenaire' || field === 'commission')) {
        const prixPartenaireStr = String(field === 'prix_partenaire' ? value : newValues.prix_partenaire || "").replace(',', '.');
        const commissionStr = String(field === 'commission' ? value : newValues.commission || "").replace(',', '.');
        
        const prixPartenaireNum = parseFloat(prixPartenaireStr);
        const commissionNum = parseFloat(commissionStr);

        if (!isNaN(prixPartenaireNum) && !isNaN(commissionNum)) {
          const prixRevendeur = (prixPartenaireNum * (1 + commissionNum / 100)).toFixed(2);
          const prixPublic = (parseFloat(prixRevendeur) * 1.2).toFixed(2);
          newValues.prix_revendeur = prixRevendeur.toString().replace('.', ',');
          newValues.prix_public = prixPublic.toString().replace('.', ',');
        } else {
          newValues.prix_revendeur = '';
          newValues.prix_public = '';
        }
      }
      return newValues;
    })
  }
  

  const isSubtitle = item.type === "subtitle"

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`border-b border-slate-700 hover:bg-slate-700/30 ${isDragging ? "shadow-lg" : ""} ${isSubtitle ? "bg-slate-700/20 font-semibold" : ""}`}
    >
      <td colSpan={isSubtitle ? (isAdmin ? 6 : 4) : 1} className="px-6 py-3 whitespace-nowrap text-sm text-slate-200">
        <div className="flex items-center gap-2">
          {isAdmin && (
            <button
              {...attributes}
              {...listeners}
              className="touch-none cursor-grab p-1 text-slate-400 hover:text-slate-200"
            >
              <GripVertical className="h-5 w-5" />
            </button>
          )}
          {isEditing && !isSubtitle ? (
            <Input
              value={editedValues.solution}
              onChange={(e) => handleInputChange("solution", e.target.value)}
              className="flex-1 bg-slate-600 border-slate-500 text-slate-100"
            />
          ) : (
            <span className={isSubtitle ? "text-lg text-sky-400" : ""}>{item.solution}</span>
          )}
        </div>
      </td>
      {!isSubtitle && (
        <>
          {isAdmin && (
            <>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">
                {isEditing ? (
                  <Input
                    value={editedValues.prix_partenaire}
                    onChange={(e) => handleInputChange("prix_partenaire", e.target.value)}
                    className="bg-slate-600 border-slate-500 text-slate-100 w-32"
                  />
                ) : (
                  item.prix_partenaire
                )}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">
                {isEditing ? (
                  <Input
                    value={editedValues.commission}
                    onChange={(e) => handleInputChange("commission", e.target.value)}
                    className="bg-slate-600 border-slate-500 text-slate-100 w-24"
                  />
                ) : (
                  item.commission
                )}
              </td>
            </>
          )}
          <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">
            {isEditing ? editedValues.prix_revendeur : item.prix_revendeur}
          </td>
          <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">
            {isEditing ? editedValues.prix_public : item.prix_public}
          </td>
          {isAdmin && (
            <td className="px-6 py-3 whitespace-nowrap text-sm">
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white">
                      <Save className="h-4 w-4" />
                    </Button>
                     <Button onClick={handleCancel} size="sm" variant="outline" className="border-slate-500 text-slate-400 hover:bg-slate-500 hover:text-white">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit} size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  onClick={() => onDelete(item.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          )}
        </>
      )}
    </tr>
  )
}