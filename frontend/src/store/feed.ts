import { atom } from 'jotai';
import { SangSong } from '@/types/song';
import { PostInterface, UpdateSongs } from '@/types/post';

const initialSong: SangSong = {
  practiceResultId: 0,
  songTitle: '',
  artist: '',
  coverImg: '',
  createdDate: '',
  score: 0,
};

const initialPostForm: UpdateSongs = {
  postId: 0,
  content: '',
  title: '',
  score: 0,
  artist: '',
  coverImg: '',
  practiceResultId: 0,
};

const feedPage = 0b0;
const uploadForm = 0b1;
const updateForm = 0b10;
const feedPageAtom = atom<number>(feedPage);
const songAtom = atom<SangSong>(initialSong);
const postAtom = atom<UpdateSongs>(initialPostForm);
export { feedPage, uploadForm, updateForm, songAtom, postAtom, feedPageAtom };
