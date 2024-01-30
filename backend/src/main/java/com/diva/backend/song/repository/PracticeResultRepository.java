package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface PracticeResultRepository extends JpaRepository<PracticeResult, Long> {
    List<PracticeResult> findByMemberId(Long memberId);
    PracticeResult findByPostId(Long postId);

}
