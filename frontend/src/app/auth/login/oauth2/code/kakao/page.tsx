'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useEffect } from 'react';

const KakaoLogin = () => {
  // const router = useRouter();
  // console.log('kakaologin 진입');

  const loginHandler = async () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    try {
      let result;
      await fetch(
        `http://localhost:9090/auth/login/oauth2/code/kakao?code=${code}`,
      )
        .then((res) => {
          if (res.ok) return res.json();
          // throw new Error('카카오 로그인 에러 발생');
        })
        .catch((error) => {
          console.log('error: ', error);
          // window.location.href = '/';
        })
        .then((data) => {
          console.log(data);
          //   const { accessToken, refreshToken } = data;
          result = data;
          /*
          // 로그인 성공
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            router.push('/');
            window.location.replace('/');
            console.log('로그인 성공');
          }
          // 로그인 실패
          else {}
          */
        });
      return NextResponse.json({ data: result });
    } catch (e) {
      return NextResponse.json({ data: 'fail' });
    }
  };

  useEffect(() => {
    loginHandler();
  }, []);

  return <>안녕</>;
};

export default KakaoLogin;
