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
}
