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
  <Image className="h-full w-full" src={card1} alt="card1" />,
  <Image className="h-full w-full" src={card2} alt="card2" />,
  <Image className="h-full w-full" src={card3} alt="card3" />,
  <Image className="h-full w-full" src={card4} alt="card4" />,
];

const Content = () => {
  const [isOpen, open, close] = useModal();

  return (
    <div>
      <div className="flex flex-col p-[40px] px-[33px] content-between self-stretch items-center flex-1 gap-[30px]">
        <Image
          src={Volume}
          alt="볼륨 온"
          className="absolute top-[80px] right-[20px]"
        ></Image>
        <article className="flex flex-col">
          <span className="font-featuring text-center text-[24px] font-sans not-italic font-bold leading-normal">
            나의 음역대와 일치도
          </span>
          <span className="font-featuring text-center text-[32px] font-sans font-bold not-italic leading-normal text-skyblue">
            67%{}
          </span>
        </article>
        <figure className="flex flex-col content-center items-center gap-[0px] w-[550px] h-[280px]">
          <Carousel items={ImagesItems} onClick={open}></Carousel>
        </figure>
        <section>
          <Image src={Bookmark} alt="북마크" height={32}></Image>
        </section>
        <section className="flex flex-col items-center gap-[6px] w-[157px] h-[93px]">
          <div className="flex flex-row">
            <Image src={Filled} alt="별"></Image>
            <Image src={Filled} alt="별"></Image>
            <Image src={Filled} alt="별"></Image>
            <Image src={Empty} alt="빈 별"></Image>
            <Image src={Empty} alt="빈 별"></Image>
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
            <BottomSheet.Button btnColor="bg-blue">실전모드</BottomSheet.Button>
            <BottomSheet.Button btnColor="bg-btn-black">
              튜토리얼
            </BottomSheet.Button>
          </BottomSheet>
        )}
      </div>
    </div>
  );
};

export default Content;
