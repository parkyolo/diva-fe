package com.diva.backend.song.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Song extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "song_id")
    private Long id;

    @NotBlank
    @Column(name = "song_title", length = 50)
    private String title;

    @NotBlank
    @Column(name = "artist", length = 50)
    private String artist;

    @NotBlank
    @Column(name = "cover_img", length = 200)
    private String coverImg;

    @NotBlank
    @Column(name = "lyrics", length = 10000)
    private String lyric;

    @NotBlank
    @Column(name = "mr_url", length = 300)
    private String mrUrl;

//    @NotNull
    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_range_id")
    private SongRange songRange;

    @NotNull
    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PracticeResult> practiceResults = new ArrayList<>();

    @NotNull
    @OneToMany(mappedBy = "song" , cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();

    @Builder
    protected Song(String title, String artist, String coverImg, String lyric, String mrUrl) {
        this.title = title;
        this.artist = artist;
        this.coverImg = coverImg;
        this.lyric = lyric;
        this.mrUrl = mrUrl;
    }

    //==연관관계 메소드==//
    public void addPracticeResult(PracticeResult practiceResult) {
        this.practiceResults.add(practiceResult);
    }

    public void addPost(Post post) {
        this.posts.add(post);
    }
}
