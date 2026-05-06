package com.tciproducts.labelinventory.services;

import com.tciproducts.labelinventory.models.Labels;
import com.tciproducts.labelinventory.models.repositories.LabelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LabelsService {

    @Autowired
    private LabelsRepository labelsRepository;

    public Labels createLabel(Labels labels) {
        return labelsRepository.save(labels);
    }

    public Iterable<Labels> getAllLabels() {
        return labelsRepository.findAll();
    }

    public Optional<Labels> getLabelById(Integer id) {
        return labelsRepository.findById(id);
    }

    public Optional<Labels> getAllLabelsByLabelCode(Integer labelCode) {
        return labelsRepository.findAllById(labelCode);
    }

    public Labels saveLabels (Labels label) {
        return  labelsRepository.save(label);
    }

    public Labels deleteLabelByID (Integer id) {
        labelsRepository.deleteById(id);
        return null;
    }

    public Labels updateLabelById(Integer id, Labels updatedLabel) {
        Optional<Labels> result = labelsRepository.findById(id);

        if(result.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Labels labels = result.get();
        labels.setLabelAlias(updatedLabel.getLabelAlias());
        labels.setLabelCode(updatedLabel.getLabelCode());
        return labelsRepository.save(labels);
    }

}
