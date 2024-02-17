package com.diva.backend.sing.entity;

import static jakarta.persistence.GenerationType.IDENTITY;

import com.diva.backend.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArtistInfo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "gender", length = 10)
    private String gender;

    @Column(name="name")
    private String name;

    @Column(name="min_note", length = 5)
    private String minNote;

    @Column(name="min_midi")
    private Integer minMidi;

    @Column(name="max_note", length = 5)
    private String maxNote;

    @Column(name="max_midi")
    private Integer maxMidi;

}
