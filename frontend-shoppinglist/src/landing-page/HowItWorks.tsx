import React from 'react'

export default function HowItWorks(){
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-textPrimary">Comment ça fonctionne</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="w-12 h-12 bg-primaryLight rounded-lg flex items-center justify-center text-primary font-bold">1</div>
            <h3 className="mt-4 font-semibold text-textPrimary">Créez une liste</h3>
            <p className="mt-2 text-textSecondary">Organisez vos courses en quelques secondes.</p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-primaryLight rounded-lg flex items-center justify-center text-primary font-bold">2</div>
            <h3 className="mt-4 font-semibold text-textPrimary">Ajoutez vos produits</h3>
            <p className="mt-2 text-textSecondary">Saisissez le nom de chaque produit ainsi que son prix.</p>
          </div>
          <div className="card">
            <div className="w-12 h-12 bg-primaryLight rounded-lg flex items-center justify-center text-primary font-bold">3</div>
            <h3 className="mt-4 font-semibold text-textPrimary">Suivez votre budget</h3>
            <p className="mt-2 text-textSecondary">Le total est calculé automatiquement au fur et à mesure.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
