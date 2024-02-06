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

type vocalRange = {
  highestNote: string;
  lowestNote: string;
};
