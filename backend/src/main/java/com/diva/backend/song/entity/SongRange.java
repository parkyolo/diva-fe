package com.diva.backend.song.entity;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.song.entity.Song;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Entity
@Getter
public class SongRange extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_range_id")
    private Long id;

    @NotBlank
    @Column(name = "highest_note", length = 10)
    private String highestNote;


    @OneToOne(mappedBy = "songRange")
    private Song song;
}
