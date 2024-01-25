package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PracticeResultPostDto {
    @NotNull
    private Long id;

    @Builder
    protected PracticeResultPostDto(Long id) {
        this.id = id;
    }
}
