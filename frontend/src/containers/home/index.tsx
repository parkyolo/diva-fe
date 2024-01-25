'use client';

import Content from '@/containers/home/Content';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import MainLogo from '/public/svgs/logo.svg';
import Link from 'next/link';

const Home = () => {
  const homePage = 0b00;
  const realMode = 0b01;
  const tutorialMode = 0b10;
  const resultPage = 0b11;

  const [mode, setMode] = useState(homePage);
  // const [musicId, setMusicId]

  const handleModeChange = (newMode: number) => {
    setMode(newMode);
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
        <>실전</>
      ) : mode === tutorialMode ? (
        <>튜토리얼</>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;
