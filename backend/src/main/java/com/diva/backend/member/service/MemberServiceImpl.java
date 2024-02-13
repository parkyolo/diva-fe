package com.diva.backend.member.service;


import com.diva.backend.exception.NoPostException;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.member.dto.*;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.repository.PostRepository;
import com.diva.backend.song.entity.Song;
import com.diva.backend.util.S3Uploader;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    @Override
    public MemberResponseDto getMemberInfo(Long memberId) throws NoSuchMemberException{
        Member member = memberRepository.findById(memberId)
                // NULL일 경우 exception 처리
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        // profileImg가 ture인 경우에는 S3에 저장된 이미지의 주소를 함께 넘겨줘야함
        String profileImgUrl;
        if (member.getProfileImg() != null && member.getProfileImg()) {
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
    public MemberInfoUpdateResponseDto updateInfo(Long memberId, MemberInfoUpdateRequestDto requestDto, MultipartFile file) throws NoSuchMemberException{
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        String nickname = requestDto.getNickname();
        Boolean profileImg = requestDto.getProfileImg();
        // 닉네임 유효성 확인
        if (!nickname.isBlank()) {
            member.setNickname(nickname);
        }

        String profileImgUrl = null;
        // 넘어온 이미지 파일이 없다 == 사진 변경 안함
        if (file == null || file.isEmpty()) {
            // 기존 프로필 이미지가 있는 경우
            if (profileImg) {
                profileImgUrl = "profileImg/" + member.getId() + "/profileImg.jpg";
            }
        } else { // 넘어온 이미지 파일이 있다 == 사진 변경 함
            member.setProfileImg(true);
            profileImgUrl = "profileImg/" + member.getId() + "/profileImg.jpg";
            s3Uploader.uploadFile(profileImgUrl, file);
        }

        Member newMember = memberRepository.save(member);
        return MemberInfoUpdateResponseDto.from(newMember, profileImgUrl);
    }

    @Transactional
    @Override
    public List<MemberPostResponseDto> getMemberPosts(Long memberId) throws NoSuchMemberException, NoPostException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
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
            memberPostList.add(MemberPostResponseDto.from(member, post, song, score, recordUrl, practiceResultId));
        }
        return memberPostList;
    }
}
