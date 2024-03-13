import { IRequestConfigResolver, req } from '@/services';
import { logout } from '@/services/logout';
import { reissueToken } from '@/services/reissueToken';
import { accessTokenAtom } from '@/store/user';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useFetch = <T>(
  requestConfigResolver: IRequestConfigResolver,
): [boolean, T | null, any, (params?: any) => Promise<void>] => {
  const [accessToken, setAccessTokenWithLocalStorage] =
    useAtom(accessTokenAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);
  const router = useRouter();

  const request = useCallback(
    async (...params: any) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      let result;

      const { url, ...rest } = requestConfigResolver(params[0]);
      const contentType =
        Object.is(requestConfigResolver, req.sing.saveLiveResult) ||
        Object.is(requestConfigResolver, req.member.updateMember)
          ? undefined
          : { 'Content-Type': 'application/json' };

      const response: Response = await fetch(`/api${url}`, {
        headers: {
          Authorization: accessToken,
          ...contentType,
        },
        ...rest,
      });

      if (response.ok) {
        const responseBody = await response.text();

        // response body 유무에 따른 분기
        if (responseBody.trim() !== '') {
          // Check if the response body is not empty
          result = JSON.parse(responseBody);
          setData(result);
        } else {
          // Handle empty response body
          console.warn('Empty response body');
          if (Object.is(requestConfigResolver, req.post.getPost)) {
            setData(null);
          }
        }

        setIsLoading(false);
      } else if (response.status === 401) {
        // 액세스 토큰이 만료된 경우
        const res: Response = await reissueToken(
          accessToken,
          setAccessTokenWithLocalStorage,
        );

        // 리프레쉬 토큰이 더 이상 존재하지 않는 등의 이유로 리이슈에 실패할 시 강제 로그아웃 시키고 홈으로 이동
        if (!res.ok) {
          logout(setAccessTokenWithLocalStorage);
          router.push('/');
          return;
        }

        // 재요청
        let reissuedAccessToken = localStorage.getItem('accessToken') ?? '';
        reissuedAccessToken = reissuedAccessToken.substring(
          1,
          reissuedAccessToken.length - 1,
        );

        const response: Response = await fetch(`/api${url}`, {
          headers: {
            Authorization: reissuedAccessToken,
            ...contentType,
          },
          ...rest,
        });

        if (response.ok) {
          result = await response.json();
          setIsLoading(false);
          setData(result);
        } else {
          setIsLoading(false);
          setError(await response.json());
          if (process.env.NODE_ENV === 'development') {
            alert('서버에서 데이터를 가져오지 못했습니다');
          }
        }
      } else {
        setIsLoading(false);
        setError(await response.json());
        if (process.env.NODE_ENV === 'development') {
          alert('서버에서 데이터를 가져오지 못했습니다');
        }
      }
    },
    [requestConfigResolver],
  );

  return [isLoading, data, error, request];
};
