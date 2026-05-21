package com.tciproducts.labelinventory.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tciproducts.labelinventory.models.Labels;
import com.tciproducts.labelinventory.models.repositories.LabelsRepository;

@Service
public class LabelsService {

    @Autowired
    private LabelsRepository labelsRepository;

//    public Page<Labels> getPaginatedLabels (Pageable pageable) {
//        return labelsRepository.findAll(pageable);
//    }

    public Iterable<Labels> getAllLabels() {
        return labelsRepository.findAll();
    }

    public Optional<Labels> getLabelById(Integer id) {
        return labelsRepository.findById(id);
    }

    public Labels saveLabels(Labels label) {
        return  labelsRepository.save(label);
    }

    public void deleteLabelById(Integer id) {
        Optional<Labels> results = labelsRepository.findById(id);

        if(results.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Labels labels = results.get();
        labelsRepository.delete(labels);
    }

    public Labels updateLabelById(Integer id, Labels updatedLabel) {
        Optional<Labels> results = labelsRepository.findById(id);

        if(results.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Labels labels = results.get();
        labels.setLabelAlias(updatedLabel.getLabelAlias());
        labels.setLabelCode(updatedLabel.getLabelCode());
        labels.setCompany(updatedLabel.getCompany());
        return labelsRepository.save(labels);
    }

}
