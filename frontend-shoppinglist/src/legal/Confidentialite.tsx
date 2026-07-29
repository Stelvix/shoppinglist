import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineArrowLeft } from 'react-icons/ai'

export default function Confidentialite() {
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
            <h1 className="text-2xl font-bold sm:text-3xl">
              Politique de Confidentialité
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-textSecondary sm:text-base">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                1. Données collectées
              </h2>
              <p>
                Dans le cadre de la création de compte sur l'application Shopping List,
                nous collectons les données suivantes :
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Pseudo (optionnel)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                2. Finalité de la collecte
              </h2>
              <p>
                Ces données sont collectées uniquement dans le but de permettre la
                création et la gestion de votre compte utilisateur. Elles ne sont
                en aucun cas utilisées à des fins commerciales ou de revente.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                3. Stockage et hébergement
              </h2>
              <p>
                Vos données sont stockées de manière sécurisée sur les serveurs de
                <strong> Microsoft Azure</strong>, situés en Europe.
                L'application elle-même est hébergée par <strong>Vercel Inc.</strong>
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                4. Sécurité
              </h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles
                appropriées pour protéger vos données personnelles contre tout accès
                non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                5. Vos droits
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez d'un droit d'accès, de rectification et de
                suppression de vos données. Pour exercer ces droits, contactez-nous
                via l'application.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-textPrimary">
                6. Partage des données
              </h2>
              <p>
                Nous ne partageons aucune de vos données personnelles avec des tiers.
                Les emails collectés servent uniquement à l'authentification et à la
                communication liée au fonctionnement de l'application.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
