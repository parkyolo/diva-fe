package com.diva.backend.heart.controller;

import com.diva.backend.heart.service.HeartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/posts/{postId}/heart", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class HeartController {
    private final HeartService heartService;

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
