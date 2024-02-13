import Header from '@/components/Header';
import { feedPage, feedPageAtom, songAtom } from '@/store/feed';
import { SangSong, letsUploadSongs } from '@/types/song';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { userAtom } from '@/store/user';
import { PostInterface } from '@/types/post';

const UploadForm = () => {
  const userinfo = useAtomValue(userAtom);
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

  const handleCurrentPage = () => {
    setFeedPageAtom(feedPage);
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
          <div className="flex flex-row justify-start items-center">
            <div className="rounded-full w-1/3">
              {/* TODO: 사용자 이미지 S3에서 받아오기 */}
              {/* <Image
                src={userinfo.profileImg}
                alt={userinfo.nickname}
                width={350}
                height={350}
              /> */}
            </div>
            <div className="flex w-full justify-center itmes-center flex-col">
              <div className="text-2xl font-bold px-2">
                {songData.songTitle}
              </div>
              <div className="text-start px-2">
                {songData.createdDate.substring(0, 10)}
              </div>
              <div className="flex justify-end">{songData.score}/100</div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Image
              src={`/images/${songData.coverImg}`}
              alt={songData.songTitle}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-24 rounded-xl object-cover brightness-50"
            ></Image>
          </div>
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
