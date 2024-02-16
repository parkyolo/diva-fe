package com.diva.backend.heart.controller;

import com.diva.backend.heart.service.HeartService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/posts/{postId}/heart", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class HeartController {

    private final HeartService heartService;

    @PostMapping
    public ResponseEntity<?> updateHeart(@PathVariable("postId") Long postId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        heartService.updateHeart(postId, memberId);
        return ResponseEntity.noContent().build();
    }
}
