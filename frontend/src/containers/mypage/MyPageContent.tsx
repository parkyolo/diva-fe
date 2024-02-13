'use client';
import { User } from '@/types/user';
import Image from 'next/image';
import MyPageTab from './MyPageTab';

interface myPageProps {
  user: User;
}

const MyPageContent = ({ user }: myPageProps) => {
  return (
    <div className="flex flex-col basis-full h-full">
      <div className="flex flex-row justify-start items-center">
        <div className="rounded-full w-1/2">
          {/* TODO: default profile image 설정 필요 */}
          <Image
            src={user.profileImg ? '' : '/images/cactus.png'}
            alt={user.nickname}
            width={350}
            height={350}
          />
        </div>
        <div className="flex w-full justify-center itmes-center">
          <div className="text-center text-2xl font-bold">{user.nickname}</div>
        </div>
      </div>
      <MyPageTab></MyPageTab>
    </div>
  );
};

export default MyPageContent;
