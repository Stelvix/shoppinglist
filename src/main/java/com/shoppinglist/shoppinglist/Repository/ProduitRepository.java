package com.shoppinglist.shoppinglist.Repository;

import com.shoppinglist.shoppinglist.Models.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProduitRepository extends JpaRepository<Produit, UUID> {

}