'use client';

import { useEffect, useState } from 'react';
import Cactus from '/public/images/cactus.png';
import ClayButton from '@/components/ClayButton';
import CountUp from 'react-countup';
import Image from 'next/image';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { RealModeRequest, RealModeScore } from '@/types/song';

const PlayResult = ({
  realModeResult,
}: {
  realModeResult: RealModeRequest | undefined;
}) => {
  const [newScore, setNewScore] = useState<number>(98);
  const [previousScore, setPreviousScore] = useState<number | null>();
  const handleShare = () => {};

  const [isLoading, resultResponse, error, getResultScore] =
    useFetch<RealModeScore>(req.sing.realModeScore);

  useEffect(() => {
    if (resultResponse) {
      setNewScore(resultResponse.score);
    }
  }, [resultResponse]);

  useEffect(() => {
    if (realModeResult) {
      try {
        // TODO: 파이썬 서버로부터 채점 결과를 받아오기
        // getResultScore(realModeResult);
      } catch (_) {
        console.log(error);
      }
    }
  }, [realModeResult]);

  return (
    <main className="flex flex-col h-full items-center justify-between pt-0 mb-10">
      <Image src={Cactus} alt="Cactus" priority={true}></Image>
      <div className="flex w-10/12 justify-start rounded-xl shadow-[24px_24px_48px_0_rgb(0,0,0,0.25)_inset] py-7">
        <div className="h-10 w-1 animate-scorebox rounded-r-xl bg-skyblue mr-5"></div>
        <div>
          <div>
            <span className="text-xl animate-scorebox">점수</span>
          </div>
          <div className="animate-blink">
            {resultResponse ? (
              <div className="delay-1000 animate-moveleft">
                <CountUp className="text-3xl" start={0} end={newScore} />
              </div>
            ) : (
              <></>
            )}
            {previousScore && newScore > previousScore ? (
              <div className="animate-movetop">
                지난 플레이에 비해{' '}
                <em className="text-skyblue text-xl font-bold not-italic">
                  {Math.floor(
                    ((newScore - previousScore) / previousScore) * 100,
                  )}
                  %
                </em>
                &nbsp;올랐어요!
              </div>
            ) : (
              <div className="animate-movetop">참 잘했어요!</div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* TODO: 업로드폼으로 Link 추가 필요 */}
        <ClayButton onClick={handleShare}>공유하기</ClayButton>
      </div>
    </main>
  );
};

export default PlayResult;
