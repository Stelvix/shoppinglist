package com.shoppinglist.shoppinglist.Security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.shoppinglist.shoppinglist.Services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAutentificationFilter extends OncePerRequestFilter {

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

        // vérification du bearer
        if (authHeader == null || !authHeader("Bearer ")) {
            filterChain.doFilter(request, response);
        }


        // extraction du token et récupération des 7 premiers caractères
        String token = authHeader.substring(7);

        // validation du token et authentification de l'utilisateur
        if (jwtService.isTokenValid(token)) {
            String username = jwtService.extractUsename(token);

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        username, null, Collections.emptyList());

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
            

    }

}
