package com.diva.backend.member.repository;

import java.util.Optional;

public interface VocalRangeRepositoryQueryDsl {
    Optional<String> findMatchingArtistByMaxMidi(int highestMidi);
}
