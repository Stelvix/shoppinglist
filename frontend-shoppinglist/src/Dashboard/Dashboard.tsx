import { useEffect, useState, useCallback } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import type { User, TypeDeCourse } from "../types"; 
import typeDeCourseService from "../Services/Typesdecourses";
import { 
  AiOutlineShoppingCart, 
  AiFillPlusCircle, 
  AiOutlineDelete, 
  AiOutlineEye, 
  AiOutlineCalendar 
} from "react-icons/ai";

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User | null }>();
  const [typesDeCourses, setTypesDeCourses] = useState<TypeDeCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const refreshCourses = useCallback(async () => {
    if (!user) return;

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
  }, [user]);

  useEffect(() => {
    const loadCourses = async () => {
      await refreshCourses();
    };

    loadCourses();
  }, [refreshCourses]);

  const handleDeleteList = async (id: string) => {
    const targetList = typesDeCourses.find((list) => list.id === id);
    const nombreProduit = targetList?.produits ? targetList.produits.length : 0;

    if (nombreProduit) {
      if (nombreProduit > 0) {
         const confirmation = window.confirm(
        `Il reste ${nombreProduit} produit(s) dans la liste "${targetList?.name || ''}". Voulez-vous vraiment tout supprimer ?`
        );
              if (!confirmation) return;

      } else if (nombreProduit == 0) {
      
        const confirmation = window.confirm(
          `Voullez vous vraimment supprimer la liste "${targetList?.name || ''}"?`
        )
        if (!confirmation) return;
      }

    }


    try {
      await typeDeCourseService.deleteTypedecourse(id);
      toast.success("Liste de course supprimée avec succès !");
      
      // Mise à jour instantanée du state local
      setTypesDeCourses((prev) => prev.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Erreur de suppression de la liste", error);
      toast.error("Impossible de supprimer la liste pour le moment.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Résumé & Statistiques */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-primary">
            <AiOutlineShoppingCart className="text-2xl" />
            <h2 className="text-xl font-black">Mes listes de courses</h2>
          </div>
          
          <div className="mt-4">
            {loadingCourses ? (
              <p className="text-sm text-textSecondary animate-pulse">Chargement...</p>
            ) : (
              <div>
                <p className="text-4xl font-black text-primary">
                  {typesDeCourses.length}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {typesDeCourses.length <= 1 ? "liste de course active" : "listes de courses actives"}
                </p>
                <p className="mt-2 text-xs text-textSecondary">
                  Gérez vos courses quotidiennes, hebdomadaires et vos budgets en toute simplicité.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bloc d'action rapide */}
        <div className="flex flex-col justify-between rounded-3xl border border-blue-100 bg-blue-50/50 p-6">
          <div>
            <h2 className="text-lg font-black text-primary">Créer une nouvelle liste</h2>
            <p className="mt-1 text-sm text-textSecondary">
              Ajoutez une catégorie ou une occasion pour regrouper vos articles de courses.
            </p>
          </div>
          <div className="mt-4">
            <Link 
              to="create-type-course" 
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primaryDark"
            >
              <AiFillPlusCircle className="text-lg" />
              Nouvelle liste
            </Link>
          </div>
        </div>
      </div>

      {/* Grille des listes */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-textPrimary">Vos listes enregistrées</h3>
        
        {loadingCourses ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : typesDeCourses.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center bg-white">
            <p className="text-sm text-textSecondary">Aucune liste de course créée pour le moment.</p>
            <Link to="create-type-course" className="mt-3 inline-block text-sm font-bold text-primary hover:underline">
              Créez votre première liste de course
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {typesDeCourses.map((courseList) => (
              <div 
                key={courseList.id} 
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-slate-200 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 space-y-1">
                  <h4 className="text-base font-black text-textPrimary group-hover:text-primary transition">
                    {courseList.name}
                  </h4>
                  {courseList.description && (
                    <p className="text-sm text-textSecondary truncate max-w-lg">
                      {courseList.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-textSecondary pt-1">
                    <div className="flex items-center gap-1">
                      <AiOutlineCalendar />
                      <span>Créée le {new Date(courseList.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                      {courseList.produits ? courseList.produits.length : 0} produit(s)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    to={`listes/${courseList.id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-primary hover:text-white"
                    title="Voir les produits"
                  >
                    <AiOutlineEye className="h-5 w-5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteList(courseList.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-danger hover:text-white"
                    title="Supprimer la liste"
                  >
                    <AiOutlineDelete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;