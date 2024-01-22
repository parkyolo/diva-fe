'use client';

import ClayButton from '@/components/ClayButton';
import Image from 'next/image';
import React from 'react';

interface StopRecordingProps {
  onStopRecording: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}
const stopRecording = ({ onStopRecording }: StopRecordingProps) => {
  const btnContent: string = '녹음 중지하기';
  return (
    <div className="b">
      <ClayButton label={btnContent} onClick={onStopRecording} />
    </div>
  );
};

export default stopRecording;
