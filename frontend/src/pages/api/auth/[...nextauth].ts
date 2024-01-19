import { connectDB } from '@/utils/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  providers: [
    // 깃허브 로그인
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRETS!,
    }),
    // 카카오 로그인
    // KakaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID!,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    // }),
  ],
  secret: process.env.JWT_PASSWORD,
  adapter: MongoDBAdapter(connectDB), // mongodb에 user 정보를 저장하기 위한 adapter
};

export default NextAuth(authOptions);
