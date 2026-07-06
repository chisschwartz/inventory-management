package com.tciproducts.labelinventory.services;

import com.tciproducts.labelinventory.models.Users;
import com.tciproducts.labelinventory.models.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = userRepository.findByUsername(username);

        if (users == null){
            throw new UsernameNotFoundException("User not found with name: " + username);
        }

        return new User(
                users.getUsername(),
                users.getPassword(),
                //allows us to set roles, set for empty for now
                Collections.emptyList()
        );
    }
}
