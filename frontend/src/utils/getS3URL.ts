import { S3SongInfo } from '@/types/song';
import { User } from '@/types/user';

export const mrUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_MR.mp3`;
};

export const infoUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_INFO.txt`;
};

export const coverUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/coverImg.jpg`;
};

export const userImgUrl = ({ memberId }: User) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/profileImg/${memberId}/profileImg.jpg`;
};

export const userArUrl = (
  practiceResultId: number,
  { artist, songTitle }: S3SongInfo,
) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/PracticeResult/${practiceResultId}/${artist}-${songTitle}_vocal.wav`;
};
