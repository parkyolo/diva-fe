package com.diva.backend.song.service;

import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import java.util.List;

public interface SongService {
    List<SavedSongsResponseDto> getSavedSongs(String email);

    List<PracticeResultResponseDto> getPracticeResults(String email);
}
