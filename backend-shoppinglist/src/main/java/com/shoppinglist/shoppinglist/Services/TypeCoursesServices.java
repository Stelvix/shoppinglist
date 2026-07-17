package com.shoppinglist.shoppinglist.Services;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import com.shoppinglist.shoppinglist.Dtos.TypeDeCourseCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.TypeDeCourseResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.TypesCoursesRepository;
import com.shoppinglist.shoppinglist.Repository.UsersRepository;
import com.shoppinglist.shoppinglist.Models.TypeDeCourse;
import com.shoppinglist.shoppinglist.Models.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TypeCoursesServices {
    private final TypesCoursesRepository typesCoursesRepository;
    private final UsersRepository userRepository;

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
    public TypeDeCourseResponseDTO getTypeDeCourseById(UUID id, String email) {
        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé avec id : " + id));
        if (typeDeCourse.getUser() != null && !typeDeCourse.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à cette liste");
        }
        return convertTCourseResponseDTO(typeDeCourse);
    }

    /**
     * Crée un nouveau type de course
     */
    public TypeDeCourseResponseDTO createTypeDeCourse(UUID UserId, TypeDeCourseCreateDTO typeDeCourseDto, String email) {
        // je reherde d'abord le user
        User user = userRepository.findById(UserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));

        if (!user.getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé pour la création");
        }

        TypeDeCourse typeDeCourse = new TypeDeCourse();

        typeDeCourse.setName(typeDeCourseDto.getName());
        typeDeCourse.setDescription(typeDeCourseDto.getDescription());
        typeDeCourse.setCreatedAt(OffsetDateTime.now());
        typeDeCourse.setUser(user);

        // flush

        TypeDeCourse CreatedTypedeCourses = typesCoursesRepository.save(typeDeCourse);
        return convertTCourseResponseDTO(CreatedTypedeCourses);
    }

    /**
     * Met à jour un type de course existant
     */
    public TypeDeCourseResponseDTO updateTypeDeCourse(UUID id, TypeDeCourseCreateDTO typeDeCourseDetails, String email) {
        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé"));

        if (typeDeCourse.getUser() != null && !typeDeCourse.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à cette liste");
        }

        typeDeCourse.setName(typeDeCourseDetails.getName());
        typeDeCourse.setDescription(typeDeCourseDetails.getDescription());
        typeDeCourse.setUpdatedAt(OffsetDateTime.now());

        TypeDeCourse updatedTypeDeCourse = typesCoursesRepository.save(typeDeCourse);
        return convertTCourseResponseDTO(updatedTypeDeCourse);
    }

    /**
     * Supprime un type de course par ID
     */
    public void deleteTypeDeCourseById(UUID id, String email) {
        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Type de course non trouvé"));

        if (typeDeCourse.getUser() != null && !typeDeCourse.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à cette liste");
        }
        typesCoursesRepository.delete(typeDeCourse);
    }

    // service spécial
    // Récuperer une liste de courses en fonction d'un utilisateur
    public List<TypeDeCourseResponseDTO> getTypeDeCourseByuserId(UUID id, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        if (!user.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé");
        }

        List<TypeDeCourse> types = typesCoursesRepository.findByUserId(id);
        return types
                .stream()
                .map(this::convertTCourseResponseDTO)
                .toList(); // pour chaques type de courses on les map en DTO
    }

    // récupérer une liste de type de courses en fontion d'une date précise
    public List<TypeDeCourseResponseDTO> getTypeDeCoursesBySpecifiedDate(OffsetDateTime date) {
        List<TypeDeCourse> types = typesCoursesRepository.findByCreatedAt(date);

        return types
                .stream()
                .map(this::convertTCourseResponseDTO)
                .toList();
    }

    // get les types de courses par jour
    public List<TypeDeCourseResponseDTO> getTypeDeCoursesByDay(OffsetDateTime dateTime) {
        try {
            // 1. On extrait la date pure
            LocalDate localDate = dateTime.toLocalDate();

            // 2. Début de journée (00:00:00)
            OffsetDateTime startOfDay = localDate.atStartOfDay().atOffset(ZoneOffset.UTC);

            // 3. Fin de journée (23:59:59.999)
            OffsetDateTime endOfDay = localDate.atTime(LocalTime.MAX).atOffset(ZoneOffset.UTC);

            // 4. Requête SQL automatique "BETWEEN"
            List<TypeDeCourse> types = typesCoursesRepository.findByCreatedAtBetween(startOfDay, endOfDay);

            return types.stream()
                    .map(this::convertTCourseResponseDTO)
                    .toList();

        } catch (Exception e) {

            System.err.println("Erreur lors de la récupération des types de courses par jour : " + e.getMessage());
            

            // On retourne une liste vide pour éviter de casser l'application et de renvoyer
            // un null
            return List.of();
        }
    }

    public List<TypeDeCourseResponseDTO> getTypeDeCourseByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        List<TypeDeCourse> types = typesCoursesRepository.findByUserId(user.getId());
        return types.stream()
                .map(this::convertTCourseResponseDTO)
                .toList();
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
