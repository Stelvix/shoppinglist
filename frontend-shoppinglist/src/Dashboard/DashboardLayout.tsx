import { useNavigate } from 'react-router-dom'
import authService from '../Services/auth'

interface DashboardLayoutProps {
  children: React.ReactNode
  userName: string
  pageTitle?: string
}

const navigation = [
  { label: 'Tableau de bord', key: 'dashboard' },
  { label: 'Mes listes', key: 'lists' },
  { label: 'Mes courses', key: 'shopping' },
  { label: 'Paramètres', key: 'settings' },
]

export default function DashboardLayout({ children, userName, pageTitle = 'Tableau de bord' }: DashboardLayoutProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 text-textPrimary">
      <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
               <h1 className="mt-3 text-3xl font-black tracking-tight">{pageTitle}</h1>
              <p className="mt-2 text-sm text-textSecondary">Bienvenue, {userName}</p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-primaryDark"
              >
                Se déconnecter
              </button>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Connecté
              </span>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            {navigation.map((item) => (
              <button
                key={item.key}
                type="button"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <section className="space-y-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            {children}
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
              <h2 className="text-lg font-black">À propos</h2>
              <p className="mt-3 text-sm leading-6 text-textSecondary">
                Ce layout centralise l’espace après connexion. Utilise-le pour toutes les pages protégées.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
              <h2 className="text-lg font-black">Organisation</h2>
              <p className="mt-3 text-sm leading-6 text-textSecondary">
                Un seul layout signifie moins de composants dupliqués et une navigation plus simple à maintenir.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}
