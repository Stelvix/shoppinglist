import type { TypeDeCourse } from "../types";
import authService from "./auth";
import api from "./axios";

const typeDeCourseService = {
  async getTypeDecoursesByuserId(): Promise<TypeDeCourse[]> {
    const user = await authService.getCurrentUser();
    if (!user?.id) throw new Error("Utilisateur non connecté");

    const { data } = await api.get<TypeDeCourse[]>(`/type_de_courses/user/${user.id}`);
    return data;
  }
};

export default typeDeCourseService;