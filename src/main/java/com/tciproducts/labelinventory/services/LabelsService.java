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

    public void deleteLabel (Integer id) {
        labelsRepository.deleteById(id);
    }

    public Labels updateLabelById(Integer id, Labels updatedLabel) {
        Optional<Labels> result = labelsRepository.findById(id);

        if(result.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Labels labels = result.get();
        labels.setLabelAlias(updatedLabel.getLabelAlias());
        labels.setLabelCode(updatedLabel.getLabelCode());
        labels.setLabelSize(updatedLabel.getLabelSize());
        labels.setQuantity(updatedLabel.getQuantity());
        return labelsRepository.save(labels);
    }

}
