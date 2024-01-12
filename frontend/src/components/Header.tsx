'use client';

import Logo from '@/components/Logo';
import Login from '@/components/login/Login';

const Header = () => {
  return (
    <header>
      <div>
        <Logo />
        <Login />
      </div>
    </header>
  );
};

export default Header;
