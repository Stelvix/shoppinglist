package com.shoppinglist.shoppinglist.Services;

import java.time.OffsetDateTime;
import java.util.Currency;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.shoppinglist.shoppinglist.Repository.UsersRepository;
import com.shoppinglist.shoppinglist.Models.User;
import com.shoppinglist.shoppinglist.Dtos.UserCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.UserResponseDTO;
import com.shoppinglist.shoppinglist.Dtos.UserUpdateDTO;
import com.shoppinglist.shoppinglist.Dtos.CurrencyDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UsersServices {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    // GET ALL
    public List<UserResponseDTO> getAllUsers() {
        return usersRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .toList();
    }

    // service get toutes currencies pouřle selecty dans le front
    public List<CurrencyDTO> getCurrencies() {
        // Liste des devises proposées dans le front (courantes, style XE.com)
        List<String> codes = List.of(
                "EUR", "USD", "XOF", "XAF", "GHS", "NGN", "GMD", "SLL", "GNF",
                "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "MAD", "INR", "BRL",
                "ZAR", "TRY", "SEK", "NOK", "DKK", "PLN", "AED", "SAR", "EGP",
                "KES", "THB", "KRW", "SGD", "MXN");

        return codes.stream()
                .map(code -> {
                    Currency currency = Currency.getInstance(code);
                    return new CurrencyDTO(
                            currency.getCurrencyCode(),
                            currency.getDisplayName(),
                            currency.getSymbol());
                })
                .toList();
    }

    public Currency getUserCurrency(String email) {
        return usersRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Utilisateur non trouvé"))
                .getCurrency();
    }

    public UserResponseDTO updateUserCurrency(String email, String code) {
        Currency currency;
        try {
            currency = Currency.getInstance(code);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Devise invalide : " + code);
        }

        User user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Utilisateur non trouvé"));

        user.setCurrency(currency);
        User updatedUser = usersRepository.save(user);
        return convertToResponseDTO(updatedUser);
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
        if (userCreateDTO.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        }
        user.setCreatedAt(OffsetDateTime.now());
        // user.setUpdatedAt(OffsetDateTime.now());

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
        // user.setCreatedAt(OffsetDateTime.now());
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

    // SEARCH USER BY EMAIL
    public User isThisUserExist(User users) {
        return usersRepository.findByEmail(users.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inexistant !"));
    }

    // Récupère l'utilisateur par email et le convertit en DTO
    public UserResponseDTO getUserByEmail(String email) {
        User user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        return convertToResponseDTO(user);
    }

    // Met à jour les informations de l'utilisateur connecté
    public UserResponseDTO updateCurrentUser(String email, UserUpdateDTO userUpdateDTO) {
        User user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));

        user.setName(userUpdateDTO.getName());
        user.setLname(userUpdateDTO.getLname());
        user.setPseudo(userUpdateDTO.getPseudo());
        user.setEmail(userUpdateDTO.getEmail());
        user.setUpdatedAt(OffsetDateTime.now());

        User updatedUser = usersRepository.save(user);
        return convertToResponseDTO(updatedUser);
    }

    // Mapping du DTO: Conversion des entités en DTO
    private UserResponseDTO convertToResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getLname(),
                user.getPseudo(),
                user.getEmail(),
                user.getCurrency());
    }
}