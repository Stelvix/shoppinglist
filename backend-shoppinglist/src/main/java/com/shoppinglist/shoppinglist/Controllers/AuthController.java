package com.shoppinglist.shoppinglist.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shoppinglist.shoppinglist.Models.User;
import com.shoppinglist.shoppinglist.Repository.UsersRepository;
import com.shoppinglist.shoppinglist.Services.JwtService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
    public ResponseEntity<String> register(@RequestBody User user) {
        if (usersRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Erreur : Cet email est déja utilisé !");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersRepository.save(user);

        return ResponseEntity.ok("Utilisateur inscrit avec succès !");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        String token = jwtService.generationToken(loginRequest.getEmail());

        return ResponseEntity.ok(token);
    }

}
