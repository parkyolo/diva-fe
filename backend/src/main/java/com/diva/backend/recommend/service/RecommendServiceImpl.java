package com.diva.backend.recommend.service;

import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.exception.NoVocalRangeException;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;
import com.diva.backend.song.repository.SongRepository;
import com.diva.backend.util.RecommendArtist;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements
    com.diva.backend.recommend.service.service.RecommendService {

    private final MemberRepository memberRepository;
    private final SongRepository songRepository;

    @Transactional
    @Override
    public List<RecommendedSongsResponseDto> getRecommendedSongs(Long memberId) throws NoSuchMemberException, NoVocalRangeException {
        Member member = memberRepository.findMemberByIdWithVocalRange(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));

        if (member.getVocalRange() == null) {
            throw new NoVocalRangeException("음역대 정보가 없습니다.");
        }

        // 회원의 최고 음역대 midi 값
        int membersHighestMidi = member.getVocalRange().getHighestMidi();

        List<RecommendedSongsResponseDto> result = new ArrayList<>(10);
        songRepository.getTopSimilarSongs(membersHighestMidi, 1L, 7)
                .forEach(result::add);
        songRepository.getTopSimilarSongs(membersHighestMidi, 2L, 3)
                .forEach(result::add);

        return result;
    }
}
