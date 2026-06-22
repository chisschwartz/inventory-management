package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Sizing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizingRepository extends JpaRepository<Sizing, Integer> {
}
