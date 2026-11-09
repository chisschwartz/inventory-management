package com.tciproducts.labelinventory.security;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    @Value("${jwt.refreshexpiration}")
    private Long jwtRefreshExpiration;

    private SecretKey key;

    //generates the token so that our user can sign in and explore gated content
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    //generate JWT Token for logged in user
    protected String generateToken(String username) {

        Date issuedAtDay = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(System.currentTimeMillis() + jwtExpiration);

        return Jwts.builder()
                .subject(username)
                .issuedAt(issuedAtDay)
                .expiration(expirationDate)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    //Extracts username from JWT token
    protected String extractUsername(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username);
    }
}
