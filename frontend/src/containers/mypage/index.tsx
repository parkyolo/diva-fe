'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { userAtom } from '@/store/user';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';
import MyPageContent from './MyPageContent';
import SettingPage from './SettingPage';
import LeftArrow from '/public/svgs/left_arrow.svg';
import MainLogo from '/public/svgs/logo.svg';
import SettingIcon from '/public/svgs/setting.svg';

interface user {
  profileImg: string;
  nickname: string;
}

const MyPage = () => {
  const user = useAtomValue(userAtom);
  console.log(user);

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
      {user && page === myPage && (
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
          <main className="py-0 px-5">
            <MyPageContent user={user}></MyPageContent>
          </main>
        </>
      )}
      {user && page === settingPage && (
        <>
          <Header
            LeftComponent={
              <button onClick={handleSettingToMyPage}>
                <LeftArrow />
              </button>
            }
            RightComponent={
              <button onClick={handleUpdateProfile}>
                <span className=" font-samlip text-skyblue">완료</span>
              </button>
            }
          />
          <SettingPage userinfo={user}></SettingPage>
        </>
      )}
      <Navigation />
    </>
  );
};

export default MyPage;
