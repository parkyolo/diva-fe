import { Song } from '@/types/song';
import Image from 'next/image';

interface ContentProps {
  song: Song;
}

const ShareItems = ({ song }: ContentProps) => {
  return (
    <>
      <div className="relative w-full h-24">
        <Image
          src={song.coverImg}
          alt={song.title}
          width={500}
          height={500}
          className="w-full h-24 rounded-xl object-cover brightness-50"
        />
        <span className="w-full text-center absolute top-1/3 text-white text-xl">
          {song.title}
        </span>
      </div>
    </>
  );
};

export default ShareItems;
