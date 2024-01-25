'use client';
import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Image from 'next/image';
import Carousel from './Carousel';

import card1 from '/public/images/2.jpg';
import card2 from '/public/images/3.jpg';
import card3 from '/public/images/4.jpg';
import card4 from '/public/images/5.jpg';
import Bookmark from '/public/svgs/bookmark.svg';
import Filled from '/public/svgs/filledStar.svg';
import Empty from '/public/svgs/star.svg';
import Volume from '/public/svgs/volume_up.svg';
const ImagesItems = [
  <Image className="h-full w-full" src={card2} alt="card2" />,
  <Image className="h-full w-full" src={card3} alt="card3" />,
  <Image className="h-full w-full" src={card4} alt="card4" />,
];

const Content = ({ onModeChange }: { onModeChange: Function }) => {
  const [isOpen, open, close] = useModal();
  const changeModeToReal = () => {
    onModeChange(0b01);
  };
  const changeModetoTutorial = () => {
    onModeChange(0b10);
  };

  return (
    <main>
      <div className="flex flex-col content-between h-full items-center justify-around">
        <div className="flex justify-end w-full">
          <Volume />
        </div>
        <article className="flex flex-col">
          <span className="font-featuring text-center text-[24px] font-sans not-italic font-bold leading-normal">
            나의 음역대와 일치도
          </span>
          <span className="font-featuring text-center text-[32px] font-sans font-bold not-italic leading-normal text-skyblue">
            67%{}
          </span>
        </article>
        <section
          className="flex flex-col content-center items-center w-full"
          style={{ height: '30vh' }}
        >
          <Carousel items={ImagesItems} onClick={open}></Carousel>
        </section>
        <section>
          <Bookmark />
        </section>
        <section className="flex flex-col items-center w-[157px] h-[93px]">
          <div className="flex flex-row">
            <Filled />
            <Filled />
            <Filled />
            <Empty />
            <Empty />
          </div>
          <span className="font-featuring text-white text-2xl not-italic font-bold leading-normal">
            이미 슬픈 사랑
          </span>
          <span className="font-featuring text-white text-xl not-italic font-bold leading-normal">
            야다
          </span>
        </section>
        {isOpen && (
          <BottomSheet close={close}>
            <BottomSheet.Button btnColor="bg-blue" onClick={changeModeToReal}>
              실전모드
            </BottomSheet.Button>
            <BottomSheet.Button
              btnColor="bg-btn-black"
              onClick={changeModetoTutorial}
            >
              튜토리얼
            </BottomSheet.Button>
          </BottomSheet>
        )}
      </div>
    </main>
  );
};

export default Content;
