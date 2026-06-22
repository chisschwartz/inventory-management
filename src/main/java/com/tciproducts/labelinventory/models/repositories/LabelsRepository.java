package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Labels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelsRepository extends JpaRepository<Labels, Integer> {
}
