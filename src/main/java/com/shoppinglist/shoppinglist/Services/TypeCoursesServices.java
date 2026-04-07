package com.shoppinglist.shoppinglist.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Models.TypeDeCourses;
import com.shoppinglist.shoppinglist.Repository.TypesCoursesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TypeCoursesServices {
    private final TypesCoursesRepository typesCoursesRepository;

    /**
     * Récupère tous les types de courses
     */
    public List<TypeDeCourses> getAllTypeDeCourses() {
        return typesCoursesRepository.findAll();
    }

    /**
     * Récupère un type de course par ID
     */
    public TypeDeCourses getTypeDeCourseById(UUID id) {
        return typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé avec id : " + id));
    }

    /**
     * Crée un nouveau type de course
     */
    public TypeDeCourses createTypeDeCourse(TypeDeCourses typeDeCourse) {
        return typesCoursesRepository.save(typeDeCourse);
    }

    /**
     * Met à jour un type de course existant
     */
    public TypeDeCourses updateTypeDeCourse(UUID id, TypeDeCourses typeDeCourseDetails) {
        TypeDeCourses typeDeCourse = typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé"));

        typeDeCourse.setName(typeDeCourseDetails.getName());
        typeDeCourse.setDescription(typeDeCourseDetails.getDescription());

        return typesCoursesRepository.save(typeDeCourse);
    }

    /**
     * Supprime un type de course par ID
     */
    public void deleteTypeDeCourseById(UUID id) {
        if (!typesCoursesRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Type de course non trouvé");
        }
        typesCoursesRepository.deleteById(id);
    }
}
