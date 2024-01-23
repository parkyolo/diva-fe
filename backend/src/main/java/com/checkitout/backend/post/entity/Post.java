package com.checkitout.backend.post.entity;

import com.checkitout.backend.entity.BaseEntity;
import com.checkitout.backend.entity.Member;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "post_id", unique = true)
    private Long id;

    @Column(name = "content")
    private String content;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @OneToMany(mappedBy = "post")
    private List<Like> like = new ArrayList<>();

    @NotNull
    @OneToOne(mappedBy = "post")
    private PracticeResult practiceResult;

}
