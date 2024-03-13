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
import Image from 'next/image';

interface myPageProps {
  user: User;
}

const SettingPage = ({ user }: myPageProps) => {
  const router = useRouter();
  const setUserAtom = useSetAtom(userAtom);
  const setMyPageAtom = useSetAtom(myPageAtom);

  // 유저 닉네임 관리
  const [inputValue, setInputValue] = useState(user.nickname);
  const handleInputClick = () => {
    if (inputValue === user.nickname) {
      setInputValue('');
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const setAccessTokenWithLocalStorage = useSetAtom(accessTokenAtom);
  /**
   * 로그아웃: 로컬스토리지와 전역에 저장된 액세스 토큰 삭제, 쿠키에 저장된 리프레쉬 토큰 삭제
   * @param e
   */
  const handleLogoutButton = async (e: React.MouseEvent) => {
    await logout(setAccessTokenWithLocalStorage);
    router.push('/');
  };

  // 유저 이미지 관리
  const [selectedImg, setSelectedImg] = useState<File>();
  const [preview, setPreview] = useState<string>(
    user.profileImg
      ? `https://diva-s3.s3.ap-northeast-2.amazonaws.com/profileImg/${user.memberId}/profileImg.jpg`
      : '/images/cactus.png',
  );

  useEffect(() => {
    if (!selectedImg) {
      return;
    }
    const objectUrl: string = URL.createObjectURL(selectedImg);
    setPreview(objectUrl);
    // 언마운트 시 메모리 클린
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImg]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (!e.target.files[0].type.startsWith('image')) {
      alert('지원되지 않는 파일입니다. 대신 jpg 등의 사진을 사용하세요.');
      return;
    }
    setSelectedImg(e.target.files[0]);
  };

  // 유저 정보 업데이트 api
  const [isLoading, userInfo, error, patchUserinfo] = useFetch<UserPatch>(
    req.member.updateMember,
  );
  // 유저 정보 업데이트 후 서버에 모두 반영이 되면 그 때 전역 유저를 갱신하고 마이페이지 메인으로 이동
  const handleConfirmButton = async () => {
    const formData = new FormData();

    if (inputValue.length === 0) {
      alert('닉네임은 한 글자 이상으로 입력해주세요');
      return;
    }
    let info: string;
    if (selectedImg) {
      info = JSON.stringify({ nickname: inputValue, profileImg: true });
      const infoBlob = new Blob([info], { type: 'application/json' });
      formData.append('info', infoBlob);
      formData.append('file', selectedImg);
    } else {
      info = JSON.stringify({
        nickname: inputValue,
        profileImg: user.profileImg,
      });
      const infoBlob = new Blob([info], { type: 'application/json' });
      formData.append('info', infoBlob);
    }

    await patchUserinfo(formData);
    setUserAtom();
    setMyPageAtom(0b0);
  };

  return (
    <>
      <Header
        LeftComponent={
          <button onClick={() => setMyPageAtom(0b0)}>
            <LeftArrow />
          </button>
        }
        RightComponent={
          <button onClick={handleConfirmButton}>
            <span className="font-samlip text-skyblue text-2xl">완료</span>
          </button>
        }
      />
      <main className="flex flex-col justify-start items-center gap-10 py-10">
        <div className="flex flex-col items-center gap-6 w-full px-6">
          <div className="flex flex-col gap-4">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative border-2 border-gray">
              <Image
                src={preview}
                alt="사용자가 선택한 프로필 사진입니다"
                sizes="200px, 200px"
                fill
                priority={true}
              />
            </div>
            <label className="text-2xl text-skyblue font-bold text-center cursor-pointer">
              사진 수정
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-row gap-4 w-full">
            <label className="flex items-center text-2xl font-normal shrink-0">
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={inputValue}
              placeholder="닉네임을 입력해주세요"
              onClick={handleInputClick}
              onChange={handleInputChange}
              className="bg-[inherit] text-xl font-normal inline-block px-3 py-2 w-full hover:outline hover:outline-darkgray hover:outline-2 focus:outline focus:outline-darkgray focus:outline-2"
            />
          </div>
        </div>

        <button
          onClick={handleLogoutButton}
          className="w-[80%] font-normal text-2xl items-center bg-btn-black py-3 rounded-xl"
        >
          로그아웃
        </button>
      </main>
    </>
  );
};

export default SettingPage;
