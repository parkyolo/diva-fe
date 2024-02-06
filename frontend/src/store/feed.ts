import { atom } from 'jotai';
import { Song } from '@/types/song';

const initialSong: Song = {
  id: '',
  title: '',
  artist: '',
  coverImg: '',
  similarity: '',
  difficulty: 1,
  createDate: new Date(),
};

const feedPage = 0b0;
const uploadForm = 0b1;
const feedPageAtom = atom<number>(feedPage);
const songAtom = atom<Song>(initialSong);

export { feedPage, uploadForm, songAtom, feedPageAtom };
