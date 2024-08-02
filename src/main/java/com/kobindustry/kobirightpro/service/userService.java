package com.kobindustry.kobirightpro.service;

import com.kobindustry.kobirightpro.entities.User;
import com.kobindustry.kobirightpro.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class userService {
    @Autowired
    private UserRepository userRepository;

    public List<User> searchUsersByName(String name) {
        return userRepository.findByNomContainingIgnoreCase(name);
    }
    public List<User> findUsersByName(String name) {
        return userRepository.findByNomContainingIgnoreCase(name);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
