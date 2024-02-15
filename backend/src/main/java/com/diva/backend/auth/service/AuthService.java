package com.diva.backend.auth.service;

import static com.diva.backend.enumstorage.messages.MemberMessages.MEMBER;
import static com.diva.backend.enumstorage.messages.Messages.NOT_EXISTS;
import static com.diva.backend.enumstorage.messages.Messages.SUCH;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.diva.backend.auth.dto.KakaoOAuthResponse;
import com.diva.backend.auth.entity.Token;
import com.diva.backend.auth.exception.NoSuchRefreshTokenInDBException;
import com.diva.backend.auth.repository.TokenRepository;
import com.diva.backend.dto.MemberFindDto;
import com.diva.backend.member.entity.Member;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.util.RandomNickname;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
// Transactional 붙이지 마
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final OAuthService oauthService;
//    private final DeviceTokenService deviceTokenService;
//    private final SubscriptionService subscriptionService;

//    private final DeviceTokenRepository deviceTokenRepository;
    private final TokenRepository tokenRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public MemberFindDto signIn(KakaoOAuthResponse kakaoOAuthResponse, HttpServletResponse response) throws NoSuchMemberException {
        try {
            // providerId로 Member를 찾는다.
            Member member = memberRepository.findByProviderId(kakaoOAuthResponse.getProviderId())
                .orElseThrow(() -> new NoSuchMemberException(SUCH.getMessage() + MEMBER.getMessage() + NOT_EXISTS.getMessage()));

            String[] jwts = jwtService.issueJwts(member.getId());

            Token token = Token.builder()
                .resourceAccessToken(kakaoOAuthResponse.getResourceAccessToken())
                .resourceRefreshToken(kakaoOAuthResponse.getResourceRefreshToken())
                .refreshToken(jwts[1])
                .member(member)
                .build();

            tokenRepository.save(token);

            setHeader(response, jwts);

            // member를 리턴한다.
            return member.toMemberFindDto();
        }
        // Member가 없다는건, 처음 로그인하는 회원이라는 뜻이다.
        catch (NoSuchMemberException e) {
            // Member를 생성한다.
            Member member = Member.builder()
                .providerId(kakaoOAuthResponse.getProviderId())
                .nickname(RandomNickname.getRandomNickname())
                .build();

            // Member를 저장한다.
            Member newMember = memberRepository.save(member);

            String[] jwts = jwtService.issueJwts(newMember.getId());

            Token token = Token.builder()
                    .resourceAccessToken(kakaoOAuthResponse.getResourceAccessToken())
                    .resourceRefreshToken(kakaoOAuthResponse.getResourceRefreshToken())
                    .refreshToken(jwts[1])
                    .member(newMember)
                    .build();

            // Token을 저장한다.
            tokenRepository.save(token);

            setHeader(response, jwts);

            // member를 리턴한다.
            return member.toMemberFindDto();
        }
    }

//    @Transactional
//    public String[] whenMemberSignIn_IssueJwts_StoreDeviceToken_SubscribeToAllTopics(String email) throws NoSuchMemberException
////            , String deviceToken)
////            , SubscriptionException
//    {
//        // email로 member를 찾는다.
//        Member member = memberRepository.findNotDeletedByEmailWithRefreshToken(email)
////        Member member = memberRepository.findNotDeletedByEmailWithRefreshTokenAndSubscriptionAndDeviceToken(email)
//            .orElseThrow(() -> new NoSuchMemberException(SUCH.getMessage() + MEMBER.getMessage() + NOT_EXISTS.getMessage()));
//
////        // 회원의 DeviceToken가 DB에 저장되어 있는지 확인하고, 없으면 저장한다.
////        DeviceToken deviceTokenEntity = deviceTokenService.storeDeviceToken(deviceToken, member);
//
//        String[] issuedJwts = jwtService.issueJwts(email);
////        , deviceTokenEntity);
//
////        subscriptionService.subscribeToAllTopics(deviceToken, member);
//
//        return issuedJwts;
//    }

    // Transactional 필요 없음
    public String[] reissueJwts(HttpServletRequest request) throws NoSuchMemberException, IllegalArgumentException, NoSuchRefreshTokenInDBException, JWTVerificationException {
//        , NoSuchDeviceTokenException
//        // Header에서 deviceToken 추출
//        String deviceToken = deviceTokenService.extractDeviceTokenFromHeader(request);

        // ToDo: 테스트 할 때만 끔 // 추출한 deviceToken이 유효한지 확인한다.
//        deviceTokenService.validateAndExtractDeviceToken(deviceToken);

        // Header에서 refreshToken 추출
        String refreshToken = jwtService.extractRefreshToken(request);
        Long memberIdFromRefreshToken = jwtService.validateAndExtractMemberIdFromRefreshToken(refreshToken);

        // token들을 재발급한다.
        return jwtService.reissueJwts(memberIdFromRefreshToken, refreshToken);
//        , deviceToken);
    }

    @Transactional
    public void signOut(HttpServletRequest request, HttpServletResponse response) throws IllegalArgumentException {
        // Header에서 Refresh Token 추출
        String refreshToken = jwtService.extractRefreshToken(request);

//        // Header에서 Device Token 추출
//        String deviceToken = deviceTokenService.extractDeviceTokenFromHeader(request);

        // Token Entity를 찾는다.
        tokenRepository.findByRefreshToken(refreshToken)
            .ifPresentOrElse(
                tokenEntity -> {
                    // Refresh Token이 DB에 있으면,
//                    // Refresh Token Id로 회원과 Device Token, Subscription을 찾는다.
//                    long refreshTokenEntityId = refreshTokenEntity.getId();
//                    memberRepository.findNotDeletedByRefreshTokenIdWithSubscriptionAndDeviceToken(refreshTokenEntityId)
//                        .ifPresent(member -> {
//                            // 구독 해제 처리
//                            subscriptionService.unsubscribeFromAllTopics(deviceToken, member);
//                        });

                    try {
                        // 로그아웃 요청 보내고
                        oauthService.requestLogOut(tokenEntity);
                    }
                    catch (IOException e) {
                        log.error(e.getMessage());
                    }

                    // Refresh Token을 지운다.
                    tokenRepository.delete(tokenEntity);
                },
                () -> {
//                    // Refresh Token이 DB에 없으면,
//                    deviceTokenRepository.findByDeviceToken(deviceToken)
//                        .ifPresent(deviceTokenEntity -> {
//                            // Device Token Id으로 회원과 Subscription을 찾는다.
//                            memberRepository.findNotDeletedByDeviceTokenIdWithSubscription(deviceTokenEntity.getId())
//                                .ifPresent(member -> {
//                                    // 구독 해제 처리
//                                    subscriptionService.unsubscribeFromAllTopics(deviceToken, member);
//                                });
//                        });
                });

//        // Device Token 삭제
//        deviceTokenRepository.deleteByDeviceToken(deviceToken);

        // ToDo: null 해도 되는지 테스트
        // Header에서 Access Token 삭제
        response.setHeader(JwtService.ACCESS_TOKEN_HEADER, null);
        // ToDo: null 해도 되는지 테스트
        // Header에서 Refresh Token 삭제
        response.setHeader(JwtService.REFRESH_TOKEN_HEADER, null);
    }

    private void setHeader(HttpServletResponse response, String[] jwts) {
        response.setHeader(JwtService.ACCESS_TOKEN_HEADER, JwtService.BEARER + jwts[0]);
        response.setHeader(JwtService.REFRESH_TOKEN_HEADER, JwtService.BEARER + jwts[1]);
    }
}
