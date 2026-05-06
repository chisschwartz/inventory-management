package com.tciproducts.labelinventory.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tciproducts.labelinventory.models.Labels;
import com.tciproducts.labelinventory.services.LabelsService;

@RestController
@RequestMapping("/labels")
public class LabelsController {

    @Autowired
    private LabelsService labelsService;

    @GetMapping
    public Iterable<Labels> getAllLabels() {
        return labelsService.getAllLabels();
    }

    @GetMapping("/{id}")
    public Optional<Labels> getLabelById(@PathVariable Integer id) {
        return labelsService.getLabelById(id);
    }

    @PostMapping
    public Labels saveLabel(@RequestBody Labels label) {
        return labelsService.saveLabels(label);
    }

    @PutMapping("/{id}")
    public Labels updateLabelById(@PathVariable Integer id, @RequestBody Labels updatedLabel) {
        return labelsService.updateLabelById(id, updatedLabel);
    }

    @DeleteMapping("/id")
    public void deleteLabelById(@PathVariable Integer id) {
        labelsService.deleteLabelById(id);
    }
}
