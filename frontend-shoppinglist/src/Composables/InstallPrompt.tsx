import { useState } from 'react'
import { AiOutlineClose, AiOutlineDownload } from 'react-icons/ai'
import useInstallPrompt from './useInstallPrompt'

export default function InstallPrompt() {
  const { canInstall, isIOS, install } = useInstallPrompt()
  const [dismissed, setDismissed] = useState(false)

  if (!canInstall || dismissed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-xs rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-300/40">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Fermer"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        <AiOutlineClose className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primaryLight text-primary">
          <AiOutlineDownload className="h-5 w-5" />
        </span>
        <div>
          <p className="font-black leading-6">Installer Shopping List</p>
          {isIOS ? (
            <p className="mt-2 text-sm leading-6 text-textSecondary">
              Touchez <span className="font-bold text-textPrimary">Partager</span> puis{' '}
              <span className="font-bold text-textPrimary">Ajouter à l'écran d'accueil</span>.
            </p>
          ) : (
            <p className="mt-2 text-sm leading-6 text-textSecondary">
              Accédez à vos listes depuis l'écran d'accueil, même hors ligne.
            </p>
          )}
        </div>
      </div>

      {!isIOS && (
        <button
          type="button"
          onClick={() => install()}
          className="mt-4 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark"
        >
          Installer
        </button>
      )}
    </div>
  )
}
