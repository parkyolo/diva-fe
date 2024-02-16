import { RecommendedSong } from '@/types/song';
import Image from 'next/image';

export interface CardProps {
  index: number;
  active: number;
  setActive: (n: number) => void;
  length: number;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  song: RecommendedSong;
}

const CarouselItem = ({
  index,
  active,
  setActive,
  length,
  onClick,
  song,
}: CardProps) => {
  let offset = (index - active) / 10;
  let direction = Math.sign(index - active);
  if (active === length - 1) {
    if (index === 0) {
      direction *= -1;
      offset = 1 / 10;
    }
  } else if (active === 0) {
    if (index === length - 1) {
      direction *= -1;
      offset = 1 / 10;
    }
  }
  const absOffset = Math.abs(offset);

  const cssTransformProperties = `
        rotateY(calc(${offset} * 55deg))
        scaleY(calc(1 +  ${absOffset}  * -0.9))
        translateX(calc( ${direction} * -3.5rem))
        translateZ(calc( ${absOffset} * -35rem))
       `;

  return (
    <button
      className="flex justify-center items-center w-full aspect-square overflow-hidden shadow-[1px_-1px_10px_1px_rgb(55,55,55)] rounded-3xl transition-all duration-700 ease-in-out"
      style={{
        transform: cssTransformProperties,
        zIndex: index === active ? 10 : 0,
      }}
      key={index}
      onClick={active === index ? onClick : () => setActive(index)}
    >
      <Image
        draggable="false"
        className="w-full aspect-square"
        width={500}
        height={500}
        src={song.coverUrl ? song.coverUrl : '/images/logo.jpg'}
        alt={song.songTitle}
        priority={true}
      />
    </button>
  );
};

export default CarouselItem;
