import { RealModeResponse, S3SongInfo } from '@/types/song';
import PlayMonitor from './PlayMonitor';
import LyricsComponent from './LyricsComponent';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { infoUrl, mrUrl } from '@/utils/getS3URL';
import { getMusicInfo } from '@/services/getMusicInfo';
import { parseLyricsTiming } from '@/utils/parseLyricsTiming';
import { parsePitchDuration } from '@/utils/parsePitchDuration';
import { LyricsInterface } from '@/types/lyrics';
import { PitchInterface } from '@/types/pitch';
import { resultPage } from '../home';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';

const RealMode = ({
  onModeChange,
  setResultId,
  songId,
  song,
}: {
  onModeChange: Function;
  setResultId: Dispatch<SetStateAction<number>>;
  songId: number;
  song: S3SongInfo;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const bpm = useRef<number>(0);
  const gap = useRef<number>(0);
  const musicUrl = useRef<string>(mrUrl(song));
  const [parsedLyrics, setLyrics] = useState<LyricsInterface[]>([]);
  const [parsedPitches, setPitches] = useState<PitchInterface[]>([]);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  let audioArray: BlobPart[] = [];

  const [isLoading, response, error, postRecorder] = useFetch<RealModeResponse>(
    req.sing.saveLiveResult,
  );

  const handleSeconds = () => {
    if (audioRef.current) setCurrentSeconds(audioRef.current.currentTime);
  };

  const handleAudioEnd = () => {
    mediaRecorder?.stop();
  };

  // post 요청이 끝나면 점수 페이지로 넘어감
  useEffect(() => {
    if (!!response && !isLoading) {
      try {
        setResultId(response.practiceResultId);
      } catch (err) {
        console.log(error);
      } finally {
        setTimeout(() => onModeChange(resultPage), 500);
      }
    }
  }, [response]);

  useEffect(() => {
    if (mediaRecorder) {
      // TODO: audio에 에코 입히기
      mediaRecorder.ondataavailable = (e) => {
        audioArray.push(e.data);
      };

      mediaRecorder.onstop = (e) => {
        const blob = new Blob(audioArray, {
          type: 'audio/mp3 codecs=opus',
        });
        const formData = new FormData();
        formData.append('file', blob);

        postRecorder({ songId: songId, record: formData });
      };

      mediaRecorder.start();
      audioRef.current?.play();
      audioRef.current?.addEventListener('timeupdate', handleSeconds);
      audioRef.current?.addEventListener('ended', handleAudioEnd);
    }
  }, [mediaRecorder]);

  useEffect(() => {
    getMusicInfo(infoUrl(song))
      .then((info) => info)
      .then((lyrics) => {
        const lyricsArray: string[] = lyrics.trim().split('\n');
        bpm.current = +lyricsArray[6].split(':')[1] * 4;
        gap.current = +lyricsArray[7].split(':')[1] / 1000;
        setLyrics(parseLyricsTiming(lyricsArray, bpm.current, gap.current));
        setPitches(parsePitchDuration(lyricsArray, bpm.current, gap.current));
      });

    // 마이크가 입력 받는 소리를 mediaStream 객체로 취득
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        // mediaStream으로 들어오는 오디오 데이터를 mediaRecorder로 저장
        setMediaRecorder(new MediaRecorder(stream));
      });

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleSeconds);
      audioRef.current?.removeEventListener('ended', handleAudioEnd);
    };
  }, []);

  return (
    <main className="flex flex-col">
      <PlayMonitor
        currentSeconds={currentSeconds}
        parsedPitches={parsedPitches}
      />
      <LyricsComponent
        currentSeconds={currentSeconds}
        parsedLyrics={parsedLyrics}
      />

      <audio ref={audioRef}>
        <source src={musicUrl.current} type={'audio/mp3'} />
      </audio>
    </main>
  );
};

export default RealMode;
