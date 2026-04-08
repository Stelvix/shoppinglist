package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.http.ResponseEntity;
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
import com.shoppinglist.shoppinglist.Models.TypeDeCourse;

import lombok.RequiredArgsConstructor;

import java.net.URI;
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
    public List<TypeDeCourse> getTypeDeCourses() {
        return typeCoursesServices.getAllTypeDeCourses();
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
    public ResponseEntity<TypeDeCourse> getTypeDeCourseById(
            @PathVariable @Parameter(description = "ID unique du type de course") UUID id) {
        TypeDeCourse typeDeCourse = typeCoursesServices.getTypeDeCourseById(id);
        return ResponseEntity.ok(typeDeCourse);
    }

    /**
     * POST /api/type_de_courses - Crée un nouveau type de course
     */
    @PostMapping
    @Operation(summary = "Crée un nouveau type de course", description = "Ajoute une nouvelle catégorie de courses à la base de données")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Type de course créé avec succès", content = @Content(schema = @Schema(implementation = TypeDeCourse.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public ResponseEntity<TypeDeCourse> createTypeDeCourse(
            @RequestBody @Parameter(description = "Données du type de course à créer") TypeDeCourse typeDeCourse) {
        TypeDeCourse savedTypeDeCourse = typeCoursesServices.createTypeDeCourse(typeDeCourse);

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
    public ResponseEntity<TypeDeCourse> updateTypeDeCourse(
            @PathVariable @Parameter(description = "ID du type de course à mettre à jour") UUID id,
            @RequestBody @Parameter(description = "Nouvelles données du type de course") TypeDeCourse typeDeCourseDetails) {
        TypeDeCourse typeDeCourse = typeCoursesServices.updateTypeDeCourse(id, typeDeCourseDetails);
        return ResponseEntity.ok(typeDeCourse);
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
            @PathVariable @Parameter(description = "ID du type de course à supprimer") UUID id) {
        typeCoursesServices.deleteTypeDeCourseById(id);
        return ResponseEntity.noContent().build();
    }
}
