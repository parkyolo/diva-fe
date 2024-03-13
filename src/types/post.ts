export interface PostInterface {
  postId: number;
  content: string;
  heartCount: number;
  member: {
    memberId: number;
    nickname: string;
    profileImg: string;
  };
  practiceResult: {
    practiceResultId: number;
    score: number;
    song: {
      songId: number;
      title: string;
      artist: string;
      coverImg: string;
    };
  };
  liked: boolean;
  createDate: string;
}

export interface UpdateSongs {
  postId: number;
  content: string;
  title: string;
  score: number;
  artist: string;
  coverImg: string;
  practiceResultId: number;
}

export interface feedRequest {
  postId: number;
  pageSize: number;
}
