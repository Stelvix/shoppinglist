import React from 'react'

export default function Hero(){
  return (
    <section className="bg-primaryLight py-16">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary leading-tight">Shopping List</h1>
          <p className="mt-4 text-textSecondary text-lg">Gérez vos dépenses de courses simplement.</p>
          <p className="mt-4 text-textSecondary">Créez vos listes de courses, ajoutez vos produits, renseignez leurs prix et visualisez automatiquement le montant total de vos achats.</p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-primary text-white rounded-lg shadow-sm">Commencer</button>
            <button className="px-6 py-3 bg-white text-textPrimary border border-primary rounded-lg">Se connecter</button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md card flex flex-col items-center">
            <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="30" width="200" height="100" rx="12" fill="#FFFFFF" stroke="#E6EEF9"/>
              <path d="M40 55h140" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round"/>
              <path d="M40 85h110" stroke="#64748B" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="170" cy="95" r="18" fill="#22C55E"/>
              <text x="165" y="100" fill="#fff" fontSize="12" fontWeight="700">€</text>
            </svg>
            <p className="mt-4 text-textSecondary text-center">Exemple de liste — total calculé automatiquement</p>
          </div>
        </div>
      </div>
    </section>
  )
}
