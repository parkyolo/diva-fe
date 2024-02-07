'use server';

import { cookies } from 'next/headers';

export async function setAccessTokenCookie(accessToken: string) {
  // Set cookie
  cookies().set('accessToken', accessToken);
}
