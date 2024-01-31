package com.diva.backend.member.repository;

import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.post.entity.PracticeResult;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VocalRangeRepository extends JpaRepository<VocalRange, Long> {
    VocalRange findByMemberId(Long memberId);

}
