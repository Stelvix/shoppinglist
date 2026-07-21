import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  AiOutlineArrowLeft, 
  AiOutlineShoppingCart, 
  AiOutlinePlus, 
  AiOutlineDelete, 
  AiOutlineCheck, 
  AiOutlineLoading3Quarters 
} from "react-icons/ai";
import typeDeCourseService from "../Services/Typesdecourses";
import produitService from "../Services/produits";
import type { TypeDeCourse, Produit } from "../types";

export default function ListDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [list, setList] = useState<TypeDeCourse | null>(null);
  const [products, setProducts] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Local state for adding a product
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  
  // Local state for purchased items (stored in localStorage)
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

useEffect(() => {
  if (!id) return;

  const fetchData = async () => {
    try {
      setLoading(true);

      const listData = await typeDeCourseService.getTypeDeCourseById(id);
      const productsData = await produitService.getProduitsByListId(id);

      setList(listData);
      setProducts(productsData);

    } catch (error) {
      console.error(error);
      toast.error("Impossible de charger cette liste.");
      navigate("/dashboard");

    } finally {
      setLoading(false);
    }
  };

  fetchData();

}, [id, navigate]);

  // Persist purchased items to localStorage when it changes
const togglePurchased = (productId: string) => {
  const updated = purchasedIds.includes(productId)
    ? purchasedIds.filter(id => id !== productId)
    : [...purchasedIds, productId];

  setPurchasedIds(updated);

  if (id) {
    localStorage.setItem(
      `purchased_${id}`,
      JSON.stringify(updated)
    );
  }
};

const handleAddProduct = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!id) return;

  try {
    setSubmitting(true);

    const created = await produitService.createProduit(id, {
      name: newProductName,
      prix: Number(newProductPrice)
    });

    setProducts(prev => [...prev, created]);

    setNewProductName("");
    setNewProductPrice("");

    toast.success("Produit ajouté !");

  } catch (error) {
    console.error(error);
    toast.error("Impossible d'ajouter le produit.");

  } finally {
    setSubmitting(false);
  }
};

const handleDeleteProduct = async (productId: string) => {
  try {
    await produitService.deleteProduit(productId);

    setProducts(prev =>
      prev.filter(product => product.id !== productId)
    );

    toast.success("Produit supprimé !");

  } catch(error) {
    toast.error("Impossible de supprimer le produit.");
    console.log(error)
  }
};

  // Calculations
  const totalEstimated = products.reduce((sum, p) => sum + Number(p.prix), 0);
  const totalPurchased = products
    .filter((p) => purchasedIds.includes(p.id))
    .reduce((sum, p) => sum + Number(p.prix), 0);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-semibold text-textSecondary">Chargement de votre liste...</p>
      </div>
    );
  }

  if (!list) return null;

  return (
    <div className="space-y-6">
      {/* Header / Back navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 text-sm font-bold text-textSecondary transition hover:text-primary"
        >
          <AiOutlineArrowLeft className="h-5 w-5" />
          Retour au tableau de bord
        </Link>
        <span className="text-xs text-textSecondary">
          Créée le {new Date(list.createdAt).toLocaleDateString("fr-FR")}
        </span>
      </div>

      {/* Info card */}
      <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-primary">
            <AiOutlineShoppingCart className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-textPrimary">{list.name}</h2>
            {list.description && (
              <p className="mt-1 text-sm text-textSecondary">{list.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Form on the left/top, Products on the right/bottom */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Form & Budget summary */}
        <div className="space-y-6 lg:col-span-1">
          {/* Budget Widget */}
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Budget</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Total estimé</span>
                <span className="text-2xl font-black">{totalEstimated.toFixed(2)} €</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <span className="text-sm text-slate-300">Total acheté</span>
                <span className="text-xl font-bold text-green-400">{totalPurchased.toFixed(2)} €</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Reste à acheter</span>
                <span>{(totalEstimated - totalPurchased).toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Add product form */}
          <div className="rounded-3xl border border-slate-150 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-textPrimary">Ajouter un produit</h3>
            <form onSubmit={handleAddProduct} className="mt-4 space-y-4">
              <label className="grid gap-2">
                <span className="text-xs font-bold text-textPrimary">Nom du produit</span>
                <input
                  type="text"
                  placeholder="Ex: Lait demi-écrémé"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3 py-3 text-sm text-textPrimary outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs font-bold text-textPrimary">Prix (€)</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ex: 1.25"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3 py-3 text-sm text-textPrimary outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primaryDark disabled:opacity-50"
              >
                <AiOutlinePlus className="h-4 w-4" />
                {submitting ? "Ajout..." : "Ajouter à la liste"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Products List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-textPrimary">
              Articles dans la liste ({products.length})
            </h3>
          </div>

          {products.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center">
              <p className="text-sm text-textSecondary">Aucun produit dans cette liste pour l'instant.</p>
              <p className="mt-1 text-xs text-textSecondary">Saisissez un article sur la gauche pour commencer.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {products.map((product) => {
                const isPurchased = purchasedIds.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className={`flex items-center justify-between rounded-2xl border p-4 transition duration-200 ${
                      isPurchased 
                        ? "border-green-100 bg-green-50/50" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => togglePurchased(product.id)}
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${
                          isPurchased
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-slate-300 bg-white hover:border-primary"
                        }`}
                      >
                        {isPurchased && <AiOutlineCheck className="h-4 w-4" />}
                      </button>
                      
                      {/* Name */}
                      <span 
                        className={`truncate text-sm font-semibold transition-all ${
                          isPurchased 
                            ? "text-slate-400 line-through" 
                            : "text-textPrimary"
                        }`}
                      >
                        {product.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Price */}
                      <span 
                        className={`text-sm font-bold transition-all ${
                          isPurchased ? "text-slate-400" : "text-textPrimary"
                        }`}
                      >
                        {Number(product.prix).toFixed(2)} €
                      </span>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-slate-400 transition hover:text-danger"
                      >
                        <AiOutlineDelete className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
