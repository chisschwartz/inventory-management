package com.tciproducts.labelinventory.services;

import com.tciproducts.labelinventory.models.Sizing;
import com.tciproducts.labelinventory.models.repositories.LabelsRepository;
import com.tciproducts.labelinventory.models.repositories.SizingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class SizingService {

    @Autowired
    SizingRepository sizingRepository;

    @Autowired
    private LabelsRepository labelsRepository;

    public Iterable<Sizing> getAllSizes() {
        return sizingRepository.findAll();
    }

    public List<Sizing> getSizeByLabelCode(Integer labelCode) {
        return sizingRepository.findByLabelCode(labelCode);
    }

    public Sizing saveSizing(Sizing sizing) {
        return sizingRepository.save(sizing);
    }

    public Sizing addSizing(Integer labelCode, String size, Integer quantity) {
        if (!labelsRepository.existsByLabelCode(labelCode)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Label not found.");
        }

        Sizing sizing = new Sizing();
        sizing.setLabelCode(labelCode);
        sizing.setSize(size.trim());
        sizing.setQuantity(quantity);
        return sizingRepository.save(sizing);
    }

//    public Optional<Sizing> getSizeById(Integer id) {
//        return sizingRepository.findById(id);
//    }

    public void deleteSizeById(Integer id) {
        Optional<Sizing> results = sizingRepository.findById(id);

        if(results.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Sizing sizing = results.get();
        sizingRepository.delete(sizing);
    }

    public Sizing updateSizingById(Integer id, Sizing updatedSizing) {
        Optional<Sizing> results = sizingRepository.findById(id);

        if(results.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Sizing sizing = results.get();
        sizing.setQuantity(updatedSizing.getQuantity());
//        sizing.setSize(updatedSizing.getSize());
        return sizingRepository.save(sizing);
    }
}
