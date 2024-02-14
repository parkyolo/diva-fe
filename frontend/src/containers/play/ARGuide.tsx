import { RefObject, useState } from 'react';

const ARGuide = ({
  arAudioRef,
}: {
  arAudioRef: RefObject<HTMLAudioElement>;
}) => {
  const [isAROn, setAROn] = useState<boolean>(false);

  const handleAR = () => {
    if (isAROn) {
      if (arAudioRef.current) arAudioRef.current.volume = 0;
    } else {
      if (arAudioRef.current) arAudioRef.current.volume = 0.3;
    }
    setAROn(!isAROn);
  };

  return (
    <button
      onClick={handleAR}
      className="font-samlip text-xl outline-none border shadow-[3px_-3px_10px_1px_rgba(255,255,255,0.3)] rounded-xl w-10/12 py-2 mx-auto"
    >
      {isAROn ? <span>노래 가이드 끄기</span> : <span>노래 가이드 켜기</span>}
    </button>
  );
};

export default ARGuide;
