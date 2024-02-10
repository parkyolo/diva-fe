package com.diva.backend.score.controller;

import com.diva.backend.score.dto.ScoreRequestDto;
import com.diva.backend.score.dto.ScoreResponseDto;
import com.diva.backend.score.exception.ScoreServerErrorException;
import com.diva.backend.score.service.ScoreService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/scores/v1", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ScoreRestController {
    private final ScoreService scoreService;

    @PostMapping
    public ResponseEntity<?> getScores(@RequestBody @Valid ScoreRequestDto scoreRequestDto, HttpServletRequest request) throws IOException, IllegalArgumentException, ScoreServerErrorException {
        Long memberId = (Long) request.getAttribute("memberId");
        Long practiceResultId = scoreRequestDto.getId();
        String artist = scoreRequestDto.getArtist();
        String title = scoreRequestDto.getTitle();

        ScoreResponseDto scoreResponseDto = scoreService.getScores(memberId, practiceResultId, artist, title);

        return ResponseEntity.ok(scoreResponseDto);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
