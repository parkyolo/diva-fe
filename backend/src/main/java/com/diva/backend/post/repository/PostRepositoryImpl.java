package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.diva.backend.post.entity.QPost.post;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryQueryDsl {

    private final EntityManager em;

    @Override
    public List<Post> findAllByPageId(Long pageId) {

        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return queryFactory
            .selectFrom(post)
            .leftJoin(post.member).fetchJoin()
            .leftJoin(post.practiceResult).fetchJoin()
            .leftJoin(post.likes).fetchJoin()
            .fetch();
    }

}
