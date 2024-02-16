package com.diva.backend.member.entity;

import com.diva.backend.auth.entity.Token;
import com.diva.backend.dto.MemberFindDto;
import com.diva.backend.entity.BaseEntity;
import com.diva.backend.entity.Notification;
import com.diva.backend.enumstorage.role.MemberRole;
import com.diva.backend.enumstorage.status.MemberStatus;
import com.diva.backend.heart.entity.Heart;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.song.entity.SavedSong;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.diva.backend.enumstorage.role.MemberRole.MEMBER;
import static com.diva.backend.enumstorage.status.MemberStatus.ACTIVE;
import static com.diva.backend.enumstorage.status.MemberStatus.DELETED;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id 
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotNull
    @Column(name = "PROVIDER_ID")
    private Long providerId;

    @Setter
    @NotBlank
    @Column(name = "nickname", length = 30)
    private String nickname;

    @Setter
    @NotNull
    @Column(name = "profile_img")
    private Boolean profileImg = false;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @JsonManagedReference
    @NotNull
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens = new ArrayList<>();

    @JsonManagedReference
    @NotNull
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Notification> notifications = new HashSet<>();

    @NotNull
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Heart> hearts = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PracticeResult> practiceResults = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SavedSong> savedSongs = new ArrayList<>();

//    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocal_range_id")
    private VocalRange vocalRange;

    @Builder
    protected Member(Long providerId, String nickname) {
        this.providerId = providerId;
        this.profileImg = false;
        this.nickname = nickname;
        this.role = MEMBER;
        this.status = ACTIVE;
    }

    //== 비즈니스 로직 ==//
    public void deleteMember() {
        this.status = DELETED;
    }

    //==연관관계 메소드==//
    public void addToken(Token token) {
        this.tokens.add(token);
    }

    public void addPracticeResult(PracticeResult practiceResult) {
        this.practiceResults.add(practiceResult);
    }

    public void addPost(Post post) {
        this.posts.add(post);
    }

    //==DTO==//
    public MemberFindDto toMemberFindDto() {
        return MemberFindDto.builder()
            .id(id)
            .providerId(providerId)
            .nickname(nickname)
            .build();
    }

    public void updateMemberWhenVocalTest(VocalRange vocalRange) {
        this.vocalRange = vocalRange;
    }
}
