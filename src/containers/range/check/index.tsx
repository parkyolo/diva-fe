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
import { LeftArrowIcon } from '../../../../public/svgs';
import { convertHztoNote } from '@/utils/convertHztoNote';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/store/user';

const RangeCheckPage: React.FC = () => {
  const GuidePhase = 0b00;
  const RecordingPhase = 0b01;
  const LoadingPhase = 0b10;
  const [currentPhase, setCurrentPhase] = useState(GuidePhase);

  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [pitchArray, setPitchArray] = useState<number[]>([]);
  const [isPostLoading, postResponse, postError, postRange] = useFetch(
    req.sing.saveTestResult,
  );

  const handleStartRecording = async () => {
    setCurrentPhase(RecordingPhase);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioStream(stream);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const handleStopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        track.stop();
      });
      let audioTrack: MediaStreamTrack = audioStream.getAudioTracks()[0];
      audioStream.removeTrack(audioTrack);
      setAudioStream(null);
    }

    // 들어온 소리가 적을 경우 다시 테스트 유도
    if (pitchArray.length < 10) {
      alert('소음이 적은 환경에서 충분히 소리를 내어주세요.');
      setCurrentPhase(GuidePhase);
      window.location.replace('/range/check');
      return;
    }

    setCurrentPhase(LoadingPhase);
    const { minNoteName, maxNoteName } = convertHztoNote(pitchArray);
    postRange({ highestNote: maxNoteName, lowestNote: minNoteName });
    console.log(minNoteName, maxNoteName);
  };
  // isTimeout이 바뀌는 경우는 타이머 컴포넌트에서 20초가 지날 때 뿐
  useEffect(() => {
    if (isTimeout) {
      handleStopRecording();
    }
  }, [isTimeout]);

  // 로딩페이즈: 로딩 컴포넌트 보여주다가 /range로 리다이렉트
  useEffect(() => {
    if (currentPhase === LoadingPhase) {
      const timeoutId = setTimeout(() => {
        window.location.replace('/range');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentPhase]);

  // 처음 측정 or 재측정인지 판단
  const [hasUserResult, setDefaultResult] = useState<boolean>(false);
  const userInfo = useAtomValue(userAtom);

  useEffect(() => {
    if (userInfo?.vocalRange) setDefaultResult(true);
  }, [userInfo]);

  return (
    <>
      {currentPhase === GuidePhase && (
        <>
          {hasUserResult && (
            <Header
              LeftComponent={
                <Link href={'/range'}>
                  <LeftArrowIcon></LeftArrowIcon>
                </Link>
              }
            ></Header>
          )}

          <main className="flex flex-col justify-start gap-10 items-center">
            <RangeCheckGuide></RangeCheckGuide>
            <ClayButton onClick={handleStartRecording}>
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
                  window.location.replace('/range/check');
                }}
              >
                <LeftArrowIcon></LeftArrowIcon>
              </button>
            }
          ></Header>
          <main className="flex flex-col justify-evenly items-center py-10">
            <Timer setIsTimeout={setIsTimeout} />

            <PitchDetector
              audioStream={audioStream}
              pitchArr={pitchArray}
              updatePitchArray={(newPitchArray) => {
                setPitchArray(newPitchArray);
              }}
            ></PitchDetector>
            <VoiceDetector></VoiceDetector>
            <ClayButton onClick={handleStopRecording}>녹음 중지하기</ClayButton>
          </main>
        </>
      )}

      {currentPhase === LoadingPhase && (
        <>
          <main className="flex flex-col justify-evenly items-center">
            <Loader></Loader>
          </main>
        </>
      )}
    </>
  );
};

export default RangeCheckPage;
