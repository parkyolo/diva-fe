import { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      username?: string | undefined | null;
      uid?: string | undefined | null;
    } & DefaultSession['user'];
  }
}
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
