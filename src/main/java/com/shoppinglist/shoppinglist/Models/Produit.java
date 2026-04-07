package com.shoppinglist.shoppinglist.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Entity
@Table(name = "produits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(name = "Produit", description = "Représente un produit dans la liste de courses")
public class Produit {

    @Id
    @GeneratedValue
    @Schema(description = "Identifiant unique du produit (UUID)", example = "550e8400-e29b-41d4-a716-446655440000")
    private UUID id;

    @Schema(description = "Nom du produit", example = "Lait", minLength = 1, maxLength = 255)
    private String name;

    @Schema(description = "Prix du produit en euros", example = "2.50", minimum = "0")
    private double prix;

    @Column(name = "type_de_course_id")
    @Schema(description = "ID du type de course associé", example = "550e8400-e29b-41d4-a716-446655440001")
    private UUID typeDeCourseId;
}