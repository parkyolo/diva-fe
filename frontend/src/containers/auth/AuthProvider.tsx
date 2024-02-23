'use client';

import ClientOnly from '@/components/ClientOnly';
import { reissueToken } from '@/services/reissueToken';
import { TOKEN_UNAVAILABLE, accessTokenAtom, userAtom } from '@/store/user';
import { useAtom, useAtomValue } from 'jotai';
import { RESET } from 'jotai/utils';
import { redirect, usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
  landing: React.ReactNode;
  refreshTokenCookie: string;
}

/**
 * atom을 활용해 유저 정보를 제공하는 컴포넌트
 *
 * 유저 정보가 있다면 홈, 없다면 랜딩 페이지를 렌더링합니다.
 *
 * @param param0
 * @returns
 */
const AuthProvider = ({
  children,
  landing,
  refreshTokenCookie,
}: AuthProviderProps) => {
  const user = useAtomValue(userAtom);
  const [accessToken, setAccessTokenWithLocalStorage] =
    useAtom(accessTokenAtom);
  const pathname = usePathname();
  useLayoutEffect(() => {
    // 토큰이 유효하지 않은 경우 토큰 리이슈
    if (user === TOKEN_UNAVAILABLE) {
      console.log('hi');
      reissueToken(accessToken, setAccessTokenWithLocalStorage);
    }

    // 유저의 음역대 테스트 결과가 없으면 range/check으로 리다이렉트
    if (user && user !== TOKEN_UNAVAILABLE) {
      if (!user.vocalRange && pathname !== '/range/check') {
        redirect('/range/check');
      }
    }

    // 서버사이드에서 리프레시 토큰이 없을 시 로컬 스토리지의 액세스 토큰을 초기화하는 것으로 로그아웃 처리.
    // 따로 백엔드 서버로 로그아웃 요청을 보내진 않음.
    if (!refreshTokenCookie) {
      console.log('no refresh token');
      setAccessTokenWithLocalStorage(RESET);
    }
  }, [user]);

  // client only 가 아닐 시 landing을 잠깐 들렀다 홈으로 오는 문제가 생김.
  return <ClientOnly>{user ? children : landing}</ClientOnly>;
};

export default AuthProvider;
