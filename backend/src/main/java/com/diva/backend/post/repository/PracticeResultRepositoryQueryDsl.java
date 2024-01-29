package com.diva.backend.post.repository;

import com.diva.backend.post.entity.PracticeResult;

import java.util.List;

public interface PracticeResultRepositoryQueryDsl {
    List<PracticeResult> noOffsetPracticeResultWithMemberAndSongAndPost();
}
