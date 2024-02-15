package com.diva.backend.song.repository;

import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;
import com.diva.backend.song.entity.Song;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.diva.backend.song.entity.QSong.song;
import static com.diva.backend.song.entity.QSongRange.songRange;
import static com.diva.backend.util.RecommendArtist.MAX_DIFF;

@RequiredArgsConstructor
public class SongRepositoryImpl implements SongRepositoryQueryDsl {
    private final EntityManager em;

    @Override
    public List<RecommendedSongsResponseDto> getTop3SimilarSongs(int membersMaxMidi) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        NumberExpression<Double> similarity =
                Expressions.asNumber(100.0).subtract(
                        songRange.highestMidi.subtract(membersMaxMidi).abs().multiply(100.0).divide(MAX_DIFF)
                );

        List<Tuple> results = queryFactory
                .select(song, similarity)
                .from(song)
                .leftJoin(song.songRange, songRange).fetchJoin()
                .where(song.id.in(
                        JPAExpressions
                                .select(songRange.song.id)
                                .from(songRange)
                                .orderBy(similarity.desc())
                ))
                .orderBy(similarity.desc())
                .limit(7)
                .fetch();

        return results.stream()
                .map(tuple -> {
                    Song song1 = tuple.get(song);

                    return RecommendedSongsResponseDto.builder()
                            .songId(song1.getId())
                            .artist(song1.getArtist())
                            .title(song1.getTitle())
                            .coverImg(song1.getCoverImg())
                            .similarity((int) Math.round(tuple.get(similarity)))
                            .build();
                })
                .toList();
    }
}
