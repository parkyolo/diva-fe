'use client';

import { usePathname } from 'next/navigation';
import Logo from './Logo';
import SettingIcon from './SettingIcon';

const Header = () => {
  const defaultClassName =
    'flex items-center w-100vw h-10 bg-transparent mx-5 my-3.5 ';
  const path: string = usePathname();

  return (
    <div>
      {/* home과 mypage 이외엔 모달로 처리하기 때문에 2개의 분기만 생성 */}
      {path !== '/mypage' ? (
        <header className={defaultClassName + 'flex-start'}>
          <Logo />
        </header>
      ) : (
        <header className={defaultClassName + 'justify-between'}>
          <Logo />
          <SettingIcon />
        </header>
      )}
    </div>
  );
};

export default Header;
