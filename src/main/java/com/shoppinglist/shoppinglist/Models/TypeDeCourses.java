package com.shoppinglist.shoppinglist.Models;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "type_de_course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeDeCourses {

    @Id
    @GeneratedValue // Pour que Hibernate sache que l'ID est géré par la DB
    private UUID id;

    private String name;
    private String description;

}
