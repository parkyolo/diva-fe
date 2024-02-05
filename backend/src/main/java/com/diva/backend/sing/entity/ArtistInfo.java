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

    @Column(name="min_pitch")
    private String minPitch;

    @Column(name="min_midi")
    private int minMidi;

    @Column(name="max_pitch")
    private String maxPitch;

    @Column(name="max_midi")
    private int maxMidi;

}
