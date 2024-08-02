package com.kobindustry.kobirightpro.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TypeOeuvre {
    SINGLE("Single"),
    INSTRUMENTAL("Instrumental"),
    EP("EP"),
    MIXTAPE("Mixtape"),
    ALBUM("Album");

    private String value;

    TypeOeuvre(String value) {
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
    public static TypeOeuvre fromValue(String value) {
        for (TypeOeuvre type : TypeOeuvre.values()) {
            if (type.value.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown enum type " + value);
    }
}
