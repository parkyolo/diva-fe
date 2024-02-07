'use client';

import { pianoRange } from '@/types/range';
import { useEffect, useRef } from 'react';

const Piano = ({ pianoRange }: { pianoRange: pianoRange }) => {
  const pianoRef = useRef<HTMLDivElement>(null);

  // TODO: audio 추가할까 말까
  const handleAudio = (note: string) => {
    const audio = new Audio(`/audio/pianoAudio/${note}.mov`);
    audio.play();
  };

  useEffect(() => {
    const whiteKeyDivs: NodeListOf<HTMLDivElement> | undefined =
      pianoRef.current?.querySelectorAll('div');
    if (whiteKeyDivs && pianoRange) {
      const whiteKeyboards = [...whiteKeyDivs];
      whiteKeyboards.forEach((key, index) => {
        if (
          index >= pianoRange.lowestNote - 1 &&
          index < pianoRange.highestNote
        ) {
          key.style.backgroundColor = '#32c5ff';
        } else {
          key.style.backgroundColor = 'white';
        }
      });
    }
  }, [pianoRange]);

  return (
    <div
      id="piano"
      className="flex justify-center items-start w-full"
      ref={pianoRef}
    >
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 "></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm"></div>
    </div>
  );
};

export default Piano;
