'use client';
import { User } from '@/types/user';
import Image from 'next/image';
import MyPageTab from './MyPageTab';

interface myPageProps {
  user: User;
}

const MyPageContent = ({ user }: myPageProps) => {
  return (
    <>
      <div className="flex flex-row w-full gap-10 mb-4">
        <div className="rounded-full overflow-hidden w-[24%] aspect-square relative shrink-0">
          <Image
            src={
              user.profileImg
                ? `https://diva-s3.s3.ap-northeast-2.amazonaws.com/profileImg/${user.memberId}/profileImg.jpg`
                : '/images/cactus.png'
            }
            alt={user.nickname}
            fill
          />
        </div>
        <div className="flex items-center text-2xl font-bold basis-full">
          {user.nickname}
        </div>
      </div>
      <MyPageTab></MyPageTab>
    </>
  );
};

export default MyPageContent;
