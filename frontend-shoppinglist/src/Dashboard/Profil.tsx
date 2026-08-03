import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineMail, AiOutlineSave, AiOutlineTag, AiOutlineUser, AiFillMoneyCollect } from 'react-icons/ai'
import Select, { type SingleValue } from 'react-select'
import { AuthField } from '../Auth/AuthIcons'
import UserService from '../Services/user'
import type { User, UserUpdateValues } from '../types'
import type { CurrencyDTO } from '../types/currency'
import { getCurrencyMeta } from '../utils/currency'

interface CurrencyOption {
  value: string
  label: string
  flag: string
}

const getAvatarUrl = (pseudo: string, email: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(pseudo || email)}`

const Profile = () => {
  const { user } = useOutletContext<{ user: User | null }>()
  const [profile, setProfile] = useState<User | null>(user)
  const [currencies, setCurrencies] = useState<CurrencyDTO[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateValues>({
    defaultValues: {
      name: profile?.name ?? '',
      lname: profile?.lname ?? '',
      pseudo: profile?.pseudo ?? '',
      email: profile?.email ?? '',
    },
  })

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const currencies = await UserService.getAllCurrencies()
        setCurrencies(currencies)
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
          (error as Error)?.message ??
          'Erreur lors du chargement des devises.'
        toast.error(errorMessage)
      }
    }

    fetchCurrencies()
  }, [])

  const currencyOptions: CurrencyOption[] = currencies.map((c) => {
    const meta = getCurrencyMeta(c.code)
    return {
      value: c.code,
      label: `${meta.symbol} ${meta.label}`,
      flag: meta.flag,
    }
  })

  const selectedCurrency = currencyOptions.find((c) => c.value === profile?.currency) ?? null

  const formatCurrencyLabel = (option: CurrencyOption) => (
    <span className="flex items-center gap-2">
      <img src={option.flag} alt="" className="h-4 w-6 rounded-sm object-cover" />
      <span>{option.label}</span>
    </span>
  )

  const handleCurrencyChange = async (option: SingleValue<CurrencyOption>) => {
    if (!option || !profile) return

    try {
      const updated = await UserService.updateCurrency(option.value)
      setProfile(updated)
      toast.success('Devise mise à jour avec succès.')
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        (error as Error)?.message ??
        'Erreur lors de la mise à jour de la devise.'
      toast.error(errorMessage)
    }
  }

  const onSubmit = async (values: UserUpdateValues) => {
    try {
      const updated = await UserService.updateConnectedUserProfile(values)
      setProfile(updated)
      toast.success('Profil mis à jour avec succès.')
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        (error as Error)?.message ??
        'Erreur lors de la mise à jour du profil.'
      toast.error(errorMessage)
    }
  }

  if (!profile) {
    return <div className="text-center p-4">Chargement du profil...</div>
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <img
          src={getAvatarUrl(profile.pseudo, profile.email)}
          alt={`Avatar de ${profile.pseudo}`}
          className="h-20 w-20 rounded-full border border-slate-200 bg-slate-100 object-cover"
        />
        <div>
          <h2 className="text-2xl font-black tracking-tight">
            {profile.name} {profile.lname}
          </h2>
          <p className="mt-1 text-sm text-textSecondary">@{profile.pseudo}</p>
        </div>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField
            label="Prénom"
            placeholder="Jean"
            icon={AiOutlineUser}
            registration={register('name', { required: 'Le prénom est requis.' })}
            error={errors.name}
          />
          <AuthField
            label="Nom"
            placeholder="Dupont"
            icon={AiOutlineUser}
            registration={register('lname', { required: 'Le nom est requis.' })}
            error={errors.lname}
          />
        </div>
        <AuthField
          label="Pseudo"
          placeholder="jean.dupont"
          icon={AiOutlineTag}
          registration={register('pseudo')}
          error={errors.pseudo}
        />
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

        <label className="grid gap-2">
          <span className="flex items-center gap-2 text-sm font-bold text-textPrimary">
            <AiFillMoneyCollect className="h-5 w-5 text-textSecondary" />
            Devise
            {selectedCurrency && (
              <img src={selectedCurrency.flag} alt="" className="h-3 w-5 rounded-sm object-cover" />
            )}
          </span>
          <Select<CurrencyOption>
            className="text-sm"
            classNamePrefix="select"
            placeholder="Choisir une devise"
            isSearchable
            options={currencyOptions}
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            formatOptionLabel={formatCurrencyLabel}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex w-fit items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-black text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70"
        >
          <AiOutlineSave className="h-5 w-5" />
          {isSubmitting ? 'Enregistrement...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  )
}

export default Profile
