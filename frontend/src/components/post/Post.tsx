'use client';

import Image from 'next/image';
import DotsThreeVertical from '/public/svgs/dots-three-vertical.svg';
import LikeIcon from '/public/svgs/like.svg';
import PostContents from './PostContents';
import { useRef, useState } from 'react';
import useModal from '@/hooks/useModal';
import BottomSheet from '../BottomSheet/BottomSheet';
import PlayIcon from '/public/svgs/polygon.svg';

interface Props {
  profileImg: string;
  nickname: string;
  writerId: string;
  songTitle: string;
  artistName: string;
  contents: string;
  coverImg: string;
  audiofile: string;
  likes: number;
  liked: boolean;
}

const Post = ({
  profileImg,
  nickname,
  writerId,
  songTitle,
  artistName,
  contents,
  coverImg,
  audiofile,
  likes,
  liked,
}: Props) => {
  // 전역으로 관리되고 있는 유저 정보
  const user = {
    id: '10190@gmail.com',
  };
  const maxContentsLength = 65;
  const [more, setMore] = useState(
    contents.length > maxContentsLength ? true : false,
  );
  const handleMoreButton = () => {
    setMore(!more);
  };

  const [isOpen, open, close] = useModal();
  const [audio, setAudio] = useState(new Audio(audiofile));
  const playButton = useRef<HTMLButtonElement>(null);
  const pauseButton = useRef<HTMLButtonElement>(null);
  const handleEditPost = () => {};
  const handleRemovePost = () => {};

  const handleAudioPlay = () => {
    audio.play();
    if (playButton.current) playButton.current.style.display = 'none';
    if (pauseButton.current) pauseButton.current.style.display = 'block';
  };

  const handleAudioPause = () => {
    audio.pause();
    if (playButton.current) playButton.current.style.display = 'block';
    if (pauseButton.current) pauseButton.current.style.display = 'none';
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 justify-start items-center">
          <Image
            src={profileImg}
            alt="profile-img"
            width={54}
            height={54}
            className="rounded-full"
          ></Image>

          <div>
            <div className="font-bold text-xl">{nickname}</div>
            <div className="">
              <span>{songTitle}</span> &middot;&nbsp;
              <span>{artistName}</span>
            </div>
          </div>
        </div>
        {writerId === user.id ? (
          <button onClick={open}>
            <DotsThreeVertical />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="">
        {contents.length > maxContentsLength ? (
          more ? (
            <>
              <PostContents contents={contents} styles={'text-overflow'} />
              <button onClick={handleMoreButton} className="text-gray">
                더 보기
              </button>
            </>
          ) : (
            <>
              <PostContents contents={contents} />
              <button onClick={handleMoreButton} className="text-gray">
                접기
              </button>
            </>
          )
        ) : (
          <PostContents contents={contents} />
        )}
      </div>
      <div className="relative">
        <Image
          src={coverImg}
          alt={songTitle}
          width={100}
          height={96}
          className="w-full h-24 rounded-xl object-cover brightness-50"
        ></Image>
        <button
          onClick={handleAudioPlay}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          ref={playButton}
        >
          <PlayIcon viewBox="0 0 50 50" />
        </button>
        <button
          onClick={handleAudioPause}
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden"
          ref={pauseButton}
        >
          <div className="font-bold text-3xl font-samlip">| |</div>
        </button>
      </div>
      <div className="flex justify-start gap-2 items-center">
        <div>
          {liked ? (
            <LikeIcon className="fill-red stroke-red" />
          ) : (
            <LikeIcon className="stroke-gray" />
          )}
        </div>
        <div className="text-gray ">
          <em className="not-italic font-bold text-white">{likes}명</em>이
          좋아합니다.
          {likes === 0 ? <span> (좋아요로 관심을 표현해주세요!)</span> : <></>}
        </div>
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

export default Post;
