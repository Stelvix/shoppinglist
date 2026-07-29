import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="section-shell flex flex-col gap-4 text-sm text-textSecondary sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white">
            <AiOutlineShoppingCart className="h-4.5 w-4.5" />
          </span>
          <span className="font-semibold text-textPrimary">Shopping List</span>
        </div>


        <div className="flex gap-5">
          <Link to="/mentions-legales" className="transition hover:text-textPrimary">Mentions legales</Link>
          <Link to="/confidentialite" className="transition hover:text-textPrimary">Confidentialite</Link>
          <Link to="/contact" className="transition hover:text-textPrimary">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
