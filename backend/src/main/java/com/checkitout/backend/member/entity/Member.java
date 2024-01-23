package com.checkitout.backend.member.entity;

import com.checkitout.backend.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @NotBlank
    @Column(name = "member_email", unique = true, length = 30)
    private String email;

    @NotBlank
    @Column(name = "nickname", length = 30)
    private String nickname;

    @NotBlank
    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name = "profile_img", length = 200)
    private String profileImg;

    @NotNull
    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member")
    private List<Like> likes = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "member")
    private List<SavedSong> savedSongs = new ArrayList<>();

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocal_range_id")
    private VocalRange vocalRange;

}
