package com.diva.backend.post.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostUpdateRequestDto {

    private String content;

    @Builder
    protected PostUpdateRequestDto(String content) {
        this.content = content;
    }
}
