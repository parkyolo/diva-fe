import { useEffect, useState } from 'react';
import Wiggle from '/public/images/wiggle1.png';

const VoiceDetector: React.FC = () => {
  const [hasInputVoice, setHasInputVoice] = useState(false);

  // '사용자의 인풋이 있을 때 애니메이션 추가' 로직이 들어갈 곳
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasInputVoice(true);
    }, 300);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`w-full h-[390px] ${
        hasInputVoice && 'animate-wiggle'
      } flex justify-center items-center bg-center bg-2x bg-no-repeat`}
      style={{ backgroundImage: `url(${Wiggle.src})` }}
    >
      <div className="flex gap-[12px] mix-blend-overlay justify-center items-center">
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv0'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv1'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv2'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv3'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv4'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv5'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv6'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv7'
          }`}
        ></div>
        <div
          className={`w-[8px] h-[8px] bg-white rounded-[100px] ${
            hasInputVoice && 'animate-dv8'
          }`}
        ></div>
      </div>
    </div>
  );
};

export default VoiceDetector;
