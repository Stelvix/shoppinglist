package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import com.shoppinglist.shoppinglist.Services.TypeCoursesServices;
import com.shoppinglist.shoppinglist.Dtos.TypeDeCourseCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.TypeDeCourseResponseDTO;
import com.shoppinglist.shoppinglist.Models.TypeDeCourse;

import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.sql.Date;
import java.time.DateTimeException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/type_de_courses")
@RequiredArgsConstructor
@Tag(name = "Types de Courses", description = "Gestion des catégories/types de courses")
public class TypesCoursesController {
        private final TypeCoursesServices typeCoursesServices;

        /**
         * GET /api/type_de_courses - Récupère tous les types de courses
         */
        @GetMapping
        @Operation(summary = "Récupère tous les types de courses", description = "Retourne une liste de tous les types de courses disponibles")
        @ApiResponse(responseCode = "200", description = "Liste des types de courses récupérée avec succès", content = @Content(schema = @Schema(implementation = TypeDeCourse.class)))
        public List<TypeDeCourseResponseDTO> getTypeDeCourses(Authentication authentication) {
                return typeCoursesServices.getTypeDeCourseByUserEmail(authentication.getName());
        }

        /**
         * GET /api/type_de_courses/{id} - Récupère un type de course par ID
         */
        @GetMapping("/{id}")
        @Operation(summary = "Récupère un type de course par ID", description = "Retourne un type de course spécifique basé sur son ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Type de course trouvé", content = @Content(schema = @Schema(implementation = TypeDeCourse.class))),
                        @ApiResponse(responseCode = "404", description = "Type de course non trouvé")
        })
        public ResponseEntity<TypeDeCourseResponseDTO> getTypeDeCourseById(
                        @PathVariable @Parameter(description = "ID unique du type de course") UUID id,
                        Authentication authentication) {
                TypeDeCourseResponseDTO typeDeCourseDto = typeCoursesServices.getTypeDeCourseById(id, authentication.getName());
                return ResponseEntity.ok(typeDeCourseDto);
        }

        /**
         * POST /api/type_de_courses - Crée un nouveau type de course
         */
        @PostMapping("typedecourses/{userId}")
        @Operation(summary = "Crée un nouveau type de course", description = "Ajoute une nouvelle catégorie de courses à la base de données")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Type de course créé avec succès", content = @Content(schema = @Schema(implementation = TypeDeCourseResponseDTO.class))),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        public ResponseEntity<TypeDeCourseResponseDTO> createTypeDeCourse(
                        @PathVariable UUID userId,
                        @RequestBody @Parameter(description = "Données du type de course à créer") TypeDeCourseCreateDTO typeDeCourseDto,
                        Authentication authentication) {
                TypeDeCourseResponseDTO savedTypeDeCourse = typeCoursesServices.createTypeDeCourse(userId,
                                typeDeCourseDto, authentication.getName());

                URI locationUri = ServletUriComponentsBuilder
                                .fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(savedTypeDeCourse.getId())
                                .toUri();

                return ResponseEntity
                                .created(locationUri)
                                .body(savedTypeDeCourse);
        }

        /**
         * PUT /api/type_de_courses/{id} - Met à jour un type de course existant
         */
        @PutMapping("/{id}")
        @Operation(summary = "Met à jour un type de course", description = "Modifie les informations d'un type de course existant")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Type de course mis à jour avec succès", content = @Content(schema = @Schema(implementation = TypeDeCourse.class))),
                        @ApiResponse(responseCode = "404", description = "Type de course non trouvé"),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        public ResponseEntity<TypeDeCourseResponseDTO> updateTypeDeCourse(
                        @PathVariable @Parameter(description = "ID du type de course à mettre à jour") UUID id,
                        @RequestBody @Parameter(description = "Nouvelles données du type de course") TypeDeCourseCreateDTO typeDeCourseDetailsDto,
                        Authentication authentication) {
                TypeDeCourseResponseDTO typeDeCourseDto = typeCoursesServices.updateTypeDeCourse(id,
                                typeDeCourseDetailsDto, authentication.getName());
                return ResponseEntity.ok(typeDeCourseDto);
        }

        /**
         * DELETE /api/type_de_courses/{id} - Supprime un type de course
         */
        @DeleteMapping("/{id}")
        @Operation(summary = "Supprime un type de course", description = "Retire un type de course de la base de données")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Type de course supprimé avec succès"),
                        @ApiResponse(responseCode = "404", description = "Type de course non trouvé")
        })
        public ResponseEntity<Void> deleteTypeDeCourse(
                        @PathVariable @Parameter(description = "ID du type de course à supprimer") UUID id,
                        Authentication authentication) {
                typeCoursesServices.deleteTypeDeCourseById(id, authentication.getName());
                return ResponseEntity.noContent().build();
        }

        /**
         * ENDPOINT SPECIAL POUR RENVOYER LES LISTES DE COURSES EN FONCTION DU USER
         */
        @GetMapping("/user/{userId}")
        public ResponseEntity<List<TypeDeCourseResponseDTO>> getTypesCouresesByUserId(@PathVariable UUID userId, Authentication authentication) {
                List<TypeDeCourseResponseDTO> types = typeCoursesServices.getTypeDeCourseByuserId(userId, authentication.getName());
                return ResponseEntity.ok(types);
        }

        /**
         * ENDPOINT SPECIAL POUR RENVOYER LES LISTES DE COURSES EN FONCTION D'une date
         * spécifique
         */
        @GetMapping("/typeDeCourse/{date}")
        public ResponseEntity<List<TypeDeCourseResponseDTO>> getTypesCouresesByDate(
                        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime date) {
                List<TypeDeCourseResponseDTO> types = typeCoursesServices.getTypeDeCoursesBySpecifiedDate(date);
                return ResponseEntity.ok(types);
        }

        /**
         * ENDPOINT DÉDIÉ : Renvoie toutes les listes créées durant la journée de la
         * date fournie
         * Exemple : GET /api/types-courses/by-day/2026-07-14T15:30:00Z
         */
        @GetMapping("/by-day/{date}")
        @ApiResponse(responseCode = "200", description = "Type de courses récupéré avec succès", content = @Content(schema = @Schema(implementation = TypeDeCourse.class)))
        public ResponseEntity<List<TypeDeCourseResponseDTO>> getTypesCoursesByDay(
                        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime date) {

                List<TypeDeCourseResponseDTO> types = typeCoursesServices.getTypeDeCoursesByDay(date);
                return ResponseEntity.ok(types);

        }
        // test de déploiement      
}
