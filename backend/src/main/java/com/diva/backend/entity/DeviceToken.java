//package com.diva.backend.entity;
//
//import com.diva.backend.dto.DeviceTokenDto;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import static jakarta.persistence.CascadeType.REMOVE;
//import static jakarta.persistence.FetchType.LAZY;
//
//@Entity
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class DeviceToken extends BaseEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "DEVICE_TOKEN_ID")
//    private long id;
//
//    @NotNull
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
//
//    @NotBlank
//    @Column(unique = true)
//    private String deviceToken;
//
//    @OneToOne(cascade = REMOVE, orphanRemoval = true)
//    @JoinColumn(name = "REFRESH_TOKEN_ID")
//    private RefreshToken refreshToken;
//
//    @Builder
//    protected DeviceToken(Member member, String deviceToken) {
//        this.member = member;
//        this.deviceToken = deviceToken;
//        member.getDeviceTokens().add(this);
//    }
//
//    // 연관관계 편의 메서드
//    public void setRefreshToken(RefreshToken refreshToken) {
//        this.refreshToken = refreshToken;
//    }
//
//    public void removeRefreshToken() {
//        this.refreshToken = null;
//    }
//
//    public void deleteDeviceToken() {
//        this.member.getDeviceTokens().remove(this);
//    }
//
//    // DTO
//    public DeviceTokenDto toDeviceTokenDto() {
//        return DeviceTokenDto.builder()
//            .id(this.id)
//            .memberId(this.member.getId())
//            .deviceToken(this.deviceToken)
//            .refreshTokenId(this.refreshToken.getId())
//            .build();
//    }
//}
