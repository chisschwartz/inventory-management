package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Users;
import com.tciproducts.labelinventory.models.repositories.UserRepository;
import com.tciproducts.labelinventory.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthenticationTestController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthenticationTestController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String authenticateUser(@RequestBody Users users) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        users.getUsername(),
                        users.getPassword()
                )
        );

        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return jwtUtil.generateToken(userDetails.getUsername());
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody Users users) {
        if (userRepository.existsByUsername(users.getUsername())) {
            return "User already exists";
        }

        final Users newUser = new Users(
                users.getUsername(),
                passwordEncoder.encode(users.getPassword())
        );

        userRepository.save(newUser);
        return "User created successfully";
    }

}
