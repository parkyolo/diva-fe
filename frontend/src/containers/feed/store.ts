import { atom } from 'jotai';

const fetchingAtom = atom<boolean>(false);
const reFetchingAtom = atom<boolean>(false);

export { fetchingAtom, reFetchingAtom };
