'use client';

import { useEffect, useRef } from 'react';

interface Props {
  startVocalRange: number;
  endVocalRange: number;
}

const Piano = ({ startVocalRange, endVocalRange }: Props) => {
  const pianoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (let i = startVocalRange - 1; i < endVocalRange; i++) {
      const whiteKeyboards: any = pianoRef.current?.querySelectorAll('div');
      let selectedKey: HTMLElement | null | undefined;
      if (whiteKeyboards) {
        selectedKey = whiteKeyboards[i];
      }
      if (!!selectedKey) {
        selectedKey.style.backgroundImage = 'none';
        selectedKey.style.backgroundColor = '#32c5ff';
      }
    }
    console.log(startVocalRange, endVocalRange);
  }, []);
  return (
    <div
      id="piano"
      className="flex justify-center items-start w-full"
      ref={pianoRef}
    >
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/C2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/D2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/E2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/F2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/G2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/A2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/B2.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/C3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/D3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/E3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/F3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/G3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/A3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/B3.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/C4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/D4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/E4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/F4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/G4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/A4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/B4.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/C5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/D5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/E5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/F5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/G5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/A5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/B5.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/C6.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/D6.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
      <span className="w-[1.1%] h-5 rounded-sm bg-darkgray border-darkgray border mx-[-0.6%] z-10 drop-shadow-[0px_2.058px_2.058px_rgba(0, 0, 0, 0.23)]"></span>
      <div
        className="w-[3.125%] h-8 border-bg-black border rounded-sm bg-gradient-to-b from-white/85 to-white drop-shadow-[0px_1.372px_5.144px_rgba(0, 0, 0, 0.30)]"
        onClick={() => {
          const audio = new Audio('/audio/pianoAudio/E6.mov');
          audio.volume = 0.1;
          audio.play();
        }}
      ></div>
    </div>
  );
};

export default Piano;
