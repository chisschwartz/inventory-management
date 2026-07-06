package com.tciproducts.labelinventory.controllers;

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

    @GetMapping("public/hello")
    public String publicEnd() {
        return "public data";
    }

    @GetMapping ("private/hello")
    public String privateEnd() {
        return "private data";
    }
}
