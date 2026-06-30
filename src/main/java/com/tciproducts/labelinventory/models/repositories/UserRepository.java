package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <Users, Integer> {
}
