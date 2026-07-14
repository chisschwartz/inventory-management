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

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        List<Users> usersList = userRepository.findAll();

        if(!usersList.isEmpty()) {
            return new ResponseEntity<>(usersList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
