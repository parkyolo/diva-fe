'use client';

import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Main from '@/components/Main';
import SongCarousel from './SongCarousel';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RecommendedSong, S3SongInfo } from '@/types/song';
import { useFetch } from '@/hooks/useFetch';
import { realMode, tutorialMode } from '.';

const Content = ({
  onModeChange,
  setActiveSong,
}: {
  onModeChange: Function;
  setActiveSong: Dispatch<SetStateAction<S3SongInfo>>;
}) => {
  const [isOpen, open, close] = useModal();
  const [activeMusicIdx, setActiveMusicIdx] = useState<number>(0);
  const [recommendedSongs, setRecommendSongs] = useState<RecommendedSong[]>([
    {
      songId: 1,
      songTitle: '서울의달',
      artist: '김건모',
      similarity: '90',
      coverUrl: '/images/3.jpg',
    },
    {
      songId: 2,
      songTitle: '퀸카(Queencard)',
      artist: '(여자)아이들',
      similarity: '70',
      coverUrl: '/images/4.jpg',
    },
    {
      songId: 3,
      songTitle: '예뻤어',
      artist: '데이식스',
      similarity: '50',
      coverUrl: '/images/5.jpg',
    },
    {
      songId: 4,
      songTitle: '폰서트',
      artist: '10cm',
      similarity: '50',
      coverUrl: '/images/5.jpg',
    },
  ]);
  // const [isLoading, recommendedSongs, err, getRecommendedSongs] = useFetch(req.recommend.getSongRecommendation)

  const changeModeToReal = () => {
    setActiveSong({
      artist: recommendedSongs[activeMusicIdx].artist,
      songTitle: recommendedSongs[activeMusicIdx].songTitle,
    });
    onModeChange(realMode);
  };

  const changeModetoTutorial = () => {
    setActiveSong({
      artist: recommendedSongs[activeMusicIdx].artist,
      songTitle: recommendedSongs[activeMusicIdx].songTitle,
    });
    onModeChange(tutorialMode);
  };

  useEffect(() => {
    // TODO: 노래 추천 get api
    // try {
    //   getRecommendedSongs();
    // }
  });

  return (
    <>
      <Main className="relative">
        <SongCarousel
          interval={50000}
          onClick={open}
          songs={recommendedSongs}
          setActiveMusicIdx={setActiveMusicIdx}
        ></SongCarousel>
      </Main>

      {/* bottomsheet modal */}
      {isOpen && (
        <BottomSheet close={close}>
          <BottomSheet.Button btnColor="bg-blue" onClick={changeModeToReal}>
            실전모드
          </BottomSheet.Button>
          <BottomSheet.Button
            btnColor="bg-btn-black"
            onClick={changeModetoTutorial}
          >
            튜토리얼
          </BottomSheet.Button>
        </BottomSheet>
      )}
    </>
  );
};

export default Content;
