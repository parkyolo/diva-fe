import { coverUrl, mrUrl, userArUrl } from '@/utils/getS3URL';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { PlayIcon } from '../../../public/svgs';

interface AudioPlayerProps {
  artist: string;
  songTitle: string;
  practiceResultId: number;
}

const AudioPlayer = ({
  artist,
  songTitle,
  practiceResultId,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const mrAudioRef = useRef<HTMLAudioElement>(null);
  const arAudioRef = useRef<HTMLAudioElement>(null);
  const handleAudioPause = () => {
    mrAudioRef.current?.pause();
    arAudioRef.current?.pause();
    setIsPlaying(false);
  };
  const handleAudioPlay = () => {
    mrAudioRef.current?.play();
    arAudioRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-24">
      <Image
        src={coverUrl({
          artist,
          songTitle,
        })}
        alt={songTitle}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-24 rounded-xl object-cover brightness-50"
      ></Image>
      {isPlaying ? (
        <button
          onClick={handleAudioPause}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <div className="font-bold text-3xl font-samlip">| |</div>
        </button>
      ) : (
        <button
          onClick={handleAudioPlay}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <PlayIcon viewBox="0 0 50 50" />
        </button>
      )}
      {/* TODO: S3에서 사용자 노래 받아오기 */}
      <audio
        src={mrUrl({
          artist,
          songTitle,
        })}
        ref={mrAudioRef}
      ></audio>
      <audio
        src={userArUrl(practiceResultId, { artist, songTitle })}
        ref={arAudioRef}
      ></audio>
    </div>
  );
};

export default AudioPlayer;
