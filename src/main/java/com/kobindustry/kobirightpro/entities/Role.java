package com.kobindustry.kobirightpro.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMINISTRATEUR("Administrateur"),
    AUTEUR("Auteur"),
    COMPOSITEUR("Compositeur"),
    EDITEUR("Editeur"),
    ARRANGEUR("Arrangeur");

    private String value;

    Role(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.value;
    }

    @JsonCreator
    public static Role fromValue(String value) {
        if (value == null || value.isEmpty()) {
            // Si la chaîne est vide ou null, renvoyez null ou une valeur par défaut
            return null; // ou une valeur par défaut comme Role.ADMINISTRATEUR
        }

        for (Role role : Role.values()) {
            if (role.value.equalsIgnoreCase(value)) {
                return role;
            }
        }
        // Ajoutez cette ligne pour loguer la valeur problématique
        System.err.println("Unknown enum type " + value);
        throw new IllegalArgumentException("Unknown enum type " + value);
    }
}
