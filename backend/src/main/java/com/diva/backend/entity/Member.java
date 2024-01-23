//package com.diva.backend.entity;
//
//import com.diva.backend.auth.entity.OAuth2;
//import com.diva.backend.dto.MemberFindDto;
//import com.diva.backend.enumstorage.role.MemberRole;
//import com.diva.backend.enumstorage.status.MemberStatus;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//import static com.diva.backend.enumstorage.role.MemberRole.MEMBER;
//import static com.diva.backend.enumstorage.status.MemberStatus.ACTIVE;
//import static com.diva.backend.enumstorage.status.MemberStatus.DELETED;
//import static jakarta.persistence.GenerationType.IDENTITY;
//
//@Getter
//@Entity
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Member extends BaseEntity {
//    @Id
//    @GeneratedValue(strategy = IDENTITY)
//    @Column(name = "MEMBER_ID")
//    private Long id;
//
//    @NotBlank
//    @Column(unique = true)
//    private String email;
//
//    @NotBlank
//    private String nickname;
//
//    @JsonManagedReference
//    @NotNull
//    @OneToMany(mappedBy = "member")
//    private List<OAuth2> oAuth2s = new ArrayList<>();
//
////    @NotNull
////    @OneToMany(mappedBy = "member")
////    private Set<DeviceToken> deviceTokens = new HashSet<>();
//
////    @JsonManagedReference
////    @NotNull
////    @OneToMany(mappedBy = "member")
////    private Set<RefreshToken> refreshTokens = new HashSet<>();
//
//    @JsonManagedReference
//    @NotNull
//    @OneToMany(mappedBy = "member")
//    private Set<Notification> notifications = new HashSet<>();
//
//    @NotNull
//    @Enumerated(EnumType.STRING)
//    private MemberRole role;
//
//    @NotNull
//    @Enumerated(EnumType.STRING)
//    private MemberStatus status;
//
//    @Builder
//    protected Member(String nickname, String email) {
//        this.nickname = nickname;
//        this.email = email;
//        this.role = MEMBER;
//        this.status = ACTIVE;
//    }
//
//    //== 비즈니스 로직 ==//
//    public void deleteMember() {
//        this.status = DELETED;
//    }
//
//    //==연관관계 메소드==//
//    public void addOAuth2(OAuth2 oAuth2) {
//        oAuth2s.add(oAuth2);
//    }
//
////    public void addRefreshToken(RefreshToken refreshToken) {
////        this.refreshTokens.add(refreshToken);
////    }
//
////    public boolean removeRefreshToken(RefreshToken refreshToken) {
////        return this.refreshTokens.remove(refreshToken);
////    }
//
////    public void addDeviceToken(DeviceToken deviceToken) {
////        deviceTokens.add(deviceToken);
////    }
//
//    //==DTO==//
//    public MemberFindDto toMemberFindDto() {
//        return MemberFindDto.builder()
//                .id(id)
//                .email(email)
//                .nickname(nickname)
//            .build();
//    }
//}
