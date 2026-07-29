import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai'

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-appBg text-textPrimary">
      <div className="section-shell py-12">
        <Link
          to="/"
          className="mb-8 flex items-center gap-2 text-sm text-textSecondary transition hover:text-primary"
        >
          <AiOutlineArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>

        <div className="card p-8 sm:p-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">
              <AiOutlineShoppingCart className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">Mentions Légales</h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-textSecondary sm:text-base">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                1. Éditeur de l'application
              </h2>
              <p>
                L'application Shopping List est éditée par un particulier.
                <br />
                Développement : Steeven HOUNKPE-SAGBO
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                2. Hébergement
              </h2>
              <p>
                L'application est hébergée par <strong>Vercel Inc.</strong>
                <br />
                340 S Lemon Ave #4133, Walnut Creek, CA 91789, États-Unis.
                <br />
                Site web :{' '}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  vercel.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                3. Backend et hébergement des données
              </h2>
              <p>
                Le backend de l'application est déployé sur <strong>Microsoft Azure</strong>.
                Les données sont hébergées dans les centres de données d'Azure,
                situés en Europe.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                4. Propriété intellectuelle
              </h2>
              <p>
                L'ensemble du code source, du design et du contenu de l'application
                est la propriété de l'éditeur. Toute reproduction ou utilisation
                sans autorisation est interdite.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                5. Contact
              </h2>
              <p>
                Pour toute question, vous pouvez nous contacter via le formulaire
                disponible sur l'application ou par email à l'adresse indiquée
                dans la section contact.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
