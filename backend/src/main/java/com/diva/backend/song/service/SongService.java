package com.diva.backend.song.service;

import com.diva.backend.member.dto.SavedSongsResponseDto;
import java.util.List;

public interface SongService {
    List<SavedSongsResponseDto> getSavedSongs(String email);

}
