import { convertRange2Num } from '.';

type Range = {
  lowRange: string;
  highRange: string;
};

const RangeBox = ({ lowRange, highRange }: Range) => {
  // 가장 긴 음역대의 길이가 48, 가장 짧은 음역대의 길이가 0이므로
  // 전체 영역(100%)을 48로 나눠서 음역대 막대의 길이를 구함
  const distFromTop = Math.floor(
    (100 / 48) * (48 - convertRange2Num(highRange)),
  );
  const rangeHeight = Math.floor(
    (100 / 48) * (convertRange2Num(highRange) - convertRange2Num(lowRange)),
  );

  return (
    <div className="relative bg-blue/[.07] rounded-xl w-full mb-5 px-4 py-8">
      <div className="flex justify-evenly items-center mb-24">
        <div className="flex flex-col items-center">
          <span>여성 음역대</span>
          <span>(C7)</span>
        </div>
        <hr className="border-1 border-dashed w-[60%]" />
      </div>
      <div className="flex justify-evenly items-center mb-24">
        <div className="flex flex-col items-center">
          <span>양성 음역대</span>
        </div>
        <hr className="border-1 border-dashed w-[60%]" />
      </div>
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col items-center">
          <span>남성 음역대</span>
          <span>(C1)</span>
        </div>
        <hr className="border-1 border-dashed w-[60%]" />
      </div>
      <div
        className="absolute w-[15px] rounded-xl left-[59%] bg-blue"
        style={{ top: `${distFromTop}%`, height: `${rangeHeight}%` }}
      ></div>
      <hr
        className="absolute w-[15px] bg-white left-[59%] h-0.5"
        style={{ top: `${distFromTop + rangeHeight / 2}%` }}
      />
    </div>
  );
};

export default RangeBox;
