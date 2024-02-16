package com.diva.backend.auth.handler;

import com.diva.backend.auth.service.AuthService;
import com.diva.backend.dto.Response;
import com.diva.backend.enumstorage.messages.Messages;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.diva.backend.enumstorage.messages.MemberMessages.SIGN_OUT;
import static com.diva.backend.enumstorage.response.Status.SUCCESS;

@Component
@RequiredArgsConstructor
public class JwtLogoutHandler implements LogoutHandler {
    private final AuthService authService;
    private final ObjectMapper objectMapper;

    /**
     * 로그아웃 할 때는 accessToken과 refreshToken을 모두 보내야 함
     * @param request the HTTP request
     * @param response the HTTP response
     * @param authentication the current principal details
     */
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try {
            authService.signOut(request, response);

            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            response.setStatus(HttpStatus.SC_OK);
            response.getWriter().write(objectMapper.writeValueAsString(Response.builder()
                .status(SUCCESS.getStatus())
                .message(SIGN_OUT.getMessage() + Messages.SUCCESS.getMessage())
                .build()));
        }
        // 들어오는 값이 이상할 때
        catch (IllegalArgumentException e) {
            // 400 Bad Request
            response.setStatus(HttpStatus.SC_BAD_REQUEST);
        } catch (JsonProcessingException e) {
            response.setStatus(HttpStatus.SC_INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            response.setStatus(HttpStatus.SC_INTERNAL_SERVER_ERROR);
        }
    }
}
