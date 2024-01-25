package com.diva.backend.post.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostResponseDto {
    private Long id;
    private String content;
    private MemberPostDto member;
    private SongDto song;
    private PracticeResultPostDto practiceResult;
    private List<LikesDto> likes;

    @Builder
    protected PostResponseDto(Long id, String content, MemberPostDto member, SongDto song, PracticeResultPostDto practiceResult, List<LikesDto> likes) {
        this.id = id;
        this.content = content;
        this.member = member;
        this.song = song;
        this.practiceResult = practiceResult;
        this.likes = likes;
    }
}

