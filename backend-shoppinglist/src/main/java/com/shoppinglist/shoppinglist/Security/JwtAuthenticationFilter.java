package com.shoppinglist.shoppinglist.Security;

import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.shoppinglist.shoppinglist.Services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Récupération du header Authorization de la requête
        String authHeader = request.getHeader("Authorization");

        // Vérification du format du Bearer
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extraction du token (on ignore les 7 premiers caractères : "Bearer ")
        String token = authHeader.substring(7);

        // Validation du token et authentification de l'utilisateur
        if (!jwtService.isTokenValid(token)) {
            logger.warn("JWT invalide ou expiré pour la requête {}", request.getRequestURI());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT invalide ou expiré");
            return;
        }

        String username = jwtService.extractUsername(token);

        // Si l'utilisateur n'est pas encore enregistré dans le contexte de cette
        // requête
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    username, null, Collections.emptyList());

            // On enregistre l'utilisateur dans le contexte de Spring Security
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        // On continue vers le filtre suivant
        filterChain.doFilter(request, response);
    }
}
