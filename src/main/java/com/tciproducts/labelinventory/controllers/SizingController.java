package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Sizing;
import com.tciproducts.labelinventory.services.SizingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping()
    public Sizing saveSizing(@RequestBody Sizing sizing) {
        return sizingService.saveSizing(sizing);
    }

    @DeleteMapping("/{id}")
    public void deleteSizeById(@PathVariable Integer id) {
        sizingService.deleteSizeById(id);
    }
}
