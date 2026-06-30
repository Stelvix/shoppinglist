import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section id="start" className="bg-white py-20">
      <div className="section-shell">
        <div className="card flex flex-col items-start justify-between gap-8 p-8 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Pret a organiser vos prochaines courses ?</h2>
            <p className="mt-3 max-w-2xl leading-7 text-textSecondary">
              Creez une liste, ajoutez vos produits, et gardez un oeil sur le total avant de passer en caisse.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/signup" className="rounded-2xl bg-primary px-6 py-4 text-center text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark">
              Commencer
            </Link>
            <Link to="/login" className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center text-sm font-bold text-textPrimary transition hover:border-slate-300">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
