import { useCarousel } from '@/hooks/useCarousel';
import ImageCarousel from './ImageCarousel';
import { Song } from '@/types/song';
import Image from 'next/image';
import SimilarityCounter from './SimilarityCounter';
import SongInformation from './SongInformation';
import DifficultyStars from './DifficultyStars';
import BookmarkButton from './BookmarkButton';
import VolumeOn from '/public/svgs/volume_up.svg';
import VolumeOff from '/public/svgs/volume_off.svg';
import { useRef, useState } from 'react';

interface SongCarouselProps {
  interval: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  songs: Song[];
}

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
          <BookmarkButton isLiked={songs[active].isLiked!} />
          <DifficultyStars difficulty={songs[active].difficulty} />
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
