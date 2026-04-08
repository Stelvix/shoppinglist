package com.shoppinglist.shoppinglist.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.UsersRepository;
import com.shoppinglist.shoppinglist.Models.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersServices {
    private final UsersRepository usersRepository;

    /**
     * Récupère tous les utilisateurs
     */
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }

    /**
     * Récupère un utilisateur par ID
     */
    public User getUserById(UUID id) {
        return usersRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Utilisateur non trouvé avec id : " + id));
    }

    /**
     * Crée un nouvel utilisateur
     */
    public User createUser(User user) {
        return usersRepository.save(user);
    }

    /**
     * Met à jour un utilisateur existant
     */
    public User updateUser(UUID id, User userDetails) {
        User user = usersRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));

        user.setName(userDetails.getName());
        user.setLname(userDetails.getLname());
        user.setPseudo(userDetails.getPseudo());
        user.setEmail(userDetails.getEmail());
        user.setUpdatedAt(userDetails.getUpdatedAt());

        return usersRepository.save(user);
    }

    /**
     * Supprime un utilisateur par ID
     */
    public void deleteUserById(UUID id) {
        if (!usersRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Utilisateur non trouvé");
        }
        usersRepository.deleteById(id);
    }
}

