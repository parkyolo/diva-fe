import Header from '@/components/Header';
import { feedPage, feedPageAtom, songAtom } from '@/store/feed';
import { SangSong, letsUploadSongs } from '@/types/song';
import { useAtomValue, useSetAtom } from 'jotai';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';

interface user {
  profileImg: string;
  nickname: string;
}

const userinfo: user = {
  profileImg: '/images/cactus.png',
  nickname: '가벼운해바라기씨',
};

const UploadForm = () => {
  const songData: SangSong = useAtomValue(songAtom);
  const [inputValue, setInputValue] = useState<string>();
  const setFeedPageAtom = useSetAtom(feedPageAtom);
    useEffect(() => {
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

  const [isLoading, sharedsongs, error, postSongFeed] = useFetch<
    [letsUploadSongs]
  >(req.post.writePost);

  const handleUpload = () => {
    postSongFeed({
      content: inputValue,
      practiceResultId: songData.practiceResultId,
      score: songData.score,
      // TODO: songID?
      // songId: songData.songTitle,
      title: songData.songTitle,
      artist: songData.artist,
    });

    console.log(
      'postUploadData',
      inputValue,
      songData.practiceResultId,
      songData.score,
      songData.coverImg,
      songData.songTitle,
      new Date(),
      songData.artist,
    );
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
              <Image
                src={userinfo.profileImg}
                alt={userinfo.nickname}
                width={350}
                height={350}
              />
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
            placeholder="문구를 입력하세요..."
            onChange={handleInputChange}
          />
        </div>
      </main>
    </>
  );
};

export default UploadForm;
