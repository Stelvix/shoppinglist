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

    // On fait un get des produits
    @GetMapping
    public List<Produit> getProduits() {
        return produitServices.getAllProduits();
    }

    @PostMapping("/createProduits")
    public ResponseEntity<Produit> CreateProduits(@RequestBody Produit produit) {
        Produit savedProduit = produitServices.CreateProduits(produit);

        URI locationUri = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedProduit.getId())
                .toUri();

        return ResponseEntity
                .created(locationUri)
                .body(savedProduit);
    }

    // get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable UUID id) {
        Produit produit = produitServices.getProduitsById(id);
        return ResponseEntity.ok(produit);
    }

    @PutMapping("UpdateProduits/{id}")
    public ResponseEntity<Produit> updateProduits(@PathVariable UUID id, @RequestBody Produit produitDetails) {
        Produit produit = produitServices.updateProduit(produitDetails, id);
        return ResponseEntity.ok(produit);
    }

    // on supprime un produit
    @DeleteMapping("DeleteProduit/{id}")
    public ResponseEntity<Produit> deleteProduit(@PathVariable UUID id) {
        produitServices.deleteProduitById(id);
        return ResponseEntity.noContent().build();
    }
}
