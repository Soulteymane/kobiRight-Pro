package com.kobindustry.kobirightpro.service;

import com.kobindustry.kobirightpro.entities.Programmes;
import com.kobindustry.kobirightpro.repositories.ProgrammeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class programmeService {
    @Autowired
    private ProgrammeRepository programmeRepository;

    public Programmes saveProgramme(Programmes programme) {
        return programmeRepository.save(programme);
    }

    public Optional<Programmes> getProgrammeById(Long id) {
        return programmeRepository.findById(id);
    }

    public List<Programmes> getAllProgrammes() {
        return programmeRepository.findAll();
    }
}
