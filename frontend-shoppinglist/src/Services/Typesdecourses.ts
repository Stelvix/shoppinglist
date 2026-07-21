import type { TypeDeCourse } from "../types";
 import api from "./axios";
import type { TypeDeCourseCreateDTO } from "../types";


const typeDeCourseService = {
  async getTypeDecoursesByuserId(): Promise<TypeDeCourse[]> {
    const { data } = await api.get<TypeDeCourse[]>(`/type_de_courses`);
    return data;
  },

  async getTypeDeCourseById(id: string): Promise<TypeDeCourse> {
    const { data } = await api.get<TypeDeCourse>(`/type_de_courses/${id}`);
    return data;
  },

  async createTypedecourse(TypeDeCourseCreateDTO: TypeDeCourseCreateDTO,): Promise<TypeDeCourse>{
    const response = await api.post<TypeDeCourse>(`/type_de_courses/typedecourses`, {
      name: TypeDeCourseCreateDTO.name,
      description: TypeDeCourseCreateDTO.description
    });
    return response.data;
  },

  async deleteTypedecourse(id: string): Promise<void> {
    await api.delete(`/type_de_courses/${id}`);
  }
};

export default typeDeCourseService;