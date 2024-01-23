'use client';

import Image from 'next/image';
import Link from 'next/link';
import RangeBox from './RangeBar';
import RightArrow from '/public/svgs/right_arrow.svg';
import { useState } from 'react';
import SimilarRangeSinger from './SimilarRangeSinger';

/**
 * C1:0부터 B7:48까지 숫자로 변환하는 함수
 * @param range 음역대
 * @returns 음역대를 수치로 변환한 숫자
 */
export const convertRange2Num = (range: string) => {
  const [first_alphabet, _second_number] = range.split('');
  const second_number: number = +_second_number;
  let result_num = 0;
  result_num += first_alphabet.charCodeAt(0);
  if (result_num > 66) result_num -= 7;
  result_num = (result_num % 10) + 7 * (second_number - 1);
  return result_num;
};

const Range = () => {
  const [range, setRange] = useState<string[] | []>(['E3', 'A5']);

  return (
    <>
      <section className="flex flex-col justify-center items-center w-full">
        <h1 className="flex flex-col justify-center items-center w-full mb-7">
          <p>
            당신의 음역대는{' '}
            <em className="text-skyblue text-2xl font-bold not-italic">
              {range[0]}
              {range[1]}
            </em>
            입니다.
          </p>
          <Link
            href="/range/check"
            className="text-gray underline underline-offset-4 hover:text-skyblue"
          >
            재측정하러가기
          </Link>
        </h1>
        <RangeBox lowRange={range[0]} highRange={range[1]}></RangeBox>
        <Link
          href="/"
          className="flex justify-between items-center w-full mb-5 bg-blue p-2 pl-5 rounded-xl"
        >
          <p>추천 노래 살펴보기</p>
          <Image src={RightArrow} alt={'right-arrow'}></Image>
        </Link>
        <SimilarRangeSinger />
      </section>
    </>
  );
};

export default Range;
