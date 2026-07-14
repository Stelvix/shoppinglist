import type { TypeDeCourse } from "../types";
import authService from "./auth";

const typeDeCourseService = {
  async getTypeDecoursesByuserId(): Promise<void> {

    const user = await authService.getCurrentUser();

    if (!user) {
      throw new Error("Utilisateur non connecté");
    }

    const userId = user.id;

    console.log("User id:", userId);
  }
};

export default typeDeCourseService;
