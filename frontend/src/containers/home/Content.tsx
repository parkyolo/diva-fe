import LoginButton from '@/components/login/LoginButton';
import Image from 'next/image';
import BookMark from '@/../public/images/Bookmark.png';
import logo from '../../../public/images/kakao_login_large_narrow 1.png'
import logo2 from '../../../public/images/kakao_login_medium_narrow.png'
import Carousel from './Carousel';

const ImageItems = [
  <Image className='h-full w-full' src={logo} alt='card1'/>,
  <Image className='h-full w-full' src={logo2} alt='card2'/>,
  <Image className='h-full w-full' src={BookMark} alt='card3'/>
]

// import Carousel from './Carousel';
const Content = () => {
  return (
    <div className="flex flex-col p-[60px, 33px], content-between self-stretch">
      <span className="text-center text-[24px]">나의 음역대와 일치도</span>
      <span className="text-center text-[24px] text-skyblue">67%{}</span>
      <figure className='flex flex-col content-center items-center'>
        <Carousel items={ImageItems} width={300} height={300} />
        <Image src={BookMark} alt="북마크" />
      </figure>
      <section className="flex flex-col items-center gap-[6px]">
        <div>별</div>
        <span className="text-white text-2xl">노래 제목</span>
        <span className="text-white text-xl">노래 가수</span>
      </section>
    </div>
  );
};

export default Content;
