package com.diva.backend.member.repository;

import com.diva.backend.member.entity.VocalRange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocalRangeRepository extends JpaRepository<VocalRange, Long> {
    VocalRange findByMemberId(Long memberId);

    String findMatchingArtistByMaxMidi(int highestMidi);
}
