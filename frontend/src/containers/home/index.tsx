'use client';

import Content from '@/containers/home/Content';
import Navigation from '@/components/Navigation';
import { useRef, useState } from 'react';
import Header from '@/components/Header';
import MainLogo from '/public/svgs/logo.svg';
import LeftArrow from '/public/svgs/left_arrow.svg';
import Link from 'next/link';
import PlayResult from '../play/PlayResult';
import RealMode from '../play/RealMode';
import TutorialMode from '../play/TutorialMode';
import CloseButton from '/public/svgs/close_button.svg';

const Home = () => {
  const homePage = 0b00;
  const realMode = 0b01;
  const tutorialMode = 0b10;
  const resultPage = 0b11;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [mode, setMode] = useState(homePage);
  // const [musicId, setMusicId]

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
                <MainLogo />
              </Link>
            }
          />
          <Content onModeChange={handleModeChange} />
          <Navigation />
        </>
      ) : mode === realMode ? (
        <>
          <Header
            LeftComponent={
              <div className="text-skyblue font-bold text-xl">실전모드</div>
            }
          />
          <RealMode audioRef={audioRef} />
          <audio autoPlay ref={audioRef}>
            <source src={'/audio/폰서트.m4a'} type={'audio/mp3'} />
          </audio>
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
          <TutorialMode audioRef={audioRef} />
          <audio autoPlay ref={audioRef}>
            <source src={'/audio/폰서트.m4a'} type={'audio/mp3'} />
          </audio>
        </>
      ) : (
        <>
          <Header
            LeftComponent={
              <button onClick={handleGoBack}>
                <LeftArrow />
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
