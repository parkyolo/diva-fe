'use client';

import Image from 'next/image';
import DotsThreeVertical from '/public/svgs/dots-three-vertical.svg';
import LikeIcon from '/public/svgs/like.svg';
import PostContent from './PostContent';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useModal from '@/hooks/useModal';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import PlayIcon from '/public/svgs/polygon.svg';
import { PostInterface } from '@/types/post';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';

const Post = ({
  post,
  isPlaying,
  handleCurrentAudio,
}: {
  post: PostInterface;
  isPlaying: boolean;
  handleCurrentAudio: Dispatch<SetStateAction<number | null>>;
}) => {
  const [delteisLoading, deletePost, deleteError, doDeletePost] = useFetch<
    PostInterface[]
  >(req.post.deletePost);
  const [updateisLoading, updateePost, updateError, doUpdatePost] = useFetch<
    PostInterface[]
  >(req.post.updatePost);

  const [doUnLikeisLoading, unlike, doUnLikeError, doUnlike] = useFetch<
    PostInterface[]
  >(req.post.doUnlike);
  const [doLikeisLoading, like, doLikeError, doLike] = useFetch<
    PostInterface[]
  >(req.post.doLike);

  // const user = useAtomValue(userAtom); // 전역으로 관리되고 있는 유저 정보
  const user = 1;

  // 컨텐츠 더보기
  const maxContentsLength = 65;
  const [more, setMore] = useState(
    post.content.length > maxContentsLength ? true : false,
  );

  const handleMoreButton = () => {
    setMore(!more);
  };

  // 수정/삭제 모달
  const [isOpen, open, close] = useModal();

  const handleEditPost = () => {
    doUpdatePost({ postId: post.postId, content: '수정' });
  };
  const handleRemovePost = () => {
    doDeletePost({ postId: post.postId });
  };

  // 오디오 제어
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isPlaying) audioRef.current?.pause();
  }, [isPlaying]);

  const handleAudioPause = () => {
    audioRef.current?.pause();
    handleCurrentAudio(null);
  };

  const handleAudioPlay = () => {
    audioRef.current?.play();
    handleCurrentAudio(post.postId);
  };

  const handleLike = () => {
    if (post.liked) {
      doUnlike({ postId: post.postId });
    } else {
      doLike({ postId: post.postId });
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 justify-start items-center">
          <Image
            src="/images/cactus.png"
            // src={post.profileImg}
            alt="profile-img"
            width={54}
            height={54}
            className="rounded-full"
          ></Image>

          <div>
            <div className="font-bold text-xl">{post.member.nickname}</div>
            <div className="">
              <span>{post.practiceResult.song.title}</span> &middot;&nbsp;
              <span>{post.practiceResult.song.artist}</span>
            </div>
          </div>
        </div>
        {post.member.memberId === user ? (
          <button onClick={open}>
            <DotsThreeVertical />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="">
        {post.content.length > maxContentsLength ? (
          more ? (
            <>
              <PostContent content={post.content} styles={'text-overflow'} />
              <button onClick={handleMoreButton} className="text-gray">
                더 보기
              </button>
            </>
          ) : (
            <>
              <PostContent content={post.content} />
              <button onClick={handleMoreButton} className="text-gray">
                접기
              </button>
            </>
          )
        ) : (
          <PostContent content={post.content} />
        )}
      </div>
      <div className="relative w-full h-24">
        <Image
          src="/images/cactus.png"
          // src={post.coverImgUrl}
          alt={post.practiceResult.song.title}
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
            {/* TODO: S3에서 가져오나? */}
            {/* <audio src={post.audioUrl}></audio> */}
          </button>
        )}
        {/* <audio src={audioUrl} ref={audioRef}></audio> */}
      </div>
      <div
        className="flex justify-start gap-2 items-center"
        onClick={handleLike}
      >
        {post.liked ? (
          <LikeIcon className="fill-red stroke-red" />
        ) : (
          <LikeIcon className="stroke-gray" />
        )}
        <div className="text-gray ">
          <em className="not-italic font-bold text-white">
            {post.heartCount}명
          </em>
          이 좋아합니다.
          {post.heartCount === 0 ? (
            <span> (좋아요로 관심을 표현해주세요!)</span>
          ) : (
            <></>
          )}
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
