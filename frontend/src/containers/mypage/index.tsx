'use client';

import Header from '@/components/Header';
import MainLogo from '/public/svgs/logo.svg';
import SettingIcon from '/public/svgs/setting.svg';
import LeftArrow from '/public/svgs/left_arrow.svg';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { useState } from 'react';
import MyPageContent from './MyPageContent';
import SettingPage from './SettingPage';

const MyPage = () => {
  const myPage = 0b00;
  const settingPage = 0b01;
  const [page, setPage] = useState<number>(myPage);

  const handleMyPageToSetting = () => {
    setPage(settingPage);
  };

  const handleSettingToMyPage = () => {
    setPage(myPage);
  };

  const handleUpdateProfile = () => {
    // 프로필 업데이트 fetch
    setPage(myPage);
  };

  return (
    <>
      {page === myPage ? (
        <>
          <Header
            LeftComponent={
              <Link href="/">
                <MainLogo />
              </Link>
            }
            RightComponent={
              <button onClick={handleMyPageToSetting}>
                <SettingIcon />
              </button>
            }
          />
          <MyPageContent />
        </>
      ) : (
        <>
          <Header
            LeftComponent={
              <button onClick={handleSettingToMyPage}>
                <LeftArrow />
              </button>
            }
            RightComponent={
              <button onClick={handleUpdateProfile}>
                <span>완료</span>
              </button>
            }
          />
          <SettingPage />
        </>
      )}
      <Navigation />
    </>
  );
};

export default MyPage;
