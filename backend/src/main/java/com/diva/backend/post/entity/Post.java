package com.diva.backend.post.entity;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.member.entity.Member;
import com.diva.backend.post.dto.MemberResponseDto;
import com.diva.backend.post.dto.PostCreateResponseDto;
import com.diva.backend.post.dto.PracticeResultResponseDto;
import com.diva.backend.post.dto.SongResponseDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
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
    public Post(Long id, String content, Member member, PracticeResult practiceResult) {
        this.id = id;
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
    }

    @Builder
    public Post(String content, Member member, PracticeResult practiceResult) {
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
    }

    // 게시글 수정
    public void update(String content) {
        this.content = content;
    }

    // Post 엔티티를 PostResponseDto로 변환
    public PostCreateResponseDto toPostResponseDto() {
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .profileImg(member.getProfileImg())
            .build();

        PracticeResultResponseDto practiceResultResponseDto = PracticeResultResponseDto.builder()
                .practiceResultId(practiceResult.getId())
                .score(practiceResult.getScore())
                .song(SongResponseDto.builder()
                    .songId(practiceResult.getSong().getId())
                    .title(practiceResult.getSong().getTitle())
                    .artist(practiceResult.getSong().getArtist())
                    .build())
            .build();

        return PostCreateResponseDto.builder()
                .postId(this.id)
                .content(this.content)
                .member(memberResponseDto)
                .practiceResult(practiceResultResponseDto)
                .likesCount(likes.size())
            .build();
    }
}
