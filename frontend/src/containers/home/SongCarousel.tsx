import { useCarousel } from '@/hooks/useCarousel';
import Bookmark from '/public/svgs/bookmark.svg';
import ImageCarousel from './ImageCarousel';
import { Song } from '@/types/song';
import Image from 'next/image';
import SimilarityCounter from './SimilarityCounter';
import SongInformation from './SongInformation';
import DifficultyStars from './DifficultyStars';

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
  const ImagesItems = songs.map((song: Song) => (
    <Image
      className="w-full aspect-square"
      width={500}
      height={500}
      src={song.coverImg}
      alt={song.title}
    />
  ));

  const length = songs.length;
  const [active, setActive, handlers, style] = useCarousel(length, interval);

  return (
    length > 0 && (
      <>
        <p className="font-bold flex flex-col">
          <span className="text-center text-2xl">나의 음역대와 일치도</span>
          <SimilarityCounter label={+songs[active].similarity} />
        </p>

        <ImageCarousel
          slides={ImagesItems}
          onClick={onClick}
          active={active}
          setActive={setActive}
          handlers={handlers}
          style={style}
        ></ImageCarousel>

        <section className="flex flex-col items-center gap-[0.5rem]">
          <Bookmark />

          <DifficultyStars difficulty={songs[active].difficulty} />

          <SongInformation song={songs[active]} />
        </section>
      </>
    )
  );
};

export default SongCarousel;
