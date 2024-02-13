'use client';

import Content from '@/containers/home/Content';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import PlayResult from '@/containers/play/PlayResult';
import RealMode from '@/containers/play/RealMode';
import TutorialMode from '@/containers/play/TutorialMode';
import { CloseButton, LeftArrowIcon, HeaderLogo } from '../../../public/svgs';
import { S3SongInfo } from '@/types/song';

export const homePage = 0b00;
export const realMode = 0b01;
export const tutorialMode = 0b10;
export const resultPage = 0b11;

const Home = () => {
  const [mode, setMode] = useState(homePage);
  const [activeMusicId, setActiveMusicId] = useState<number>(0);
  const [activeMusic, setActiveMusic] = useState<S3SongInfo>({
    artist: '',
    songTitle: '',
  });
  const [realModeResultId, setResultId] = useState<number>(0);

  const handleModeChange = (newMode: number) => {
    setMode(newMode);
  };

  const handleGoBack = () => {
    setMode(homePage);
  };

  return (
    <>
      {mode === homePage ? (
        <>
          <Header
            LeftComponent={
              <Link href="/">
                <HeaderLogo />
              </Link>
            }
          />
          <Content
            onModeChange={handleModeChange}
            setActiveMusicId={setActiveMusicId}
            setActiveSong={setActiveMusic}
          />
          <Navigation />
        </>
      ) : mode === realMode ? (
        <>
          <Header
            LeftComponent={
              <div className="text-skyblue font-bold text-xl">실전모드</div>
            }
          />
          <RealMode
            songId={activeMusicId}
            onModeChange={handleModeChange}
            setResultId={setResultId}
            song={activeMusic}
          />
        </>
      ) : mode === tutorialMode ? (
        <>
          <Header
            LeftComponent={
              <div className="text-skyblue font-bold text-xl">튜토리얼</div>
            }
            RightComponent={
              <button onClick={handleGoBack} className="font-samlip">
                <CloseButton />
              </button>
            }
          />
          <TutorialMode onModeChange={handleModeChange} song={activeMusic} />
        </>
      ) : (
        <>
          <Header
            LeftComponent={
              <button onClick={handleGoBack}>
                <LeftArrowIcon />
              </button>
            }
          />
          <PlayResult />
        </>
      )}
    </>
  );
};

export default Home;
