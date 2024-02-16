import { RefObject, useState } from 'react';

const ARGuide = ({
  arAudioRef,
}: {
  arAudioRef: RefObject<HTMLAudioElement>;
}) => {
  const handleAR = () => {
    // if (arAudioRef.current?.volume && arAudioRef.current?.volume > 0.1) {
    //   if (arAudioRef.current) arAudioRef.current.volume = 0.01;
    // } else {
    //   if (arAudioRef.current) arAudioRef.current.volume = 0.3;
    // }
    // arAudioRef.current && arAudioRef.current.volume > 0.1
    if (arAudioRef.current?.muted) {
      if (arAudioRef.current) arAudioRef.current.muted = false;
    } else {
      if (arAudioRef.current) arAudioRef.current.muted = true;
    }
  };

  return (
    <button
      onClick={handleAR}
      className="font-samlip text-xl outline-none border shadow-[3px_-3px_10px_1px_rgba(255,255,255,0.3)] rounded-xl w-10/12 py-2 mx-auto"
    >
      {arAudioRef.current && !arAudioRef.current.muted ? (
        <span>노래 가이드 끄기</span>
      ) : (
        <span>노래 가이드 켜기</span>
      )}
    </button>
  );
};

export default ARGuide;
