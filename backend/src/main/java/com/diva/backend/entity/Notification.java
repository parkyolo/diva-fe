package com.diva.backend.entity;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

import com.diva.backend.dto.NotificationDtoWithBoardViewUrlAndArticleDto;
import com.diva.backend.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Notification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NOTIFICATION_ID")
    private Long id;

    @JsonBackReference
    @ManyToOne(fetch = LAZY, targetEntity = Member.class)
    @JoinColumn(name = "MEMBER_ID", insertable = false, updatable = false)
    private Member member;

    @Column(name = "MEMBER_ID", nullable = false)
    private Long memberId;

    @Column(name = "BOARD_ID", nullable = false)
    private Long boardId;
    @JoinColumn(name = "BOARD_ID", insertable = false, updatable = false)
    @ManyToOne(fetch = LAZY, targetEntity = Board.class)
    private Board board;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "ARTICLE_ID")
    private Article article;

    @NotNull
    private Boolean isRead;

    @Builder
    protected Notification(Long memberId, Board board, Article article) {
        this.memberId = memberId;
        this.boardId = board.getId();
        this.article = article;

        this.article.addNotification(this);

        this.isRead = false;
    }

    //== Dto ==//
    public NotificationDtoWithBoardViewUrlAndArticleDto toDtoWithBoardViewUrlAndArticleDto() {
        return NotificationDtoWithBoardViewUrlAndArticleDto.builder()
            .id(this.id)
            .memberId(this.memberId)
            .boardName(this.board.getBoardName())
            .boardViewUrl(this.board.getBoardViewUrl())
            .articleDto(this.article.toDto())
            .isRead(this.isRead)
            .build();
    }
}
