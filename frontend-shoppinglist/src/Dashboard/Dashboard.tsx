import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../Services/auth";
import type { User, TypeDeCourse } from "../types"; // Assure-toi d'importer TypeDeCourse ici
import DashboardLayout from "./DashboardLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import typeDeCourseService from "../Services/Typesdecourses";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [typesDeCourses, setTypesDeCourses] = useState<TypeDeCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);

  // 1. Récupération de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const details = await authService.getCurrentUser();
        setUser(details);
      } catch (error: any) {
        console.error("Erreur lors de la récupération du user", error);
        if (error?.message === 'Utilisateur connecté introuvable. Veuillez vous reconnecter.') {
          toast.error(error.message);
          authService.logout();
          navigate('/login');
          return;
        }
        toast.error('Impossible de charger le profil utilisateur.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // 2. Récupération des types de courses (UNIQUEMENT quand "user" est disponible)
  useEffect(() => {
    if (!user) return; // On attend que le user soit chargé pour éviter l'erreur dans le service

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

  if (loading) {
    return <div className="text-center p-4">Chargement du profil...</div>;
  }

  return (
    <DashboardLayout userName={user?.pseudo ?? 'Invité'}>
      <div className="grid gap-6">
        <div className="grid gap-2 lg:grid-cols-2">
          
          {/* Bloc 1 : Aperçu rapide dynamique */}
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <div className="flex items-center">
              <AiOutlineShoppingCart className="text-2xl mr-2 text-blue-600 font-medium" />
              <h2 className="text-xl font-black">Aperçu rapide</h2>
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
    </DashboardLayout>
  );
};

export default Dashboard;