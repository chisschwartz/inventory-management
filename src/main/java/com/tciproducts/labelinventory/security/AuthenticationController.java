package com.tciproducts.labelinventory.security;

import com.tciproducts.labelinventory.dtos.RegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    //allows users to login and generates an access token
    @PostMapping("/login")
    public Map<String, String> login(Authentication principal) {

        String username = principal.getName();

        String token = jwtUtil.generateToken(username);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("isAdmin", Boolean.toString(principal.getAuthorities().stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"))));

        return response;
    }

    //register controller lets us add users to the database
    //might restrict to admin only so that only admins can create new users, could help keep it secure?
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterDto request) {
        String token = authService.register(request);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
