import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableTableRow } from "@/components/DraggableTableRow";
import { PricingTableHeader } from "./PricingTableHeader";

export function PricingTable({ items, isAdmin, sensors, handleDragEnd, handleDelete, handleUpdateItem }) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full">
          <PricingTableHeader isAdmin={isAdmin} />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map(item => String(item.id))}
              strategy={verticalListSortingStrategy}
            >
              <tbody className="divide-y divide-slate-700">
                {items.map((item) => (
                  <DraggableTableRow
                    key={item.id}
                    item={item}
                    onDelete={() => handleDelete(item.id)}
                    onUpdate={handleUpdateItem}
                    isAdmin={isAdmin}
                  />
                ))}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>
        {items.length === 0 && (
          <p className="text-center py-8 text-slate-400">Aucun élément tarifaire pour le moment ou erreur de chargement.</p>
        )}
      </div>
    </div>
  );
}