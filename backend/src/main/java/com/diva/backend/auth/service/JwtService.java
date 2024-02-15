package com.diva.backend.auth.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.diva.backend.auth.entity.Token;
import com.diva.backend.auth.exception.InvalidAccessTokenException;
import com.diva.backend.auth.exception.InvalidRefreshTokenException;
import com.diva.backend.auth.exception.NoSuchRefreshTokenInDBException;
import com.diva.backend.auth.repository.TokenRepository;
import com.diva.backend.exception.NoSuchDeviceTokenException;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import static com.diva.backend.auth.enumstorage.messages.JwtMessages.ACCESS_TOKEN;
import static com.diva.backend.auth.enumstorage.messages.JwtMessages.REFRESH_TOKEN;
import static com.diva.backend.enumstorage.messages.MemberMessages.MEMBER;
import static com.diva.backend.enumstorage.messages.Messages.*;

@Getter
@Service
// Transactional 붙이지 마
@RequiredArgsConstructor
@Slf4j
public class JwtService {
    private final OAuthService oauthService;
    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
//    private final DeviceTokenRepository deviceTokenRepository;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.token.access.expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.token.refresh.expiration}")
    private long refreshTokenExpiration;

    public static final String ACCESS_TOKEN_HEADER = "Authorization";

    public static final String REFRESH_TOKEN_HEADER = "AuthorizationRefresh";

    public static final String BEARER = "Bearer ";

    // access token, refresh token을 발급, DB에 저장한다.
//    @Transactional
    public String[] issueJwts(@NotNull Long memberId) {
//        , Member member
//        , DeviceToken deviceToken) {
        // refresh token을 발급한다.
        String newRefreshToken = JWT.create()
            .withIssuer("LetMeKnow")
            .withSubject("refreshToken")
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenExpiration))
            .withClaim("memberId", String.valueOf(memberId))
            .withClaim("issuedTime", System.currentTimeMillis())
            .sign(Algorithm.HMAC512(secret));

        // DeviceToken과 연관된 refreshToken이 DB에 있으면,
        // refreshToken을 업데이트한다.
//        if (deviceToken.getRefreshToken() != null) {
//            deviceToken.getRefreshToken().updateRefreshToken(newRefreshToken);
//        }
        // DeviceToken과 연관된 refreshToken이 DB에 없으면,
//        else {
            // 새로 발급한 refreshToken을 DB에 저장
//            RefreshToken newRefreshTokenEntity = RefreshToken.builder()
//                .member(member)
//                .refreshToken(newRefreshToken)
//                .deviceToken(deviceToken)
//                .build();

//            refreshTokenRepository.save(newRefreshTokenEntity);
//        }

//        memberRepository.save(member);

        // access token을 발급한다.
        String newAccessToken = JWT.create()
            .withIssuer("LetMeKnow")
            .withSubject("accessToken")
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .withClaim("memberId", String.valueOf(memberId))
            .withClaim("issuedTime", System.currentTimeMillis())
            .sign(Algorithm.HMAC512(secret));

        return new String[] {newAccessToken, newRefreshToken};
    }

    @Transactional(noRollbackFor = {JWTVerificationException.class, NoSuchDeviceTokenException.class, NoSuchMemberException.class}) // JWTVerificationException 발생해도 롤백 X
    public String[] reissueJwts(Long memberId, String refreshToken) throws NoSuchMemberException, IllegalArgumentException, NoSuchDeviceTokenException, NoSuchRefreshTokenInDBException, JWTVerificationException {
//        , String deviceToken)
//        // RefreshToken과 함께 DeviceTokenEntity를 찾아
//        DeviceToken deviceTokenEntity = deviceTokenRepository.findByDeviceTokenWithRefreshToken(deviceToken)
//            // Device Token이 DB에 없으면, Device Token이 바뀐 상황
//            .orElseThrow(() -> {
//                // RefreshToken을 DB에서 삭제
//                refreshTokenRepository.deleteByRefreshToken(refreshToken);
//
//                Member member = memberRepository.findNotDeletedByEmailWithRefreshTokenAndSubscriptionAndDeviceToken(email)
//                    .orElseThrow(() -> new NoSuchMemberException(new StringBuffer().append(SUCH.getMessage()).append(MEMBER.getMessage()).append(NOT_EXISTS.getMessage()).toString()));
//
//                // 만료된 Device Token으로 구독한 모든 Topic을 구독 해제한다.
////                subscriptionService.unsubscribeFromAllTopics(deviceToken, member);
//
//                throw new NoSuchDeviceTokenException(new StringBuffer().append(SUCH.getMessage()).append(DEVICE_TOKEN.getMessage()).append(NOT_EXISTS.getMessage()).toString());
//            });
//
//        // 일치하는 Device Token이 있으면
//        // 그 RefreshToken이 들어온 RefreshToken과 일치하는지 확인
//        // 유저가 보낸 Refresh Token와 다르면, 유효하지 않은 Refresh Token이므로
//        RefreshToken refreshTokenEntity = Optional.ofNullable(deviceTokenEntity.getRefreshToken())
//            // RefreshToken이 DB에 없으면
//            .orElseThrow(() -> {
//                throw new JWTVerificationException(new StringBuffer().append(REFRESH_TOKEN.getMessage()).append(INVALID.getMessage()).toString());
//            });

        // Refresh Token 조회
        Token tokenEntity = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new NoSuchRefreshTokenInDBException(REFRESH_TOKEN.getMessage() + NOT_FOUND.getMessage()));

        // RefreshToken이 있지만, 유저가 보낸 Refresh Token와 다르면, 이미 사용된 Refresh Token이므로
        if (!tokenEntity.getRefreshToken().equals(refreshToken)) {
            // 해당 DeviceToken을 구독 해제
//            subscriptionService.unsubscribeFromAllTopics(deviceTokenEntity.getDeviceToken(), deviceTokenEntity.getMember());

//            // RefreshToken을 DB에서 삭제
//            // DeviceToken도 삭제
//            deviceTokenRepository.delete(deviceTokenEntity);

            try {
                // 로그아웃 요청 보내고
                oauthService.requestLogOut(tokenEntity);
            }
            catch (IOException e) {
                log.error(e.getMessage());
            }

            // 해당 TokenEntity를 DB에서 삭제
            tokenRepository.delete(tokenEntity);

            // 예외 발생
            throw new JWTVerificationException(REFRESH_TOKEN.getMessage() + INVALID.getMessage());
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException(SUCH.getMessage() + MEMBER.getMessage() + NOT_EXISTS.getMessage()));

        // refreshToken이 유효하면
        // access token을 발급한다.
        String newAccessToken = JWT.create()
            .withIssuer("LetMeKnow")
            .withSubject("accessToken")
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .withClaim("memberId", String.valueOf(member.getId()))
            .withClaim("issuedTime", System.currentTimeMillis())
            .sign(Algorithm.HMAC512(secret));

        // refresh token을 발급한다.
        String newRefreshToken = JWT.create()
            .withIssuer("LetMeKnow")
            .withSubject("refreshToken")
            .withIssuedAt(new Date(System.currentTimeMillis()))
            .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenExpiration))
            .withClaim("memberId", String.valueOf(member.getId()))
            .withClaim("issuedTime", System.currentTimeMillis())
            .sign(Algorithm.HMAC512(secret));

        // 해당 refreshToken을 업데이트한다.
        tokenEntity.updateRefreshToken(newRefreshToken);
        tokenRepository.save(tokenEntity);

        return new String[]{newAccessToken, newRefreshToken};
    }

//    // refreshToken을 삭제한다.
//    // 검증 안하고 그냥 삭제해도 될 듯? - 해시된 비번들만 들어있으니까
//    @Transactional
//    public void deleteRefreshToken(String refreshToken) throws JWTVerificationException {
//        // refreshToken을 삭제한다.
//        refreshTokenRepository.deleteByRefreshToken(refreshToken);
//    }

    public String extractAccessToken(HttpServletRequest request) throws IllegalArgumentException {
        String accessToken = Optional.ofNullable(request.getHeader(ACCESS_TOKEN_HEADER))
            .orElseThrow(() -> new IllegalArgumentException(ACCESS_TOKEN.getMessage() + NOT_FOUND.getMessage()))
            .replace(BEARER, "");

        if (accessToken.isBlank()) {
            throw new IllegalArgumentException(ACCESS_TOKEN.getMessage() + NOT_FOUND.getMessage());
        }

        return accessToken;
    }

    /**
     * 헤더에서 AccessToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Long validateAndExtractMemberIdFromAccessToken(String accessToken) throws InvalidAccessTokenException {
        try {
            // accessToken 값 검증
            DecodedJWT jwt = JWT.require(Algorithm.HMAC512(secret))
                    .withIssuer("LetMeKnow")
                    .withSubject("accessToken")
                    .build() // 반환된 빌더로 JWT verifier 생성
                    .verify(accessToken);// accessToken을 검증하고 유효하지 않다면 예외 발생

            return Long.parseLong(jwt.getClaim("memberId")
                    .asString()); // claim(MemberId) 가져오기
        }
        catch (JWTVerificationException e) {
            throw new InvalidAccessTokenException(
                ACCESS_TOKEN.getMessage() + INVALID.getMessage());
        }
    }

    public String extractRefreshToken(HttpServletRequest request) throws IllegalArgumentException {
        String refreshToken = Optional.ofNullable(request.getHeader(REFRESH_TOKEN_HEADER))
            .orElseThrow(() -> new IllegalArgumentException(REFRESH_TOKEN.getMessage() + NOT_FOUND.getMessage()))
            .replace(BEARER, "");

        // refreshToken 값 검증
        if (refreshToken.isBlank()) {
            throw new IllegalArgumentException(REFRESH_TOKEN.getMessage() + NOT_FOUND.getMessage());
        }

        return refreshToken;
    }

    /**
     * 헤더에서 RefreshToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Long validateAndExtractMemberIdFromRefreshToken(String refreshToken) throws InvalidRefreshTokenException {
        try {
            // refreshToken을 검증한다.
            Long memberIdInRefreshToken = Long.parseLong(JWT.require(Algorithm.HMAC512(secret))
                .withIssuer("LetMeKnow")
                .withSubject("refreshToken")
                .build()
                .verify(refreshToken)
                .getClaim("memberId")
                .asString());

            return memberIdInRefreshToken;
        }
        catch (JWTVerificationException e) {
            throw new InvalidRefreshTokenException(
                String.valueOf(REFRESH_TOKEN.getMessage()) + INVALID.getMessage());
        }
    }

    /**
     * accessToken을 Header에 작성한다.
     */
    public void setAccessTokenOnHeader(HttpServletResponse response, String token) {
        response.setHeader(ACCESS_TOKEN_HEADER, BEARER + token);
    }

    /**
     * refreshToken을 Header에 작성한다.
     */
    public void setRefreshTokenOnHeader(HttpServletResponse response, String token) {
        response.setHeader(REFRESH_TOKEN_HEADER, BEARER + token);
    }
}
