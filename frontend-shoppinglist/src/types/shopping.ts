export interface TypeDeCourse {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Alias pour faciliter le développement côté frontend
export type ShoppingList = TypeDeCourse;

export interface Produit {
  id: string;
  name: string;
  prix: number;
  createdAt: string;
  updatedAt: string;
  typeDeCourses?: {
    id: string;
    name: string;
  };
}

// Alias pour faciliter le développement côté frontend
export type Product = Produit;
export type ShoppingItem = Produit;

export interface TypeDeCourseCreateDTO {
  name: string;
  description?: string;
  userId: string;
}

export type CreateListRequest = TypeDeCourseCreateDTO;

export interface ProduitCreateDTO {
  name: string;
  prix: number;
}

export type CreateProductRequest = ProduitCreateDTO;
