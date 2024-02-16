import { S3SongInfo, S3UserRecord } from '@/types/song';
import { User } from '@/types/user';

export const mrUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_MR.mp3`;
};

export const arUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_AR.wav`;
};

export const origMusicUrl = ({ artist, songTitle }: S3SongInfo) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${artist}-${songTitle}/${artist}-${songTitle}_ORIG.m4a`;
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
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/PracticeResult/${practiceResultId}/${artist}-${songTitle}.mp3`;
};

export const userRecord = ({
  practiceResultId,
  artist,
  title,
}: S3UserRecord) => {
  return `https://diva-s3.s3.ap-northeast-2.amazonaws.com/PracticeResult/${practiceResultId}/${artist}-${title}_vocal.wav`;
};
