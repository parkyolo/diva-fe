'use client';

import ClientOnly from '@/components/ClientOnly';
import { userAtom } from '@/store/user';
import { useAtomValue } from 'jotai';
import { redirect, usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
  landing: React.ReactNode;
}

/**
 * atom을 활용해 유저 정보를 제공하는 컴포넌트
 *
 * 유저 정보가 있다면 홈, 없다면 랜딩 페이지를 렌더링합니다.
 *
 * @param param0
 * @returns
 */
const AuthProvider = ({ children, landing }: AuthProviderProps) => {
  const user = useAtomValue(userAtom);

  // 유저의 음역대 테스트 결과가 없으면 range/check으로 리다이렉트
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (user) {
      if (!user.vocalRange && pathname !== '/range/check') {
        redirect('/range/check');
      }
    }
  }, [user]);

  // client only 가 아닐 시 landing을 잠깐 들렀다 홈으로 오는 문제가 생김.
  return <ClientOnly>{user ? children : landing}</ClientOnly>;
};

export default AuthProvider;
