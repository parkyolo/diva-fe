'use client';

import Link from 'next/link';
import RightArrow from '/public/svgs/right_arrow.svg';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import MainLogo from '/public/svgs/logo.svg';
import VolumeIcon from '/public/svgs/volume_up.svg';
import Piano from './Piano';
import ReadMore from './ReadMore';

/**
 * C2:1부터 E7:32까지 숫자로 변환하는 함수
 * @param enVocalRange 음역대
 * @returns 음역대를 숫자로 변환한 값
 */
export const convertRange2Num = (enVocalRange: string) => {
  const [pitchName, _octave] = enVocalRange.split('');
  const octave: number = +_octave;
  let result_num = 0;
  result_num += pitchName.charCodeAt(0);
  if (result_num > 66) result_num -= 7;
  result_num = (result_num % 10) + 7 * (octave - 2) + 1;

  return result_num;
};

const Range = () => {
  const syllables = ['라', '시', '도', '레', '미', '파', '솔'];
  const convertVocalRangeEn2Ko = (enVocalRange: string) => {
    const [pitchName, _octave] = enVocalRange.split('');
    const octave: number = +_octave - 2;

    const syllable_name = syllables[pitchName.charCodeAt(0) - 65];
    return String(octave) + '옥타브 ' + syllable_name;
  };

  const enVocalRange = ['F3', 'E5'];
  const koVocalRange = [
    convertVocalRangeEn2Ko(enVocalRange[0]),
    convertVocalRangeEn2Ko(enVocalRange[1]),
  ];
  const similarRangeSinger = ['소향'];

  const listenLowestNote = () => {
    const audio = new Audio(`/audio/pianoAudio/${enVocalRange[0]}.mov`);
    audio.volume = 0.1;
    audio.play();
  };
  const listenHighestNote = () => {
    const audio = new Audio(`/audio/pianoAudio/${enVocalRange[1]}.mov`);
    audio.volume = 0.1;
    audio.play();
  };
  return (
    <>
      <Header
        LeftComponent={
          <Link href="/">
            <MainLogo />
          </Link>
        }
      />
      <main>
        <section className="flex flex-col justify-center items-center w-full">
          <h1 className="flex flex-col justify-center items-center w-full gap-1 mb-3">
            <span>당신의 음역대는</span>
            <em className="text-skyblue text-2xl font-bold not-italic">
              {koVocalRange[0]}&nbsp;~&nbsp;{koVocalRange[1]}
            </em>
            <span>입니다.</span>
          </h1>
          <Link
            href="/range/check"
            className="text-gray underline underline-offset-4 hover:text-skyblue mb-5"
          >
            재측정하러가기
          </Link>

          <div className="flex w-full justify-around items-center mb-7">
            <VolumeIcon />
            <button
              className="text-xl bg-darkgray rounded-xl px-5 py-3 hover:shadow-[inset_10px_-10px_52px_0px_rgba(12,16,16,0.81),inset_4px_-4px_22px_0px_rgba(191,191,191,0.20),_4px_4px_23px_0px_rgba(29,67,141,0.80)]"
              onClick={listenLowestNote}
            >
              {koVocalRange[0]}
            </button>
            <button
              className="text-xl bg-darkgray rounded-xl px-5 py-3 hover:shadow-[inset_10px_-10px_52px_0px_rgba(12,16,16,0.81),inset_4px_-4px_22px_0px_rgba(191,191,191,0.20),_4px_4px_23px_0px_rgba(29,67,141,0.80)]"
              onClick={listenHighestNote}
            >
              {koVocalRange[1]}
            </button>
          </div>
          <div className="w-full mb-5">
            <Piano
              startVocalRange={convertRange2Num(enVocalRange[0])}
              endVocalRange={convertRange2Num(enVocalRange[1])}
            />
          </div>
          <div className="flex flex-col items-center mb-7">
            <span>나와 가장 비슷한 음역대의 가수는</span>
            <span>
              <em className="text-skyblue text-2xl not-italic font-bold">
                {similarRangeSinger}
              </em>
              &nbsp;입니다.
            </span>
          </div>
          <Link
            href="/"
            className="flex justify-between items-center w-full mb-5 bg-blue p-2 pl-5 rounded-xl"
          >
            <p>추천 노래 살펴보기</p>
            <RightArrow />
          </Link>
          <ReadMore lowRange={enVocalRange[0]} highRange={enVocalRange[1]} />
        </section>
      </main>
      <Navigation />
    </>
  );
};

export default Range;
