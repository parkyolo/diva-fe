import { useState } from 'react';

export interface CardProps {
  index: number;
  active: number;
  setActive: (n: number) => void;
  length: number;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CarouselItem = ({
  index,
  active,
  setActive,
  length,
  children,
  onClick,
}: CardProps) => {
  const [scaled, setScaled] = useState<Boolean>(false);

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
        scale(${scaled && index === active ? 1.05 : 1})
       `;

  return (
    <button
      className="flex justify-center items-center w-full aspect-square overflow-hidden rounded-3xl transition-all duration-700 ease-in-out"
      style={{
        transform: cssTransformProperties,
        zIndex: index === active ? 10 : 0,
      }}
      key={index}
      onClick={active === index ? onClick : () => setActive(index)}
      // disabled={active !== index}
    >
      {children}
    </button>
  );
};

export default CarouselItem;
