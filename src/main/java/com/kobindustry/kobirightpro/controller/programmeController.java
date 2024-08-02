package com.kobindustry.kobirightpro.controller;


import com.kobindustry.kobirightpro.entities.Programmes;
import com.kobindustry.kobirightpro.service.programmeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/programmes")
@CrossOrigin(origins = "*")
public class programmeController {
    @Autowired
    private programmeService programmesService;

    @PostMapping
    public ResponseEntity<Programmes> createProgramme(@RequestBody Programmes programme) {
        Programmes savedProgramme = programmesService.saveProgramme(programme);
        return new ResponseEntity<>(savedProgramme, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Programmes> getProgrammeById(@PathVariable Long id) {
        Optional<Programmes> programme = programmesService.getProgrammeById(id);
        return programme.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
