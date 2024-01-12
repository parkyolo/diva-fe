package com.checkitout.backend.auth.handler;

import com.checkitout.backend.auth.service.JwtService;
import com.checkitout.backend.auth.userdetail.PrincipalUserDetails;
import com.checkitout.backend.dto.Response;
import com.checkitout.backend.entity.Member;
import com.checkitout.backend.enumstorage.messages.Messages;
import com.checkitout.backend.exception.NoSuchMemberException;
import com.checkitout.backend.repository.MemberRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

import static com.checkitout.backend.auth.service.JwtService.*;
import static com.checkitout.backend.enumstorage.messages.MemberMessages.MEMBER;
import static com.checkitout.backend.enumstorage.messages.MemberMessages.SIGN_IN;
import static com.checkitout.backend.enumstorage.messages.Messages.NOT_EXISTS;
import static com.checkitout.backend.enumstorage.messages.Messages.SUCH;
import static com.checkitout.backend.enumstorage.response.Status.SUCCESS;
import static jakarta.servlet.http.HttpServletResponse.SC_GONE;

@Component
@RequiredArgsConstructor
public class OAuth2LogInSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtService jwtService;

    private final MemberRepository memberRepository;

    private final ObjectMapper objectMapper;

    /**
     * 로그인 성공 시, JwtEntity를 생성하고 AccessToken과 RefreshToken을 Cookie에 담아 보낸다.
     * @param request the request which caused the successful authentication
     * @param response the response
     * @param authentication the <tt>Authentication</tt> object which was created during
     * the authentication process.
     * @throws IOException
     * @throws ServletException
     */
    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        PrincipalUserDetails principal = (PrincipalUserDetails) authentication.getPrincipal();
//
//        String email = principal.getMember().getEmail();
        String email = (String) request.getAttribute("email");

        try {
            Member member = memberRepository.findNotDeletedByEmail(email).orElseThrow(() -> new NoSuchMemberException(SUCH.getMessage() + MEMBER.getMessage() + NOT_EXISTS.getMessage()));

            // access token, refresh token을 헤더에 실어서 보낸다.
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setHeader(ACCESS_TOKEN_HEADER, BEARER + request.getAttribute("accessToken"));
            response.setHeader(REFRESH_TOKEN_HEADER, BEARER + request.getAttribute("refreshToken"));

            response.getWriter().write(objectMapper.writeValueAsString(Response.builder()
                    .status(SUCCESS.getStatus())
                    .message(SIGN_IN.getMessage() + Messages.SUCCESS.getMessage())
                    .data(objectMapper.writeValueAsString(member.toMemberFindDto()))
                    .build()));
        }
        // 회원을 찾을 수 없으면
        catch (NoSuchMemberException e) {
            response.setStatus(SC_GONE);
        }
    }
}
