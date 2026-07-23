import { useNavigate, useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { User, TypeDeCourseCreateDTO } from '../types'
import { TypeDeCourseFields } from '../Forms/typeDecourse'
import { AiOutlineShoppingCart, AiFillFileText } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import typeDeCourseService from '../Services/Typesdecourses'
 
const TypedecoursesForm = () => {
  const navigateTo = useNavigate();
  const { user } = useOutletContext<{ user: User | null }>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TypeDeCourseCreateDTO>()

  const onSubmit = async (data: TypeDeCourseCreateDTO) => {
    try {
      const payload = {
        ...data,
       }

      // appeler le service de création de type de course ici
        //console.log('Création type de course', payload)
        await typeDeCourseService.createTypedecourse(payload)
      toast.success('Type de course créé avec succès !')
      setTimeout(() => {
        navigateTo("/dashboard")
      }, 1000);
      reset()
    } catch (error) {
      console.error('Erreur création type de course', error)
      toast.error('Impossible de créer la liste pour le moment.')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-black">Crée une nouvelle liste</h2>
      <p className="mt-3 text-sm text-textSecondary "><span className='font-bold text-blue-600'>{user?.pseudo}</span>, ici tu peux gérer tes courses.</p>

      <form className="mt-8 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TypeDeCourseFields
          label="Nom de votre type de course"
          placeholder="Courses de Noël"
          type="text"
          icon={AiOutlineShoppingCart}
          registration={register('name', {
            required: 'Il est obligatoire de mettre un nom pour votre liste',
          })}
          error={errors.name}
        />

        <TypeDeCourseFields
          label="Description de votre type de course"
          placeholder="Ceci est un exemple de description type de courses"
          type="TextArea"
          icon={AiFillFileText}
          registration={register('description', {
            required: 'La description est requise',
          })}
          error={errors.description}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl bg-primary px-4 py-3 text-sm font-black text-white transition hover:bg-primaryDark disabled:opacity-50"
        >
          {isSubmitting ? 'Envoi...' : 'Créer la liste'}
        </button>
      </form>
    </div>
  )
}

export default TypedecoursesForm
