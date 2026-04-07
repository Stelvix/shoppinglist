package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shoppinglist.shoppinglist.Models.Produit;
import com.shoppinglist.shoppinglist.Services.ProduitServices;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
@Tag(name = "Produits", description = "Gestion des produits de shopping")
public class ProduitsController {

    private final ProduitServices produitServices;

    /**
     * GET /api/produits - Récupère tous les produits
     */
    @GetMapping
    @Operation(summary = "Récupère tous les produits", description = "Retourne une liste de tous les produits enregistrés")
    @ApiResponse(responseCode = "200", description = "Liste des produits récupérée avec succès", content = @Content(schema = @Schema(implementation = Produit.class)))
    public List<Produit> getProduits() {
        return produitServices.getAllProduits();
    }

    /**
     * GET /api/produits/{id} - Récupère un produit par ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Récupère un produit par ID", description = "Retourne un produit spécifique basé sur son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produit trouvé", content = @Content(schema = @Schema(implementation = Produit.class))),
            @ApiResponse(responseCode = "404", description = "Produit non trouvé")
    })
    public ResponseEntity<Produit> getProduitById(
            @PathVariable @Parameter(description = "ID unique du produit") UUID id) {
        Produit produit = produitServices.getProduitsById(id);
        return ResponseEntity.ok(produit);
    }

    /**
     * POST /api/produits - Crée un nouveau produit
     */
    @PostMapping
    @Operation(summary = "Crée un nouveau produit", description = "Ajoute un nouveau produit à la base de données")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Produit créé avec succès", content = @Content(schema = @Schema(implementation = Produit.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public ResponseEntity<Produit> createProduit(
            @RequestBody @Parameter(description = "Données du produit à créer") Produit produit) {
        Produit savedProduit = produitServices.CreateProduits(produit);

        URI locationUri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProduit.getId())
                .toUri();

        return ResponseEntity
                .created(locationUri)
                .body(savedProduit);
    }

    /**
     * PUT /api/produits/{id} - Met à jour un produit existant
     */
    @PutMapping("/{id}")
    @Operation(summary = "Met à jour un produit", description = "Modifie les informations d'un produit existant")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Produit mis à jour avec succès", content = @Content(schema = @Schema(implementation = Produit.class))),
            @ApiResponse(responseCode = "404", description = "Produit non trouvé"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    public ResponseEntity<Produit> updateProduit(
            @PathVariable @Parameter(description = "ID du produit à mettre à jour") UUID id,
            @RequestBody @Parameter(description = "Nouvelles données du produit") Produit produitDetails) {
        Produit produit = produitServices.updateProduit(produitDetails, id);
        return ResponseEntity.ok(produit);
    }

    /**
     * DELETE /api/produits/{id} - Supprime un produit
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprime un produit", description = "Retire un produit de la base de données")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Produit supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Produit non trouvé")
    })
    public ResponseEntity<Void> deleteProduit(
            @PathVariable @Parameter(description = "ID du produit à supprimer") UUID id) {
        produitServices.deleteProduitById(id);
        return ResponseEntity.noContent().build();
    }
}
