package com.shoppinglist.shoppinglist.Repository;

import com.shoppinglist.shoppinglist.Models.User;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}