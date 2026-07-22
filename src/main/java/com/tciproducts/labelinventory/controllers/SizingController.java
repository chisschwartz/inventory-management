package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.models.Sizing;
import com.tciproducts.labelinventory.services.SizingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/labels/size")
public class SizingController {

    @Autowired
    SizingService sizingService;

    //everyone should be able to see stock
    @GetMapping()
    public Iterable<Sizing> getAllSizes() {
        return sizingService.getAllSizes();
    }

    @GetMapping("/code/{labelCode}")
    public List<Sizing> getSizeByLabelCode(@PathVariable Integer labelCode) {
        return sizingService.getSizeByLabelCode(labelCode);
    }

//    @GetMapping("/id/{id}")
//    public Optional<Sizing> getSizeById(@PathVariable Integer id) {
//        return sizingService.getSizeById(id);
//    }


    //users should be able to add inventory items and edit inventory
    @PreAuthorize("hasRole('USER')")
    @PostMapping()
    public Sizing saveSizing(@RequestBody Sizing sizing) {
        return sizingService.saveSizing(sizing);
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}")
    public Sizing updateSizingById(@PathVariable Integer id, @RequestBody Sizing updatedSizing) {
        return sizingService.updateSizingById(id, updatedSizing);
    }

    //only admins should be able to delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteSizeById(@PathVariable Integer id) {
        sizingService.deleteSizeById(id);
    }
}
