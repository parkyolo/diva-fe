package com.checkitout.backend.member.entity;

import com.checkitout.backend.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
