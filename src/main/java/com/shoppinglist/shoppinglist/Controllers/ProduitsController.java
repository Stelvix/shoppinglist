package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
public class ProduitsController {

    private final ProduitServices produitServices;

    /**
     * GET /api/produits - Récupère tous les produits
     */
    @GetMapping
    public List<Produit> getProduits() {
        return produitServices.getAllProduits();
    }

    /**
     * GET /api/produits/{id} - Récupère un produit par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable UUID id) {
        Produit produit = produitServices.getProduitsById(id);
        return ResponseEntity.ok(produit);
    }

    /**
     * POST /api/produits - Crée un nouveau produit
     */
    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) {
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
    public ResponseEntity<Produit> updateProduit(@PathVariable UUID id, @RequestBody Produit produitDetails) {
        Produit produit = produitServices.updateProduit(produitDetails, id);
        return ResponseEntity.ok(produit);
    }

    /**
     * DELETE /api/produits/{id} - Supprime un produit
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable UUID id) {
        produitServices.deleteProduitById(id);
        return ResponseEntity.noContent().build();
    }
}
