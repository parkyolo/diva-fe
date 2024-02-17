package com.diva.backend.post.entity;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.member.entity.Member;
import com.diva.backend.post.dto.PracticeResultResponseDto;
import com.diva.backend.song.entity.Song;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PracticeResult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "practice_result_id")
    private Long id;

    //@NotNull
    @ColumnDefault("0")
    @Setter
    @Column(name = "score")
    private Integer score;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    @Setter
    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    protected PracticeResult(Integer score, Member member, Song song) {
        this.score = score;
        this.member = member;
        this.member.addPracticeResult(this);
        this.song = song;
        this.song.addPracticeResult(this);
    }

    public PracticeResultResponseDto toPracticeResultPostDto() {
        return PracticeResultResponseDto.builder()
                .practiceResultId(this.id)
                .score(this.score)
            .build();
    }

    //== 연관관계 메서드 ==//
    public void removePost() {
        this.post = null;
    }
}
