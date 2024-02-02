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
import com.diva.backend.song.repository.PracticeResultRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

        return MemberResponseDto.builder()
            .nickname(member.getNickname())
            .email(member.getEmail())
            .profileImg(member.getProfileImg())
            .vocalRange(vocalRangeDto)
            .build();
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
        if(requestDto.getProfileImg()) {
            member.setProfileImg(true);
        }

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
        List<Post> list = postRepository.findAllByMemberId(memberId);
        List<MemberPostResponseDto> memberPostList = new ArrayList<>();
        for (Post post : list) {
            PracticeResult practiceResult = practiceResultRepository.findByPostId(post.getId());
            String url = "PracticeResult/" + practiceResult.getId() + "/" + practiceResult.getSong().getArtist()
                + "-" + practiceResult.getSong().getTitle() + "_vocal.wav";
            memberPostList.add(MemberPostResponseDto.from(member,post, practiceResult, url));
        }
        return memberPostList;
    }
}
