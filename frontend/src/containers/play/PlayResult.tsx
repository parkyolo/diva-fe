'use client';

import { useState } from 'react';
import Cactus from '/public/svgs/cactus1.svg';
import ClayButton from '@/components/ClayButton';
import CountUp from 'react-countup';

const PlayResult = () => {
  const [newScore, setNewScore] = useState<number>(98);
  const [previousScore, setPreviousScore] = useState<number | null>();
  const handleShare = () => {};

  return (
    <main className="flex flex-col h-full items-center justify-between pt-0">
      <Cactus />
      <div className="flex w-10/12 justify-start rounded-xl shadow-inner shadow-[8px_8px_8px_8px_rgba(0, 0, 0, 0.5)] py-3">
        <div className="h-10 w-1 animate-scorebox rounded-r-xl bg-skyblue mr-5"></div>
        <div>
          <div>
            <span className="animate-scorebox">점수</span>
          </div>
          <div className="animate-blink">
            <div className="delay-1000 animate-moveleft">
              <CountUp className="text-3xl" start={0} end={newScore} />
            </div>
            {previousScore && newScore > previousScore ? (
              <div className="text-sm animate-movetop">
                지난 플레이에 비해{' '}
                <em className="text-skyblue text-[0.9rem] font-bold not-italic">
                  {Math.floor(
                    ((newScore - previousScore) / previousScore) * 100,
                  )}
                  %
                </em>
                &nbsp;올랐어요!
              </div>
            ) : (
              <div className="text-sm animate-movetop">참 잘했어요!</div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* 업로드폼으로 Link 추가 필요 */}
        <ClayButton onClick={handleShare}>공유하기</ClayButton>
      </div>
    </main>
  );
};

export default PlayResult;
