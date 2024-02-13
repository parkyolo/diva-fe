import { SangSong } from '@/types/song';
import Image, { StaticImageData } from 'next/image';
import { useSetAtom } from 'jotai';
import { songAtom, feedPageAtom } from '@/store/feed';
import { useRouter } from 'next/navigation';


interface ContentProps {
  song: SangSong;
}

const SongItems = ({ song }: ContentProps) => {
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setSongData = useSetAtom(songAtom);
  const router = useRouter();
  const sendDatatoJotaiStore = () => {
    if (song.songTitle !== '' && song.artist !== '' && song.coverImg !== '') {
      const dataTosend: SangSong = {
        practiceResultId: song.practiceResultId,
        songTitle: song.songTitle,
        artist: song.artist,
        coverImg: song.coverImg,
        createdDate: song.createdDate,
        score: song.score,
      };
      setSongData(dataTosend);
      setFeedPageAtom(0b1);
      router.push('/feed')
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
            <Image
              src={`/images/${song.coverImg}`}
              alt={song.songTitle}
              width={500}
              height={500}
            />
            <div className="absolute top-0 w-full h-full  bg-opacity-45 bg-bg-black "></div>
            <span className="w-full text-center absolute top-1/2 -translate-y-1/2  text-white">
              {song.songTitle}
            </span>
        </div>
      </div>
    </>
  );
};

export default SongItems;
