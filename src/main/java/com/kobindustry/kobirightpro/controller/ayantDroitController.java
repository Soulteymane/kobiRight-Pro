package com.kobindustry.kobirightpro.controller;


import com.kobindustry.kobirightpro.entities.AyantDroit;
import com.kobindustry.kobirightpro.service.ayantDroitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ayants-droit")
@CrossOrigin(origins = "*")
public class ayantDroitController {

    @Autowired
    private ayantDroitService ayantsDroitService;

    @GetMapping("/search")
    public ResponseEntity<List<AyantDroit>> searchAyantDroits(@RequestParam String nom) {
        List<AyantDroit> ayantsDroit = ayantsDroitService.searchAyantDroitsByNom(nom);
        return ResponseEntity.ok(ayantsDroit);
    }

    @PostMapping
    public ResponseEntity<AyantDroit> createAyantDroit(@RequestBody AyantDroit ayantDroit) {
        AyantDroit savedAyantDroit = ayantsDroitService.saveAyantDroit(ayantDroit);
        return new ResponseEntity<>(savedAyantDroit, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AyantDroit> getAyantDroitById(@PathVariable Long id) {
        Optional<AyantDroit> ayantDroit = ayantsDroitService.getAyantDroitById(id);
        return ayantDroit.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
