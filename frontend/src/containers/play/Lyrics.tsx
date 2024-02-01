import { lyricsInterface } from '@/types/lyrics';
import { parseLyricsTiming } from '@/utils/parseLyricsTiming';
import { RefObject, useEffect, useRef, useState } from 'react';
import { lyricsFile } from './10cm-폰서트';

const LyricsComponent = ({
  audioRef,
}: {
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  const lyricsArray = useRef<string[]>(lyricsFile.trim().split('\n'));
  const bpm = useRef<number>(0);
  const gap = useRef<number>(0);
  const parsedLyrics = useRef<lyricsInterface[]>([]);
  const [previousLyrics, setPreviousLyrics] = useState<lyricsInterface>();
  const [currentLyrics, setCurrentLyrics] = useState<lyricsInterface>();
  const [nextLyrics, setNextLyrics] = useState<lyricsInterface | null>();
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [lyricsIndex, setLyricsIndex] = useState<number>(0);

  useEffect(() => {
    if (
      lyricsIndex < parsedLyrics.current.length &&
      parsedLyrics.current[lyricsIndex].startSeconds <= currentSeconds
    ) {
      if (lyricsIndex + 1 < parsedLyrics.current.length)
        setNextLyrics(parsedLyrics.current[lyricsIndex + 1]);
      else setNextLyrics(null);
      if (currentLyrics) setPreviousLyrics(currentLyrics);
      setCurrentLyrics(parsedLyrics.current[lyricsIndex]);
      setLyricsIndex(lyricsIndex + 1);
    }
  }, [currentSeconds]);

  useEffect(() => {
    bpm.current = +lyricsArray.current[6].split(':')[1] * 4;
    gap.current = +lyricsArray.current[7].split(':')[1] / 1000;
    parsedLyrics.current = parseLyricsTiming(
      lyricsArray.current,
      bpm.current,
      gap.current,
    );
    if (!!audioRef.current) {
      audioRef.current?.addEventListener('timeupdate', () => {
        if (audioRef.current?.currentTime)
          setCurrentSeconds(audioRef.current?.currentTime);
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="text-gray ">{previousLyrics?.lyrics}</div>
        <div className="text-xl">{currentLyrics?.lyrics}</div>
        <div className="text-gray">{nextLyrics?.lyrics}</div>
      </div>
    </>
  );
};

export default LyricsComponent;
