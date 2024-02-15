package com.diva.backend.score.service;

import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.score.dto.ScorePythonRequestDto;
import com.diva.backend.score.dto.ScoreResponseDto;
import com.diva.backend.score.exception.ScoreServerErrorException;
import com.diva.backend.song.repository.PracticeResultRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScoreService {
    private final PracticeResultRepository practiceResultRepository;

    private final ObjectMapper objectMapper;

    @Value("${PYTHON.URL}")
    private String pythonUrl;

    public ScoreResponseDto calculateScores(Long memberId, Long practiceResultId, String artist, String title) throws IOException, IllegalArgumentException, ScoreServerErrorException {
        PracticeResult practiceResult = practiceResultRepository.findById(practiceResultId)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 연습 결과가 없습니다."));

        // practice result의 memberId와 요청한 memberId가 같은지 확인
        if (!practiceResult.getMember().getId().equals(memberId)) {
            throw new IllegalArgumentException("해당 연습 결과에 대한 권한이 없습니다.");
        }

        // 파이썬 서버로 채점 요청
        HttpURLConnection first = requestScoreAPI(practiceResultId, artist, title);

        // 첫번째 요청의 응답 코드가 200이 아닌 경우
        if (first.getResponseCode() != 200) {
            // 한번 더 요청
            HttpURLConnection second = requestScoreAPI(practiceResultId, artist, title);

            // 응답 코드 확인
            if (second.getResponseCode() != 200) {
                throw new ScoreServerErrorException("파이썬 서버로부터 채점 결과를 받아오지 못했습니다.");
            }

            // 두번째 요청의 응답 코드가 200인 경우
            first = second;
        }

        // 응답 코드가 200인 경우
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(first.getInputStream()));
        // bufferedReader -> String
        StringBuffer output = new StringBuffer();
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            output.append(line);
        }

        ScoreResponseDto scoreResponseDto = objectMapper.readValue(output.toString(), ScoreResponseDto.class);

        // 채점 결과 반영
        practiceResult.setScore(scoreResponseDto.getScore());

        // 채점 결과 저장
        PracticeResult saved = practiceResultRepository.save(practiceResult);

        // 채점 결과 반환
        return ScoreResponseDto.builder()
                .score(saved.getScore())
                .build();
    }

    // 파이썬 서버로 채점 요청
    private HttpURLConnection requestScoreAPI(Long practiceResultId, String artist, String title) throws IOException {
        log.info("Python Url is " + pythonUrl);
        URL url = new URL(pythonUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json;");
        connection.setRequestProperty("Accept", "application/json");

        // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.
        connection.setDoOutput(true);

        // POST 데이터를 넘겨주기 위한 OutputStream
        try (OutputStream os = connection.getOutputStream()) {
            os.write(
                    objectMapper.writeValueAsBytes(
                            ScorePythonRequestDto.builder()
                                    .id(practiceResultId)
                                    .artist(artist)
                                    .title(title)
                                .build()
                    )
            );
        }
        return connection;
    }
}
