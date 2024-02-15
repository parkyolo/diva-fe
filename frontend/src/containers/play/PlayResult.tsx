'use client';

import ClayButton from '@/components/ClayButton';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { feedPageAtom, songAtom } from '@/store/feed';
import { RealModeResult, RealModeScore, SangSong } from '@/types/song';
import { coverUrl } from '@/utils/getS3URL';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import AudioPlayer from '../feed/AudioPlayer';
import Cactus from '/public/images/cactus.png';
import Loader from '../range/check/Loader';

const PlayResult = ({
  realModeResult,
}: {
  realModeResult: RealModeResult | undefined;
}) => {
  // 공유하기 버튼 누르면 업로드 폼으로 이동
  const router = useRouter();
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setSongData = useSetAtom(songAtom);

  const handleShare = () => {
    if (realModeResult && resultResponse) {
      const dataTosend: SangSong = {
        practiceResultId: realModeResult.practiceResultId,
        songTitle: realModeResult.title,
        artist: realModeResult.artist,
        createdDate: realModeResult.createdDate,
        score: resultResponse.score,
        coverImg: coverUrl({
          artist: realModeResult.artist,
          songTitle: realModeResult.title,
        }),
      };
      setSongData(dataTosend);
      setFeedPageAtom(0b1);
      router.push('/feed');
    }
  };

  const [isScoreLoading, resultResponse, error, getResultScore] =
    useFetch<RealModeScore>(req.sing.realModeScore);

  useEffect(() => {
    getResultScore(realModeResult);
  }, [realModeResult]);

  useEffect(() => {
    if (error) {
      router.push('/');
      alert('점수 가져오기에 실패했습니다.');
      console.log(error);
    }
  }, [error]);

  return (
    <main className="flex flex-col h-full items-center justify-between pt-0 mb-10">
      {resultResponse && !error ? (
        <div>
          <Image src={Cactus} alt="Cactus" priority={true}></Image>
          <div className="flex w-10/12 justify-start rounded-xl shadow-[24px_24px_48px_0_rgb(0,0,0,0.25)_inset] py-7">
            <div className="h-10 w-1 animate-scorebox rounded-r-xl bg-skyblue mr-5"></div>
            <div className="animate-blink">
              <div>
                <span className="text-xl animate-scorebox">점수</span>
              </div>
              <div className="delay-1000 animate-moveleft">
                <CountUp
                  className="text-3xl"
                  start={0}
                  end={resultResponse.score}
                />
              </div>
              <div className="animate-movetop">참 잘했어요!</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-10 h-full w-full justify-evenly">
            <div className="flex flex-col gap-10">
              {realModeResult && (
                <AudioPlayer
                  artist={realModeResult.artist}
                  practiceResultId={realModeResult.practiceResultId}
                  songTitle={realModeResult.title}
                />
              )}
              <p className="flex flex-col gap-4 text-xl">
                <span className="text-center">
                  점수 로딩은 최대 1분이 걸립니다.
                </span>
                <span className="text-center">
                  기다리는 동안 노래를 다시 감상해주세요.
                </span>
              </p>
            </div>
            <Loader />
          </div>
        </>
      )}
      {!isScoreLoading && !error && (
        <div>
          <ClayButton onClick={handleShare}>공유하기</ClayButton>
        </div>
      )}
    </main>
  );
};

export default PlayResult;
