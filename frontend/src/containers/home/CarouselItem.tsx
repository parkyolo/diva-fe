import React, { Children } from 'react';

interface CarouselItemProps {
  children?: React.ReactNode;
  index: number;
  activeIndex: number;
}

const CarouselItem = ({ children, index, activeIndex }: CarouselItemProps) => {
  return (
    <div>
      <div className="absolute bottom-0 cursor-pointer overflow-hidden rounded-3xl drop-shadow-[0_8px_30px_rgb(0,0,0,0.12)] translate-all duration-700">
        {children}
      </div>
    </div>
  );
};

export default CarouselItem;
