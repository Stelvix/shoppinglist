import React from 'react'

export default function Why(){
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-textPrimary">Pourquoi Shopping List ?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card flex flex-col items-start gap-3">
            <h4 className="font-semibold text-textPrimary">Interface simple et intuitive</h4>
            <p className="text-textSecondary text-sm">Prise en main rapide.</p>
          </div>
          <div className="card flex flex-col items-start gap-3">
            <h4 className="font-semibold text-textPrimary">Calcul automatique des dépenses</h4>
            <p className="text-textSecondary text-sm">Suivez vos dépenses en temps réel.</p>
          </div>
          <div className="card flex flex-col items-start gap-3">
            <h4 className="font-semibold text-textPrimary">Accès à toutes vos listes</h4>
            <p className="text-textSecondary text-sm">Retrouvez vos listes après connexion.</p>
          </div>
          <div className="card flex flex-col items-start gap-3">
            <h4 className="font-semibold text-textPrimary">Entièrement gratuit</h4>
            <p className="text-textSecondary text-sm">Aucune souscription requise.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
