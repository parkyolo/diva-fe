package com.diva.backend.song.entity;

import com.diva.backend.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
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
    @Column(name = "playtime", length = 10)
    private String playtime;

    @NotNull
    @Column(name = "release_date")
    private LocalDateTime releaseDate;

    @NotBlank
    @Column(name = "mr_url", length = 200)
    private String mrUrl;


    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_range_id")
    private SongRange songRange;

}
