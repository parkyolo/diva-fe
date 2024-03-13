import { User } from '@/types/user';
import { Getter, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage('accessToken', '');

export function atomWithRefresh<T>(fn: (get: Getter) => T) {
  const refreshCounter = atom(0);

  return atom(
    (get) => {
      get(refreshCounter);
      return fn(get);
    },
    (_, set) => set(refreshCounter, (i) => i + 1),
  );
}

export const TOKEN_UNAVAILABLE = Symbol();
/**
 * 전역 유저 객체
 *
 * 액세스 토큰이 변경되면 자동으로 유저 정보를 가져옵니다.
 *
 * setUserAtom() 실행 시 멤버 정보를 가져오는 비동기 요청을 한 번 더 실행합니다.
 *
 * return Promise<User | typeof TOKEN_UNAVAILABLE | undefined>
 */
export const userAtom = atomWithRefresh<Promise<any>>(async (get) => {
  const accessToken = get(accessTokenAtom);

  if (accessToken) {
    const response = await fetch('/api/members', {
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
      },
    });

    let data: User;
    if (response.ok) {
      data = await response.json();
      return data;
    } else if (response.status === 401) {
      // 토큰이 만료됐을 경우
      return TOKEN_UNAVAILABLE;
    }
  }

  return;
});
