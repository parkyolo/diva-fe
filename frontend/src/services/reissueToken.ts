import { getRefreshTokenCookie, setRefreshTokenCookie } from '@/app/action';

export const reissueToken = async (
  currentAccessToken: string,
  setAccessTokenWithLocalStorage: any,
) => {
  const refreshToken = await getRefreshTokenCookie();

  const response: Response = await fetch('/api/auth/reissue/v1', {
    headers: {
      Authorization: currentAccessToken,
      AuthorizationRefresh: refreshToken,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.ok) {
    // 응답으로부터 토큰정보 추출
    const reissuedAccessToken: string =
      response.headers.get('Authorization') ?? '';
    const refreshToken: string =
      response.headers.get('AuthorizationRefresh') ?? '';

    // 리프레쉬 토큰 쿠키에 저장
    setRefreshTokenCookie(refreshToken);
    // 액세스 토큰 전역 상태+로컬스토리지에 저장
    setAccessTokenWithLocalStorage(reissuedAccessToken);
  } else {
    if (process.env.NODE_ENV === 'development') {
      alert('서버에서 리이슈 토큰을 가져오지 못했습니다');
    }
  }

  return response;
};
