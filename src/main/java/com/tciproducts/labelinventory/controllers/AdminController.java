package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Users;
import com.tciproducts.labelinventory.services.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final CustomUserDetailsService customUserDetailsService;

    public AdminController(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        List<Users> usersList = customUserDetailsService.getAllUsers();

        if(!usersList.isEmpty()) {
            return new ResponseEntity<>(usersList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
