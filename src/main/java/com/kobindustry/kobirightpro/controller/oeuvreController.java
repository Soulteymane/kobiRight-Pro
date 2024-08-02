package com.kobindustry.kobirightpro.controller;

import com.kobindustry.kobirightpro.entities.AyantDroit;
import com.kobindustry.kobirightpro.entities.Oeuvres;
import com.kobindustry.kobirightpro.service.ayantDroitService;
import com.kobindustry.kobirightpro.service.oeuvreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/oeuvres")
@CrossOrigin(origins = "*")
public class oeuvreController {

    @Autowired
    private oeuvreService oeuvresService;

    @Autowired
    private ayantDroitService ayantsDroitService;

    @PostMapping
    public ResponseEntity<Oeuvres> createOeuvre(@RequestBody Oeuvres oeuvre) {
        Oeuvres savedOeuvre = oeuvresService.saveOeuvre(oeuvre);
        return new ResponseEntity<>(savedOeuvre, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Oeuvres> getOeuvreById(@PathVariable Long id) {
        Optional<Oeuvres> oeuvre = oeuvresService.getOeuvreById(id);
        return oeuvre.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search-ayants-droits")
    public ResponseEntity<List<AyantDroit>> searchAyantsDroitsByName(@RequestParam String nom) {
        List<AyantDroit> ayantsDroits = ayantsDroitService.searchAyantDroitsByNom(nom);
        return ResponseEntity.ok(ayantsDroits);
    }

}