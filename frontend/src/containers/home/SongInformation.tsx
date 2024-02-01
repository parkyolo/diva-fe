import { Song } from '@/types/song';

interface SongInformationProps {
  song: Song;
}

const SongInformation = ({ song }: SongInformationProps) => {
  return (
    <div
      // 애니메이션 활성화를 위해 key 부여
      key={song.id}
      className="flex flex-col animate-[blink_0.5s_ease-in-out]"
    >
      <span className="text-2xl font-bold text-center">{`${song.title}`}</span>
      <span className="text-xl font-bold text-center">{`${song.artist}`}</span>
    </div>
  );
};

export default SongInformation;
