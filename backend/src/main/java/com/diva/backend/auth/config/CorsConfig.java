package com.diva.backend.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static com.diva.backend.auth.enumstorage.profile.SpringProfile.LOCAL;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.OPTIONS;

@Configuration
public class CorsConfig {
    @Value("${allowed-origin}")
    private String allowedOrigin;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Value("${server.port}")
    private String port;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true); // Whether user credentials are supported.

        config.setAllowedHeaders(List.of("Authorization", "AuthorizationRefresh, DeviceToken"));
        config.setExposedHeaders(List.of("Authorization", "AuthorizationRefresh, DeviceToken"));

        String httpDomainWithPort = allowedOrigin;
        String httpsDomain = allowedOrigin.replace("http", "https");
        String frontEndServer = allowedOrigin;
        if (activeProfile.equals(LOCAL.getProfile())) {
            httpDomainWithPort += ":" + port;

            // 프론트엔드 서버
            frontEndServer += ":3000";
        }

        config.addAllowedOrigin(httpDomainWithPort);
        config.addAllowedOrigin(httpsDomain);
        config.addAllowedOrigin(frontEndServer);

        config.setAllowedMethods(List.of(GET.name(), POST.name(), PUT.name(), PATCH.name(), DELETE.name(), OPTIONS.name()));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
