package com.diva.backend.score.controller;

import com.diva.backend.dto.Response;
import com.diva.backend.score.dto.ScoreRequestDto;
import com.diva.backend.score.dto.ScoreResponseDto;
import com.diva.backend.score.exception.ScoreServerErrorException;
import com.diva.backend.score.service.ScoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.diva.backend.enumstorage.response.Status.SUCCESS;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/scores/v1", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
// 클래스 전체에 @Transactional 넣지 마세요.
public class ScoreRestController {
    private final ScoreService scoreService;

    private final ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<?> calculateScores(@RequestBody @Valid ScoreRequestDto scoreRequestDto, HttpServletRequest request) throws IOException, IllegalArgumentException, ScoreServerErrorException {
        Long memberId = (Long) request.getAttribute("memberId");
        Long practiceResultId = scoreRequestDto.getId();
        String artist = scoreRequestDto.getArtist();
        String title = scoreRequestDto.getTitle();

        ScoreResponseDto scoreResponseDto = scoreService.calculateScores(memberId, practiceResultId, artist, title);

        return ResponseEntity.ok(
                Response.builder()
                        .status(SUCCESS.getStatus())
                        .data(objectMapper.writeValueAsString(scoreResponseDto))
                        .build()
        );
    }

    @ExceptionHandler({IllegalArgumentException.class, MethodArgumentNotValidException.class})
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(
                Response.builder()
                        .status(SUCCESS.getStatus())
                        .message(e.getMessage())
                .build()
        );
    }
}
