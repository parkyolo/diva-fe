import Image from 'next/image';
import AudioPlayer from './AudioPlayer';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { feedPage, feedPageAtom, postAtom } from '@/store/feed';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { userAtom } from '@/store/user';
import { userImgUrl } from '@/utils/getS3URL';
import { UpdateSongs } from '@/types/post';
import { User } from '@/types/user';
import { LeftArrowIcon } from '../../../public/svgs';
import { reFetchingAtom } from './store';

const UpdateForm = () => {
  const user: User = useAtomValue(userAtom);
  const postData: UpdateSongs = useAtomValue(postAtom);
  const [inputValue, setInputValue] = useState<string>();
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setReFetching = useSetAtom(reFetchingAtom);
  const [updateLoading, updateResponse, updateError, updatePost] = useFetch(
    req.post.updatePost,
  );

  const mountFeedPage = () => {
    setFeedPageAtom(feedPage);
    setReFetching(true);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleUpload = () => {
    try {
      updatePost({ postId: postData.postId, content: inputValue });
    } catch (_) {
      alert('게시글 수정을 실패했습니다.');
      console.log(updateError);
    } finally {
      mountFeedPage();
    }
  };

  useEffect(() => {
    setInputValue(postData.content);
    return () => mountFeedPage();
  }, []);

  return (
    <>
      <Header
        LeftComponent={
          <button onClick={mountFeedPage}>
            <LeftArrowIcon />
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
                <Image
                  src={
                    user.profileImg ? userImgUrl(user) : '/images/cactus.png'
                  }
                  alt={user.nickname}
                  fill
                />
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
            practiceResultId={postData.practiceResultId}
          />
          <textarea
            className="h-full w-full bg-[#0A0A0A] rounded-xl p-5 outline-none"
            defaultValue={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </main>
    </>
  );
};

export default UpdateForm;
