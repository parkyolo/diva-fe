'use client';

import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Piano from './Piano';
import ReadMore from './ReadMore';
import { convertRange2Num, convertVocalRangeEn2Ko } from '@/utils/convertRange';
import { pianoRange, rangeResult, vocalRange } from '@/types/range';
import { VolumeOn, HeaderLogo, RightArrowIcon } from '../../../public/svgs';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { useRouter } from 'next/navigation';

const defaultNote = 'C2';

const Range = () => {
  const [matchingArtist, setMatchingArtist] = useState<string>();
  const [isLoading, vocalRange, error, getRange] = useFetch<rangeResult>(
    req.sing.getTestResult,
  );

  const [note, setNote] = useState<vocalRange>({
    highestNote: defaultNote,
    lowestNote: defaultNote,
  });
  const [koNote, setKoNote] = useState<vocalRange>({
    highestNote: defaultNote,
    lowestNote: defaultNote,
  });
  const [convertedNote, setConvertedNote] = useState<pianoRange>({
    highestNote: 0,
    lowestNote: 0,
  });

  const listenLowestNote = () => {
    const audio = new Audio(`/audio/pianoAudio/${note.lowestNote}.mov`);
    audio.play();
  };
  const listenHighestNote = () => {
    const audio = new Audio(`/audio/pianoAudio/${note.highestNote}.mov`);
    audio.play();
  };

  useEffect(() => {
    setKoNote({
      lowestNote: convertVocalRangeEn2Ko(note.lowestNote),
      highestNote: convertVocalRangeEn2Ko(note.highestNote),
    });
    setConvertedNote({
      lowestNote: convertRange2Num(note.lowestNote),
      highestNote: convertRange2Num(note.highestNote),
    });
  }, [note]);

  useEffect(() => {
    if (vocalRange && vocalRange.lowestNote) {
      setNote({
        lowestNote: vocalRange.lowestNote,
        highestNote: vocalRange.highestNote,
      });
      setMatchingArtist(vocalRange.matchingArtist);
    }
  }, [vocalRange]);

  useEffect(() => {
    getRange();
  }, []);

  return (
    <>
      <Header
        LeftComponent={
          <Link href="/">
            <HeaderLogo />
          </Link>
        }
      />
      <main className="py-10">
        <section className="flex flex-col justify-center items-center w-full">
          <h1 className="flex flex-col justify-center items-center w-full gap-1 mb-3">
            <span>당신의 음역대는</span>
            <em className="text-skyblue text-2xl font-bold not-italic">
              {koNote.lowestNote}&nbsp;~&nbsp;{koNote.highestNote}
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
            <VolumeOn />
            <button
              className="text-xl bg-darkgray rounded-xl px-5 py-3 hover:shadow-[inset_10px_-10px_52px_0px_rgba(12,16,16,0.81),inset_4px_-4px_22px_0px_rgba(191,191,191,0.20),_4px_4px_23px_0px_rgba(29,67,141,0.80)]"
              onClick={listenLowestNote}
            >
              {koNote.lowestNote}
            </button>
            <button
              className="text-xl bg-darkgray rounded-xl px-5 py-3 hover:shadow-[inset_10px_-10px_52px_0px_rgba(12,16,16,0.81),inset_4px_-4px_22px_0px_rgba(191,191,191,0.20),_4px_4px_23px_0px_rgba(29,67,141,0.80)]"
              onClick={listenHighestNote}
            >
              {koNote.highestNote}
            </button>
          </div>
          <div className="w-full mb-5">
            <Piano pianoRange={convertedNote} />
          </div>
          <div className="flex flex-col items-center mb-7">
            <span>나와 가장 비슷한 음역대의 가수는</span>
            <span>
              <em className="text-skyblue text-2xl not-italic font-bold">
                {matchingArtist}
              </em>
              &nbsp;입니다.
            </span>
          </div>
          <Link
            href="/"
            className="flex justify-between items-center w-full mb-5 bg-blue p-2 pl-5 rounded-xl"
          >
            <p>추천 노래 살펴보기</p>
            <RightArrowIcon />
          </Link>
          <ReadMore
            lowestNote={note.lowestNote}
            highestNote={note.highestNote}
          />
        </section>
      </main>
      <Navigation />
    </>
  );
};

export default Range;
