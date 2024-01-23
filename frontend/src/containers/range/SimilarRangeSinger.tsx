'use client';

import { convertRange2Num } from '.';
import Image from 'next/image';
import BottomARrow from '/public/svgs/bottom_arrow.svg';
import TopArrow from '/public/svgs/top_arrow.svg';
import { useState } from 'react';

const SimilarRangeSinger = () => {
  const [singers, setSingers] = useState<string[][] | [][]>([
    ['소향', 'E3', 'B5'],
    ['김동률', 'D2', 'C5'],
    ['김범수', 'G2', 'E5'],
  ]);

  return (
    <ul className="w-full">
      <span id="accordion1" className="peer"></span>
      <li className="peer-target:hidden block">
        <a href="#accordion1" title="open">
          <div className="flex justify-between items-center bg-[#202229] cursor-pointer p-2 pl-5 rounded-xl">
            <div>
              <h5>나와 음역대가 비슷한 가수 보기</h5>
            </div>
            <Image src={BottomARrow} alt={'bottom-arrow'}></Image>
          </div>
        </a>
      </li>

      <li className="peer-target:block hidden">
        <a href="#accordion" title="close">
          <div className="flex justify-between items-center bg-[#202229] cursor-pointer p-2 pl-5 rounded-t-xl">
            <div>
              <h5>나와 음역대가 비슷한 가수 보기</h5>
            </div>
            <Image src={TopArrow} alt={'top-arrow'}></Image>
          </div>
        </a>
      </li>

      <div className="peer-target:h-60 h-0 overflow-hidden transition-all duration-75 ease-in-out flex justify-between items-center bg-[#202229] peer-target:p-2 peer-target:pl-5 rounded-b-xl">
        <div className="translate-y-[-100%] transition-all duration-75 ease-in-out mt-8 mx-auto">
          <h5 className="flex flex-col justify-between items-center mb-4">
            <span>나와 가장 비슷한 음역대의 가수는</span>
            <span>
              <em className="text-skyblue text-xl not-italic">
                {singers[0][0]}
              </em>
              &nbsp;입니다
            </span>
          </h5>
          <div className="relative">
            {singers.map((value: string[], index: number) => {
              const [singer, lowRange, highRange] = value;
              const distFromLeft = Math.floor(
                (100 / 48) * convertRange2Num(lowRange),
              );
              const rangeWidth = Math.floor(
                (100 / 48) *
                  (convertRange2Num(highRange) - convertRange2Num(lowRange)),
              );

              return (
                <div
                  className="absolute h-7 bg-blue rounded-xl"
                  style={{
                    top: `${index * 35}px`,
                    width: `${rangeWidth}%`,
                    left: `${distFromLeft}%`,
                  }}
                  key={index}
                >
                  <div className="flex justify-between items-center mx-[-25px] pt-0.5">
                    <span>{lowRange}</span>
                    <span className="font-samlip">{singer}</span>
                    <span>{highRange}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ul>
  );
};

export default SimilarRangeSinger;
