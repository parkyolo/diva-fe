import { SharedSong } from '@/types/song';
import Image from 'next/image';

interface ContentProps {
  song: SharedSong;
}

const ShareItems = ({ song }: ContentProps) => {
  return (
    <>
      <div className="relative w-full h-24">
        <Image
          src="/images/4.jpg"
          // src={`https://diva-s3.s3.ap-northeast-2.amazonaws.com/song/${song.songTitle}/${song.songTitle}_coverImg.png`}
          alt={song.songTitle}
          width={500}
          height={500}
          className="w-full h-24 rounded-xl object-cover brightness-50"
        />
        <span className="w-full text-center absolute top-1/3 text-white text-xl">
          {song.songTitle}
        </span>
      </div>
    </>
  );
};

export default ShareItems;
