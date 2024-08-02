package com.kobindustry.kobirightpro.repositories;

import com.kobindustry.kobirightpro.entities.AyantDroit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AyantDroitRepository extends JpaRepository<AyantDroit, Long> {
    List<AyantDroit> findByNomAyantDroitContainingIgnoreCase(String nomAyantDroit);
}
