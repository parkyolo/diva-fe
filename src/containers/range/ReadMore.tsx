'use client';

import { useEffect, useRef, useState } from 'react';
import { UpArrowIcon, DownArrowIcon } from '../../../public/svgs';
import { convertRange2Num } from '@/utils/convertRange';
import { rangeChart, vocalRange } from '@/types/range';

const distFromTop = (highestNote: string) => {
  return Math.floor((100 / 32) * (32 - convertRange2Num(highestNote)));
};

const rangeHeight = (range: vocalRange) => {
  return Math.floor(
    (100 / 32) *
      (convertRange2Num(range.highestNote) -
        convertRange2Num(range.lowestNote)),
  );
};

const ReadMore = ({ lowestNote, highestNote }: vocalRange) => {
  const womanAverageRange = ['E3', 'C5'];
  const manAverageRange = ['A2', 'F4'];
  const [manRangeChart, setManRangeChart] = useState<rangeChart>({
    distFromTop: 0,
    rangeHeight: 0,
  });
  const [womanRangeChart, setWomanRangeChart] = useState<rangeChart>({
    distFromTop: 0,
    rangeHeight: 0,
  });
  const [userRangeChart, setUserRangeChart] = useState<rangeChart>({
    distFromTop: 0,
    rangeHeight: 0,
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const handleAccordion = () => {
    resultRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    setUserRangeChart({
      distFromTop: distFromTop(highestNote),
      rangeHeight: rangeHeight({
        lowestNote: lowestNote,
        highestNote: highestNote,
      }),
    });
    setManRangeChart({
      distFromTop: distFromTop(manAverageRange[1]),
      rangeHeight: rangeHeight({
        lowestNote: manAverageRange[0],
        highestNote: manAverageRange[1],
      }),
    });
    setWomanRangeChart({
      distFromTop: distFromTop(womanAverageRange[1]),
      rangeHeight: rangeHeight({
        lowestNote: womanAverageRange[0],
        highestNote: womanAverageRange[1],
      }),
    });
  }, [lowestNote]);

  return (
    <ul className="w-full">
      <span id="readmore" className="peer"></span>
      <li className="peer-target:hidden block">
        <a href="#readmore" title="open" onClick={handleAccordion}>
          <div className="flex justify-between items-center bg-[#202229] cursor-pointer p-2 pl-5 rounded-xl">
            <div>
              <h5>결과 자세히 보기</h5>
            </div>
            <DownArrowIcon />
          </div>
        </a>
      </li>

      <li className="peer-target:block hidden">
        <a href="#close" title="close">
          <div className="flex justify-between items-center bg-[#202229] cursor-pointer p-2 pl-5 rounded-t-xl">
            <div>
              <h5>결과 자세히 보기</h5>
            </div>
            <UpArrowIcon />
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
                  top: `${manRangeChart.distFromTop}%`,
                  height: `${manRangeChart.rangeHeight}%`,
                }}
              ></div>
              <hr
                className="absolute w-[15px] bg-white left-[48%] h-0.5"
                style={{
                  top: `${
                    manRangeChart.distFromTop + manRangeChart.rangeHeight / 2
                  }%`,
                }}
              />
              <div
                className="absolute w-[15px] rounded-xl left-[63%] bg-green/30"
                style={{
                  top: `${userRangeChart.distFromTop}%`,
                  height: `${userRangeChart.rangeHeight}%`,
                }}
              ></div>
              <hr
                className="absolute w-[15px] bg-white left-[63%] h-0.5"
                style={{
                  top: `${
                    userRangeChart.distFromTop + userRangeChart.rangeHeight / 2
                  }%`,
                }}
              />
              <div
                className="absolute w-[15px] rounded-xl left-[78%] bg-pink/70"
                style={{
                  top: `${womanRangeChart.distFromTop}%`,
                  height: `${womanRangeChart.rangeHeight}%`,
                }}
              ></div>
              <hr
                className="absolute w-[15px] bg-white left-[78%] h-0.5"
                style={{
                  top: `${
                    womanRangeChart.distFromTop +
                    womanRangeChart.rangeHeight / 2
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
