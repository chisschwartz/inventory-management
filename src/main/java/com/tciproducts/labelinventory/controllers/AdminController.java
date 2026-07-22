package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Users;
import com.tciproducts.labelinventory.models.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    //for admin use only. retrieves a list of all users, should add a button to change user roles
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        List<Users> usersList = userRepository.findAll();

        if(!usersList.isEmpty()) {
            return new ResponseEntity<>(usersList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users/{id}")
    public Users updateUserById (Integer id, Users updatedUser) {
        Optional<Users> results = userRepository.findById(id);

        if (results.isEmpty()) {
            throw new RuntimeException("user does not exist at id:" + id);
        }

        Users users = results.get();
        users.setRole(updatedUser.getRole());
        return userRepository.save(users);
    }
}
