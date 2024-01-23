'use client'
import React, { useState } from 'react';
import CarouselItem from './CarouselItem';
interface CarouselProps {
  width?: number;
  height?: number;
  items: React.ReactNode[];
}
const Carousel = ({ width, height, items }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className='flex flex-col content-center items-center carousel-container relative w-[504px] h-[280px] sm:h-40 md:h-56'>
      {items.map((item, index) => (
        <CarouselItem key={index} index={index} activeIndex={activeIndex}>
          {item}
        </CarouselItem>
      ))}
    </div>
  );
};

export default Carousel;
