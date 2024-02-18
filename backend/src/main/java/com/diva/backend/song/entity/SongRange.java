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

    @NotNull
    @Column(name = "genre")
    private Long genre;

    @OneToOne(mappedBy = "songRange")
    private Song song;

    /**
     * @param highestNote
     * @param highestMidi
     * @param genre 가요는 1, 팝은 2
     * @param song
     */
    @Builder
    protected SongRange(String highestNote, Integer highestMidi, Long genre, Song song) {
        this.highestNote = highestNote;
        this.highestMidi = highestMidi;
        this.genre = genre;

        this.song = song;
        this.song.setSongRange(this);
    }
}
