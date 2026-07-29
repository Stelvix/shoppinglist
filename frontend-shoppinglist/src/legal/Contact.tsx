import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  AiOutlineShoppingCart,
  AiOutlineArrowLeft,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineMessage,
  AiOutlinePhone,
  AiOutlineSend,
} from 'react-icons/ai'

type Subject = { value: string; label: string }

const SUBJECTS: Subject[] = [
  { value: 'support', label: 'Support technique' },
  { value: 'bug', label: 'Signaler un bug' },
  { value: 'feature', label: 'Suggestion d\'amélioration' },
  { value: 'partnership', label: 'Partenariat' },
  { value: 'other', label: 'Autre' },
]

function sanitize(val: string): string {
  return val
    .replace(/</g, '')
    .replace(/>/g, '')
    .replace(/&/g, '')
    .replace(/"/g, '')
    .replace(/'/g, '')
}

function encodeMailTo(str: string): string {
  return encodeURIComponent(str).replace(/%20/g, '+')
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('support')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Le nom est requis'
    if (!email.trim()) errs.email = 'L\'email est requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = 'Email invalide'
    if (!message.trim()) errs.message = 'Le message est requis'
    else if (message.trim().length < 10)
      errs.message = 'Le message doit contenir au moins 10 caractères'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (cooldown > 0) return
    if (!validate()) return

    setSending(true)

    const cleanName = sanitize(name.trim())
    //const cleanEmail = sanitize(email.trim())
    const cleanMsg = sanitize(message.trim())
    const subjectLabel =
      SUBJECTS.find((s) => s.value === subject)?.label ?? 'Contact'

    const body = [
      cleanMsg,
      '',
      '---',
      cleanName,
    ].join('\n')

    const mailTo = `https://mail.google.com/mail/?view=cm&fs=1&to=hounkpesagbojeff@gmail.com&su=${encodeMailTo(subjectLabel)}&body=${encodeMailTo(body)}`

    window.open(mailTo, '_blank')

    setSending(false)
    setCooldown(30)

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

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
            <h1 className="text-2xl font-bold sm:text-3xl">Contact</h1>
          </div>

          <p className="mb-4 text-sm text-textSecondary sm:text-base">
            Une question, un bug ou une suggestion ? Remplissez le formulaire
            ci-dessous pour m'écrire directement via Gmail.
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-textSecondary">
            <a
              href="mailto:hounkpesagbojeff@gmail.com"
              className="inline-flex items-center gap-1.5 text-primary underline transition hover:text-primaryDark"
            >
              <AiOutlineMail className="h-4 w-4" />
              hounkpesagbojeff@gmail.com
            </a>
            <span className="inline-flex items-center gap-1.5">
              <AiOutlinePhone className="h-4 w-4 text-primary" />
              +33 06 20 05 77 67
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-textPrimary"
              >
                <AiOutlineUser className="h-4 w-4 text-primary" />
                Nom
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl border bg-cardBg px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary/30 ${errors.name ? 'border-danger' : 'border-slate-200 focus:border-primary'}`}
                placeholder="Votre nom"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-textPrimary"
              >
                <AiOutlineMail className="h-4 w-4 text-primary" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border bg-cardBg px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary/30 ${errors.email ? 'border-danger' : 'border-slate-200 focus:border-primary'}`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-textPrimary"
              >
                <AiOutlineMessage className="h-4 w-4 text-primary" />
                Objet
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-cardBg px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-textPrimary"
              >
                <AiOutlineMessage className="h-4 w-4 text-primary" />
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full resize-y rounded-xl border bg-cardBg px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-primary/30 ${errors.message ? 'border-danger' : 'border-slate-200 focus:border-primary'}`}
                placeholder="Votre message (min. 10 caractères)"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-danger">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending || cooldown > 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {cooldown > 0 ? (
                `Attendez ${cooldown}s`
              ) : (
                <>
                  <AiOutlineSend className="h-4 w-4" />
                  Envoyer
                </>
              )}
            </button>
          </form>

         
        </div>
      </div>
    </div>
  )
}
