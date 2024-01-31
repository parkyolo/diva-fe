package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostPaginationDto {
    @NotNull
    private Long postId;

    private String content;

    @Builder
    protected PostPaginationDto(Long postId, String content) {
        this.postId = postId;
        this.content = content;
    }
}
