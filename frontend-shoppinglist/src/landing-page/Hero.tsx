
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="section-shell grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
      <div>
        <p className="mb-5 inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
          Simple, clair, fait pour les courses du quotidien
        </p>

        <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-tight text-textPrimary sm:text-6xl">
          Gardez le controle sur vos depenses de courses.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-textSecondary">
          Shopping List vous aide a creer vos listes, ajouter les prix de vos produits et voir le total se calculer automatiquement. Pas de complexite, juste une vue claire sur ce que vous achetez.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/signup" className="rounded-2xl bg-primary px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-primaryDark">
            Commencer
          </Link>
          <Link to="/login" className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center text-sm font-bold text-textPrimary shadow-sm transition hover:border-slate-300">
            Se connecter
          </Link>
        </div>
      </div>

      <div className="card overflow-hidden p-5 sm:p-6">
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-black">Courses semaine</p>
              <p className="text-sm text-textSecondary">4 produits ajoutes</p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              En cours
            </span>
          </div>

          <div className="grid gap-3">
            {[
              ['Pates completes', '2,40 EUR'],
              ['Tomates cerises', '3,80 EUR'],
              ['Filets de poulet', '12,90 EUR'],
              ['Yaourts nature', '4,60 EUR'],
            ].map(([name, price]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm font-semibold">{name}</span>
                </div>
                <span className="text-sm font-bold">{price}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-3xl bg-textPrimary p-5 text-white">
            <p className="text-sm text-slate-300">Total estime</p>
            <p className="mt-1 text-4xl font-black tracking-tight">23,70 EUR</p>
          </div>
        </div>
      </div>
    </section>
  )
}
