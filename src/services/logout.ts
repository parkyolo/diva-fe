import { getRefreshTokenCookie, removeRefreshTokenCookie } from '@/app/action';
import { RESET } from 'jotai/utils';

export const logout = async (setAccessTokenWithLocalStorage: any) => {
  const refreshToken = await getRefreshTokenCookie();
  const response: Response = await fetch('/api/auth/signout/v1', {
    headers: {
      AuthorizationRefresh: refreshToken,
    },
    method: 'POST',
  });

  if (response.ok) {
    //RESET 심볼을 활용하면 로컬스토리지와 전역 객체 모두 리셋됩니다.
    setAccessTokenWithLocalStorage(RESET);
    //쿠키삭제
    await removeRefreshTokenCookie();
  } else {
    console.log('로그아웃 실패', response.status);
    alert('로그아웃 중 에러가 발생했습니다.');
  }
};
