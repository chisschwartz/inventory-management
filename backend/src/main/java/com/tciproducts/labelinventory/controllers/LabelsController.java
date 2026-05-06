package com.tciproducts.labelinventory.controllers;

import com.tciproducts.labelinventory.LabelinventoryApplication;
import com.tciproducts.labelinventory.models.Labels;
import com.tciproducts.labelinventory.services.LabelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventory")
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

    @DeleteMapping("/{id}")
    public Labels deleteLabelByID(@PathVariable Integer id) {return labelsService.deleteLabelByID(id);}
}
