import Image from 'next/image';
import { useState, useEffect } from 'react';
import { songAtom } from '@/store/feed';
import Header from '@/components/Header';
import LeftArrow from '/public/svgs/left_arrow.svg';
import { useAtom, useSetAtom } from 'jotai';
import { feedPageAtom } from '@/store/feed';
interface user {
  profileImg: string;
  nickname: string;
}

const userinfo: user = {
  profileImg: '/images/cactus.png',
  nickname: '가벼운해바라기씨',
};

const UploadContent = () => {
  const [songData] = useAtom(songAtom);
  const [inputValue, setInputValue] = useState('문구를 입력하세요...');

  useEffect(() => {
    return () => {
      handleCurrentPage();
    };
  }, []);
  const handleInputClick = () => {
    if (inputValue === '문구를 입력하세요...') {
      setInputValue('');
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const handleCurrentPage = () => {
    setFeedPageAtom(0b0);
  };
  const handleUpload = async () => {
    const postUploadData = {
      content: inputValue,
      // practiceResultID = songData.practiceResultID
    };
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: JSON.stringify(postUploadData),
      });
    } catch (error) {
      console.error('Error during upload:', error);
    }
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
          <button
            onClick={() => {
              handleCurrentPage();
              handleUpload();
            }}
          >
            <span className=" font-samlip text-skyblue">게시</span>
          </button>
        }
      />
      <main className="py-0 px-5">
        <div className="flex flex-col h-full gap-2">
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
                {songData ? songData.title : 'Default Title'}
              </div>
              <div className="text-start px-2">
                {songData
                  ? songData.createDate.toLocaleDateString()
                  : 'Default Date'}
              </div>
              <div className="flex justify-end">{}/100</div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Image
              src={songData ? songData.coverImg : '/images/default.jpg'}
              alt={songData ? songData.title : 'Default Title'}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-24 rounded-xl object-cover brightness-50"
            ></Image>
          </div>
          <textarea
            className="bg-[inherit] h-1/2 w-full bg-[#200000] rounded-xl p-3 outline-none"
            value={inputValue}
            onClick={handleInputClick}
            onChange={handleInputChange}
          />
        </div>
      </main>
    </>
  );
};

export default UploadContent;
