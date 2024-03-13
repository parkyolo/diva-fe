import React from 'react';

export interface CarouselIndicatorProps {
  activeIndex: number;
  length: number;
  maxIndicatorVisible?: number;
  onSetActiveIndex: (index: number) => void;
}

export default function CarouselIndicator({
  activeIndex,
  length,
  maxIndicatorVisible = 5,
  onSetActiveIndex,
}: CarouselIndicatorProps) {
  const maxIndicator =
    length > maxIndicatorVisible ? maxIndicatorVisible : length;

  return (
    <div className="carousel-indicator absolute left-1/2 -bottom-4 flex h-5 w-24 -translate-x-1/2 transform items-center justify-center space-x-1 md:-bottom-10">
      {Array.from(Array(maxIndicator), (_, index) => {
        return (
          <div
            key={index}
            className={`carousel-indicator-dots h-2 w-2 rounded-full bg-white opacity-50 transition-all duration-500 hover:w-4 hover:opacity-100
            ${activeIndex === index ? 'w-4 opacity-100' : 'w-2 bg-gray-400'}`}
            onClick={() => {
              onSetActiveIndex(index);
            }}
          ></div>
        );
      })}
    </div>
  );
}
