'use client';

type Range = {
  lowRange: string;
  highRange: string;
};

import { useRef } from 'react';
import { convertRange2Num } from '.';
import BottomARrow from '/public/svgs/bottom_arrow.svg';
import TopArrow from '/public/svgs/top_arrow.svg';

const distFromTop = (highRange: string) => {
  return Math.floor((100 / 32) * (32 - convertRange2Num(highRange)));
};

const rangeHeight = (lowRange: string, highRange: string) => {
  return Math.floor(
    (100 / 32) * (convertRange2Num(highRange) - convertRange2Num(lowRange)),
  );
};

const ReadMore = ({ lowRange, highRange }: Range) => {
  const womanAverageRange = ['G3', 'C5'];
  const manAverageRange = ['C3', 'G4'];

  const resultRef = useRef<HTMLDivElement>(null);

  const handleAccordion = () => {
    resultRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  return (
    <ul className="w-full">
      <span id="readmore" className="peer"></span>
      <li className="peer-target:hidden block">
        <a href="#readmore" title="open" onClick={handleAccordion}>
          <div className="flex justify-between items-center bg-[#202229] cursor-pointer p-2 pl-5 rounded-xl">
            <div>
              <h5>결과 자세히 보기</h5>
            </div>
            <BottomARrow />
          </div>
        </a>
      </li>

      <li className="peer-target:block hidden">
        <a href="#close" title="close">
          <div className="flex justify-between items-center bg-[#202229] cursor-pointer p-2 pl-5 rounded-t-xl">
            <div>
              <h5>결과 자세히 보기</h5>
            </div>
            <TopArrow />
          </div>
        </a>
      </li>

      <div
        ref={resultRef}
        className="peer-target:h-auto h-0 overflow-hidden transition-all duration-75 ease-in-out flex justify-between items-center bg-[#202229] rounded-b-xl"
      >
        <div className="transition-all duration-75 ease-in-out w-full">
          <div className="bg-blue/[.07] rounded-xl m-5 px-4 py-8">
            <div className="relative">
              <div className="flex justify-evenly items-center mb-24">
                <div className="flex flex-col items-center">
                  <span>최고 음역대</span>
                  <span>(5옥타브 미)</span>
                </div>
                <hr className="border-1 border-dashed w-[50%]" />
              </div>
              <div className="flex justify-evenly items-center">
                <div className="flex flex-col items-center">
                  <span>최저 음역대</span>
                  <span>(0옥타브 미)</span>
                </div>
                <hr className="border-1 border-dashed w-[50%]" />
              </div>
              <div
                className="absolute w-[15px] rounded-xl left-[48%] bg-blue/50"
                style={{
                  top: `${distFromTop(manAverageRange[1])}%`,
                  height: `${rangeHeight(
                    manAverageRange[0],
                    manAverageRange[1],
                  )}%`,
                }}
              ></div>
              <hr
                className="absolute w-[15px] bg-white left-[48%] h-0.5"
                style={{
                  top: `${
                    distFromTop(manAverageRange[1]) +
                    rangeHeight(manAverageRange[0], manAverageRange[1]) / 2
                  }%`,
                }}
              />
              <div
                className="absolute w-[15px] rounded-xl left-[63%] bg-green/30"
                style={{
                  top: `${distFromTop(highRange)}%`,
                  height: `${rangeHeight(lowRange, highRange)}%`,
                }}
              ></div>
              <hr
                className="absolute w-[15px] bg-white left-[63%] h-0.5"
                style={{
                  top: `${
                    distFromTop(highRange) +
                    rangeHeight(lowRange, highRange) / 2
                  }%`,
                }}
              />
              <div
                className="absolute w-[15px] rounded-xl left-[78%] bg-pink/70"
                style={{
                  top: `${distFromTop(womanAverageRange[1])}%`,
                  height: `${rangeHeight(
                    womanAverageRange[0],
                    womanAverageRange[1],
                  )}%`,
                }}
              ></div>
              <hr
                className="absolute w-[15px] bg-white left-[78%] h-0.5"
                style={{
                  top: `${
                    distFromTop(womanAverageRange[1]) +
                    rangeHeight(womanAverageRange[0], womanAverageRange[1]) / 2
                  }%`,
                }}
              />
            </div>
            <div className="flex mt-10 pr-5 justify-end">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 rounded-full bg-blue/50"></div>
                  <span>남성 평균 음역대</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 rounded-full bg-green/30"></div>
                  <span>나의 음역대</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-4 w-4 rounded-full bg-pink/70"></div>
                  <span>여성 평균 음역대</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ul>
  );
};

export default ReadMore;
