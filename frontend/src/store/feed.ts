import { atom } from 'jotai';
import { SangSong } from '@/types/song';

const initialSong: SangSong = {
  practiceResultId: 0,
  songTitle: '',
  artist: '',
  coverImg: '',
  createdDate: '',
  score: 0,
};

const feedPage = 0b0;
const uploadForm = 0b1;
const feedPageAtom = atom<number>(feedPage);
const songAtom = atom<SangSong>(initialSong);

export { feedPage, uploadForm, songAtom, feedPageAtom };
