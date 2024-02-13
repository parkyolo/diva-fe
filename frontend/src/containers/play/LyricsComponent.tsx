import { LyricsInterface } from '@/types/lyrics';
import { useEffect, useRef, useState } from 'react';

const cntLyricsToShow = 11;

const LyricsComponent = ({
  currentSeconds,
  parsedLyrics,
}: {
  currentSeconds: number;
  parsedLyrics: LyricsInterface[];
}) => {
  const LyricsRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(cntLyricsToShow);

  useEffect(() => {
    if (!!parsedLyrics && currentSeconds) {
      if (currentIndex < cntLyricsToShow / 2) {
        if (parsedLyrics[currentIndex + 1].startSeconds <= currentSeconds) {
          setCurrentIndex(currentIndex + 1);
        }
      } else if (endIndex < parsedLyrics.length) {
        if (parsedLyrics[currentIndex + 1].startSeconds <= currentSeconds) {
          setStartIndex(startIndex + 1);
          setCurrentIndex(currentIndex + 1);
          setEndIndex(endIndex + 1);
        }
      }
    }
  }, [currentSeconds]);

  return (
    <>
      <div
        ref={LyricsRef}
        className="flex flex-col flex-wrap justify-center items-center w-full grow gap-3"
      >
        {parsedLyrics.map((lyrics, index) => {
          if (index >= startIndex && index < endIndex) {
            return (
              <div
                key={index}
                className={index === currentIndex ? 'text-xl' : 'text-gray'}
              >
                {lyrics.lyrics}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default LyricsComponent;
