package com.diva.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleDto {
    @NotNull
    private long id;

    @NotNull
    private long boardId;

    @NotBlank
    private String articleName;

    @NotNull
    private long articleLink;

    @NotBlank
    private String createdAt;

    @NotNull
    private Boolean isNotice;

    @Builder
    protected ArticleDto(long id, long boardId, String articleName, long articleLink, String createdAt, Boolean isNotice) {
        this.id = id;
        this.boardId = boardId;
        this.articleName = articleName;
        this.articleLink = articleLink;
        this.createdAt = createdAt;
        this.isNotice = isNotice;
    }
}
