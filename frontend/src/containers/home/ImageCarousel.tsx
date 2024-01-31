import { SwipeableHandlers } from 'react-swipeable';
import CarouselItem from './CarouselItem';
import { CSSProperties } from 'react';

interface ImageCarouselProps {
  slides: React.ReactNode[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  active: number;
  style: CSSProperties;
  setActive: (idx: number) => void;
  handlers: SwipeableHandlers;
}

const ImageCarousel = ({
  slides,
  onClick,
  active,
  setActive,
  style,
  handlers,
}: ImageCarouselProps) => {
  const length = slides.length;

  return (
    <div className="w-[90%] overflow-hidden">
      <div className="relative w-[80%] aspect-square m-auto">
        <div className="absolute flex top-0" {...handlers} style={style}>
          <CarouselItem
            active={active}
            setActive={setActive}
            index={slides.length - 1}
            length={length}
            onClick={onClick}
          >
            {slides[slides.length - 1]}
          </CarouselItem>

          {slides.map((slide, index) => (
            <CarouselItem
              active={active}
              setActive={setActive}
              index={index}
              length={length}
              onClick={onClick}
              key={index}
            >
              {slide}
            </CarouselItem>
          ))}

          <CarouselItem
            active={active}
            setActive={setActive}
            index={0}
            length={length}
            onClick={onClick}
          >
            {slides[0]}
          </CarouselItem>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
