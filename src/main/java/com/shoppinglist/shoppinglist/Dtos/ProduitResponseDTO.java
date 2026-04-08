package com.shoppinglist.shoppinglist.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProduitResponseDTO {
    private UUID id;
    private String name;
    private BigDecimal prix;
}

