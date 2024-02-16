package com.diva.backend.auth.handler;

import com.diva.backend.dto.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.diva.backend.enumstorage.response.Status.FAIL;
import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY;
import static com.fasterxml.jackson.annotation.PropertyAccessor.FIELD;
import static org.apache.http.HttpStatus.SC_BAD_REQUEST;

@Component
@RequiredArgsConstructor
public class MemberLogInFailureHandler implements AuthenticationFailureHandler {
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(SC_BAD_REQUEST);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        objectMapper.setVisibility(FIELD, ANY);
        response.getWriter().write(objectMapper.writeValueAsString(Response.builder()
                .status(FAIL.getStatus())
                .message(exception.getMessage())
        ));
    }
}
