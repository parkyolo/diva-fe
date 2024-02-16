package com.diva.backend.auth.service;

import com.diva.backend.auth.dto.KakaoOAuthResponse;
import com.diva.backend.auth.dto.KakaoTokenResponse;
import com.diva.backend.auth.dto.KakaoUserResponse;
import com.diva.backend.auth.entity.Token;
import com.diva.backend.auth.enumstorage.profile.SpringProfile;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {
    private final ObjectMapper objectMapper;

    @Value("${KAKAO.CLIENT.ID}")
    private String kakaoClientId;

    @Value("${KAKAO.CLIENT.SECRET}")
    private String kakaoClientSecret;

    @Value("${FRONTEND}")
    private String frontend;

    @Value("${FRONTEND.PORT}")
    private String frontendPort;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    public KakaoOAuthResponse requestKakao(String provider, String code, String requestUrl) throws IOException {
        KakaoTokenResponse kakaoTokenResponse = requestKakaoTokenResponse(provider, code, requestUrl);

        // Access Token을 이용해서 사용자 정보 요청
        KakaoUserResponse kakaoUserResponse = requestKakaoUserInfo(kakaoTokenResponse);
        log.info("providerId: " + kakaoUserResponse.getId());

        return KakaoOAuthResponse.builder()
            .registrationId(provider)
            .providerId(kakaoUserResponse.getId())
            .resourceAccessToken(kakaoTokenResponse.getAccess_token())
            .resourceRefreshToken(kakaoTokenResponse.getRefresh_token())
            .build();
    }

    private KakaoTokenResponse requestKakaoTokenResponse(String provider, String code, String requestUrl)
        throws IOException {
        // 7. Access Token 요청
        URL url = new URL("https://kauth.kakao.com/oauth/token");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.
        connection.setDoOutput(true);

        log.info("kakaoClientId: " + kakaoClientId);
        log.info("kakaoClientSecret: " + kakaoClientSecret);

        // POST 데이터를 넘겨주기 위한 OutputStream
        try (OutputStream os = connection.getOutputStream()) {
            String encoded = String.format("grant_type=authorization_code&client_id=%s&redirect_uri=%s/auth/login/oauth2/code/%s&code=%s&client_secret=%s",
                kakaoClientId,
                requestUrl,
                provider,
                code,
                kakaoClientSecret
            );
            byte[] input = encoded.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // 8. Access Token 발급
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuffer stringBuffer = new StringBuffer();
        String inputLine;

        while ((inputLine = bufferedReader.readLine()) != null)  {
            stringBuffer.append(inputLine);
        }
        bufferedReader.close();

        String response = stringBuffer.toString();

        // respons -> JSON
        KakaoTokenResponse kakaoTokenResponse = objectMapper.readValue(response, KakaoTokenResponse.class);
        return kakaoTokenResponse;
    }

    public void requestLogOut(Token tokenEntity) throws IOException {
        URL url = new URL("https://kapi.kakao.com/v1/user/logout");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded");
        connection.setRequestProperty("Authorization", "Bearer " + tokenEntity.getResourceAccessToken());
        connection.setDoOutput(true);

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuffer stringBuffer = new StringBuffer();
        String inputLine;

        while ((inputLine = bufferedReader.readLine()) != null)  {
            stringBuffer.append(inputLine);
        }
        bufferedReader.close();

        String response = stringBuffer.toString();
    }

    private KakaoUserResponse requestKakaoUserInfo(KakaoTokenResponse kakaoTokenResponse) throws IOException {
        // 요청
        URL url = new URL("https://kapi.kakao.com/v2/user/me");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        connection.setRequestProperty("Authorization", "Bearer " + kakaoTokenResponse.getAccess_token());

        // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.
        connection.setDoOutput(true);

        // 응답
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuffer stringBuffer = new StringBuffer();
        String inputLine;

        while ((inputLine = bufferedReader.readLine()) != null)  {
            stringBuffer.append(inputLine);
        }
        bufferedReader.close();

        String response = stringBuffer.toString();

        return objectMapper.readValue(response, KakaoUserResponse.class);
    }
}
