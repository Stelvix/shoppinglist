import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import type { User, TypeDeCourse } from "../types"; // Assure-toi d'importer TypeDeCourse ici
import { AiOutlineShoppingCart } from "react-icons/ai";
import typeDeCourseService from "../Services/Typesdecourses";
import { AiFillPlusCircle } from "react-icons/ai";

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User | null }>()
  const [typesDeCourses, setTypesDeCourses] = useState<TypeDeCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const data = await typeDeCourseService.getTypeDecoursesByuserId();
        setTypesDeCourses(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types de courses", error);
        toast.error("Impossible de charger tes listes de courses.");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2 lg:grid-cols-2">
        
          {/* Bloc 1 : Aperçu rapide dynamique */}
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <div className="flex items-center">
              <AiOutlineShoppingCart className="text-2xl mr-2 text-blue-600 font-medium" />
              <h2 className="text-xl font-black text-blue-600">Vos listes de courses</h2>
            </div>
            
            <div className="mt-4">
              {loadingCourses ? (
                <p className="text-sm text-textSecondary animate-pulse">Chargement de tes listes...</p>
              ) : (
                <div>
                  <p className="text-3xl font-black text-blue-600">
                    {typesDeCourses.length}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {typesDeCourses.length <= 1 ? "type de course enregistré" : "types de courses enregistrés"}
                  </p>
                  <p className="mt-2 text-xs text-textSecondary">
                    Tu as actuellement {typesDeCourses.length} catégorie{typesDeCourses.length > 1 ? 's' : ''} de courses active{typesDeCourses.length > 1 ? 's' : ''} dans ton profil.
                  </p>
                </div>
              )}
            </div>

            <div className="py-2 bg-blue-100 flex items-center justify-center rounded-2xl mt-2 border-2 border-dashed border-blue-300 ">
              <AiFillPlusCircle className="text-2xl text-blue-600"/>
              <Link to={"create-type-course"} className="ml-2 text-blue-600 font-semibold">Nouvelle liste</Link>
            </div>

          </div>

          {/* Bloc 2 : Autre aperçu rapide (placeholder ou à personnaliser) */}
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <h2 className="text-xl font-black">Statistiques globales</h2>
            <p className="mt-3 text-sm leading-6 text-textSecondary">
              Ici, tu pourras bientôt afficher tes dépenses du mois ou tes statistiques d'achats les plus fréquents.
            </p>
          </div>
        </div>

        {/* Bloc 3 : Activité & Prochaines actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <h3 className="text-lg font-black">Activité récente</h3>
            <p className="mt-3 text-sm text-textSecondary">Contenu placeholder pour les listes et les achats récents.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <h3 className="text-lg font-black">Prochaine action</h3>
            <p className="mt-3 text-sm text-textSecondary">Tu peux ajouter ici les boutons ou résumés de navigation vers tes pages post-connexion.</p>
          </div>
        </div>
      </div>
   );
};

export default Dashboard;