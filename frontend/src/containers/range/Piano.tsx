'use client';

import { useEffect, useRef } from 'react';

interface Props {
  startVocalRange: number;
  endVocalRange: number;
}

const Piano = ({ startVocalRange, endVocalRange }: Props) => {
  const pianoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (let i = startVocalRange; i <= endVocalRange; i++) {
      const selectedKey: HTMLElement | null | undefined =
        pianoRef.current?.querySelector(`div:nth-child(${i})`);
      if (!!selectedKey) {
        selectedKey.style.backgroundImage = 'none';
        selectedKey.style.backgroundColor = '#32c5ff';
      }
    }
  }, []);
  return (
    <div
      id="piano"
      className="flex justify-center items-start w-full"
      ref={pianoRef}
    >
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"></div>
    </div>
  );
};

export default Piano;
