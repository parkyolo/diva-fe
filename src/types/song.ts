export interface SangSong {
  practiceResultId: number;
  songTitle: string;
  coverImg: string;
  createdDate: string;
  artist: string;
  score: number;
  songId?: number;
}

export interface SharedSong {
  memberId: string;
  nickname: string;
  songId: number;
  songTitle: string;
  artist: string;
  coverImg: string;
  postId: number;
  content: string;
  createDate: string;
  practiceResultId: number;
  recordUrl: string;
  score: number;
  lastModifiedDate: string;
}

export interface RecommendedSongResponse {
  songId: number;
  title: string;
  artist: string;
  similarity: string;
  coverImg: string;
}

export interface RecommendedSong {
  songId: number;
  songTitle: string;
  artist: string;
  similarity: string;
  coverUrl: string;
}

export interface S3SongInfo {
  artist: string;
  songTitle: string;
}

export interface RealModeResponse {
  practiceResultId: number;
  createdDate: string;
}

export interface RealModeRequest {
  practiceResultId: number;
  artist: string;
  title: string;
}

export interface RealModeResult {
  practiceResultId: number;
  artist: string;
  title: string;
  createdDate: string;
}

export interface RealModeScore {
  score: number;
}

export interface letsUploadSongs extends SangSong {
  content: string;
}

export interface S3UserRecord {
  practiceResultId: number;
  artist: string;
  title: string;
}

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type DifficultyRange = Range<1, 6>;

export type { DifficultyRange };
