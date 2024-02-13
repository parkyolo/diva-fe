import Header from '@/components/Header';
import { feedPage, feedPageAtom, postAtom, songAtom } from '@/store/feed';
import { SangSong, letsUploadSongs } from '@/types/song';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { userAtom } from '@/store/user';
import { PostInterface, UpdateSongs } from '@/types/post';

const UpdateForm = () => {
  const userinfo = useAtomValue(userAtom);
  const postData: UpdateSongs = useAtomValue(postAtom);
  const [inputValue, setInputValue] = useState<string>();
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  useEffect(() => {
    return () => {
      handleCurrentPage();
    };
  }, []);
  const [postIsLoading, allPosts, getPostError, getAllPosts] = useFetch<
    PostInterface[]
  >(req.post.getAllPosts);
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleCurrentPage = () => {
    setFeedPageAtom(feedPage);
  };

  const [updateisLoading, updateePost, updateError, doUpdatePost] = useFetch<
    PostInterface[]
  >(req.post.updatePost);

  const handleUpload = async () => {
    await doUpdatePost({ postId: postData.postId, content: inputValue });
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
            <span className=" font-samlip text-skyblue">완료</span>
          </button>
        }
      />
      <main>
        <div className="flex flex-col h-full gap-5">
          <div className="flex flex-row justify-start items-center">
            <div className="rounded-full w-1/3">
              {/* TODO: S3에서 유저 이미지 정보 받아와야돼요  */}
              {/* <Image
                src={userinfo.profileImg}
                alt={userinfo.nickname}
                width={350}
                height={350}
              /> */}
            </div>
            <div className="flex w-full justify-center itmes-center flex-col">
              <div className="text-2xl font-bold px-2">{postData.title}</div>

              <div className="flex justify-end">{postData.score}/100</div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Image
              src={`/images/${postData.coverImg}`}
              alt={postData.title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-24 rounded-xl object-cover brightness-50"
            ></Image>
          </div>
          <textarea
            className="h-full w-full bg-[#0A0A0A] rounded-xl p-5 outline-none"
            defaultValue={postData.content}
            onChange={handleInputChange}
          />
        </div>
      </main>
    </>
  );
};

export default UpdateForm;
