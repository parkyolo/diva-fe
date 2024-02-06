'use client';

import ClientOnly from '@/components/ClientOnly';
import { userAtom } from '@/store/user';
import { Provider, useAtomValue } from 'jotai';

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
  // TODO: 로그인 시 유저 정보를 다시 안 읽는 문제 해결 필요
  const user = useAtomValue(userAtom);

  return <ClientOnly>{user ? children : landing}</ClientOnly>;
};

export default AuthProvider;
