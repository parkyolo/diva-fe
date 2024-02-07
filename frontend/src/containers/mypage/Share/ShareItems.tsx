import { SharedSong } from '@/types/song';
import Image from 'next/image';
import PlayIcon from '/public/svgs/polygon.svg';
import { useEffect, useRef, useState } from 'react';
import DotsThreeVertical from '/public/svgs/dots-three-vertical.svg';
import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import {  useAtomValue } from 'jotai';
import { userAtom } from '@/store/user';

interface ContentProps {
  song: SharedSong;
}

const ShareItems = ({ song }: ContentProps) => {
  const user = useAtomValue(userAtom);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleAudioPause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleAudioPlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, open, close] = useModal();

  // 수정할거
  const handleEditPost = () => {};
  // 지울거
  const handleRemovePost = () => {};
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 justify-start items-center">
          <Image
            src={user.profileImg}
            alt="profile-img"
            width={54}
            height={54}
            className="rounded-full"
          ></Image>

          <div>
            <div className="font-bold text-xl">{user.nickname}</div>
            <div className="">
              <span>{song.songTitle}</span> &middot;&nbsp;
              <span>{song.artist}</span>
            </div>
          </div>
        </div>
      </div>
      {song.content}
      <div className="relative w-full h-24">
        <Image
          src="/images/1.png"
          // src={song.coverImg}
          alt={song.songTitle}
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
            <audio src={song.recordUrl}></audio>
          </button>
        )}
        <audio src={song.recordUrl} ref={audioRef}></audio>
      </div>

      {isOpen && (
        <BottomSheet close={close}>
          <BottomSheet.Button btnColor="bg-blue" onClick={handleEditPost}>
            수정하기
          </BottomSheet.Button>
          <BottomSheet.Button
            btnColor="bg-btn-black"
            onClick={handleRemovePost}
          >
            삭제하기
          </BottomSheet.Button>
        </BottomSheet>
      )}
    </div>
  );
};

export default ShareItems;
