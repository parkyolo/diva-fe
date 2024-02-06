import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

interface user {
  profileImg: string;
  nickname: string;
}
interface myPageProps {
  userinfo: user;
}
const SettingPage = ({ userinfo }: myPageProps) => {
  const [inputValue, setInputValue] = useState(userinfo.nickname);
  const handleInputClick = () => {
    if (inputValue === userinfo.nickname) {
      setInputValue('');
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleLogoutButton = (e: React.MouseEvent) => {
    console.log('logout');
  };

  return (
    <main className="basis-full p-5 flex flex-col">
      <div className="flex flex-col items-center rounded-full h-1/2 gap-5 justify-around">
        <div className="w-1/2 items-center">
          <Image
            src={userinfo.profileImg}
            alt={userinfo.nickname}
            width={500}
            height={500}
          />
        </div>
        <span className="text-2xl text-skyblue font-bold">사진 수정</span>
      </div>
      <div className="flex flex-row justify-start items-center gap-2 p-5">
        <div className="text-2xl font-bold shrink-0">닉네임</div>
        <input
          type="text"
          value={inputValue}
          onClick={handleInputClick}
          onChange={handleInputChange}
          className="flex bg-[inherit] text-2xl font-bold px-3 w-full outline-none"
        />
      </div>
      <div className="px-5">
        <button
          onClick={handleLogoutButton}
          className="my-10 w-full font-bold text-2xl items-center bg-[#202229] p-2 rounded-xl"
        >
          로그아웃
        </button>
      </div>
    </main>
  );
};

export default SettingPage;
