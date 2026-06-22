package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Sizing;
import com.tciproducts.labelinventory.services.SizingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/labels/size")
public class SizingController {

    @Autowired
    SizingService sizingService;

    @GetMapping()
    public Iterable<Sizing> getAllSizes() {
        return sizingService.getAllSizes();
    }

    @GetMapping("/{labelCode}")
    public List<Sizing> getSizeByLabelCode(@PathVariable Integer labelCode) {
        return sizingService.getSizeByLabelCode(labelCode);
    }
}
