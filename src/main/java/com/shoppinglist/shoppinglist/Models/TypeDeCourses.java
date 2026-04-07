package com.shoppinglist.shoppinglist.Models;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(name = "type_de_course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "TypeDeCourses", description = "Représente un type/catégorie de course")
public class TypeDeCourses {

    @Id
    @GeneratedValue
    @Schema(description = "Identifiant unique du type de course (UUID)", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Nom du type de course", example = "Fruits et Légumes", minLength = 1, maxLength = 255)
    private String name;

    @Schema(description = "Description du type de course", example = "Produits frais de fruits et légumes", maxLength = 1000)
    private String description;

}
