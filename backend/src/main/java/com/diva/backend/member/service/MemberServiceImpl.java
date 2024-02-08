package com.diva.backend.member.service;


import com.diva.backend.member.dto.*;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.member.repository.VocalRangeRepository;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.post.repository.PostRepository;
import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.entity.Song;
import com.diva.backend.song.repository.PracticeResultRepository;
import com.querydsl.core.Tuple;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final PracticeResultRepository practiceResultRepository;
    private final VocalRangeRepository vocalRangeRepository;

    @Transactional
    @Override
    public MemberResponseDto getMemberInfo(String email) {
        Member member = memberRepository.findMemberByEmail(email)
            // NULL일 경우 exception 처리
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        VocalRange vocalRange = member.getVocalRange();
//        VocalRange vocalRange = vocalRangeRepository.findByMemberId(member.getId());

        VocalRangeDto vocalRangeDto = null;
        if (vocalRange != null) {
            vocalRangeDto = VocalRangeDto.from(vocalRange);
        }
        return MemberResponseDto.from(member, vocalRangeDto);
    }

    @Transactional
    @Override
    public MemberInfoUpdateResponseDto updateInfo(String email, MemberInfoUpdateRequestDto requestDto) {
        Member member = memberRepository.findMemberByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        String nickname = requestDto.getNickname();
        if (!nickname.isBlank()) {
            member.setNickname(requestDto.getNickname());
        }
        member.setProfileImg(requestDto.getProfileImg());

        Member newMember = memberRepository.save(member);
        return MemberInfoUpdateResponseDto.builder()
            .nickname(newMember.getNickname())
            .profileImg(newMember.getProfileImg())
            .build();
    }

    @Transactional
    @Override
    public List<MemberPostResponseDto> getMemberPosts(String email) {
        Member member = memberRepository.findMemberByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        Long memberId = member.getId();
        List<Post> list = postRepository.findAllByMemberIdWithSongWithPost(memberId);
        List<MemberPostResponseDto> memberPostList = new ArrayList<>();
        for(Post post : list) {
            Song song = post.getSong();
            String songTitle = post.getSong().getTitle();
            String artist = post.getSong().getArtist();
            Integer score = post.getPracticeResult().getScore();
            Long practiceResultId = post.getPracticeResult().getId();
            String recordUrl = "PracticeResult/" + practiceResultId + "/" + artist
                + "-" + songTitle + ".mp3";
            memberPostList.add(MemberPostResponseDto.from(member, post, song, score, recordUrl));
        }
        return memberPostList;
    }
}
