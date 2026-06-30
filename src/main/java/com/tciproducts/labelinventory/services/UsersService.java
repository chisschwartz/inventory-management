package com.tciproducts.labelinventory.services;

import com.tciproducts.labelinventory.models.Labels;
import com.tciproducts.labelinventory.models.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tciproducts.labelinventory.models.repositories.UserRepository;

import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;

    public Iterable<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Users> findUserById(Integer id) {
        return userRepository.findById(id);
    }

    public Users saveUser(Users users) {
        return userRepository.save(users);
    }

    public void deleteUserById (Integer id) {
        Optional<Users> results = userRepository.findById(id);

        if(results.isEmpty()) {
            throw new RuntimeException("user does not exist at id:" + id);
        }

        Users users = results.get();
        userRepository.delete(users);
    }

    public Users updateUserById (Integer id, Users updatedUser) {
        Optional<Users> results = userRepository.findById(id);

        if(results.isEmpty()) {
            throw new RuntimeException("label does not exist at id:" + id);
        }

        Users users = results.get();
        users.setEmail(updatedUser.getEmail());
        users.setUsername(updatedUser.getUsername());
        users.setPassword(updatedUser.getPassword());
        return userRepository.save(users);
    }
}
