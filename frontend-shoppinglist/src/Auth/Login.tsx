import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AuthField, Brand } from './AuthIcons'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import authService from '../Services/auth'

import {toast} from 'react-toastify'



import type { LoginFormValues } from '../types'

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  useEffect(() => {
    const sessionExpired = localStorage.getItem('sessionExpired')
    if (sessionExpired) {
      toast.error("La session a expiré. Veuillez vous reconnecter.")
      localStorage.removeItem('sessionExpired')
    }
  }, [])

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await authService.login(values);
      await authService.getCurrentUser();
      toast.success('Connexion réussie!!');
      navigate('/dashboard');
    } catch (error: any) {
      console.log('Erreur : ', error);

      const statusCode = error?.response?.status;
      const errorMessage = error?.response?.data?.message ?? error?.message ?? 'Erreur de connexion';

      if (error?.message === 'Utilisateur connecté introuvable. Veuillez vous reconnecter.') {
        authService.logout();
        toast.error(error.message);
      } else if (statusCode === 401 || statusCode === 403) {
        toast.error('Email ou mot de passe incorrect.');
      } else {
        toast.error(errorMessage);
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-textPrimary sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex items-center justify-center bg-slate-50 px-5 py-12 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <Brand />
            </div>

            <h1 className="text-3xl font-black tracking-tight">Se connecter</h1>
            <p className="mt-3 text-sm leading-6 text-textSecondary">
              Retrouvez vos listes et continuez a suivre vos depenses.
            </p>

          
            <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <AuthField
                label="Adresse e-mail"
                placeholder="jean.dupont@email.com"
                type="email"
                icon={AiOutlineMail}
                registration={register('email', {
                  required: "L'adresse e-mail est requise.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Entrez une adresse e-mail valide.',
                  },
                })}
                error={errors.email}
            
              />
              <AuthField
                label="Mot de passe"
                placeholder="••••••••"
                type="password"
                icon={AiOutlineLock}
                registration={register('password', { required: 'Le mot de passe est requis.' })}
                error={errors.password}
              />


              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-medium text-textSecondary">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-primary" {...register('remember')} />
                  Se souvenir de moi
                </label>
                <a href="#" className="font-bold text-primary">Mot de passe oublie</a>
              </div>

              <button
                disabled={isSubmitting}
                className="mt-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-black text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
              >
                Se connecter
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-textSecondary">
              Pas encore de compte ?
              <Link to="/signup" className="ml-2 font-bold text-primary">Creer un compte</Link>
            </p>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-primary px-14 py-16 text-white lg:flex lg:items-end">
          <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative z-10 max-w-lg">
            <p className="mb-5 w-fit rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
              Vos listes vous attendent
            </p>
            <h2 className="text-5xl font-black leading-tight tracking-tight">
              Reprenez vos courses la ou vous les avez laissees.
            </h2>
            <p className="mt-5 text-lg leading-8 text-blue-50">
              Connectez-vous pour retrouver vos listes, vos produits et vos totaux estimes.
            </p>
            <Link to={"/"} className='flex items-center bg-white p-2 font-semibold justify-center rounded-full mt-2 hover:bg-transparent hover:border border-4 hover:border-white hover:text-white transition' >
            <AiOutlineArrowLeft />
              Retour à la page d'acceuil
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
