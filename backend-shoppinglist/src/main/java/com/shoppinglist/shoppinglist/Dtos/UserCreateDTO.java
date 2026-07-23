package com.shoppinglist.shoppinglist.Dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateDTO {
    @NotBlank(message = "Le prénom est obligatoire")
    private String name;

    @NotBlank(message = "Le nom est obligatoire")
    private String lname;

    // @NotBlank(message = "Le pseudo est obligatoire")
    private String pseudo;

    @NotBlank(message = "L'adresse email est obligatoire")
    @Email(message = "Format d'adresse email invalide")
    private String email;

    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;
}
