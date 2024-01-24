'use client';

import React, { useState } from 'react';
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';
import { IoIosArrowBack } from 'react-icons/io';

interface CarouselProps {
  width?: number;
  height?: number;
  items: React.ReactNode[];
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const Carousel = ({ width, height, items, onClick }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  function handleNextItemBtn() {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : items.length - 1;
    });
  }

  function handlePrevItemBtn() {
    setActiveIndex((prev) => {
      return prev + 1 < items.length ? prev + 1 : 0;
    });
  }

  return (
    <div className="carousel-container relative h-full aspect-square">
      <button
        className="carousel-btn-switch-card-left carousel-btn-switch-card -left-10 top-1/2 translate-y-[-50%]  absolute z-40 flex h-9 w-9 cursor-pointer items-center justify-center
      rounded-full border-2 border-[#302e30] bg-[#181818] text-2xl opacity-75 transition duration-300 hover:opacity-100 md:h-12 md:w-12"
        onClick={handlePrevItemBtn}
      >
        <IoIosArrowBack />
      </button>
      {items?.map((item, index) => (
        <CarouselItem
          key={index}
          index={index}
          activeIndex={activeIndex}
          onClick={onClick}
        >
          {item}
        </CarouselItem>
      ))}
      <button
        className="carousel-btn-switch-card-left carousel-btn-switch-card -right-10 top-1/2 translate-y-[-50%]  absolute z-40 flex h-9 w-9 cursor-pointer items-center justify-center
      rounded-full border-2 border-[#302e30] bg-[#181818] text-2xl opacity-75 transition duration-300 hover:opacity-100 md:h-12 md:w-12"
        onClick={handleNextItemBtn}
      >
        <IoIosArrowBack
          style={{
            transform: 'rotate(180deg)',
          }}
        />
      </button>

      {/* <CarouselIndicator
        activeIndex={activeIndex}
        length={items.length}
        onSetActiveIndex={(activeIndex) => {
          setActiveIndex(activeIndex);
        }}
      /> */}
    </div>
  );
};

export default Carousel;
