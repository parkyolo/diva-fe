package com.diva.backend.recommend.service;

import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.exception.NoVocalRangeException;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.recommend.dto.RecommendedSongsResponseDto;
import com.diva.backend.song.entity.Song;
import com.diva.backend.song.repository.SongRepository;
import com.diva.backend.util.RecommendArtist;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private final MemberRepository memberRepository;
    private final SongRepository songRepository;
    private final RecommendArtist recommendArtist;

    @Transactional
    @Override
    public List<RecommendedSongsResponseDto> getRecommendedSongs(Long memberId) throws NoSuchMemberException, NoVocalRangeException {
        Member member = memberRepository.findMemberById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        if(member.getVocalRange() == null) {
            throw new NoVocalRangeException("음역대 정보가 없습니다.");
        }

        String highestNote = member.getVocalRange().getHighestNote();
        int highestMidiMember = recommendArtist.noteToMidi(highestNote, true);

        int MAX_DIFF = recommendArtist.noteToMidi("G7", true) - recommendArtist.noteToMidi("C2", true);

        List<Song> songs = songRepository.findAll();
        return songs.stream()
                .filter(song -> song.getSongRange() != null)
                .map(song -> {
                    int highestMidiSong = recommendArtist.noteToMidi(song.getSongRange().getHighestNote(), true);
                    int diff = Math.abs(highestMidiMember - highestMidiSong);
                    int similarity = 100 - ((diff * 100) / MAX_DIFF);
                    return new RecommendedSongsResponseDto(song.getId(), song.getTitle(), song.getArtist(), song.getCoverImg(), similarity);
                })
                .sorted((song1, song2) -> song2.getSimilarity() - song1.getSimilarity())
                .limit(3)
                .collect(Collectors.toList());
    }

}
