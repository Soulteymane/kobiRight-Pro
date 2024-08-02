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
        for (Role role : Role.values()) {
            if (role.value.equalsIgnoreCase(value)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Unknown enum type " + value);
    }
}
