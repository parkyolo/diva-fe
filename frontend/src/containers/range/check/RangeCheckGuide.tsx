import Image from 'next/image';
import Cactus from '/public/images/cactus.png';

const RangeCheckGuide: React.FC = () => {
  return (
    <>
      <Image src={Cactus} alt="캐릭터" width={260} />
      <ul className="text-xl flex flex-col gap-6">
        <li className="flex">
          <div className="text-center bg-btn-black rounded-full w-[39px]">
            1
          </div>
          소음이 적은 환경에서 진행해주세요.
        </li>
        <li className="flex">
          <div className="text-center bg-btn-black rounded-full w-[39px]">
            2
          </div>
          마이크를 세팅해주세요.
        </li>
        <li className="flex">
          <div className="text-center bg-btn-blackrounded-full w-[39px]">3</div>
          <p className="">
            20초 안에 <span className="text-skyblue">자유롭게</span> 낼 수 있는{' '}
            <br />
            <span className="text-skyblue">가장 저음</span>과{' '}
            <span className="text-skyblue">가장 고음</span>을 내주세요.
          </p>
        </li>
      </ul>
    </>
  );
};

export default RangeCheckGuide;
