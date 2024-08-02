package com.kobindustry.kobirightpro.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Oeuvres implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String imageDeCouverture;
    @Enumerated(EnumType.STRING)
    private TypeOeuvre typeOeuvre;

    @OneToMany(mappedBy = "oeuvre", cascade = CascadeType.ALL)
    private List<Work> works;
}

