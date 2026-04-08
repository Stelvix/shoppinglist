package com.shoppinglist.shoppinglist.Services;

import java.util.List;
import java.util.UUID;

import com.shoppinglist.shoppinglist.Models.Produit;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.ProduitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // lombok creer le constructeur et inject automatiquement le repo ici
public class ProduitServices {
    private final ProduitRepository produitRepository;

    // je récupère tout les produits

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    // faire un post
    public Produit CreateProduits(Produit produit) {
        return produitRepository.save(produit);
    }

    // je get les produits par id
    public Produit getProduitsById(UUID id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produit non trouvé avec id : " + id));
    }

    // modifier un produit
    public Produit updateProduit(Produit produitDetails, UUID id) {
        // on recherche d'abord l'id et on s'assure qu'il existe
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Produit non trouvé"));

        produit.setName(produitDetails.getName());
        produit.setPrix(produitDetails.getPrix());

        return produitRepository.save(produit);
    }

    // supprimer un produit on met void car la suppression ne retourne rien
    public void deleteProduitById(UUID id) {
        if (!produitRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Produit non trouvé");
        }
        produitRepository.deleteById(id);
    }

}
