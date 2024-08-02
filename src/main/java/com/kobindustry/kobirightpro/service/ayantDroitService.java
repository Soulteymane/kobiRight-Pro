package com.kobindustry.kobirightpro.service;

import com.kobindustry.kobirightpro.entities.AyantDroit;
import com.kobindustry.kobirightpro.repositories.AyantDroitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ayantDroitService {
    @Autowired
    private AyantDroitRepository ayantDroitRepository;


//    public List<AyantDroit> findByName(String name) {
//        return ayantDroitRepository.findByNomContainingIgnoreCase(name);
//    }

    public List<AyantDroit> searchAyantDroitsByNom(String nom) {
        return ayantDroitRepository.findByNomAyantDroitContainingIgnoreCase(nom);
    }

//    List<AyantDroit> findByNomAyantDroitContainingIgnoreCase(String nomAyantDroit);

    public AyantDroit saveAyantDroit(AyantDroit ayantDroit) {
        return ayantDroitRepository.save(ayantDroit);
    }

    public Optional<AyantDroit> getAyantDroitById(Long id) {
        return ayantDroitRepository.findById(id);
    }

    public List<AyantDroit> getAllAyantsDroit() {
        return ayantDroitRepository.findAll();
    }
}
