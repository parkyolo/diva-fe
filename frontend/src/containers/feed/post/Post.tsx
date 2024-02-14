'use client';

import Image from 'next/image';
import DotsThreeVertical from '/public/svgs/dots-three-vertical.svg';
import LikeIcon from '/public/svgs/like.svg';
import PostContent from './PostContent';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useModal from '@/hooks/useModal';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import PlayIcon from '/public/svgs/polygon.svg';
import { PostInterface, UpdateSongs } from '@/types/post';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { useAtomValue, useSetAtom } from 'jotai';
import { feedPageAtom, postAtom } from '@/store/feed';
import { userAtom } from '@/store/user';
import { useRouter } from 'next/navigation';
import { mrUrl, coverUrl, userArUrl } from '@/utils/getS3URL';

const Post = ({
  post,
  isPlaying,
  handleCurrentAudio,
  handleRemovePost,
  handleLikePost,
}: {
  post: PostInterface;
  isPlaying: boolean;
  handleCurrentAudio: Dispatch<SetStateAction<number | null>>;
  handleRemovePost: (postId: number) => void;
  handleLikePost: (postId: number) => void;
}) => {
  const [deleteisLoading, deletePost, deleteError, doDeletePost] = useFetch<
    PostInterface[]
  >(req.post.deletePost);

  const [isLoading, allPosts, error, getAllPosts] = useFetch<PostInterface[]>(
    req.post.getAllPosts,
  );

  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setPostData = useSetAtom(postAtom);
  const sendDatatoJotaiStore = () => {
    if (
      post.practiceResult.song.title !== '' &&
      post.practiceResult.song.artist !== '' &&
      post.practiceResult.song.coverImg !== ''
    ) {
      const dataTosend: UpdateSongs = {
        postId: post.postId,
        content: post.content,
        score: post.practiceResult.score,
        title: post.practiceResult.song.title,
        artist: post.practiceResult.song.artist,
        coverImg: coverUrl({
          artist: post.practiceResult.song.artist,
          songTitle: post.practiceResult.song.title,
        }),
      };
      setPostData(dataTosend);
      setFeedPageAtom(0b10);
    }
  };

  const [isLiked, setIsLiked] = useState<boolean>(post.liked);
  const handleLikebutton = () => {
    if (isLiked) {
      setIsLiked(false), (post.heartCount -= 1);
    } else {
      setIsLiked(true), (post.heartCount += 1);
    }
  };

  const handleRemove = async () => {
    // 삭제 버튼 클릭 시 handleRemovePost 호출
    await handleRemovePost(post.postId);
  };

  const handleLike = async () => {
    handleLikePost(post.postId);
  };
  const router = useRouter();
  const [doUnLikeisLoading, unlike, doUnLikeError, doUnlike] = useFetch<
    PostInterface[]
  >(req.post.doUnlike);
  const [doLikeisLoading, like, doLikeError, doLike] = useFetch<
    PostInterface[]
  >(req.post.doLike);

  const user = useAtomValue(userAtom); // 전역으로 관리되고 있는 유저 정보

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

  const handleAudioEnd = () => {
    handleCurrentAudio(null);
  };
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 justify-start items-center">
            <div className="w-[54px] aspect-square relative rounded-full overflow-hidden shrink-0">
              <Image
                src={
                  user.profileImg
                    ? `https://diva-s3.s3.ap-northeast-2.amazonaws.com/profileImg/${user.memberId}/profileImg.jpg`
                    : '/images/cactus.png'
                }
                alt="profile-img"
                fill
              ></Image>
            </div>
            <div>
              <div className="font-bold text-xl">{post.member.nickname}</div>
              <div className="text-overflow-one">
                <span>{post.practiceResult.song.title}</span> &middot;&nbsp;
                <span>{post.practiceResult.song.artist}</span>
              </div>
            </div>
          </div>
          {post.member.memberId === user.memberId ? (
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

          {/* TODO: S3에서 사용자 노래 받아오기 */}
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
          <div
            onClick={() => {
              handleLike();
              handleLikebutton();
            }}
          >
            {isLiked ? (
              <LikeIcon className="fill-red stroke-red" />
            ) : (
              <LikeIcon className="stroke-gray" />
            )}
          </div>
          <div className="text-gray ">
            <em className="not-italic font-bold text-white">
              {post.heartCount}명
            </em>
            이 좋아합니다.
            {post.heartCount === 0 ? (
              <span> (관심을 표현해주세요!)</span>
            ) : (
              <></>
            )}
          </div>
        </div>

        {isOpen && (
          <BottomSheet close={close}>
            <BottomSheet.Button
              btnColor="bg-blue"
              onClick={() => sendDatatoJotaiStore()}
            >
              수정하기
            </BottomSheet.Button>
            <BottomSheet.Button
              btnColor="bg-btn-black"
              onClick={() => {
                handleRemove();
              }}
            >
              삭제하기
            </BottomSheet.Button>
          </BottomSheet>
        )}
      </div>
    </>
  );
};

export default Post;
