'use client';
import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import VolumeOn from '/public/svgs/volume_up.svg';
import VolumeOff from '/public/svgs/volume_off.svg';
import { Song } from '@/types/song';
import Main from '@/components/Main';
import SongCarousel from './SongCarousel';
import { useState } from 'react';

const SongRecommendations: Song[] = [
  {
    id: '0',
    title: '서울의 달',
    artist: '김건모',
    similarity: '90',
    coverImg: '/images/3.jpg',
    difficulty: 4,
  },
  {
    id: '1',
    title: '오랜만에',
    artist: '죠지',
    similarity: '70',
    coverImg: '/images/4.jpg',
    difficulty: 5,
  },
  {
    id: '2',
    title: '부럽지가 않어',
    artist: '장기하',
    similarity: '50',
    coverImg: '/images/5.jpg',
    difficulty: 3,
  },
];

const Content = ({ onModeChange }: { onModeChange: Function }) => {
  const [isOpen, open, close] = useModal();
  const changeModeToReal = () => {
    onModeChange(0b01);
  };
  const changeModetoTutorial = () => {
    onModeChange(0b10);
  };

  const [isMusicPreviewOn, setIsMusicPreviewOn] = useState<boolean>(true);

  return (
    <>
      <Main className="relative">
        <button
          className="absolute top-[1rem] right-[2rem]"
          onClick={() => setIsMusicPreviewOn((prev) => !prev)}
        >
          {isMusicPreviewOn ? <VolumeOn /> : <VolumeOff />}
        </button>

        <SongCarousel
          interval={5000}
          onClick={open}
          songs={SongRecommendations}
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
