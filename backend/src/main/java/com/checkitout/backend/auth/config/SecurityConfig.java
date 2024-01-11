package com.checkitout.backend.auth.config;

import com.checkitout.backend.auth.PrincipalOAuth2UserService;
import com.checkitout.backend.auth.filter.AuthenticationProcessFilter;
import com.checkitout.backend.auth.handler.JwtLogoutHandler;
import com.checkitout.backend.auth.handler.OAuth2LogInFailureHandler;
import com.checkitout.backend.auth.handler.OAuth2LogInSuccessHandler;
import com.checkitout.backend.auth.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

import static com.checkitout.backend.enumstorage.role.MemberRole.ADMIN;
import static com.checkitout.backend.enumstorage.role.MemberRole.MEMBER;
import static org.apache.http.HttpStatus.SC_OK;

@Configuration
@EnableWebSecurity // Spring Securty 필터가 Spring Filter Chain에 등록된다.
//@EnableGlobalMethodSecurity(securedEnabled = true) // secured 어노테이션 활성화
@RequiredArgsConstructor
public class SecurityConfig {
    // OAuth 2.0
    private final PrincipalOAuth2UserService principalOAuth2UserService;
    private final OAuth2LogInSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LogInFailureHandler oAuth2LoginFailureHandler;

    // JWT
    private final JwtService jwtService;
    private final JwtLogoutHandler jwtLogoutHandler;

    private final AuthenticationProcessFilter authenticationProcessFilter;

    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CORS
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()));

        // 기본 페이지, css, image, js 하위 폴더에 있는 자료들은 모두 접근 가능
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/","/css/**","/img/**","/js/**","/favicon.ico", "/error/**").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated()
                );

        // 세션
        http
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않겠다.
                );

        // Basic 인증
        http
                // http header에 username, password를 넣어서 전송하는 방법을
                .httpBasic(
                        // 사용하지 않겠다.
                        AbstractHttpConfigurer::disable
                );

        // Filter
        http
                .addFilterAfter(authenticationProcessFilter, LogoutFilter.class);
//                .addFilterAfter(memberAuthenticationFilter(), AuthenticationProcessFilter.class);

        // 인증
        http
                .formLogin(
                        AbstractHttpConfigurer::disable // form login 비활성화
                );

        // OAuth 2.0
        http
                .oauth2Login(
                        oauth2Login -> oauth2Login
//                                .loginProcessingUrl("/api/login/oauth2/code/*")
                                .authorizationEndpoint(
                                        authorizationEndpoint -> authorizationEndpoint
                                                // 로그인 요청 할 url
                                                .baseUri("/auth/login/oauth2/authorization")
                                )
                                .redirectionEndpoint(
                                        redirectionEndpoint -> redirectionEndpoint
                                                .baseUri("/auth/login/oauth2/code/*")
                                )
                                .userInfoEndpoint(
                                        userInfoEndpoint -> userInfoEndpoint
                                                .userService(principalOAuth2UserService)
                                )
                                .successHandler(oAuth2LoginSuccessHandler) // 동의하고 계속하기를 눌렀을 때 Handler 설정
                                .failureHandler(oAuth2LoginFailureHandler) // 소셜 로그인 실패 시 핸들러 설정
                )
//                .authenticationProvider(memberAuthenticationProvider)


                //로그아웃
                .logout(logout ->
                        logout.permitAll()
                                .logoutUrl("/api/auth/signout/v1")
                                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(SC_OK))
                                .invalidateHttpSession(true)
                                .deleteCookies("JSESSIONID")
                                .addLogoutHandler(jwtLogoutHandler)
                );

        return http.build();
    }

//    @Bean
//    public AuthenticationManager authenticationManager() {
//        return new ProviderManager(memberAuthenticationProvider);
//    }

//    @Bean
//    public MemberAuthenticationFilter memberAuthenticationFilter() {
//        return new MemberAuthenticationFilter(authenticationManager(), temporaryMemberRepository, jwtService, memberLogInSuccessHandler, memberLogInFailureHandler);
//    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        //이 부분에서 큰 권한 순서로 ' > ' 를 사용하여 입력해준다. 띄어쓰기도 중요하다.
        roleHierarchy.setHierarchy(ADMIN + " > " + MEMBER);

        return roleHierarchy;
    }
}
