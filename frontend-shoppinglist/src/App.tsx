import './index.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primaryLight">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">SL</div>
            <div className="text-lg font-semibold text-textPrimary">Shopping List</div>
          </div>
          <nav className="flex items-center gap-4">
            <a className="text-textSecondary hover:text-textPrimary">Mentions</a>
            <a className="text-textSecondary hover:text-textPrimary">Confidentialité</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
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
      </main>

      <footer className="py-6 bg-white border-t">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-textSecondary">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">SL</div>
            <div>© Shopping List</div>
          </div>
          <div className="flex gap-4">
            <a>Mentions légales</a>
            <a>Politique de confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
