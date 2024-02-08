package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.song.entity.Song;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
public class MemberPostResponseDto {
    private final Long memberId;
    private final Long postId;
    private final String nickname;
    private final String content;
    private final String songTitle;
    private final String artist;
    private final Integer score;
    private final String recordUrl;

    @Builder
    public MemberPostResponseDto(Long memberId, Long postId, String nickname, String content, String songTitle, String artist, Integer score, String recordUrl) {
        this.memberId = memberId;
        this.postId = postId;
        this.nickname = nickname;
        this.content = content;
        this.songTitle = songTitle;
        this.artist = artist;
        this.score = score;
        this.recordUrl = recordUrl;
    }

    public static MemberPostResponseDto from (Member member,Post post, Song song, Integer score, String recordUrl) {
        return MemberPostResponseDto.builder()
            .memberId(member.getId())
            .postId(post.getId())
            .nickname(member.getNickname())
            .content(post.getContent())
            .songTitle(song.getTitle())
            .artist(song.getArtist())
            .score(score)
            .recordUrl(recordUrl)
            .build();
    }
}
