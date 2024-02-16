package com.diva.backend.recommend.service.controller;

import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.exception.NoVocalRangeException;
import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;
import com.diva.backend.recommend.service.service.RecommendService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/recommend/songs", consumes = APPLICATION_JSON_VALUE)
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping
    public ResponseEntity<List<RecommendedSongsResponseDto>> getRecommendedSongs(HttpServletRequest request) throws NoSuchMemberException, NoVocalRangeException {
        Long memberId = (Long) request.getAttribute("memberId");
        List<RecommendedSongsResponseDto> songs = recommendService.getRecommendedSongs(memberId);
        return ResponseEntity.ok(songs);
    }

}
