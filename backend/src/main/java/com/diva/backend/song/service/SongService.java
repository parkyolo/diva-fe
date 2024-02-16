package com.diva.backend.song.service;

import com.diva.backend.exception.NoPracticeResultException;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import java.util.List;

public interface SongService {
    List<SavedSongsResponseDto> getSavedSongs(Long memberId) throws NoSuchMemberException;

    List<PracticeResultResponseDto> getPracticeResults(Long memberId) throws NoSuchMemberException, NoPracticeResultException;
}
