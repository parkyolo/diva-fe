export interface Song {
  id: string;
  title: string;
  artist: string;
  coverImg: string;
  lyric?: string;
  playtime?: string;
  releaseDate?: Date;
  mrUrl?: string;
  songRange?: SongRange;
  similarity: string;
  difficulty: DifficultyRange;
  createDate?: Date;
}

export interface SongRange {
  id: string;
  highestNote: string;
  song: Song;
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
