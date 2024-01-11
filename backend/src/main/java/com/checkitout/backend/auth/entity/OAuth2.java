package com.checkitout.backend.auth.entity;

import static jakarta.persistence.FetchType.LAZY;

import com.checkitout.backend.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OAuth2 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    // 우리가 정한 OAuth2.0 provider의 이름(Ex. kakao, naver)
    @NotBlank
    private String registrationId;

    // OAuth2.0 provider에서 제공하는 유저의 고유 Id
    @NotNull
    private Long providerId;

    // OAuth2.0 provider에서 제공하는 AccessToken
    @NotBlank
    private String accessToken;

    @Builder
    protected OAuth2(Member member, String registrationId, Long providerId, String accessToken) {
        this.member = member;
        this.registrationId = registrationId;
        this.providerId = providerId;
        this.accessToken = accessToken;

        // 양방향 연관관계 설정
        member.addOAuth2(this);
    }
}
