'use client';

import Image from 'next/image';
import PostContent from './PostContent';
import useModal from '@/hooks/useModal';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { PostInterface } from '@/types/post';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { feedPage, feedPageAtom, postAtom, updateForm } from '@/store/feed';
import { userAtom } from '@/store/user';
import { mrUrl, coverUrl, userArUrl } from '@/utils/getS3URL';
import { LikeIcon, PlayIcon, MenuIcon } from '../../../../public/svgs';
import { reFetchingAtom } from '../store';

const Post = ({
  post,
  isPlaying,
  handleCurrentAudio,
}: {
  post: PostInterface;
  isPlaying: boolean;
  handleCurrentAudio: Dispatch<SetStateAction<number | null>>;
}) => {
  const user = useAtomValue(userAtom);
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setPostData = useSetAtom(postAtom);
  const setReFetching = useSetAtom(reFetchingAtom);
  const [deleteLoading, deleteResponse, deleteError, deletePost] = useFetch(
    req.post.deletePost,
  );
  const [likeLoading, likeResponse, likeError, postLike] = useFetch(
    req.post.doLike,
  );
  const [isLiked, setIsLiked] = useState<boolean>(post.liked);
  const [heartCount, setHeartCount] = useState<number>(post.heartCount);

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

  // 오디오 제어
  const mrAudioRef = useRef<HTMLAudioElement>(null);
  const arAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isPlaying) {
      mrAudioRef.current?.pause();
      arAudioRef.current?.pause();
    }
  }, [isPlaying]);

  const handleAudioPause = () => {
    mrAudioRef.current?.pause();
    arAudioRef.current?.pause();
    handleCurrentAudio(null);
  };

  const handleAudioPlay = () => {
    mrAudioRef.current?.play();
    arAudioRef.current?.play();
    handleCurrentAudio(post.postId);
  };

  const handleUpdate = () => {
    setFeedPageAtom(updateForm);
    setPostData({
      postId: post.postId,
      content: post.content,
      title: post.practiceResult.song.title,
      score: post.practiceResult.score,
      artist: post.practiceResult.song.artist,
      coverImg: post.practiceResult.song.coverImg,
      practiceResultId: post.practiceResult.practiceResultId,
    });
  };

  const handleRemove = () => {
    try {
      deletePost({ postId: post.postId });
      setReFetching(true);
      setFeedPageAtom(feedPage);
    } catch (_) {
      console.log(deleteError);
    }
  };

  const handleLike = () => {
    try {
      postLike({ postId: post.postId });
      if (isLiked) setHeartCount(heartCount - 1);
      else setHeartCount(heartCount + 1);
      setIsLiked(!isLiked);
    } catch (_) {
      console.log(likeError);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 justify-start items-center">
            <div className="w-[54px] aspect-square relative rounded-full overflow-hidden shrink-0">
              <Image
                src={
                  post.member.profileImg
                    ? `https://diva-s3.s3.ap-northeast-2.amazonaws.com/profileImg/${post.member.memberId}/profileImg.jpg`
                    : '/images/cactus.png'
                }
                alt="프로필 이미지입니다"
                fill
              ></Image>
            </div>
            <div>
              <div className="font-bold text-xl">{post.member.nickname}</div>
              <div className="flex flex-row justify-between">
                <div className="text-overflow-one">
                  {post.practiceResult.song.title} &middot;&nbsp;
                  {post.practiceResult.song.artist} &nbsp;
                </div>
                <div className="rounded-2xl bg-blue">
                  &nbsp;&nbsp;
                  {post.practiceResult.score}
                  &nbsp;&nbsp;
                </div>
              </div>
            </div>
          </div>
          {post.member.memberId === user.memberId ? (
            <button onClick={open}>
              <MenuIcon />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>
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
            src={coverUrl({
              artist: post.practiceResult.song.artist,
              songTitle: post.practiceResult.song.title,
            })}
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
            </button>
          )}

          <audio
            src={mrUrl({
              artist: post.practiceResult.song.artist,
              songTitle: post.practiceResult.song.title,
            })}
            ref={mrAudioRef}
          ></audio>
          <audio
            src={userArUrl(post.practiceResult.practiceResultId, {
              artist: post.practiceResult.song.artist,
              songTitle: post.practiceResult.song.title,
            })}
            ref={arAudioRef}
          ></audio>
        </div>

        <div className="flex justify-start gap-2 items-center">
          <button onClick={handleLike} className="active:animate-ping">
            {isLiked ? (
              <LikeIcon className="fill-red stroke-red" />
            ) : (
              <LikeIcon className="stroke-gray" />
            )}
          </button>
          <div className="text-gray ">
            <em className="not-italic font-bold text-white">{heartCount}명</em>
            이 좋아합니다.
            {heartCount === 0 ? <span> (관심을 표현해주세요!)</span> : <></>}
          </div>
        </div>

        {isOpen && (
          <BottomSheet close={close}>
            <BottomSheet.Button btnColor="bg-blue" onClick={handleUpdate}>
              수정하기
            </BottomSheet.Button>
            <BottomSheet.Button btnColor="bg-btn-black" onClick={handleRemove}>
              삭제하기
            </BottomSheet.Button>
          </BottomSheet>
        )}
      </div>
    </>
  );
};

export default Post;
