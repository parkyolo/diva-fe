import Header from '@/components/Header';
import { feedPage, feedPageAtom, songAtom } from '@/store/feed';
import { SangSong, letsUploadSongs } from '@/types/song';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { PostInterface } from '@/types/post';
import { coverUrl, mrUrl, userImgUrl } from '@/utils/getS3URL';
import { PlayIcon } from '../../../public/svgs';
import AudioPlayer from './AudioPlayer';
import { userAtom } from '@/store/user';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

const UploadForm = () => {
  const user: User = useAtomValue(userAtom);
  const songData: SangSong = useAtomValue(songAtom);
  const [inputValue, setInputValue] = useState<string>();
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const [postIsLoading, allPosts, getPostError, getAllPosts] = useFetch<
    PostInterface[]
  >(req.post.getAllPosts);

  useEffect(() => {
    getAllPosts();
    return () => {
      handleCurrentPage();
    };
  }, []);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const router = useRouter();
  const handleCurrentPage = () => {
    setFeedPageAtom(feedPage);
    router.push('/mypage');
  };

  // 유저가 플레이한 음성기록 플레이
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

  const [defaultValue, setDefaultValue] = useState<string>('');

  const [isLoading, sharedsongs, error, postSongFeed] = useFetch<
    [letsUploadSongs]
  >(req.post.writePost);

  const [updateisLoading, updateePost, updateError, doUpdatePost] = useFetch<
    PostInterface[]
  >(req.post.updatePost);

  // 이미 작성된 적이 있는 노래면 입력 문구를 예전에 게시글 문구로 바꿔줌
  useEffect(() => {
    if (allPosts) {
      const alreadyWritten = allPosts.find(
        (post: PostInterface) =>
          post.practiceResult.practiceResultId === songData.practiceResultId,
      );

      if (alreadyWritten && alreadyWritten.content !== defaultValue) {
        setDefaultValue(alreadyWritten.content);
      }
    }
  }, [allPosts, songData.practiceResultId, defaultValue]);

  // 게시글이 작성된 적이 있으면 게시 말고 수정으로
  const handleUpload = async () => {
    if (allPosts) {
      const alreadyWritten = allPosts.find(
        (post: PostInterface) =>
          post.practiceResult.practiceResultId === songData.practiceResultId,
      );
      if (alreadyWritten) {
        await doUpdatePost({
          postId: alreadyWritten.postId,
          content: inputValue,
        });
      } else {
        await postSongFeed({
          content: inputValue,
          practiceResultId: songData.practiceResultId,
        });
      }
    }
    await getAllPosts();

    handleCurrentPage();
  };

  return (
    <>
      <Header
        LeftComponent={
          <button onClick={handleCurrentPage}>
            <LeftArrow />
          </button>
        }
        RightComponent={
          <button onClick={handleUpload}>
            <span className=" font-samlip text-skyblue">게시</span>
          </button>
        }
      />
      <main>
        <div className="flex flex-col h-full gap-5">
          <div className="flex flex-row justify-start items-center gap-4">
            <div className="rounded-full overflow-hidden relative w-[6rem] aspect-square">
              <Image src={userImgUrl(user)} alt={user.nickname} fill />
            </div>
            <div className="flex w-full justify-center itmes-center flex-col">
              <div className="text-2xl font-bold px-2 text-overflow">
                {songData.songTitle}
              </div>
              <div className="text-start px-2">
                {songData.createdDate.substring(0, 10)}
              </div>
              <div className="flex justify-end">{songData.score}/100</div>
            </div>
          </div>

          <AudioPlayer
            artist={songData.artist}
            songTitle={songData.songTitle}
            practiceResultId={songData.practiceResultId}
          />

          <textarea
            className="h-full w-full bg-[#0A0A0A] rounded-xl p-5 outline-none"
            defaultValue={defaultValue}
            placeholder={'문구를 입력하세요..'}
            onChange={handleInputChange}
          />
        </div>
      </main>
    </>
  );
};

export default UploadForm;
