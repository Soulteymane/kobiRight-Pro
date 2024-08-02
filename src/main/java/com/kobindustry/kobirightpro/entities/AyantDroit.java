package com.kobindustry.kobirightpro.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class AyantDroit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomAyantDroit;
    private String prenom;
    private String pseudonyme;
    private String codeIPI;

    @Enumerated(EnumType.STRING)
    private Role role;
    private String telephone;
    private String email;
    private Integer pourcentage;

    @ManyToOne
    @JoinColumn(name = "work_id")
    private Work work;

    @ManyToOne
    @JoinColumn(name = "oeuvre_id")
    private Oeuvres oeuvre;

    @Enumerated(EnumType.STRING)
    private Statut status;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

