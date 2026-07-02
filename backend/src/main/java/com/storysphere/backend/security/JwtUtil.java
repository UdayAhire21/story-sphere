package com.storysphere.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final String SECRET_KEY =
            "storyspherejwtsecretkeystoryspherejwtsecretkey12345";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes()
            );

    public String generateToken(
            String email,
            String role
    ) {

        return Jwts.builder()

                .subject(email)

                .claim(
                        "role",
                        role
                )

                .issuedAt(
                        new Date()
                )

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 24
                        )
                )

                .signWith(key)

                .compact();
    }

    public String extractEmail(
            String token
    ) {

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();
    }

    public String extractRole(
            String token
    ) {

        Claims claims = Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload();

        return claims.get(
                "role",
                String.class
        );
    }

    public boolean isTokenValid(
            String token
    ) {

        try {

            extractEmail(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}