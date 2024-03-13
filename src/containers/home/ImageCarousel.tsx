import { SwipeableHandlers } from 'react-swipeable';
import CarouselItem from './CarouselItem';
import { CSSProperties } from 'react';
import { RecommendedSong } from '@/types/song';

interface ImageCarouselProps {
  songs: RecommendedSong[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  active: number;
  style: CSSProperties;
  setActive: (idx: number) => void;
  handlers: SwipeableHandlers;
}

const ImageCarousel = ({
  songs,
  onClick,
  active,
  setActive,
  style,
  handlers,
}: ImageCarouselProps) => {
  const length = songs.length;

  return (
    <div className="w-[90%] overflow-hidden">
      <div className="relative h-[88%] aspect-square m-auto min-h-[240px] top-1/2 -translate-y-1/2">
        <div className="absolute flex top-0" {...handlers} style={style}>
          <CarouselItem
            active={active}
            setActive={setActive}
            index={songs.length - 1}
            length={length}
            onClick={onClick}
            song={songs[songs.length - 1]}
          />

          {songs.map((slide, index) => (
            <CarouselItem
              active={active}
              setActive={setActive}
              index={index}
              length={length}
              onClick={onClick}
              key={index}
              song={songs[index]}
            />
          ))}

          <CarouselItem
            active={active}
            setActive={setActive}
            index={0}
            length={length}
            onClick={onClick}
            song={songs[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
