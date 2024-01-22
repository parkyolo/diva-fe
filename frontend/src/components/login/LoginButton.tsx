'use client';

import { signIn } from 'next-auth/react';

const LoginButton = () => {
  return (
    <div>
      <button onClick={() => signIn()}>로그인</button>
    </div>
  );
};

export default LoginButton;
