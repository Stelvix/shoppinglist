package com.shoppinglist.shoppinglist.Controllers;

import com.shoppinglist.shoppinglist.Models.Produit;
import com.shoppinglist.shoppinglist.Dtos.ProduitCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.ProduitResponseDTO;
import org.springframework.security.core.Authentication;
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
        public List<ProduitResponseDTO> getProduits(Authentication authentication) {
                return produitServices.getAllProduits(authentication.getName());
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
        public ResponseEntity<ProduitResponseDTO> getProduitById(
                        @PathVariable @Parameter(description = "ID unique du produit") UUID id,
                        Authentication authentication) {
                ProduitResponseDTO produitDto = produitServices.getProduitsById(id, authentication.getName());
                return ResponseEntity.ok(produitDto);
        }

        /**
         * POST /api/produits - Crée un nouveau produit
         */
        @PostMapping("/produit/{typeDeCourseId}")
        @Operation(summary = "Crée un nouveau produit", description = "Ajoute un nouveau produit à la base de données")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Produit créé avec succès", content = @Content(schema = @Schema(implementation = ProduitResponseDTO.class))),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        public ResponseEntity<ProduitResponseDTO> createProduit(
                        @PathVariable UUID typeDeCourseId,
                        @RequestBody @Parameter(description = "Données du produit à créer") ProduitCreateDTO produitCreateDTO,
                        Authentication authentication) {
                ProduitResponseDTO savedProduit = produitServices.CreateProduits(typeDeCourseId, produitCreateDTO, authentication.getName());
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
        public ResponseEntity<ProduitResponseDTO> updateProduit(
                        @PathVariable @Parameter(description = "ID du produit à mettre à jour") UUID id,
                        @RequestBody @Parameter(description = "Nouvelles données du produit") ProduitCreateDTO produitDetails,
                        Authentication authentication) {
                ProduitResponseDTO updateproduit = produitServices.updateProduit(produitDetails, id, authentication.getName());
                return ResponseEntity.ok(updateproduit);
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
                        @PathVariable @Parameter(description = "ID du produit à supprimer") UUID id,
                        Authentication authentication) {
                produitServices.deleteProduitById(id, authentication.getName());
                return ResponseEntity.noContent().build();
        }

        /**
         * GET /api/produits/list/{typeDeCourseId} - Récupère tous les produits d'une liste
         */
        @GetMapping("/list/{typeDeCourseId}")
        @Operation(summary = "Récupère les produits d'une liste de course", description = "Retourne la liste des produits pour une catégorie de course spécifique")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Produits récupérés avec succès"),
                        @ApiResponse(responseCode = "404", description = "Liste non trouvée"),
                        @ApiResponse(responseCode = "403", description = "Accès refusé")
        })
        public ResponseEntity<List<ProduitResponseDTO>> getProduitsByListId(
                        @PathVariable UUID typeDeCourseId,
                        Authentication authentication) {
                List<ProduitResponseDTO> produits = produitServices.getProduitsByListId(typeDeCourseId, authentication.getName());
                return ResponseEntity.ok(produits);
        }
}
