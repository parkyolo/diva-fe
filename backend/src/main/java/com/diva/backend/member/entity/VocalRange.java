package com.diva.backend.member.entity;

import com.diva.backend.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VocalRange extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vocal_range_id")
    private Long id;

    @NotBlank
    @Column(name = "highest_note", length = 10)
    private String highestNote;

    @NotBlank
    @Column(name = "lowest_note", length = 10)
    private String lowestNote;

    @OneToOne(mappedBy = "vocalRange")
    private Member member;

    @Builder
    protected VocalRange(String highestNote, String lowestNote) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
    }
}
