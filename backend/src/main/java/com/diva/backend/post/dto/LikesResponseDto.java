package com.diva.backend.post.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikesResponseDto {

    @NotNull
    private Long id;

    @NotNull
    private Boolean liked;

    @Builder
    protected LikesResponseDto(Long id, Boolean liked) {
        this.id = id;
        this.liked = liked;
    }
}
