const features = [
  {
    title: 'Creez vos listes simplement',
    text: 'Preparez vos courses par semaine, repas ou magasin en quelques secondes.',
  },
  {
    title: 'Ajoutez les prix',
    text: 'Renseignez le prix de chaque produit et gardez une liste lisible.',
  },
  {
    title: 'Voyez le total automatiquement',
    text: 'Le montant estime se met a jour au fur et a mesure de vos ajouts.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Comment ca fonctionne</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Une organisation simple pour vos achats.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <article key={feature.title} className="card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-black text-primary">
                {index + 1}
              </div>
              <h3 className="mt-6 text-lg font-black">{feature.title}</h3>
              <p className="mt-3 leading-7 text-textSecondary">{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
