'use client';

import { useEffect, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { userState } from '@/types/user';
import Link from 'next/link';

const loginAtom = atom(userState);

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useAtom(loginAtom);

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      setIsLogin(true);
    }
  }, []);

  const logoutClicked = () => {
    setUser({ ...user });
    setIsLogin(false);
  };

  return (
    <div>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        {isLogin ? (
          <Link href="/" onClick={logoutClicked}>
            로그아웃
          </Link>
        ) : (
          <Link href="/login">로그인/회원가입</Link>
        )}
      </button>
    </div>
  );
};

export default Login;
