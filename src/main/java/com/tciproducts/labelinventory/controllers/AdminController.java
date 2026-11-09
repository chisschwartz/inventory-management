package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.dtos.AdminUserRequest;
import com.tciproducts.labelinventory.models.Users;
import com.tciproducts.labelinventory.models.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //retrieves all of our users
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public List<UserSummary> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserSummary::from)
                .toList();
    }

    //creates a new user only if current user is an admin
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/all-users")
    public ResponseEntity<UserSummary> createUser(@RequestBody @jakarta.validation.Valid AdminUserRequest request) {
        String username = request.username().trim();
        String email = request.email().trim();

        if (userRepository.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists.");
        }
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists.");
        }

        Users user = new Users();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role());

        //This is a sink but it is protected by layers of encryption and admin access that protect it
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(UserSummary.from(userRepository.save(user)));
    }

    //allows admins to delete users and admins
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/all-users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id, Authentication authentication) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        if (user.getUsername().equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You cannot delete your own account.");
        }
        if (user.getRole() == Users.Role.ADMIN && userRepository.countByRole(Users.Role.ADMIN) <= 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "The last admin account cannot be deleted.");
        }

        userRepository.delete(user);
        return ResponseEntity.noContent().build();
    }

    public record UserSummary(int id, String username, String email, Users.Role role) {
        private static UserSummary from(Users user) {
            return new UserSummary(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        }
    }
}
