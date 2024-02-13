import { vocalRange } from './range';

export interface User {
  memberId: number;
  nickname: string;
  profileImg: boolean;
  email: string;
  vocalRange: vocalRange;
}

export interface UserPatch {
  nickname: string;
  profileImg: boolean;
}
