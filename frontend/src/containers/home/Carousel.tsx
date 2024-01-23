'use client';

import React, { useState } from 'react';
import CarouselItem from './CarouselItem';
import CarouselIndicator from './CarouselIndicator';
import { IoIosArrowBack } from 'react-icons/io';
import useModal from '@/hooks/useModal';

import BottomSheet from '@/components/BottomSheet/BottomSheet';

interface CarouselProps {
  width?: number;
  height?: number;
  items: React.ReactNode[];
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
const Carousel = ({ width, height, items, onClick }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  function handlePrevItemBtn() {
    setActiveIndex((prev) => {
      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  }

  function handleNextItemBtn() {
    setActiveIndex((prev) => {
      return prev + 1 < items.length ? prev + 1 : prev;
    });
  }

  return (
    <div className="carousel-container relative h-[280px] w-[280px]">
      {activeIndex < items.length - 1 && (
        <button
          className="carousel-btn-switch-card-left carousel-btn-switch-card right-[0px] top-1/2 translate-x-[-200px] translate-y-[-50%] transform sm:translate-x-[-250px] md:translate-x-[-300px] lg:translate-x-[-350px] absolute z-40 flex h-9 w-9 cursor-pointer items-center justify-center
      rounded-full border-2 border-[#302e30] bg-[#181818] text-2xl opacity-75 transition duration-300 hover:opacity-100 md:h-12 md:w-12"
          onClick={handleNextItemBtn}
        >
          <IoIosArrowBack />
        </button>
      )}
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
      {activeIndex > 0 && (
        <button
          className="carousel-btn-switch-card-right carousel-btn-switch-card top-1/2 translate-x-[200px] translate-y-[-50%] transform sm:translate-x-[250px] md:translate-x-[300px] lg:translate-x-[350px] absolute z-40 flex h-9 w-9 cursor-pointer items-center justify-center
      rounded-full border-2 border-[#302e30] bg-[#181818] text-2xl opacity-75 transition duration-300 hover:opacity-100 md:h-12 md:w-12"
          onClick={handlePrevItemBtn}
        >
          <IoIosArrowBack
            style={{
              transform: 'rotate(180deg)',
            }}
          />
        </button>
      )}

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
