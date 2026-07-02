package com.storysphere.backend.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
) throws ServletException, IOException {

    System.out.println("================================");
    System.out.println("URI : " + request.getRequestURI());

    String authHeader = request.getHeader("Authorization");

    System.out.println("Authorization Header : " + authHeader);

    if (authHeader != null && authHeader.startsWith("Bearer ")) {

        String token = authHeader.substring(7);

        System.out.println("Token Found");

        boolean valid = jwtUtil.isTokenValid(token);

        System.out.println("Token Valid : " + valid);

        if (valid) {

            String email = jwtUtil.extractEmail(token);

            System.out.println("Email : " + email);

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            System.out.println("Authorities : "
                    + userDetails.getAuthorities());

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authToken);

            System.out.println("Authentication Set Successfully");
        }
    }

    filterChain.doFilter(request, response);

    }
}