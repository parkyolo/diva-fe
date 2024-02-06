'use client';

import ClientOnly from '@/components/ClientOnly';
import { userAtom } from '@/store/user';
import { useAtomValue } from 'jotai';

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
  // TODO: 로그인이 되어있지 않으면 모두 '/'로 리다이렉트 필요
  const user = useAtomValue(userAtom);

  // client only 가 아닐 시 landing을 잠깐 들렀다 홈으로 오는 문제가 생김.
  return <ClientOnly>{user ? children : landing}</ClientOnly>;
};

export default AuthProvider;
