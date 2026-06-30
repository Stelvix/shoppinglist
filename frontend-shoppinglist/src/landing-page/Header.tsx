import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-textPrimary">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-blue-200">
            <AiOutlineShoppingCart className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight">Shopping List</span>
        </Link>


        <nav className="hidden items-center gap-7 text-sm font-semibold text-textSecondary md:flex">
          <a href="#features" className="transition hover:text-textPrimary">Fonctionnalites</a>
          <a href="#why" className="transition hover:text-textPrimary">Pourquoi nous</a>
          <a href="#start" className="transition hover:text-textPrimary">Commencer</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden rounded-2xl px-4 py-2.5 text-sm font-semibold text-textPrimary transition hover:bg-slate-100 sm:block">
            Se connecter
          </Link>
          <Link to="/signup" className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark">
            Commencer
          </Link>
        </div>
      </div>
    </header>
  )
}
