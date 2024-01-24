'use client';

import { usePathname } from 'next/navigation';
import Link from '../../../node_modules/next/link';
import FeedIcon from '/public/svgs/nav_feed.svg';
import HomeIcon from '/public/svgs/nav_home.svg';
import MyPageIcon from '/public/svgs/nav_mypage.svg';
import RangeIcon from '/public/svgs/nav_test.svg';
import config from '../../../tailwind.config';

const Navigation = () => {
  const path: string = usePathname();

  return (
    <div className="flex justify-around px-5 py-3.5 bg-btn-black">
      <Link
        href="/"
        className="flex flex-col items-center [&:hover>span]:text-skyblue [&:hover>svg]:fill-skyblue"
      >
        {path === '/' ? (
          <>
            <HomeIcon fill={config.theme.colors.skyblue} />
            <span className="text-sm font-samlip text-skyblue">홈</span>
          </>
        ) : (
          <>
            <HomeIcon fill={config.theme.colors.gray} />
            <span className="text-sm font-samlip text-gray">홈</span>
          </>
        )}
      </Link>
      <Link
        href="/range"
        className="flex flex-col items-center [&:hover>span]:text-skyblue [&:hover>svg]:fill-skyblue"
      >
        {path === '/range' ? (
          <>
            <RangeIcon fill={config.theme.colors.skyblue} />
            <span className="text-sm font-samlip text-skyblue">음역대</span>
          </>
        ) : (
          <>
            <RangeIcon fill={config.theme.colors.gray} />
            <span className="text-sm font-samlip text-gray">음역대</span>
          </>
        )}
      </Link>
      <Link
        href="/feed"
        className="flex flex-col items-center [&:hover>span]:text-skyblue [&:hover>svg]:fill-skyblue"
      >
        {path === '/feed' ? (
          <>
            <FeedIcon fill={config.theme.colors.skyblue} />
            <span className="text-sm font-samlip text-skyblue">피드</span>
          </>
        ) : (
          <>
            <FeedIcon fill={config.theme.colors.gray} />
            <span className="text-sm font-samlip text-gray">피드</span>
          </>
        )}
      </Link>
      <Link
        href="/mypage"
        className="flex flex-col items-center [&:hover>span]:text-skyblue [&:hover>svg]:fill-skyblue"
      >
        {path === '/mypage' ? (
          <>
            <MyPageIcon fill={config.theme.colors.skyblue} />
            <span className="text-sm font-samlip text-skyblue">마이페이지</span>
          </>
        ) : (
          <>
            <MyPageIcon fill={config.theme.colors.gray} />
            <span className="text-sm font-samlip text-gray">마이페이지</span>
          </>
        )}
      </Link>
    </div>
  );
};

export default Navigation;
