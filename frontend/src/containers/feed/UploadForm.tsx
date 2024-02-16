import Header from '@/components/Header';
import { feedPage, feedPageAtom, songAtom } from '@/store/feed';
import { SangSong } from '@/types/song';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { userImgUrl } from '@/utils/getS3URL';
import AudioPlayer from './AudioPlayer';
import { userAtom } from '@/store/user';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { PostInterface } from '@/types/post';
import { reFetchingAtom } from './store';

const UploadForm = () => {
  const router = useRouter();
  const user: User = useAtomValue(userAtom);
  const songData: SangSong = useAtomValue(songAtom);
  const [inputValue, setInputValue] = useState<string>();
  const [defaultValue, setDefaultValue] = useState<string>('');
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setFetching = useSetAtom(reFetchingAtom);

  const [getLoading, getResponse, getError, getPost] = useFetch<PostInterface>(
    req.post.getPost,
  );
  const [postLoading, postResponse, postError, postSongFeed] = useFetch(
    req.post.writePost,
  );
  const [updateLoading, updateResponse, updateError, updateSongFeed] = useFetch(
    req.post.updatePost,
  );
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [getLoaded, setLoadState] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const routeMypage = () => {
    setFeedPageAtom(feedPage);
    router.push('/mypage');
  };

  const handleUpload = () => {
    if (isUploaded) {
      if (!getLoading && getLoaded && getResponse) {
        try {
          updateSongFeed({
            postId: getResponse.postId,
            content: inputValue,
          }).then((_) => {
            setFeedPageAtom(feedPage);
            setFetching(true);
          });
        } catch (_) {
          console.log(updateError);
        }
      }
    } else {
      try {
        postSongFeed({
          content: inputValue,
          practiceResultId: songData.practiceResultId,
          score: songData.score,
          songId: songData.songId,
          title: songData.songTitle,
          artist: songData.artist,
        }).then((_) => {
          setFeedPageAtom(feedPage);
          setFetching(true);
        });
      } catch (_) {
        console.log(postError);
        routeMypage();
      }
    }
  };

  useEffect(() => {
    if (getLoading) {
      setLoadState(true);
    }
    if (!getLoading && getLoaded && getResponse) {
      setIsUploaded(true);
      setDefaultValue(getResponse.content);
    }
  }, [getLoading]);

  useEffect(() => {
    getPost(songData.practiceResultId);
  }, []);

  return (
    <>
      <Header
        LeftComponent={
          <button onClick={routeMypage}>
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
              <Image
                src={user.profileImg ? userImgUrl(user) : '/images/cactus.png'}
                alt={user.nickname}
                fill
              />
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
