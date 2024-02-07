import { vocalRange } from './range';

export interface User {
  nickname: string;
  profileImg: boolean;
  email: string;
  vocalRange: vocalRange;
}

export interface UserPatch {
  nickname: string;
  profileImg: boolean;
}
