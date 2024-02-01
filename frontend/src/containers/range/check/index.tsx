'use client';

import ClayButton from '@/components/ClayButton';
import RangeCheckGuide from '@/containers/range/check/RangeCheckGuide';
import VoiceDetector from '@/containers/range/check/VoiceDetector';
import { useEffect, useState } from 'react';
import Loader from '@/containers/range/check/Loader';
import Link from 'next/link';
import Timer from '@/containers/range/check/Timer';
import PitchDetector from '@/containers/range/check/PitchDetector';
import Header from '@/components/Header';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useRouter } from 'next/navigation';
import { convertHztoNote } from '@/utils/convertHztoNote';

const RangeCheckPage: React.FC = () => {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [pitchArray, setPitchArray] = useState<number[]>([]);

  useEffect(() => {
    const getAudioStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        setAudioStream(stream);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    getAudioStream();
  }, []);

  const handleStopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
      convertHztoNote(pitchArray);
      setCurrentPhase(LoadingPhase);
      const { minNoteName, maxNoteName } = convertHztoNote(pitchArray);
      console.log(minNoteName, maxNoteName);
      setCurrentPhase(LoadingPhase);
    }
  };

  const router = useRouter();
  const GuidePhase = 0b00;
  const RecordingPhase = 0b01;
  const LoadingPhase = 0b10;

  const [currentPhase, setCurrentPhase] = useState(GuidePhase);
  const [isResultLoading, setIsResultLoading] = useState(true);
  const handleTimerFinish = () => {
    setCurrentPhase(LoadingPhase);
  };
  // 결과 로딩할 때 일정 시간 후 '결과 확인하기' 버튼 렌더링
  useEffect(() => {
    if (currentPhase === LoadingPhase) {
      const timeoutId = setTimeout(() => {
        setIsResultLoading(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPhase]);

  // 처음 측정 or 재측정인지 판단
  const hasUserResult = true;

  return (
    <>
      {currentPhase === GuidePhase && (
        <>
          {hasUserResult && (
            <Header
              LeftComponent={
                <button
                  onClick={() => {
                    router.back();
                  }}
                >
                  <LeftArrow></LeftArrow>
                </button>
              }
            ></Header>
          )}

          <main className="flex flex-col justify-evenly items-center">
            <RangeCheckGuide></RangeCheckGuide>
            <ClayButton
              onClick={() => {
                setCurrentPhase(RecordingPhase);
              }}
            >
              테스트 시작하기
            </ClayButton>
          </main>
        </>
      )}

      {currentPhase === RecordingPhase && (
        <>
          <Header
            LeftComponent={
              <button
                onClick={() => {
                  setCurrentPhase(GuidePhase);
                }}
              >
                <LeftArrow></LeftArrow>
              </button>
            }
          ></Header>
          <main className="flex flex-col justify-evenly items-center">
            <Timer
              onFinish={() => {
                handleStopRecording();
              }}
            ></Timer>
            <PitchDetector
              audioStream={audioStream}
              pitchArr={pitchArray}
              updatePitchArray={(newPitchArray) => {
                setPitchArray(newPitchArray);
              }}
            ></PitchDetector>
            <VoiceDetector></VoiceDetector>
            <ClayButton
              onClick={() => {
                handleStopRecording();
              }}
            >
              녹음 중지하기
            </ClayButton>
          </main>
        </>
      )}

      {currentPhase === LoadingPhase && (
        <>
          <main className="flex flex-col justify-evenly items-center">
            <Loader></Loader>
            {!isResultLoading && (
              <ClayButton>
                <Link href="/range">결과 확인하기</Link>
              </ClayButton>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default RangeCheckPage;
