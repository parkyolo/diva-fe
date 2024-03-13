import { atom } from "jotai";

const myPage = 0b0;
const myPageAtom = atom<number>(myPage);

export default myPageAtom
