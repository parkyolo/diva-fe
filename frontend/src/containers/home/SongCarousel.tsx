import { useCarousel } from '@/hooks/useCarousel';
import ImageCarousel from './ImageCarousel';
import { Song } from '@/types/song';
import SimilarityCounter from './SimilarityCounter';
import SongInformation from './SongInformation';
import { useRef, useState } from 'react';
import { RoundedUpArrowIcon, VolumeOff, VolumeOn } from '../../../public/svgs';

interface SongCarouselProps {
  interval: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  songs: Song[];
}

// TODO: 모달 떠있는 상태에서 캐러셀 넘어가는 문제
// TODO: pc 버전에서 캐러셀 슬라이드시 클릭 이벤트로 감지하는 문제
const SongCarousel = ({
  interval = 5000,
  onClick,
  songs,
}: SongCarouselProps) => {
  const length = songs.length;
  const [active, setActive, handlers, style] = useCarousel(length, interval);

  // 오디오 오토플레이
  const [isMusicPreviewOn, setIsMusicPreviewOn] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    length > 0 && (
      <>
        <button
          className="absolute top-[1rem] right-[2rem]"
          onClick={() =>
            setIsMusicPreviewOn((muted) => {
              if (muted === false) {
                audioRef.current!.muted = false;
                audioRef.current?.play();
              } else {
                audioRef.current!.muted = true;
                audioRef.current!.pause();
              }
              return !muted;
            })
          }
        >
          {isMusicPreviewOn ? <VolumeOn /> : <VolumeOff />}
        </button>
        <p className="font-bold flex flex-col">
          <span className="text-center text-2xl">나의 음역대와 일치도</span>
          <SimilarityCounter label={+songs[active].similarity} />
        </p>

        <ImageCarousel
          songs={songs}
          onClick={onClick}
          active={active}
          setActive={setActive}
          handlers={handlers}
          style={style}
        ></ImageCarousel>

        <section className="flex flex-col items-center gap-[0.5rem]">
          <div className="flex flex-col justify-center items-center">
            <RoundedUpArrowIcon className="stroke-white animate-bounce" />
            <RoundedUpArrowIcon className="stroke-white animate-bounce" />
            <span className="font-samlip text-xl">지금 부르러 가기</span>
          </div>

          <SongInformation song={songs[active]} />
        </section>

        <audio
          src={songs[active].mrUrl}
          muted
          autoPlay
          ref={audioRef}
          loop
        ></audio>
      </>
    )
  );
};

export default SongCarousel;
