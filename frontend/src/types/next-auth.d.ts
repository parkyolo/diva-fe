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
