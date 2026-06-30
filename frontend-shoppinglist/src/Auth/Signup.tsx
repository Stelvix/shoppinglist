import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AuthField, Brand } from './AuthIcons'
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineFileText,
  AiOutlineCalculator,
  AiOutlineCloud,
  AiOutlineGoogle,
  AiOutlineArrowLeft,
} from 'react-icons/ai'

import type { SignupFormValues } from '../types'

const benefits = [
  {
    title: 'Creez vos listes facilement',
    text: 'Organisez vos courses par occasion, semaine ou magasin.',
    icon: AiOutlineFileText,
  },
  {
    title: 'Calcul automatique du total',
    text: 'Le montant se met a jour en temps reel a chaque ajout.',
    icon: AiOutlineCalculator,
  },
  {
    title: 'Acces depuis n importe ou',
    text: 'Vos listes restent disponibles sur tous vos appareils.',
    icon: AiOutlineCloud,
  },
]

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: SignupFormValues) => {
    console.log('signup', values)
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-textPrimary sm:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sm:px-16">
          <Brand />
          <p className="text-sm text-textSecondary">
            Deja un compte ?
            <Link to="/login" className="ml-3 font-bold text-primary">Se connecter</Link>
          </p>
        </header>

        <main className="grid flex-1 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden overflow-hidden bg-primary px-16 py-20 text-white lg:block">
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -right-16 top-0 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10 flex h-full max-w-xl flex-col justify-center">
              <span className="mb-6 w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
                Entierement gratuit
              </span>
              <h1 className="text-5xl font-black leading-tight tracking-tight">
                Bienvenue sur Shopping List
              </h1>
              <p className="mt-5 max-w-md text-lg leading-8 text-blue-50">
                Creez votre compte en quelques secondes et commencez a gerer vos courses simplement.
              </p>

              <div className="mt-12 grid gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <benefit.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-black">{benefit.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-blue-100">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
                 <Link to={"/"} className='flex items-center bg-white p-2 font-semibold justify-center rounded-full mt-2 hover:bg-transparent hover:border border-4 hover:border-white hover:text-white transition' >
                          <AiOutlineArrowLeft />
                            Retour à la page d'acceuil
                          </Link>
            </div>
          </section>

          <section className="flex items-center justify-center bg-slate-50 px-5 py-12 sm:px-8">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-black tracking-tight">Creer un compte</h2>
              <p className="mt-3 text-sm leading-6 text-textSecondary">
                Remplissez le formulaire ci-dessous pour commencer.
              </p>

              <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-textPrimary shadow-sm transition hover:border-slate-300">
                <AiOutlineGoogle className="text-lg text-red-500" />
                Continuer avec Google
              </button>

              <div className="my-6 text-center text-xs text-textSecondary">ou avec votre adresse e-mail</div>

              <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <AuthField
                    label="Prenom"
                    placeholder="Jean"
                    icon={AiOutlineUser}
                    registration={register('firstName', { required: 'Le prenom est requis.' })}
                    error={errors.firstName}
                  />
                  <AuthField
                    label="Nom"
                    placeholder="Dupont"
                    icon={AiOutlineUser}
                    registration={register('lastName', { required: 'Le nom est requis.' })}
                    error={errors.lastName}
                  />
                </div>
                <AuthField
                  label="Adresse e-mail"
                  placeholder="jean.dupont@email.com"
                  type="email"
                  icon={AiOutlineMail}
                  registration={register('email', {
                    required: 'L adresse e-mail est requise.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Entrez une adresse e-mail valide.',
                    },
                  })}
                  error={errors.email}
                />
                <div>
                  <AuthField
                    label="Mot de passe"
                    placeholder="••••••••"
                    type="password"
                    icon={AiOutlineLock}
                    registration={register('password', {
                      required: 'Le mot de passe est requis.',
                      minLength: {
                        value: 8,
                        message: 'Au moins 8 caracteres.',
                      },
                    })}
                    error={errors.password}
                  />
                  <p className="mt-2 text-xs text-textSecondary">Au moins 8 caracteres.</p>
                </div>
                <AuthField
                  label="Confirmer le mot de passe"
                  placeholder="••••••••"
                  type="password"
                  icon={AiOutlineLock}
                  registration={register('confirmPassword', {
                    required: 'Confirmez le mot de passe.',
                    validate: (value) => value === watch('password') || 'Les mots de passe ne correspondent pas.',
                  })}
                  error={errors.confirmPassword}
                />

                <button
                  disabled={isSubmitting}
                  className="mt-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-black text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Creer mon compte
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

