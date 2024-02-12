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
import com.diva.backend.util.S3Uploader;
import com.querydsl.core.Tuple;
import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    @Override
    public MemberResponseDto getMemberInfo(String email) {
        Member member = memberRepository.findMemberByEmail(email)
                // NULL일 경우 exception 처리
                .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        // profileImg가 ture인 경우에는 S3에 저장된 이미지의 주소를 함께 넘겨줘야함
        String profileImgUrl;
        if(member.getProfileImg() != null && member.getProfileImg()) {
            profileImgUrl = "profileImg/" + member.getId() + "/profileImg.jpg";
        } else {
            profileImgUrl = null;
        }

        VocalRange vocalRange = member.getVocalRange();
//        VocalRange vocalRange = vocalRangeRepository.findByMemberId(member.getId());
        VocalRangeDto vocalRangeDto = null;
        if (vocalRange != null) {
            vocalRangeDto = VocalRangeDto.from(vocalRange);
        }
        return MemberResponseDto.from(member, vocalRangeDto, profileImgUrl);
    }

    @Transactional
    @Override
    public MemberInfoUpdateResponseDto updateInfo(String email, MemberInfoUpdateRequestDto requestDto, MultipartFile file) {
        Member member = memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        String nickname = requestDto.getNickname();
        Boolean profileImg = requestDto.getProfileImg();
        // 닉네임 유효성 확인
        if (!nickname.isBlank()) {
            member.setNickname(nickname);
        }
        member.setProfileImg(profileImg);
        Member newMember = memberRepository.save(member);

        // 이미지 파일이 유효한지 확인
        if(file.isEmpty()) {
            throw new RuntimeException("선택된 파일이 없음");
        }
        // 사용자가 프로필 이미지로 설정한 파일이 있다면 S3에 저장
        String profileImgUrl;
        if(profileImg != null && profileImg) {
            profileImgUrl = "profileImg/" + member.getId() + "/profileImg.jpg";
            s3Uploader.uploadFile(profileImgUrl, file);
        } else {
            profileImgUrl = null;
        }
        return MemberInfoUpdateResponseDto.from(newMember, profileImgUrl);
    }

    @Transactional
    @Override
    public List<MemberPostResponseDto> getMemberPosts(String email) {
        Member member = memberRepository.findMemberByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        Long memberId = member.getId();
        List<Post> list = postRepository.findAllByMemberIdWithSongWithPost(memberId);
        List<MemberPostResponseDto> memberPostList = new ArrayList<>();
        for (Post post : list) {
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
