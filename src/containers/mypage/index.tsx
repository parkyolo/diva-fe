'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { userAtom } from '@/store/user';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import MyPageContent from './MyPageContent';
import SettingPage from './SettingPage';
import myPageAtom from '@/store/myPage';
import { useEffect } from 'react';
import { HeaderLogo, SettingIcon } from '../../../public/svgs/index';

const MyPage = () => {
  const user = useAtomValue(userAtom);
  const myPage = 0b0;
  const settingPage = 0b1;
  const [isMyPage] = useAtom(myPageAtom);
  const setMyPageAtom = useSetAtom(myPageAtom);
  useEffect(() => {
    setMyPageAtom(myPage);
  }, []);

  const handleMyPageToSetting = () => {
    setMyPageAtom(settingPage);
  };

  return (
    <>
      {user && isMyPage === myPage && (
        <>
          <Header
            LeftComponent={
              <Link href="/">
                <HeaderLogo />
              </Link>
            }
            RightComponent={
              <button onClick={handleMyPageToSetting}>
                <SettingIcon />
              </button>
            }
          />
          <main className="py-2">
            <MyPageContent user={user}></MyPageContent>
          </main>
        </>
      )}
      {user && isMyPage === settingPage && (
        <>
          <SettingPage user={user}></SettingPage>
        </>
      )}
      <Navigation />
    </>
  );
};

export default MyPage;
