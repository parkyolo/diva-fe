package com.diva.backend.auth.entity;

import com.diva.backend.member.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@NoArgsConstructor(access = PROTECTED)
public class Token {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    // OAuth2.0 provider에서 제공하는 AccessToken
    @NotBlank
    @Column(unique = true)
    private String resourceAccessToken;

    @NotBlank
    @Column(unique = true)
    private String resourceRefreshToken;

    // 우리 서버에서 발급한 JWT Refresh Token
    @NotBlank
    @Column(unique = true, columnDefinition = "varchar(400)")
    private String refreshToken;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder
    protected Token(String resourceAccessToken, String resourceRefreshToken, String refreshToken, Member member) {
        this.resourceAccessToken = resourceAccessToken;
        this.resourceRefreshToken = resourceRefreshToken;
        this.refreshToken = refreshToken;
        this.member = member;

        this.member.addToken(this);
    }

    // == 비즈니스 로직 == //
    public void updateResourceAccessToken(String resourceAccessToken) {
        this.resourceAccessToken = resourceAccessToken;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
