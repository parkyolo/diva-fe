import Link from 'next/link';
import axios from 'axios';
import kakaologo from '@/../public/images/kakao_login_medium_narrow.png';
import Image from 'next/image';

export default function Login() {
  // kakao_login
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  console.log(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI);
  console.log(process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY);
  return (
    <a href={KAKAO_AUTH_URL}>
      <Image src={kakaologo} alt="" />
    </a>
  );
}
