import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  AiOutlineArrowLeft, 
  AiOutlineShoppingCart, 
  AiOutlinePlus, 
  AiOutlineDelete, 
  AiOutlineCheck,  
  AiOutlineLoading3Quarters,
  AiOutlineTag,
  AiFillMoneyCollect
} from "react-icons/ai";
import typeDeCourseService from "../Services/Typesdecourses";
import produitService from "../Services/produits";
import type { TypeDeCourse, Produit, User } from "../types";
import { getCurrencyMeta } from "../utils/currency";

export default function ListDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: User | null }>();
  const currencySymbol = user?.currency ? getCurrencyMeta(user.currency).symbol : "€";
  
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
  
  const updateProductName = async (
    id: string,
    name: string | null
  ) => {

    const newName = name?.trim();
    

    const product = products.find(p => p.id === id);
    if (!product || !newName || newName === product.name) return;
       
    const dtoNewProduct = {
      name: newName,
      prix: product.prix
    };

    try {
      const updateProduct = await produitService.updateProduit(id, dtoNewProduct);

      setProducts(ancienTableau => ancienTableau.map(product => product.id === id ? updateProduct : product))
      toast.success("Nom modifié!")
    } catch (error) {
      console.error(error);
      toast.error("Impossible de modifier le nom de ce produit.")
    }
  };

    const updateProductPrice = async (
    id: string,
    prix: number
  ) => {
    const product = products.find(p => p.id === id);

    if (!product || isNaN(prix) || prix === product.prix) return;
       
    const dtoNewProduct = {
      name: product.name,
      prix: prix    };

    try {
      const updateProduct = await produitService.updateProduit(id, dtoNewProduct);

      setProducts(ancienTableau => ancienTableau.map(product => product.id === id ? updateProduct : product))
      toast.success("Prix modifié!")
    } catch (error) {
      console.error(error);
      toast.error("Impossible de modifier le prix de ce produit.")
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

    setProducts(ancienTableau => [...ancienTableau, created]);

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

    setProducts(ancienTableau =>
      ancienTableau.filter(product => product.id !== productId)
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
  const progressPercent = totalEstimated > 0 ? Math.round((totalPurchased / totalEstimated) * 100) : 0;

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
    <div className="space-y-8 pb-32">
      {/* Header / Back navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-textSecondary shadow-sm transition hover:border-primary hover:text-primary"
        >
          <AiOutlineArrowLeft className="h-4 w-4" />
          Retour au tableau de bord
        </Link>
        <span className="text-xs font-semibold text-textSecondary">
          Créée le {new Date(list.createdAt).toLocaleDateString("fr-FR")}
        </span>
      </div>

      {/* Info card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-6 text-white shadow-lg shadow-blue-100 sm:p-8">
        <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <AiOutlineShoppingCart className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-black tracking-tight sm:text-3xl">{list.name}</h2>
            {list.description && (
              <p className="mt-1 truncate text-sm text-blue-100">{list.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Budget summary */}
      <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Budget</h3>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white">
              {progressPercent}% acheté
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            <div>
              <p className="text-xs text-slate-400">Estimé</p>
              <p className="text-xl font-black text-white">{totalEstimated.toFixed(2)} {currencySymbol}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Acheté</p>
              <p className="text-xl font-bold text-green-400">{totalPurchased.toFixed(2)} {currencySymbol}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Reste</p>
              <p className="text-xl font-bold text-white">{(totalEstimated - totalPurchased).toFixed(2)} {currencySymbol}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-black text-textPrimary">
            Articles dans la liste
          </h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {products.length} produit{products.length > 1 ? "s" : ""}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
              <AiOutlineShoppingCart className="h-7 w-7" />
            </span>
            <p className="mt-4 text-sm font-semibold text-textPrimary">Aucun produit pour l'instant</p>
            <p className="mt-1 text-xs text-textSecondary">Utilisez la barre ci-dessous pour ajouter votre premier article.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => {
              const isPurchased = purchasedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4 rounded-2xl border p-4 transition duration-200 sm:gap-5 sm:p-5 ${
                    isPurchased 
                      ? "border-green-100 bg-green-50/50" 
                      : "border-slate-100 bg-white shadow-sm hover:border-slate-200 hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => togglePurchased(product.id)}
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition ${
                      isPurchased
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-slate-300 bg-white hover:border-primary"
                    }`}
                  >
                    {isPurchased && <AiOutlineCheck className="h-4 w-4" />}
                  </button>

                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => updateProductName(product.id, e.currentTarget.textContent)}
                    className={`min-w-0 truncate rounded-2xl px-2 text-sm font-semibold outline-none transition-all focus:bg-blue-100 ${
                      isPurchased 
                        ? "text-slate-400 line-through" 
                        : "text-textPrimary"
                    }`}
                  >
                    {product.name}
                  </span>

                  <div className="flex items-baseline gap-1 whitespace-nowrap">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateProductPrice(
                          product.id,
                          Number(e.currentTarget.textContent)
                        )
                      }
                      className={`rounded-2xl px-2 text-sm font-black outline-none transition-all focus:bg-blue-100 ${
                        isPurchased ? "text-slate-400" : "text-textPrimary"
                      }`}
                    >
                      {Number(product.prix).toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-textSecondary">
                      {currencySymbol}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="shrink-0 text-slate-400 transition hover:text-danger"
                  >
                    <AiOutlineDelete className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky add product bar */}
      <form
        onSubmit={handleAddProduct}
        className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-slate-300 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <AiOutlineTag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Nom du produit"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-textPrimary outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <div className="relative w-full sm:w-44">
          <AiFillMoneyCollect className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder={`Prix (${currencySymbol})`}
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-textPrimary outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-primaryDark disabled:opacity-50"
        >
          <AiOutlinePlus className="h-4 w-4" />
          {submitting ? "Ajout..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}
