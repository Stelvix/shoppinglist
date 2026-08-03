package com.shoppinglist.shoppinglist.Dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDTO {
    @NotBlank(message = "Le prénom est obligatoire")
    private String name;

    @NotBlank(message = "Le nom est obligatoire")
    private String lname;

    private String pseudo;

    @NotBlank(message = "L'adresse email est obligatoire")
    @Email(message = "Format d'adresse email invalide")
    private String email;
}
