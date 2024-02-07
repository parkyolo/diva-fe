package com.diva.backend.song.entity;

import com.diva.backend.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SongRange extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_range_id")
    private Long id;

    @NotBlank
    @Column(name = "highest_note", length = 10)
    private String highestNote;

    @NotNull
    @Column(name = "highest_midi")
    private Integer highestMidi;

    @OneToOne(mappedBy = "songRange")
    private Song song;

    @Builder
    protected SongRange(String highestNote, Integer highestMidi, Song song) {
        this.highestNote = highestNote;
        this.highestMidi = highestMidi;

        this.song = song;
        this.song.setSongRange(this);
    }
}
