import { Song } from "@/types/song";
import Image from "next/image";

interface ContentProps {
  song: Song;
}

const ShareItems = ({ song }: ContentProps) => {

  return (
    <div
      className="rounded-3xl w-full p-2 relative overflow-hidden flex items-center my-2 h-28"
    >
      <Image src={song.coverImg} alt={song.title} width={500} height={500} />
      <span className="w-full text-center absolute top-1/3 text-white text-xl">
        {song.title}
      </span>
    </div>
  );
};

export default ShareItems;
