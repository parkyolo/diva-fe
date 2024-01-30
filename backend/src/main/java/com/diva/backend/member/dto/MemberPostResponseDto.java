package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberPostResponseDto {
    private final String nickname;
    private final String content;
    private final String songTitle;
    private final String artist;
    private final String recordUrl;

    @Builder
    public MemberPostResponseDto(String nickname, String content, String songTitle, String artist ,String recordUrl) {
        this.nickname = nickname;
        this.content = content;
        this.songTitle = songTitle;
        this.artist = artist;
        this.recordUrl = recordUrl;
    }

    public static MemberPostResponseDto from (Member member,Post post, PracticeResult practiceResult, String url) {
        return MemberPostResponseDto.builder()
            .nickname(member.getNickname())
            .content(post.getContent())
            .songTitle(practiceResult.getSong().getTitle())
            .artist(practiceResult.getSong().getArtist())
            .recordUrl(url)
            .build();
    }
}
