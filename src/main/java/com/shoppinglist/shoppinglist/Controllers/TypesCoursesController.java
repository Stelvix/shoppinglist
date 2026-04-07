package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.shoppinglist.shoppinglist.Models.TypeDeCourses;
import com.shoppinglist.shoppinglist.Services.TypeCoursesServices;

import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/type_de_courses")
@RequiredArgsConstructor
public class TypesCoursesController {
    private final TypeCoursesServices typeCoursesServices;

    /**
     * GET /api/type_de_courses - Récupère tous les types de courses
     */
    @GetMapping
    public List<TypeDeCourses> getTypeDeCourses() {
        return typeCoursesServices.getAllTypeDeCourses();
    }

    /**
     * GET /api/type_de_courses/{id} - Récupère un type de course par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TypeDeCourses> getTypeDeCourseById(@PathVariable UUID id) {
        TypeDeCourses typeDeCourse = typeCoursesServices.getTypeDeCourseById(id);
        return ResponseEntity.ok(typeDeCourse);
    }

    /**
     * POST /api/type_de_courses - Crée un nouveau type de course
     */
    @PostMapping
    public ResponseEntity<TypeDeCourses> createTypeDeCourse(@RequestBody TypeDeCourses typeDeCourse) {
        TypeDeCourses savedTypeDeCourse = typeCoursesServices.createTypeDeCourse(typeDeCourse);

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
    public ResponseEntity<TypeDeCourses> updateTypeDeCourse(@PathVariable UUID id,
            @RequestBody TypeDeCourses typeDeCourseDetails) {
        TypeDeCourses typeDeCourse = typeCoursesServices.updateTypeDeCourse(id, typeDeCourseDetails);
        return ResponseEntity.ok(typeDeCourse);
    }

    /**
     * DELETE /api/type_de_courses/{id} - Supprime un type de course
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTypeDeCourse(@PathVariable UUID id) {
        typeCoursesServices.deleteTypeDeCourseById(id);
        return ResponseEntity.noContent().build();
    }
}
