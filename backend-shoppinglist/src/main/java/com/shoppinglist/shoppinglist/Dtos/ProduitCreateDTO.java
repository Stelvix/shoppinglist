package com.shoppinglist.shoppinglist.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProduitCreateDTO {
    @NotBlank(message = "Le nom du produit est obligatoire")
    @Size(max = 255, message = "Le nom du produit ne doit pas dépasser 255 caractères")
    private String name;

    @NotNull(message = "Le prix du produit est obligatoire")
    @PositiveOrZero(message = "Le prix du produit doit être supérieur ou égal à zéro")
    private BigDecimal prix;
}
