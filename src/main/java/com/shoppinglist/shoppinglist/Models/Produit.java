package com.shoppinglist.shoppinglist.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "produits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produit {

    @Id
    @GeneratedValue // Pour que Hibernate sache que l'ID est géré par la DB
    private UUID id;

    private String name;

    private double prix;

    @Column(name = "type_de_course_id")
    private UUID typeDeCourseId;
}