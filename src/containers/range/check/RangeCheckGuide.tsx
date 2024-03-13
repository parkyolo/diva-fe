import Image from 'next/image';
import Cactus from '/public/images/cactus.png';

const RangeCheckGuide: React.FC = () => {
  return (
    <>
      <Image src={Cactus} alt="캐릭터" width={260} />
      <ul className="text-xl flex flex-col gap-6">
        <li className="flex gap-2">
          <div className="text-center w-[39px]">
            <span className="bg-btn-black rounded-2xl py-1 px-3">1</span>
          </div>
          소음이 적은 환경에서 진행해주세요.
        </li>
        <li className="flex gap-2">
          <div className="text-center w-[39px]">
            <span className="bg-btn-black rounded-2xl py-1 px-3">2</span>
          </div>
          마이크를 세팅해주세요.
        </li>
        <li className="flex gap-2">
          <div className="text-center w-[39px]">
            <span className="bg-btn-black rounded-full py-1 px-3">3</span>
          </div>
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
