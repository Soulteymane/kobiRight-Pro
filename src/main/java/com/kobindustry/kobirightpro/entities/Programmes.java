package com.kobindustry.kobirightpro.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data @NoArgsConstructor
@AllArgsConstructor
public class Programmes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeProgramme;
    private String titre;
    private LocalDate date;
    private String nomArtiste;
    private String nomOrganisateur;
    private String nomSalle;

    @ManyToMany
    @JoinTable(
            name = "programme_oeuvre",
            joinColumns = @JoinColumn(name = "programme_id"),
            inverseJoinColumns = @JoinColumn(name = "oeuvre_id")
    )
    private List<Oeuvres> oeuvres;
}
