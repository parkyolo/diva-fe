package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PracticeResultRepository extends JpaRepository<PracticeResult, Long> {
    Optional<PracticeResult> findByIdWithSong(Long id);
    List<PracticeResult> findByMemberId(Long memberId);
    Optional<PracticeResult> findByPostIdWithMemberAndPost(Long postId);
    PracticeResult findByPostId(Long postId);

    PracticeResult findPracticeResultById(Long practiceResultId);
}
