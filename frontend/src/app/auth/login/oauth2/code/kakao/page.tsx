'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useEffect } from 'react';

const KakaoLogin = () => {
  // const router = useRouter();

  // console.log('code: ', code);
  console.log('kakaologin 진입');

  const loginHandler = async () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    try {
      // console.log('useEffect 진입');
      let result;
      await fetch(`auth/login/oauth2/authorization/kakao?code=${code}`)
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
          // // 로그인 성공, 이미 회원가입한 사용자
          // if (refreshToken) {

          // }
          // // 로그인 성공, 회원가입 되지 않은 사용자
          // else if (naverAccessToken) {

          // }
          // // 로그인 실패
          // else {}
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
