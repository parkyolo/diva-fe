package com.diva.backend.heart.controller;

import com.diva.backend.heart.service.HeartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts/{postId}/heart")
public class HeartController {
    private final HeartService heartService;

    @Autowired
    public HeartController(HeartService heartService) {
        this.heartService = heartService;
    }

    @PostMapping
    public ResponseEntity<?> createHeart(@PathVariable Long postId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        heartService.createHeart(postId, memberId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteHeart(@PathVariable Long postId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        heartService.deleteHeart(postId, memberId);
        return ResponseEntity.noContent().build();
    }
}
