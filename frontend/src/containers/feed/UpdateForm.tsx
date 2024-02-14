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
import { userImgUrl } from '@/utils/getS3URL';
import { User } from '@/types/user';
import AudioPlayer from './AudioPlayer';

const UpdateForm = () => {
  const user: User = useAtomValue(userAtom);
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
              <div className="rounded-full overflow-hidden relative w-[6rem] aspect-square">
                <Image src={userImgUrl(user)} alt={user.nickname} fill />
              </div>
            </div>
            <div className="flex w-full justify-center itmes-center flex-col">
              <div className="text-2xl font-bold px-2 text-overflow">
                {postData.title}
              </div>

              <div className="flex justify-end">{postData.score}/100</div>
            </div>
          </div>

          <AudioPlayer
            artist={postData.artist}
            songTitle={postData.title}
            // TODO: 백엔드님 practice result id 주세요.
            // practiceResultId={postData.}
          />
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
