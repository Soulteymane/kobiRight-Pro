package com.kobindustry.kobirightpro.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String sousTitre;
    private String origine;
    private String duree;
    private String bpm;
    private String interprete;
    private String genre;
    private String style;
    private String fichier;

    @ManyToOne
    @JoinColumn(name = "oeuvre_id")
    private Oeuvres oeuvre;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AyantDroit> ayantsDroit;

    // Autres champs et méthodes
}
