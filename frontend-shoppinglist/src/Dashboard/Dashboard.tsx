import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../Services/auth";
import type { User } from "../types";
import DashboardLayout from "./DashboardLayout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import typeDeCourseService from "../Services/Typesdecourses";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
  typeDeCourseService.getTypeDecoursesByuserId();
}, []);

  if (loading) {
    return <div className="text-center p-4">Chargement du profil...</div>;
  }

  return (
    <DashboardLayout userName={user?.pseudo ?? 'Invité'}>
      <div className="grid gap-6">
        <div className=" grid gap-2 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
            <div className="flex items-center">
               <AiOutlineShoppingCart className="text-2xl mr-2 text-blue-600 font-medium" />
          <h2 className="text-xl font-black">Aperçu rapide</h2>
           </div>
          <p className="mt-3 text-sm leading-6 text-textSecondary">
            Ici, tu pourras afficher les statistiques principales, les listes récentes et les actions rapides.
          </p>
        </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
          <h2 className="text-xl font-black">Aperçu rapide</h2>
          <p className="mt-3 text-sm leading-6 text-textSecondary">
            Ici, tu pourras afficher les statistiques principales, les listes récentes et les actions rapides.
          </p>
        </div>
        </div>
   

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