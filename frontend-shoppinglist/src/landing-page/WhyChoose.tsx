import { AiOutlineCheck } from 'react-icons/ai'

const reasons = [
  'Une interface claire, sans elements inutiles',
  'Des totaux visibles pour mieux anticiper le budget',
  'Des listes faciles a modifier au quotidien',
  'Un design moderne qui reste discret',
]

export default function WhyChoose() {
  return (
    <section id="why" className="py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Pourquoi Shopping List ?</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Pense pour etre utile, pas envahissant.
          </h2>
          <p className="mt-5 leading-8 text-textSecondary">
            L objectif est de vous aider a suivre vos courses sans transformer une petite tache du quotidien en tableau complique. Tout reste lisible, rapide et agreable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason} className="card flex items-start gap-4 p-5">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                <AiOutlineCheck className="h-3 w-3" />
              </span>
              <p className="font-bold leading-7">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

