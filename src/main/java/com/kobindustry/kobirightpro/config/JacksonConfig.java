package com.kobindustry.kobirightpro.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.CoercionAction;
import com.fasterxml.jackson.databind.cfg.CoercionInputShape;
import com.fasterxml.jackson.databind.json.JsonMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        JsonMapper mapper = new JsonMapper();
//        mapper.coercionConfigFor(CoercionInputShape.EmptyString)
//                .setCoercion(CoercionAction.AsNull);
        return mapper;
    }
}

