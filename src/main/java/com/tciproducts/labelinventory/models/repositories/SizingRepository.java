package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Sizing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizingRepository extends JpaRepository<Sizing, Integer> {
    List<Sizing> findByLabelCode(Integer labelCode);
}
