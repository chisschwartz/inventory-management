package com.tciproducts.labelinventory.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/welcome")
    public String allWelcome() {
        return "access for all";
    }

    @GetMapping("/public")
    public String publicEnd() {
        return "public data";
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping ("/private")
    public String privateEnd() {
        return "private data";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping ("/admin")
    public String privateAdmin() {
        return "Admin data";
    }
}
