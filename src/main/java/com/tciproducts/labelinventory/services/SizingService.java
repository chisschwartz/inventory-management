package com.tciproducts.labelinventory.services;

import com.tciproducts.labelinventory.models.Sizing;
import com.tciproducts.labelinventory.models.repositories.SizingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizingService {

    @Autowired
    SizingRepository sizingRepository;

    public Iterable<Sizing> getAllSizes() {
        return sizingRepository.findAll();
    }

    public List<Sizing> getSizeByLabelCode(Integer labelCode) {
        return sizingRepository.findByLabelCode(labelCode);
    }

    public Sizing saveSizing(Sizing sizing) {
        return sizingRepository.save(sizing);
    }

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
