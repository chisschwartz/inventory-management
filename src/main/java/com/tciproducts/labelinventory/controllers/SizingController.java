package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Sizing;
import com.tciproducts.labelinventory.services.SizingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/labels/size")
public class SizingController {

    @Autowired
    SizingService sizingService;

    @GetMapping()
    public Iterable<Sizing> getAllSizes() {
        return sizingService.getAllSizes();
    }
}
