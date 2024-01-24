'use client';

import { usePathname } from 'next/navigation';
import Logo from '/public/svgs/logo.svg';
import SettingIcon from '/public/svgs/setting.svg';
import Link from 'next/link';

const Header = () => {
  const defaultClassName =
    'flex items-center w-100vw h-10 bg-transparent mx-5 my-3.5 ';
  const path: string | null = usePathname();

  return (
    <div>
      {/* home과 mypage 이외엔 모달로 처리하기 때문에 2개의 분기만 생성 */}
      {path !== '/mypage' ? (
        <header className={defaultClassName + 'flex-start'}>
          <Link href="/">
            <Logo />
          </Link>
        </header>
      ) : (
        <header className={defaultClassName + 'justify-between'}>
          <Link href="/">
            <Logo />
          </Link>
          {/* 클릭시 세팅 모달 띄우기로 수정 필요 */}
          <Link href="">
            <SettingIcon />
          </Link>
        </header>
      )}
    </div>
  );
};

export default Header;
