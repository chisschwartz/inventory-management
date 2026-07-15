package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.dtos.RegisterDto;
import com.tciproducts.labelinventory.models.Users;
import com.tciproducts.labelinventory.models.repositories.UserRepository;
import com.tciproducts.labelinventory.security.JwtUtil;
import com.tciproducts.labelinventory.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthenticationTestController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(Principal principal) {

        String username = principal.getName();

        String token = jwtUtil.generateToken(username);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto request) {
        String token = authService.register(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
