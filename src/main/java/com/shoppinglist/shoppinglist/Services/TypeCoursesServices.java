package com.shoppinglist.shoppinglist.Services;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import com.shoppinglist.shoppinglist.Dtos.TypeDeCourseCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.TypeDeCourseResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.TypesCoursesRepository;
import com.shoppinglist.shoppinglist.Models.TypeDeCourse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TypeCoursesServices {
    private final TypesCoursesRepository typesCoursesRepository;

    /**
     * Récupère tous les types de courses
     */
    public List<TypeDeCourseResponseDTO> getAllTypeDeCourses() {
        return typesCoursesRepository.findAll()
                .stream()
                .map(this::convertTCourseResponseDTO)
                .toList();
    }

    /**
     * Récupère un type de course par ID
     */
    public TypeDeCourseResponseDTO getTypeDeCourseById(UUID id) {
        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé avec id : " + id));
        return convertTCourseResponseDTO(typeDeCourse);
    }

    /**
     * Crée un nouveau type de course
     */
    public TypeDeCourseResponseDTO createTypeDeCourse(TypeDeCourseCreateDTO typeDeCourseDto) {
        TypeDeCourse typeDeCourse = new TypeDeCourse();

        typeDeCourse.setName(typeDeCourseDto.getName());
        typeDeCourse.setDescription(typeDeCourseDto.getDescription());
        typeDeCourse.setCreatedAt(OffsetDateTime.now());

        // flush

        TypeDeCourse CreatedTypedeCourses = typesCoursesRepository.save(typeDeCourse);
        return convertTCourseResponseDTO(CreatedTypedeCourses);
    }

    /**
     * Met à jour un type de course existant
     */
    public TypeDeCourseResponseDTO updateTypeDeCourse(UUID id, TypeDeCourseCreateDTO typeDeCourseDetails) {
        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé"));

        typeDeCourse.setName(typeDeCourseDetails.getName());
        typeDeCourse.setDescription(typeDeCourseDetails.getDescription());
        typeDeCourse.setUpdatedAt(OffsetDateTime.now());

        TypeDeCourse updatedTypeDeCourse = typesCoursesRepository.save(typeDeCourse);
        return convertTCourseResponseDTO(updatedTypeDeCourse);
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

    // Mapping du DTO
    private TypeDeCourseResponseDTO convertTCourseResponseDTO(TypeDeCourse typeDeCourse) {
        return new TypeDeCourseResponseDTO(
                typeDeCourse.getId(),
                typeDeCourse.getName(),
                typeDeCourse.getDescription(),
                typeDeCourse.getCreatedAt(),
                typeDeCourse.getUpdatedAt());
    }
}
