import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useLocation, Link, } from 'react-router-dom'
import authService from '../Services/auth'
import type { User } from '../types'

const navigation = [
  { label: 'Mes listes', key: 'dashboard', href: '/dashboard' },
  { label: 'Créer une liste', key: 'create-list', href: '/dashboard/create-type-course' },
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
              <p className="mt-2 text-sm text-textSecondary">Bienvenue, <span className='font-bold text-blue-600'>{user.pseudo}</span> </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-danger px-4 py-3 text-sm font-black text-white transition hover:bg-red-700"
              >
                Se déconnecter
              </button>
              <span className="rounded-full bg-green-300 px-3 py-1 text-xs animate-pulse font-semibold text-green-900">
                Connecté
              </span>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'border-primary bg-primary text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
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
                Organisez vos <span className='font-semibold text-blue-600'>listes de courses simplement</span> et retrouvez tous vos produits au même endroit.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
              <h2 className="text-lg font-black">Organisation</h2>
              <p className="mt-3 text-sm leading-6 text-textSecondary">
                Une <span className='text-blue-600 font-semibold'>interface claire</span>  qui regroupe <span className='text-blue-600 font-semibold'>toutes les fonctionnalités essentielles</span>  pour gérer vos listes de courses facilement.
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}
