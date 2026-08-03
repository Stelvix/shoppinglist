package com.shoppinglist.shoppinglist.Services;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Currency;
import java.util.List;
import java.util.UUID;

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
    private final CurrencyService currencyService;
    private final UsersServices usersServices;

    private static final Currency BASE_CURRENCY = Currency.getInstance("EUR");

    // je récupère tout les produits

    public List<ProduitResponseDTO> getAllProduits(String email) {
        Currency userCurrency = usersServices.getUserCurrency(email);
        return produitRepository.findAll()
                .stream()
                .filter(p -> p.getTypeDeCourse() != null && p.getTypeDeCourse().getUser() != null
                        && p.getTypeDeCourse().getUser().getEmail().equals(email))
                .map(produit -> toResponseDTO(produit, userCurrency))
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
        Currency userCurrency = usersServices.getUserCurrency(email);
        return toResponseDTO(produit, userCurrency);
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

        Currency userCurrency = typeDeCourse.getUser().getCurrency();

        Produit produit = new Produit();
        produit.setName(produitCreateDTO.getName());
        produit.setPrix(currencyService.convert(produitCreateDTO.getPrix(), userCurrency, BASE_CURRENCY));
        produit.setUpdatedAt(OffsetDateTime.now());
        produit.setCreatedAt(OffsetDateTime.now());
        produit.setTypeDeCourse(typeDeCourse);

        // je flush
        Produit CreatedProduit = produitRepository.save(produit);
        return toResponseDTO(CreatedProduit, userCurrency);
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

        Currency userCurrency = produit.getTypeDeCourse().getUser().getCurrency();

        produit.setName(produitDetailsDTO.getName());
        produit.setPrix(currencyService.convert(produitDetailsDTO.getPrix(), userCurrency, BASE_CURRENCY));
        produit.setUpdatedAt(OffsetDateTime.now());

        Produit updatedProduits = produitRepository.save(produit);
        return toResponseDTO(updatedProduits, userCurrency);
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

        Currency userCurrency = typeDeCourse.getUser().getCurrency();

        return produitRepository.findByTypeDeCourseId(listId)
                .stream()
                .map(produit -> toResponseDTO(
                        produit,
                        userCurrency))
                .toList();
    }

    // Mapping du DTO : conversion du prix de la devise de base vers la devise
    // cible
    public ProduitResponseDTO toResponseDTO(
            Produit produit,
            Currency targetCurrency) {

        BigDecimal prixConverti = currencyService.convert(
                produit.getPrix(),
                BASE_CURRENCY,
                targetCurrency);

        return new ProduitResponseDTO(
                produit.getId(),
                produit.getName(),
                prixConverti,
                produit.getCreatedAt(),
                produit.getUpdatedAt());
    }

}