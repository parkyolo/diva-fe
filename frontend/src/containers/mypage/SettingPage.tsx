import Header from '@/components/Header';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { logout } from '@/services/logout';
import myPageAtom from '@/store/myPage';
import { accessTokenAtom, userAtom } from '@/store/user';
import { User, UserPatch } from '@/types/user';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import LeftArrow from '/public/svgs/left_arrow.svg';

interface myPageProps {
  user: User;
}

const SettingPage = ({ user }: myPageProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(user.nickname);
  const setUserAtom = useSetAtom(userAtom);

  const handleInputClick = () => {
    if (inputValue === user.nickname) {
      setInputValue('');
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const [isLoading, userInfo, error, patchUserinfo] = useFetch<[UserPatch]>(
    req.member.updateMember,
  );

  const setAccessTokenWithLocalStorage = useSetAtom(accessTokenAtom);
  /**
   * 로그아웃: 로컬스토리지와 전역에 저장된 액세스 토큰 삭제, 쿠키에 저장된 리프레쉬 토큰 삭제
   * @param e
   */
  const handleLogoutButton = async (e: React.MouseEvent) => {
    await logout(setAccessTokenWithLocalStorage);
    router.push('/');
  };

  const [selectedImg, setSelectImg] = useState(user.profileImg);
  const handleImgSelection = (event: any) => {
    const newProfileImg = event?.target.files[0];
    setSelectImg(newProfileImg);
  };

  const setMyPageAtom = useSetAtom(myPageAtom);

  // 유저 정보 업데이트 후 서버에 모두 반영이 되면 그 때 전역 유저를 갱신하고 마이페이지 메인으로 이동
  useEffect(() => {
    if (userInfo && !isLoading) {
      console.log(userInfo);
      setUserAtom();
      setMyPageAtom(0b0);
    }
  }, [userInfo]);

  return (
    <>
      <Header
        LeftComponent={
          <button onClick={() => setMyPageAtom(0b0)}>
            <LeftArrow />
          </button>
        }
        RightComponent={
          <button
            onClick={() => {
              patchUserinfo({
                nickname: inputValue,
                // TODO: 사용자가 선택한 이미지가 있으면 true, 없으면 false 보내기
                profileImg: true,
              });
            }}
          >
            <span className=" font-samlip text-skyblue">완료</span>
          </button>
        }
      />
      <main className="basis-full p-5 flex flex-col">
        <div className="flex flex-col items-center rounded-full h-1/2 gap-5 justify-around">
          <div className="w-1/2 items-center">
            {/* TODO: 이미지 S3에서 받아오기 */}
            {/* <Image
            src={selectedImg}
            alt={userinfo.nickname}
            width={500}
            height={500}
          /> */}
          </div>
          <span className="text-2xl text-skyblue font-bold">
            <label>
              사진 수정
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImgSelection}
                style={{ display: 'none' }}
              />
            </label>
          </span>
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
    </>
  );
};

export default SettingPage;
