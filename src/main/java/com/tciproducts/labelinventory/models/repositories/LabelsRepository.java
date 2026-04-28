package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Labels;
import org.springframework.data.repository.CrudRepository;

public interface LabelsRepository extends CrudRepository<Labels, Long> {
}
