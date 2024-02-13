'use client';

import { setRefreshTokenCookie } from '@/app/action';
import { accessTokenAtom } from '@/store/user';
import { useSetAtom } from 'jotai';
import { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const KakaoLogin: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code: string | null = searchParams!.get('code');
  const setAccessTokenWithLocalStorage = useSetAtom(accessTokenAtom);

  const loginHandler = async (code: string | null) => {
    const response: Response = await fetch(
      `/api/auth/login/oauth2/code/kakao?code=${code}`,
    );

    if (response.ok) {
      // 응답으로부터 토큰정보 추출
      const accessToken: string = response.headers.get('Authorization') ?? '';
      const refreshToken: string =
        response.headers.get('AuthorizationRefresh') ?? '';

      // 리프레쉬 토큰 쿠키에 저장
      setRefreshTokenCookie(refreshToken);
      // 액세스 토큰 전역 상태+로컬스토리지에 저장
      setAccessTokenWithLocalStorage(accessToken);

      router.push('/');
    } else {
      console.log('로그인 실패', response.status);
      alert('로그인 중 에러가 발생했습니다.');
      router.push('/');
    }
  };

  useEffect(() => {
    if (code) {
      loginHandler(code);
    }
  }, []);

  //TODO: 로그인 로드 중 띄울 화면 지정하기
  return <>로그인 중</>;
};

export default KakaoLogin;
