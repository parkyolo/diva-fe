package com.diva.backend.member.entity;

import static com.diva.backend.enumstorage.role.MemberRole.MEMBER;
import static com.diva.backend.enumstorage.status.MemberStatus.ACTIVE;
import static com.diva.backend.enumstorage.status.MemberStatus.DELETED;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.diva.backend.auth.entity.OAuth2;
import com.diva.backend.dto.MemberFindDto;
import com.diva.backend.entity.BaseEntity;
import com.diva.backend.entity.Notification;
import com.diva.backend.enumstorage.role.MemberRole;
import com.diva.backend.enumstorage.status.MemberStatus;
import com.diva.backend.post.entity.Likes;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "member_id")
    private Long id;

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "member_id")
  private Long id;

    @NotBlank
    @Setter
    @Column(name = "nickname", length = 30)
    private String nickname;

    //@NotBlank
    @Column(name = "gender", length = 10)
    private String gender;

    @Setter
    @Column(name = "profile_img", length = 200)
    private String profileImg;

  @Column(name = "profile_img", length = 200)
  private String profileImg;

  @NotNull
  @Enumerated(EnumType.STRING)
  private MemberStatus status;

  @NotNull
  @Enumerated(EnumType.STRING)
  private MemberRole role;

  @JsonManagedReference
  @NotNull
  @OneToMany(mappedBy = "member")
  private List<OAuth2> oAuth2s = new ArrayList<>();

  @JsonManagedReference
  @NotNull
  @OneToMany(mappedBy = "member")
  private Set<Notification> notifications = new HashSet<>();

  @NotNull
  @OneToMany(mappedBy = "member")
  private List<Post> posts = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member")
    private List<PracticeResult> practiceResults = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member")
    private List<SavedSong> savedSongs = new ArrayList<>();

//    @NotNull
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "vocal_range_id")
//    private VocalRange vocalRange;

    @Builder
    protected Member(Long id, String nickname, String email, String profileImg, String gender) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.profileImg = profileImg;
        this.gender = gender;
//        this.vocalRange = vocalRange;
        this.role = MEMBER;
        this.status = ACTIVE;
    }

//    @NotNull
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "vocal_range_id")
//    private VocalRange vocalRange;

  @Builder
  protected Member(Long id, String nickname, String email, String profileImg, String gender) {
    this.id = id;
    this.nickname = nickname;
    this.email = email;
    this.profileImg = profileImg;
    this.gender = gender;
//        this.vocalRange = vocalRange;
    this.role = MEMBER;
    this.status = ACTIVE;
  }

  //== 비즈니스 로직 ==//
  public void deleteMember() {
    this.status = DELETED;
  }

  //==연관관계 메소드==//
  public void addOAuth2(OAuth2 oAuth2) {
    oAuth2s.add(oAuth2);
  }

  //==DTO==//
  public MemberFindDto toMemberFindDto() {
    return MemberFindDto.builder()
        .id(id)
        .email(email)
        .nickname(nickname)
        .build();
  }
}
