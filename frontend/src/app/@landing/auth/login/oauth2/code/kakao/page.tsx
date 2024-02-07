'use client';

import { setAccessTokenCookie } from '@/app/action';
import { accessTokenAtom, userAtom } from '@/store/user';
import { useAtom, useSetAtom } from 'jotai';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const KakaoLogin: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code: string | null = searchParams!.get('code');
  const setAccessTokenWithLocalStorage = useSetAtom(accessTokenAtom);

  const [user, setUser] = useAtom(userAtom);

  const loginHandler = async (code: string | null) => {
    console.log('code', code);
    const response: Response = await fetch(
      `/api/auth/login/oauth2/code/kakao?code=${code}`,
    );

    if (response.ok) {
      // 응답으로부터 토큰정보 추출
      const accessToken: string = response.headers.get('authorization') ?? '';
      // TODO: 리프레쉬 토큰 활용 필요
      const refreshToken: string =
        response.headers.get('authorizationrefresh') ?? '';
      // 쿠키에 저장
      setAccessTokenCookie(accessToken);

      // 전역 상태에 저장
      setAccessTokenWithLocalStorage(accessToken);

      router.push('/');
    } else {
      console.log('로그인 실패');
      alert('로그인 중 에러가 발생했습니다.');
      router.push('/');
    }
  };

  useEffect(() => {
    if (code) {
      loginHandler(code);
    }
  }, []);

  return <>로그인 중</>;
};

export default KakaoLogin;
