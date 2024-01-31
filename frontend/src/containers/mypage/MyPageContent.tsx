'use client';
import Image from 'next/image';
import MyPageTab from './MyPageTab';

interface user {
  profileImg: string;
  nickname: string;
}
interface myPageProps {
  userinfo: user;
}

const MyPageContent = ({ userinfo }: myPageProps) => {
  return (
    <div className="flex flex-col basis-full">
      <div className="flex flex-row justify-start items-center">
        <div className="rounded-full w-1/2">
          <Image
            src={userinfo.profileImg}
            alt={userinfo.nickname}
            width={350}
            height={350}
          />
        </div>
        <div className="flex w-full justify-center itmes-center">
          <div className="text-center text-2xl font-bold">
            {userinfo.nickname}
          </div>
        </div>
      </div>
      <MyPageTab></MyPageTab>
    </div>
  );
};

export default MyPageContent;
