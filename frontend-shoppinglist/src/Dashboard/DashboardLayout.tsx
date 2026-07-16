import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useLocation, Link, } from 'react-router-dom'
import authService from '../Services/auth'
import type { User } from '../types'

const navigation = [
  { label: 'Tableau de bord', key: 'dashboard', href:"/dashboard" },
  { label: 'Mes listes', key: 'lists', href:'listes-courses' },
  { label: 'Mes courses', key: 'shopping', href:'jgjr' },
  { label: 'Paramètres', key: 'settings', href:'jzorjojfrzofjr' },
]

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!authService.isAuthenticated()) {
        setLoading(false)
        return
      }

      try {
        const details = await authService.getCurrentUser()
        setUser(details)
      } catch (error: unknown) {
        console.error('Erreur de récupération du profil', error)
        authService.logout()
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [navigate])

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  if (loading) {
    return <div className="text-center p-4">Chargement du profil...</div>
  }

  if (!authService.isAuthenticated() || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="min-h-screen bg-slate-100 text-textPrimary">
      <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mt-3 text-3xl font-black tracking-tight">Tableau de bord</h1>
              <p className="mt-2 text-sm text-textSecondary">Bienvenue, {user.pseudo}</p>
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
                <Link to={item.href}>
                  {item.label}
                </Link>
              </button>
            ))}
          </nav>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <section className="space-y-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <Outlet context={{ user }} />
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
