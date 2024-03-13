'use server';

import { cookies } from 'next/headers';

export async function getRefreshTokenCookie() {
  // Set cookie
  const refreshToken: string =
    cookies().get('AuthorizationRefresh')?.value ?? '';
  return refreshToken;
}

export async function setRefreshTokenCookie(refreshToken: string) {
  // Set cookie
  cookies().set('AuthorizationRefresh', refreshToken, {
    httpOnly: true,
    secure: true,
  });
}

export async function removeRefreshTokenCookie() {
  // Remove cookie
  cookies().delete('AuthorizationRefresh');
}
