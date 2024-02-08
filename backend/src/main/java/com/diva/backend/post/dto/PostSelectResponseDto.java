package com.diva.backend.post.dto;

import com.diva.backend.heart.entity.Heart;
import com.diva.backend.post.entity.Post;
import com.google.firebase.database.annotations.NotNull;
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
    private Boolean liked;

    @NotNull
    private Integer heartCount;

    @Builder
    protected PostSelectResponseDto(Long postId, String content, MemberResponseDto member, PracticeResultResponseDto practiceResult, Boolean liked, Integer heartCount) {
        this.postId = postId;
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
        this.liked = liked;
        this.heartCount = heartCount;
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

        Boolean liked = false;
        for (Heart h : post.getHearts()) {
            if (h.getMember().getId().equals(post.getMember().getId())) {
                liked = h.getLiked();
                break;
            }
        }

        return PostSelectResponseDto.builder()
                .postId(post.getId())
                .content(post.getContent())
                .member(memberResponseDto)
                .practiceResult(practiceResultResponseDto)
                .liked(liked)
                .heartCount(post.getHearts().size())
            .build();
    }
}

