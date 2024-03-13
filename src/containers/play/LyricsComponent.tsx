import { LyricsInterface } from '@/types/lyrics';
import { useEffect, useRef, useState } from 'react';

const LyricsComponent = ({
  currentSeconds,
  parsedLyrics,
  isTutorial,
  audio,
}: {
  currentSeconds: number;
  parsedLyrics: LyricsInterface[];
  isTutorial: boolean;
  audio: HTMLAudioElement;
}) => {
  const LyricsRef = useRef<HTMLDivElement>(null);
  const currentLyricsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (LyricsRef.current && currentLyricsRef.current) {
      LyricsRef.current.scrollTo({
        top:
          currentLyricsRef.current.offsetTop -
          LyricsRef.current.clientHeight +
          LyricsRef.current.clientHeight / 3,
      });
    }
  }, [currentIndex]);

  // 튜토리얼 모드에서 가사 클릭 시 해당 위치로 음악 이동
  const handleCurrentLyrics = (index: number) => {
    audio.currentTime = parsedLyrics[index].startSeconds;
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!!parsedLyrics && currentSeconds) {
      if (
        currentIndex + 1 < parsedLyrics.length &&
        parsedLyrics[currentIndex + 1].startSeconds <= currentSeconds
      ) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  }, [currentSeconds]);

  return (
    <>
      <div
        ref={LyricsRef}
        className="flex flex-col justify-center items-center grow w-full overflow-scroll scrollbar"
      >
        <div className="h-full flex flex-col items-center gap-3">
          {parsedLyrics.map((lyrics, index) => {
            return (
              <div
                key={index}
                className={
                  index === currentIndex ? 'text-2xl' : 'text-gray text-xl'
                }
                onClick={
                  isTutorial ? () => handleCurrentLyrics(index) : () => {}
                }
                ref={index === currentIndex ? currentLyricsRef : null}
              >
                {lyrics.lyrics}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LyricsComponent;
