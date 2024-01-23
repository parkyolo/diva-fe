'use client';

import ClayButton from '@/components/ClayButton';
import Image from 'next/image';
import React from 'react';

interface StartRecordingProps {
  onStartRecording: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

const startRecording = ({ onStartRecording }: StartRecordingProps) => {
  const btnContent: string = '녹음 시작하기';
  return (
    <div>
      <div className="b">
        <Image
          src="/images/miccheck.png"
          width={200}
          height={200}
          alt="마이크"
        />
        <p className="text-red">가장 내기 편한 음을 내주세요</p>
        <p>본인이 낼 수 있는 가장 저음을 내주세요</p>
        <p>본인이 낼 수 있는 가장 고음을 내주세요</p>
        <ClayButton label={btnContent} onClick={onStartRecording} />
      </div>
      <div className="border-black flex-col justify-center items-center p-[60px]">
        <Image
          src="/images/miccheck.png"
          width={200}
          height={200}
          alt="마이크"
        />
        <p className="text-red">가장 내기 편한 음을 내주세요</p>
        <p>본인이 낼 수 있는 가장 저음을 내주세요</p>
        <p>본인이 낼 수 있는 가장 고음을 내주세요</p>
        <ClayButton label={btnContent} onClick={onStartRecording} />
      </div>
    </div>
  );
};

export default startRecording;

// .b{
//   border: black solid 1px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }
