package com.diva.backend.auth.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.diva.backend.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(name = "UNIQUE_OAUTH2", columnNames = {"REGISTRATION_ID", "PROVIDER_ID"})
})
@NoArgsConstructor(access = PROTECTED)
public class OAuth2 {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @JsonBackReference
  @NotNull
  @ManyToOne(fetch = LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  // 우리가 정한 OAuth2.0 provider의 이름(Ex. kakao, naver)
  @NotBlank
  @Column(name = "REGISTRATION_ID")
  private String registrationId;

  // OAuth2.0 provider에서 제공하는 유저의 고유 Id
  @NotNull
  @Column(name = "PROVIDER_ID")
  private Long providerId;

  // OAuth2.0 provider에서 제공하는 AccessToken와 JWT Refresh Token
  @NotNull
  @OneToMany(mappedBy = "oAuth2")
  private List<Token> token = new ArrayList<>();

  @Builder
  protected OAuth2(Member member, String registrationId, Long providerId) {
    this.member = member;
    this.registrationId = registrationId;
    this.providerId = providerId;

    // 양방향 연관관계 설정
    member.addOAuth2(this);
  }

  // == 비즈니스 로직 == //
  public void addToken(Token token) {
    this.token.add(token);
  }
}
