import { atom } from 'jotai';

export interface User {
  nickname: string;
  accessToken?: string;
  refreshToken?: string;
  isMember: boolean;
}

// 기본 유저 상태
export const userState = atom<User>({
  nickname: 'no name',
  isMember: false,
});
