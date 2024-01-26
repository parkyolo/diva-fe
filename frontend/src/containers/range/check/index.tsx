'use client';

import ClayButton from '@/components/ClayButton';
import RangeCheckGuide from '@/containers/range/check/RangeCheckGuide';
import VoiceDetector from '@/containers/range/check/VoiceDetector';
import { useEffect, useState } from 'react';
import Loader from '@/containers/range/check/Loader';
import Link from 'next/link';
import Timer from '@/containers/range/check/Timer';
import PitchDetector from '@/containers/range/check/PitchDetector';

const RangeCheckPage: React.FC = () => {
  const GuidePhase = 0b00;
  const RecordingPhase = 0b01;
  const LoadingPhase = 0b10;

  const [currentPhase, setCurrentPhase] = useState(GuidePhase);
  const [isResultLoading, setIsResultLoading] = useState(true);

  // 결과 로딩할 때 일정 시간 후 '결과 확인하기' 버튼 렌더링
  useEffect(() => {
    if (currentPhase === LoadingPhase) {
      const timeoutId = setTimeout(() => {
        setIsResultLoading(false);
      }, 1000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [currentPhase]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {currentPhase === GuidePhase && (
        <>
          <RangeCheckGuide></RangeCheckGuide>
          <ClayButton
            onClick={() => {
              setCurrentPhase(RecordingPhase);
            }}
          >
            테스트 시작하기
          </ClayButton>
        </>
      )}

      {currentPhase === RecordingPhase && (
        <>
          <Timer></Timer>
          <PitchDetector></PitchDetector>
          <VoiceDetector></VoiceDetector>
          <ClayButton onClick={() => setCurrentPhase(LoadingPhase)}>
            녹음 중지하기
          </ClayButton>
        </>
      )}

      {currentPhase === LoadingPhase && (
        <>
          <Loader></Loader>
          {!isResultLoading && (
            <ClayButton>
              <Link href="/range">결과 확인하기</Link>
            </ClayButton>
          )}
        </>
      )}
    </div>
  );
};

export default RangeCheckPage;
