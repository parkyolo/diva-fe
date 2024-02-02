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

    public PostSelectResponseDto(Post post) {
        this.postId = post.getId();
        this.content = post.getContent();
        this.member = new MemberResponseDto(
            post.getMember().getId(),
            post.getMember().getNickname(),
            post.getMember().getProfileImg()
        );
        if(post.getPracticeResult() != null) {
            this.practiceResult = new PracticeResultResponseDto(
                post.getPracticeResult().getId(),
                post.getPracticeResult().getScore(),
                new SongResponseDto(
                    post.getPracticeResult().getSong().getId(),
                    post.getPracticeResult().getSong().getTitle(),
                    post.getPracticeResult().getSong().getArtist(),
                    post.getPracticeResult().getSong().getCoverImg()
                )
            );
        }
        this.likesCount = post.getLikes().size();
    }
}
