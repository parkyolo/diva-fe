'use client';
import useModal from '@/hooks/useModal';

import BottomSheet from '@/components/BottomSheet/BottomSheet';
import type { NextPage } from 'next';
import Image from 'next/image';
import Carousel from './Carousel';

import card1 from '@/../public/images/2.jpg';
import card2 from '@/../public/images/3.jpg';
import card3 from '@/../public/images/4.jpg';
import card4 from '@/../public/images/5.jpg';

const ImagesItems = [
  <Image className="h-[280px] w-[280px]" src={card1} alt="card1" />,
  <Image className="h-full w-full" src={card2} alt="card2" />,
  <Image className="h-full w-full" src={card3} alt="card3" />,
  <Image className="h-full w-full" src={card4} alt="card4" />,
];

// import Carousel from './Carousel';
const Content = () => {
  const [isOpen, open, close] = useModal();

  return (
    <div className="flex flex-col p-[60px] px-[33px] content-between self-stretch items-center flex-1">
      <span className="font-featuring text-center text-[24px] font-sans not-italic font-bold leading-normal">
        나의 음역대와 일치도
      </span>
      <span className="font-featuring text-center text-[32px] font-sans font-bold not-italic leading-normal text-skyblue">
        67%{}
      </span>
      <figure className="flex flex-col content-center items-center gap-[0px] w-[550px] h-[280px]">
        <Carousel items={ImagesItems} onClick={open}></Carousel>
      </figure>
      <section className="flex flex-col items-center gap-[6px] w-[157px] h-[93px]">
        <div>별</div>
        <span className="font-featuring text-white text-2xl not-italic font-bold leading-normal">
          노래 제목
        </span>
        <span className="font-featuring text-white text-xl not-italic font-bold leading-normal">
          노래 가수
        </span>
      </section>
      {isOpen && (
        <BottomSheet close={close}>
          <BottomSheet.Button btnColor="bg-blue">실전모드</BottomSheet.Button>
          <BottomSheet.Button btnColor="bg-btn-black">
            튜토리얼
          </BottomSheet.Button>
        </BottomSheet>
      )}
    </div>
  );
};

export default Content;
