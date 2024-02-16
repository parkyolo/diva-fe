package com.diva.backend.post.dto;

import com.diva.backend.post.entity.Post;
import com.google.firebase.database.annotations.NotNull;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostWithMemberAndPracticeResultResponseDto {

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

    private LocalDateTime createDate;
    private LocalDateTime lastModifiedDate;

    @Builder
    protected PostWithMemberAndPracticeResultResponseDto(Long postId, String content, MemberResponseDto member, PracticeResultResponseDto practiceResult, Boolean liked, Integer heartCount, LocalDateTime createDate, LocalDateTime lastModifiedDate) {
        this.postId = postId;
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
        this.liked = liked;
        this.heartCount = heartCount;
        this.createDate = createDate;
        this.lastModifiedDate = lastModifiedDate;
    }

    // Post 엔티티를 PostResponseDto로 변환
    public static PostWithMemberAndPracticeResultResponseDto toPostResponseDto(Post post, Long memberId) {
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

        Boolean liked = post.getHearts().stream().anyMatch(heart -> heart.getMember().getId().equals(memberId));
        LocalDateTime createDate = post.getCreatedDate();
        LocalDateTime lastModifiedDate = post.getLastModifiedDate();
        return PostWithMemberAndPracticeResultResponseDto.builder()
                .postId(post.getId())
                .content(post.getContent())
                .member(memberResponseDto)
                .practiceResult(practiceResultResponseDto)
                .liked(liked)
                .heartCount(post.getHeartCount())
                .createDate(createDate)
                .lastModifiedDate(lastModifiedDate)
            .build();
    }
}
