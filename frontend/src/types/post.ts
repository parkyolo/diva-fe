export interface PostInterface {
  postId: number;
  audioUrl: string;
  content: string;
  writerId: number;
  nickname: string;
  profileUrl: string;
  songTitle: string;
  coverImgUrl: string;
  artist: string;
  likes: number;
  liked: boolean;
  practiceResultId?: number;
  played?: boolean;
}
