package com.kobindustry.kobirightpro.controller;

import com.kobindustry.kobirightpro.entities.Work;
import com.kobindustry.kobirightpro.service.workService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/works")
public class workConttroller {

    @Autowired
    private workService worksService;

    @PostMapping
    public ResponseEntity<Work> createWork(@RequestBody Work work) {
        Work savedWork = worksService.saveWork(work);
        return ResponseEntity.ok(savedWork);
    }

    @GetMapping
    public List<Work> getAllWorks() {
        return worksService.getAllWorks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Work> getWorkById(@PathVariable Long id) {
        Optional<Work> work = worksService.getWorkById(id);
        return work.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWork(@PathVariable Long id) {
        worksService.deleteWork(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Work> updateWork(@PathVariable Long id, @RequestBody Work work) {
        Work updatedWork = worksService.updateWork(id, work);
        return ResponseEntity.ok(updatedWork);
    }
}