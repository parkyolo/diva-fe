import { S3SongInfo } from '@/types/song';

export const mrUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_MR.mp3`;
};

export const infoUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_INFO.txt`;
};
