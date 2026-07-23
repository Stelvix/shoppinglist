package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; // Ajouté !
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException; // Corrigé !
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.shoppinglist.shoppinglist.Models.User;
import com.shoppinglist.shoppinglist.Dtos.UserCreateDTO;
import com.shoppinglist.shoppinglist.Dtos.UserLoginDTO;
import com.shoppinglist.shoppinglist.Repository.UsersRepository;
import com.shoppinglist.shoppinglist.Services.JwtService;

import java.util.Map;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsersRepository usersRepository;

    // Inscription d'un nouvel utilisateur
    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody UserCreateDTO userDto) {
        if (usersRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cet email est déjà utilisé !");
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setLname(userDto.getLname());
        user.setPseudo(userDto.getPseudo());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        usersRepository.save(user);

        return ResponseEntity.ok("Utilisateur inscrit avec succès !");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody UserLoginDTO loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            String token = jwtService.generationToken(loginRequest.getEmail());

            return ResponseEntity.ok(Map.of("token", token));

        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou mot de passe incorrect");
        }
    }
    
}