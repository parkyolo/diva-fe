package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.song.entity.Song;
import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
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
    private final LocalDateTime createDate;
    private final LocalDateTime lastModifiedDate;
    private final String coverImg;
    private final Long practiceResultId;

    @Builder
    public MemberPostResponseDto(Long memberId, Long postId, String nickname, String content,
        LocalDateTime createDate, LocalDateTime lastModifiedDate, String songTitle, String artist,
        String coverImg, Integer score, String recordUrl, Long practiceResultId) {
        this.memberId = memberId;
        this.postId = postId;
        this.nickname = nickname;
        this.content = content;
        this.createDate = createDate;
        this.lastModifiedDate = lastModifiedDate;
        this.songTitle = songTitle;
        this.artist = artist;
        this.coverImg = coverImg;
        this.score = score;
        this.recordUrl = recordUrl;
        this.practiceResultId = practiceResultId;
    }

    public static MemberPostResponseDto from (Member member,Post post, Song song, Integer score, String recordUrl, Long practiceResultId) {
        return MemberPostResponseDto.builder()
            .memberId(member.getId())
            .postId(post.getId())
            .nickname(member.getNickname())
            .content(post.getContent())
            .createDate(post.getCreatedDate())
            .lastModifiedDate(post.getLastModifiedDate())
            .songTitle(song.getTitle())
            .artist(song.getArtist())
            .coverImg(song.getCoverImg())
            .score(score)
            .recordUrl(recordUrl)
            .practiceResultId(practiceResultId)
            .build();
    }
}
