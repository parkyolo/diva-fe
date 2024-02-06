import { accessTokenAtom } from '@/store/user';
import { IRequestConfigResolver } from '@/services';
import { useAtomValue } from 'jotai';
import { useCallback, useState } from 'react';

export const useFetch = <T>(
  requestConfigResolver: IRequestConfigResolver,
): [boolean, T | null, any, (params?: any) => Promise<void>] => {
  const accessToken = useAtomValue(accessTokenAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);

  const request = useCallback(
    async (...params: any) => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        let result;

        const { url, ...rest } = requestConfigResolver(params);
        const res: Response = await fetch(`/api${url}`, {
          headers: {
            Authorization: accessToken,
          },
          ...rest,
        });

        result = await res.json();
        setData(result);
        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(false);
        setError(error);
        if (process.env.NODE_ENV === 'development') {
          alert('서버에서 데이터를 가져오지 못했습니다');
        }
      }
    },
    [requestConfigResolver],
  );

  return [isLoading, data, error, request];
};
