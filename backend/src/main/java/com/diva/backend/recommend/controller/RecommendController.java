package com.diva.backend.recommend.controller;

import com.diva.backend.recommend.service.RecommendService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recommend/songs/{songId}/saved")
public class RecommendController {
    private final RecommendService recommendService;

    @Autowired
    public RecommendController(RecommendService recommendService) {
        this.recommendService = recommendService;
    }

    @PostMapping
    public ResponseEntity<?> saveSong(@PathVariable Long songId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        recommendService.saveSong(songId, memberId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<?> removeSavedSong(@PathVariable Long songId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        recommendService.removeSavedSong(songId, memberId);
        return ResponseEntity.noContent().build();
    }
}
