package com.diva.backend.song.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import com.diva.backend.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;

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
