'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FeedIcon from '/public/svgs/nav_feed.svg';
import HomeIcon from '/public/svgs/nav_home.svg';
import MyPageIcon from '/public/svgs/nav_mypage.svg';
import RangeIcon from '/public/svgs/nav_test.svg';

const Navigation = () => {
  const path: string | null = usePathname();
  return (
    <nav className="flex justify-around px-5 py-3.5 bg-btn-black">
      <Link
        href="/"
        className="flex flex-col items-center [&:hover>span]:text-skyblue [&:hover>svg]:fill-skyblue"
      >
        {path === '/' ? (
          <>
            <HomeIcon className="fill-skyblue" />
            <span className="text-sm font-samlip text-skyblue">홈</span>
          </>
        ) : (
          <>
            <HomeIcon className="fill-gray" />
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
            <RangeIcon className="fill-skyblue" />
            <span className="text-sm font-samlip text-skyblue">음역대</span>
          </>
        ) : (
          <>
            <RangeIcon className="fill-gray" />
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
            <FeedIcon className="fill-skyblue" />
            <span className="text-sm font-samlip text-skyblue">피드</span>
          </>
        ) : (
          <>
            <FeedIcon className="fill-gray" />
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
            <MyPageIcon className="fill-skyblue" />
            <span className="text-sm font-samlip text-skyblue">마이페이지</span>
          </>
        ) : (
          <>
            <MyPageIcon className="fill-gray" />
            <span className="text-sm font-samlip text-gray">마이페이지</span>
          </>
        )}
      </Link>
    </nav>
  );
};

export default Navigation;
