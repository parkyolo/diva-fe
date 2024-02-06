import { Song } from '@/types/song';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { songAtom, feedPageAtom } from '@/store/feed';

interface ContentProps {
  song: Song;
}

const SongItems = ({ song }: ContentProps) => {
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setSongData = useSetAtom(songAtom);
  const sendDatatoJotaiStore = () => {
    if (
      song.id !== '' &&
      song.title !== '' &&
      song.artist !== '' &&
      song.coverImg !== '' &&
      song.similarity !== ''
    ) {
      const dataTosend: Song = {
        id: song.id,
        title: song.title,
        artist: song.artist,
        coverImg: song.coverImg,
        similarity: song.similarity,
        createDate: song.createDate,
        difficulty: song.difficulty,
      };
      setSongData(dataTosend);
      setFeedPageAtom(0b1);
    }
  };

  return (
    <>
      <div className="w-1/3 aspect-square p-1 relative">
        <div
          className="relative"
          onClick={() => {
            sendDatatoJotaiStore();
          }}
        >
          <Link href="/feed">
            <Image
              src={song.coverImg}
              alt={song.title}
              width={500}
              height={500}
            />
            <div className="absolute top-0 w-full h-full  bg-opacity-45 bg-bg-black "></div>
            <span className="w-full text-center absolute top-1/2 -translate-y-1/2  text-white">
              {song.title}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SongItems;
