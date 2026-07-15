package com.tciproducts.labelinventory.models.repositories;

import com.tciproducts.labelinventory.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <Users, Integer> {
    Optional<Users> findByUsername(String username);
    boolean existsByUsername (String username);
}
