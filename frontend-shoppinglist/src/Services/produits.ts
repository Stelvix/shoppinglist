import api from "./axios";
import type { Produit, ProduitCreateDTO } from "../types";

const produitService = {
  async getProduitsByListId(typeDeCourseId: string): Promise<Produit[]> {
    const { data } = await api.get<Produit[]>(`/produits/list/${typeDeCourseId}`);
    return data;
  },

  async createProduit(typeDeCourseId: string, produit: ProduitCreateDTO): Promise<Produit> {
    const { data } = await api.post<Produit>(`/produits/produit/${typeDeCourseId}`, produit);
    return data;
  },

  async updateProduit(id: string, produit: ProduitCreateDTO): Promise<Produit> {
    const { data } = await api.put<Produit>(`/produits/${id}`, produit);
    return data;
  },

  async deleteProduit(id: string): Promise<void> {
    await api.delete(`/produits/${id}`);
  }
};

export default produitService;
