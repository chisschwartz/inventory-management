package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Labels;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LabelsRepository extends CrudRepository<Labels, Integer> {
    Optional<Labels> findAllById(int labelCode);
}
