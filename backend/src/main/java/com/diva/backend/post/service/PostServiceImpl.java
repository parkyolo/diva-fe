package com.diva.backend.post.service;

import com.diva.backend.exception.NoPostException;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.post.dto.PostSelectResponseDto;
import com.diva.backend.post.dto.PostWithMemberAndPracticeResultResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.post.repository.PostRepository;
import com.diva.backend.song.entity.Song;
import com.diva.backend.song.repository.PracticeResultRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final PracticeResultRepository practiceResultRepository;

    // 전체 게시글 조회
    @Override
    @Transactional
    public List<PostWithMemberAndPracticeResultResponseDto> getPosts(HttpServletRequest request, Long postId, int pageSize) {
        List<Post> posts = postRepository.paginationNoOffset(postId, pageSize);
        Long memberId = (Long) request.getAttribute("memberId");

        return posts.stream()
            .map(post -> PostWithMemberAndPracticeResultResponseDto.toPostResponseDto(post, memberId))
            .collect(Collectors.toList());
    }

    // 실전모드 결과로 게시글 조회
    @Transactional
    public PostSelectResponseDto getPostByPracticeResultId(Long practiceResultId) throws NoPostException {
        Post post = postRepository.findByPracticeResultId(practiceResultId)
                .orElseThrow(() -> new NoPostException("해당 ID의 게시글이 존재하지 않습니다."));

        return PostSelectResponseDto.builder()
                .postId(post.getId())
                .content(post.getContent())
                .memberId(post.getMember().getId())
                .practiceResultId(post.getPracticeResult().getId())
                .songId(post.getSong().getId())
                .liked(post.getHeartCount() > 0)
                .heartCount(post.getHeartCount())
                .createdDate(post.getCreatedDate())
            .build();
    }

    // 게시글 작성
    @Override
    @Transactional
    public void createPost(Long memberId, String content, Long practiceResultId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다."));

        // Practice Result와 Song을 Join해서 가져온다.
        PracticeResult practiceResult = practiceResultRepository.findByIdWithSong(practiceResultId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 실전모드 결과가 존재하지 않습니다."));

        Song song = practiceResult.getSong();

        Long practiceResultMemberId = practiceResult.getMember().getId();
        if(!practiceResultMemberId.equals(memberId))  {
            throw new IllegalArgumentException("작성자의 회원 ID가 일치하지 않습니다.");
        }

        Post post = Post.builder()
                .content(content)
                .member(member)
                .practiceResult(practiceResult)
                .song(song)
                .heartCount(0)
            .build();

        postRepository.save(post);
    }

    // 게시글 삭제
    @Override
    @Transactional
    public void deletePost(Long postId, Long memberId) {
        // postId를 갖고있는 practice result를 member와 post를 함께 찾는다.
        PracticeResult practiceResult = practiceResultRepository.findByPostIdWithMemberAndPost(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 실전모드 결과가 존재하지 않습니다."));

        Member member = practiceResult.getMember();
        Post post = practiceResult.getPost();

        // member의 id와 post의 member id가 같은지 확인한다.
        if (!member.getId().equals(memberId)) {
            throw new IllegalArgumentException("게시글을 삭제할 수 있는 권한이 없습니다.");
        }

        // practice result에서 post를 삭제한다.
        practiceResult.removePost();

        postRepository.delete(post);
    }

    // 게시글 수정
    @Override
    @Transactional
    public PostUpdateRequestDto updatePost(Long postId, Long memberId, PostUpdateRequestDto requestDto) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 존재하지 않습니다." + postId));

        Long postMemberId = post.getMember().getId();
        if (!postMemberId.equals(memberId)) {
            throw new IllegalArgumentException("게시글을 수정할 수 있는 권한이 없습니다.");
        }

        post.update(requestDto.getContent());
        return requestDto;
    }

}
