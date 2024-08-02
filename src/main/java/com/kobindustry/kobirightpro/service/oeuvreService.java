package com.kobindustry.kobirightpro.service;

import com.kobindustry.kobirightpro.entities.Oeuvres;
import com.kobindustry.kobirightpro.repositories.OeuvresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class oeuvreService {
    @Autowired
    private OeuvresRepository oeuvreRepository;

    public Oeuvres saveOeuvre(Oeuvres oeuvre) {
        return oeuvreRepository.save(oeuvre);
    }

    public Optional<Oeuvres> getOeuvreById(Long id) {
        return oeuvreRepository.findById(id);
    }

    public List<Oeuvres> getAllOeuvres() {
        return oeuvreRepository.findAll();
    }
}
