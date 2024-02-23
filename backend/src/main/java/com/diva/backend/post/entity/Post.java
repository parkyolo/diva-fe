package com.diva.backend.post.entity;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.heart.entity.Heart;
import com.diva.backend.member.entity.Member;
import com.diva.backend.song.entity.Song;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @NotNull
    @Column(name = "content", length = 1000)
    private String content;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @OneToOne(mappedBy = "post")
    private PracticeResult practiceResult;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Heart> hearts = new ArrayList<>();

    @NotNull
    @Column(name = "heart_count")
    private Integer heartCount = 0;

    @Builder
    protected Post(String content, Member member, PracticeResult practiceResult, Song song, List<Heart> hearts, Integer heartCount) {
        this.content = (content != null) ? content : "";
        this.member = member;
        this.member.addPost(this);
        this.setPracticeResult(practiceResult);
        this.song = song;
        this.song.addPost(this);
        this.hearts = hearts;
        this.heartCount = heartCount;
    }

    // 연관관계 메소드
    public void setPracticeResult(PracticeResult practiceResult) {
        this.practiceResult = practiceResult;
        practiceResult.setPost(this);
    }

    public void setHeartCount(int heartCount) {
        this.heartCount = heartCount;
    }

    // 게시글 수정
    public void update(String content) {
        this.content = (content != null) ? content : "";
    }
}
