package com.checkitout.backend.post.entity;

import com.checkitout.backend.entity.BaseEntity;
import com.checkitout.backend.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PracticeResult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "post_id", unique = true)
    private Long id;

    @NotBlank
    @Column(name = "score")
    private int score;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

}
