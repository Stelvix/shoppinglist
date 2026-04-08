package com.shoppinglist.shoppinglist.Services;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.UsersRepository;
import com.shoppinglist.shoppinglist.Models.User;
import com.shoppinglist.shoppinglist.Dtos.UserCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.UserResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersServices {
    private final UsersRepository usersRepository;

        // GET ALL
        public List<UserResponseDTO> getAllUsers() {
            return usersRepository.findAll()
                    .stream()
                    .map(this::convertToResponseDTO)
                    .toList();
        }

        // GET BY ID
        public UserResponseDTO getUserById(UUID id) {
            User user = usersRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
            return convertToResponseDTO(user);
        }

        // CREATE
        public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
            User user = new User();
            user.setName(userCreateDTO.getName());
            user.setLname(userCreateDTO.getLname());
            user.setPseudo(userCreateDTO.getPseudo());
            user.setEmail(userCreateDTO.getEmail());
            user.setCreatedAt(OffsetDateTime.now());
            user.setUpdatedAt(OffsetDateTime.now());

            User savedUser = usersRepository.save(user);
            return convertToResponseDTO(savedUser);
        }

        // UPDATE
        public UserResponseDTO updateUser(UUID id, UserCreateDTO userCreateDTO) {
            User user = usersRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));

            user.setName(userCreateDTO.getName());
            user.setLname(userCreateDTO.getLname());
            user.setPseudo(userCreateDTO.getPseudo());
            user.setEmail(userCreateDTO.getEmail());
            user.setUpdatedAt(OffsetDateTime.now());
            user.setUpdatedAt(OffsetDateTime.now());


            User updatedUser = usersRepository.save(user);
            return convertToResponseDTO(updatedUser);
        }

        // DELETE (pas de DTO)
        public void deleteUserById(UUID id) {
            if (!usersRepository.existsById(id)) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Utilisateur non trouvé");
            }
            usersRepository.deleteById(id);
        }

        // Mapping du DTO: Conversion des entités en DTO
        private UserResponseDTO convertToResponseDTO(User user) {
            return new UserResponseDTO(
                    user.getId(),
                    user.getName(),
                    user.getLname(),
                    user.getPseudo(),
                    user.getEmail(),
                    user.getCreatedAt(),
                    user.getUpdatedAt()
            );
        }
    }
