package com.shoppinglist.shoppinglist.Controllers;

import com.shoppinglist.shoppinglist.Models.User;
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

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shoppinglist.shoppinglist.Services.UsersServices;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.security.core.Authentication;
import com.shoppinglist.shoppinglist.Dtos.UserCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.UserResponseDTO;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "Gestion des utilisateurs")
public class UsersController {

        private final UsersServices usersServices;

        /**
         * GET /api/users - Récupère tous les utilisateurs
         */
        @GetMapping
        @Operation(summary = "Récupère tous les utilisateurs", description = "Retourne une liste de tous les utilisateurs enregistrés")
        @ApiResponse(responseCode = "200", description = "Liste des utilisateurs récupérée avec succès", content = @Content(schema = @Schema(implementation = UserResponseDTO.class)))
        public List<UserResponseDTO> getUsers() {
                return usersServices.getAllUsers();
        }

        /**
         * GET /api/users/{id} - Récupère un utilisateur par ID
         */
        @GetMapping("/{id}")
        @Operation(summary = "Récupère un utilisateur par ID", description = "Retourne un utilisateur spécifique basé sur son ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Utilisateur trouvé", content = @Content(schema = @Schema(implementation = User.class))),
                        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
        })
        public ResponseEntity<UserResponseDTO> getUserById(
                        @PathVariable @Parameter(description = "ID unique de l'utilisateur") UUID id,
                        Authentication authentication) {
                UserResponseDTO currentUser = usersServices.getUserByEmail(authentication.getName());
                if (!currentUser.getId().equals(id)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
                UserResponseDTO userDto = usersServices.getUserById(id);
                return ResponseEntity.ok(userDto);
        }

        /**
         * GET /api/users/me - Récupère l'utilisateur connecté
         */
        @GetMapping("/me")
        @Operation(summary = "Récupère l'utilisateur connecté", description = "Retourne les informations de l'utilisateur authentifié")
        @ApiResponse(responseCode = "200", description = "Utilisateur récupéré avec succès", content = @Content(schema = @Schema(implementation = UserResponseDTO.class)))
        public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
                String email = authentication.getName();
                UserResponseDTO currentUser = usersServices.getUserByEmail(email);
                return ResponseEntity.ok(currentUser);
        }

        /**
         * POST /api/users - Crée un nouvel utilisateur
         */
        @PostMapping
        @Operation(summary = "Crée un nouvel utilisateur", description = "Ajoute un nouvel utilisateur à la base de données")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Utilisateur créé avec succès", content = @Content(schema = @Schema(implementation = User.class))),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        public ResponseEntity<UserResponseDTO> createUser(
                        @RequestBody @Parameter(description = "Données de l'utilisateur à créer") UserCreateDTO userCreateDTO) {
                UserResponseDTO savedUser = usersServices.createUser(userCreateDTO);

                URI locationUri = ServletUriComponentsBuilder
                                .fromCurrentRequest()
                                .path("/{id}")
                                .buildAndExpand(savedUser.getId())
                                .toUri();

                return ResponseEntity
                                .created(locationUri)
                                .body(savedUser);

        }

        /**
         * PUT /api/users/{id} - Met à jour un utilisateur existant
         */
        @PutMapping("/{id}")
        @Operation(summary = "Met à jour un utilisateur", description = "Modifie les informations d'un utilisateur existant")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Utilisateur mis à jour avec succès", content = @Content(schema = @Schema(implementation = User.class))),
                        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé"),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        public ResponseEntity<UserResponseDTO> updateUser(
                        @PathVariable UUID id,
                        @RequestBody UserCreateDTO userCreateDTOdetails,
                        Authentication authentication) {
                UserResponseDTO currentUser = usersServices.getUserByEmail(authentication.getName());
                if (!currentUser.getId().equals(id)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
                UserResponseDTO updatedUser = usersServices.updateUser(id, userCreateDTOdetails);
                return ResponseEntity.ok(updatedUser);
        }

        /**
         * DELETE /api/users/{id} - Supprime un utilisateur
         */
        @DeleteMapping("/{id}")
        @Operation(summary = "Supprime un utilisateur", description = "Retire un utilisateur de la base de données")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Utilisateur supprimé avec succès"),
                        @ApiResponse(responseCode = "404", description = "Utilisateur non trouvé")
        })
        public ResponseEntity<Void> deleteUser(
                        @PathVariable @Parameter(description = "ID de l'utilisateur à supprimer") UUID id,
                        Authentication authentication) {
                UserResponseDTO currentUser = usersServices.getUserByEmail(authentication.getName());
                if (!currentUser.getId().equals(id)) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
                usersServices.deleteUserById(id);
                return ResponseEntity.noContent().build();
        }
}
