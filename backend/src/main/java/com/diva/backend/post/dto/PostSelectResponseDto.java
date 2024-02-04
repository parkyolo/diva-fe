package com.diva.backend.post.dto;

import com.diva.backend.post.entity.Post;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostSelectResponseDto {

    @NotNull
    private Long postId;

    private String content;

    @NotNull
    private MemberResponseDto member;

    @NotNull
    private PracticeResultResponseDto practiceResult;

    @NotNull
    private Integer likesCount;

    @Builder
    protected PostSelectResponseDto(Long postId, String content, MemberResponseDto member, PracticeResultResponseDto practiceResult, Integer likesCount) {
        this.postId = postId;
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
        this.likesCount = likesCount;
    }

    // Post 엔티티를 PostResponseDto로 변환
    public static PostSelectResponseDto toPostResponseDto(Post post) {
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .memberId(post.getMember().getId())
                .nickname(post.getMember().getNickname())
                .profileImg(post.getMember().getProfileImg())
            .build();

        PracticeResultResponseDto practiceResultResponseDto = PracticeResultResponseDto.builder()
                .practiceResultId(post.getPracticeResult().getId())
                .score(post.getPracticeResult().getScore())
                .song(SongResponseDto.builder()
                        .songId(post.getPracticeResult().getSong().getId())
                        .title(post.getPracticeResult().getSong().getTitle())
                        .artist(post.getPracticeResult().getSong().getArtist())
                        .coverImg(post.getPracticeResult().getSong().getCoverImg())
                    .build())
            .build();

        return PostSelectResponseDto.builder()
                .postId(post.getId())
                .content(post.getContent())
                .member(memberResponseDto)
                .practiceResult(practiceResultResponseDto)
                .likesCount(post.getLikes().size())
            .build();
    }
}
