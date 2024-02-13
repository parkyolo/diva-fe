import { useEffect, useRef, useState } from 'react';
import LyricsComponent from './LyricsComponent';
import { S3SongInfo } from '@/types/song';
import PlayMonitor from './PlayMonitor';
import { LyricsInterface } from '@/types/lyrics';
import { parseLyricsTiming } from '@/utils/parseLyricsTiming';
import { PitchInterface } from '@/types/pitch';
import { parsePitchDuration } from '@/utils/parsePitchDuration';
import { getMusicInfo } from '@/services/getMusicInfo';
import { useFetch } from '@/hooks/useFetch';
import { infoUrl, mrUrl } from '@/utils/getS3URL';
import { req } from '@/services';

const TutorialMode = ({
  onModeChange,
  song,
}: {
  onModeChange: Function;
  song: S3SongInfo;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playtime, setPlayTime] = useState<number>(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const bpm = useRef<number>(0);
  const gap = useRef<number>(0);

  const [parsedLyrics, setLyrics] = useState<LyricsInterface[]>([]);
  const [parsedPitches, setPitches] = useState<PitchInterface[]>([]);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const musicUrl = useRef<string>(mrUrl(song));

  let audioArray: BlobPart[] = [];

  // const [isLoading, songInfo, error, getSongInfo] = useFetch<S3SongInfo>(
  //   req.sing.tutorial,
  // );

  useEffect(() => {
    if (mediaRecorder && currentSeconds && playtime) {
      if (currentSeconds >= playtime) {
        mediaRecorder.stop();
        onModeChange(0b11);
      }
    }
  }, [currentSeconds]);

  const handleSeconds = () => {
    if (audioRef.current) setCurrentSeconds(audioRef.current.currentTime);
  };

  useEffect(() => {
    getMusicInfo(infoUrl(song))
      .then((info) => info)
      .then((lyrics) => {
        const lyricsArray: string[] = lyrics.trim().split('\n');
        bpm.current = +lyricsArray[6].split(':')[1] * 4;
        gap.current = +lyricsArray[7].split(':')[1] / 1000;
        setLyrics(parseLyricsTiming(lyricsArray, bpm.current, gap.current));
        setPitches(parsePitchDuration(lyricsArray, bpm.current, gap.current));

        audioRef.current?.play();
        audioRef.current?.addEventListener('timeupdate', handleSeconds);
      });

    // 마이크가 입력 받는 소리를 mediaStream 객체로 취득
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        // mediaStream으로 들어오는 오디오 데이터를 mediaRecorder로 저장
        setMediaRecorder(new MediaRecorder(stream));

        if (mediaRecorder) {
          mediaRecorder.ondataavailable = (e) => {
            audioArray.push(e.data);
          };

          mediaRecorder.onstop = (e) => {
            const blob = new Blob(audioArray, {
              type: 'audio/mp3 codecs=opus',
            });
            const formData = new FormData();
            formData.append('audio', blob);

            // TODO: 녹음이 중지되면 homePage로 넘어가기
          };

          mediaRecorder.start();
        }
      });

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleSeconds);
      mediaRecorder?.stop();
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

export default TutorialMode;
