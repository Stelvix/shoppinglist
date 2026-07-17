package com.shoppinglist.shoppinglist.Services;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import com.shoppinglist.shoppinglist.Dtos.GetTypeCourse;
import com.shoppinglist.shoppinglist.Dtos.ProduitCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.ProduitResponseDTO;
import com.shoppinglist.shoppinglist.Models.Produit;
import com.shoppinglist.shoppinglist.Models.TypeDeCourse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.ProduitRepository;
import com.shoppinglist.shoppinglist.Repository.TypesCoursesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // lombok creer le constructeur et inject automatiquement le repo ici
public class ProduitServices {
    private final ProduitRepository produitRepository;
    private final TypesCoursesRepository typesCoursesRepository;

    // je récupère tout les produits

    public List<ProduitResponseDTO> getAllProduits(String email) {
        return produitRepository.findAll()
                .stream()
                .filter(p -> p.getTypeDeCourse() != null && p.getTypeDeCourse().getUser() != null 
                        && p.getTypeDeCourse().getUser().getEmail().equals(email))
                .map(this::convertToResponseDTO)
                .toList();
    }

    // je get les produits par id
    public ProduitResponseDTO getProduitsById(UUID id, String email) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produit non trouvé"));
        if (produit.getTypeDeCourse() != null && produit.getTypeDeCourse().getUser() != null 
                && !produit.getTypeDeCourse().getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à ce produit");
        }
        return convertToResponseDTO(produit);
    }

    // faire un post
    public ProduitResponseDTO CreateProduits(UUID typedeCourseId, ProduitCreateDTO produitCreateDTO, String email) {

        // pour creer un produit il faut une liste de course alors je recherche dabord
        // la liste

        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(typedeCourseId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Liste non trouvée"));

        if (typeDeCourse.getUser() != null && !typeDeCourse.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à cette liste");
        }

        Produit produit = new Produit();
        produit.setName(produitCreateDTO.getName());
        produit.setPrix(produitCreateDTO.getPrix());
        produit.setUpdatedAt(OffsetDateTime.now());
        produit.setCreatedAt(OffsetDateTime.now());
        produit.setTypeDeCourse(typeDeCourse);

        // je flush
        Produit CreatedProduit = produitRepository.save(produit);
        return convertToResponseDTO(CreatedProduit);
    }

    // modifier un produit
    public ProduitResponseDTO updateProduit(ProduitCreateDTO produitDetailsDTO, UUID id, String email) {
        // on recherche d'abord l'id et on s'assure qu'il existe
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Produit non trouvé"));

        if (produit.getTypeDeCourse() != null && produit.getTypeDeCourse().getUser() != null 
                && !produit.getTypeDeCourse().getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à ce produit");
        }

        produit.setName(produitDetailsDTO.getName());
        produit.setPrix(produitDetailsDTO.getPrix());
        produit.setUpdatedAt(OffsetDateTime.now());

        Produit updatedProduits = produitRepository.save(produit);
        return convertToResponseDTO(updatedProduits);
    }

    // supprimer un produit on met void car la suppression ne retourne rien
    public void deleteProduitById(UUID id, String email) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Produit non trouvé"));

        if (produit.getTypeDeCourse() != null && produit.getTypeDeCourse().getUser() != null 
                && !produit.getTypeDeCourse().getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à ce produit");
        }
        produitRepository.delete(produit);
    }

    // Récupérer les produits d'une liste
    public List<ProduitResponseDTO> getProduitsByListId(UUID listId, String email) {
        TypeDeCourse typeDeCourse = typesCoursesRepository.findById(listId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Liste non trouvée avec l'id : " + listId));

        if (typeDeCourse.getUser() != null && !typeDeCourse.getUser().getEmail().equals(email)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Accès refusé à cette liste");
        }

        return produitRepository.findByTypeDeCourseId(listId)
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // Mapping du DTO
    private ProduitResponseDTO convertToResponseDTO(Produit produit) {
        GetTypeCourse dtoTypeCourse = null;

        if (produit.getTypeDeCourse() != null) {
            dtoTypeCourse = new GetTypeCourse(
                    produit.getTypeDeCourse().getId(),
                    produit.getTypeDeCourse().getName());
        }

        return new ProduitResponseDTO(
                produit.getId(),
                produit.getName(),
                produit.getPrix(),
                produit.getCreatedAt(),
                produit.getUpdatedAt(),
                dtoTypeCourse);

    }

}
