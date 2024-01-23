'use client';

import React, { useState } from 'react';
import StartRecording from '@/containers/range/start';
import StopRecording from '@/containers/range/stop';
import Link from 'next/link';
import { Router } from 'next/router';

const Recording: React.FC = () => {
  const router = Router;
  const [isRecording, setIsRecording] = useState(true);
  const handleStartRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsRecording(false);
  };
  const handleStopRecording = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsRecording(true);
  };

  return (
    <div>
      {isRecording ? (
        <StartRecording onStartRecording={handleStartRecording} />
      ) : (
        <Link href="/range">
          <StopRecording onStopRecording={handleStopRecording} />
        </Link>
      )}
    </div>
  );
};

export default Recording;
