import { AiOutlineShoppingCart } from 'react-icons/ai'

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
          <a href="#" className="transition hover:text-textPrimary">Mentions legales</a>
          <a href="#" className="transition hover:text-textPrimary">Confidentialite</a>
          <a href="#" className="transition hover:text-textPrimary">Contact</a>
        </div>
      </div>
    </footer>
  )
}
