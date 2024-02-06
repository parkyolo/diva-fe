export interface IMember {
  nickname: string;
  profileImg: boolean;
  email: string;
  vocalRange: vocalRange;
}

export interface IMemberPatch {
  nickname: string;
  profileImg: boolean;
}

type vocalRange = {
  highestNote: string;
  lowestNote: string;
};
