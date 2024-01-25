'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <div>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default LogoutButton;
