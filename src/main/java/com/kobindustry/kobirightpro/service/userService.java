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

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setNom(updatedUser.getNom());
                    user.setPrenom(updatedUser.getPrenom());
                    user.setEmail(updatedUser.getEmail());
                    user.setTelephone(updatedUser.getTelephone());
                    user.setCodeIPI(updatedUser.getCodeIPI());
                    user.setMotDePasse(updatedUser.getMotDePasse());
                    user.setRole(updatedUser.getRole());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    updatedUser.setId(id);
                    return userRepository.save(updatedUser);
                });
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
