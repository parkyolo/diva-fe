import Image from 'next/image';

interface user {
  profileImg: string;
  nickname: string;
}
interface myPageProps {
  userinfo: user;
}
const SettingPage = ({ userinfo }: myPageProps) => {
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
          className="text-2xl font-bold border-b-2 bg-[inherit] w-full appearance-none "
          defaultValue={'가벼운해바라기씨'}
        />
      </div>
      <div className="px-5">
        <button className="my-10 w-full font-bold text-2xl items-center bg-[#202229] p-2 rounded-xl">
          로그아웃
        </button>
      </div>
    </main>
  );
};

export default SettingPage;
