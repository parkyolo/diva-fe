package com.diva.backend.auth.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static com.diva.backend.auth.enumstorage.profile.SpringProfile.DEV;
import static com.diva.backend.auth.enumstorage.profile.SpringProfile.LOCAL;
import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.OPTIONS;

@Slf4j
@Configuration
public class CorsConfig {
    @Value("${FRONTEND}")
    private String frontend;

    @Value("${FRONTEND.PORT}")
    private String frontendPort;

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

        // Allowed Origins
        String localhostWithPort = "http://localhost:3000";
        config.addAllowedOrigin(localhostWithPort);
        log.info("localhostWithPort is " + localhostWithPort);

        String httpDomain = frontend;
        config.addAllowedOrigin(httpDomain);
        log.info("httpDomain is " + httpDomain);

        String httpDomainWithPort = frontend + ":" + frontendPort;
        config.addAllowedOrigin(httpDomainWithPort);
        log.info("httpDomainWithPort is " + httpDomainWithPort);

        String httpsDomainWithPort = frontend.replace("http", "https");
        httpsDomainWithPort += ":" + frontendPort;
        config.addAllowedOrigin(httpsDomainWithPort);
        log.info("httpsDomainWithPort is " + httpsDomainWithPort);

        // Allowed Methods
        config.setAllowedMethods(List.of(GET.name(), POST.name(), PUT.name(), PATCH.name(), DELETE.name(), OPTIONS.name()));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
