package com.tciproducts.labelinventory.controllers;

import java.util.Optional;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import com.tciproducts.labelinventory.models.Labels;
import com.tciproducts.labelinventory.services.LabelsService;

@RestController
@RequestMapping("/labels")
public class LabelsController {

    @Autowired
    private LabelsService labelsService;

    @GetMapping
    public Page<Labels> getAllPaginatedLabels(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size,
            @RequestParam(defaultValue = "labelCode") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending) {

        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return labelsService.getPaginatedLabels(pageable);
    }

    @GetMapping("/all")
    public Iterable<Labels> getAllLabels() {
        return labelsService.getAllLabels();
    }

    @GetMapping("/{id}")
    public Optional<Labels> getLabelById(@PathVariable Integer id) {
        return labelsService.getLabelById(id);
    }

    @PostMapping()
    public Labels saveLabel(@RequestBody Labels label) {
        return labelsService.saveLabels(label);
    }

    @PutMapping("/{id}")
    public Labels updateLabelById(@PathVariable Integer id, @RequestBody Labels updatedLabel) {
        return labelsService.updateLabelById(id, updatedLabel);
    }

    @DeleteMapping("/{id}")
    public void deleteLabelById(@PathVariable Integer id) {
        labelsService.deleteLabelById(id);
    }
}
