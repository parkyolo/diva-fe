'use client';

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
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/login/oauth2/code/kakao?code=${code}`,
    );

    if (response.ok) {
      // 응답으로부터 토큰정보 추출
      const accessToken = response.headers.get('authorization') as string;
      const refreshToken = response.headers.get(
        'authorizationrefresh',
      ) as string;

      // 응답으로부터 유저 정보 추출
      // const data = await response.json();
      // const user = JSON.parse(data.data);
      // const { id, email, nickname } = user;

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
