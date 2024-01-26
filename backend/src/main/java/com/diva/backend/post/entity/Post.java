package com.diva.backend.post.entity;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.member.entity.Member;
import com.diva.backend.post.dto.LikesDto;
import com.diva.backend.post.dto.MemberPostDto;
import com.diva.backend.post.dto.PostResponseDto;
import com.diva.backend.post.dto.PracticeResultPostDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(name = "content", length = 1000)
    private String content;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @OneToOne(mappedBy = "post")
    private PracticeResult practiceResult;

    @NotNull
    @OneToMany(mappedBy = "post")
    private List<Likes> likes = new ArrayList<>();

    @Builder
    public Post(Long id, String content, Member member, PracticeResult practiceResult, List<Likes> likes) {
        this.id = id;
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
        this.likes = likes;
    }

    public PostResponseDto toPostResponseDto() {
        return PostResponseDto.builder()
            .id(this.id)
            .content(this.content)
            .member(MemberPostDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileImg(member.getProfileImg())
                .build())
            .practiceResult(PracticeResultPostDto.builder()
                .id(practiceResult.getId())
                .build())
            .likes(likes.stream()
                .map((likes1) -> LikesDto.builder()
                .id(likes1.getId())
                .build())
                .collect(Collectors.toList()))
            .build();
    }
}
