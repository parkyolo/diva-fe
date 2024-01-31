import { Song } from '@/types/song';
import Image, { StaticImageData } from 'next/image';

interface ContentProps {
  song: Song;
}

const SongItems = ({ song }: ContentProps) => {
  return (
    <div className="w-1/3 aspect-square p-2 relative">
      <div className="relative">
        <Image src={song.coverImg} alt={song.title} width={500} height={500} />
        <span className="w-full text-center absolute top-1/3 ">
          {song.title}
        </span>
      </div>
    </div>
  );
};

export default SongItems;
