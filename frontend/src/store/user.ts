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

// TODO: setUserAtom
export const userAtom = atomWithRefresh(async (get) => {
  const accessToken = get(accessTokenAtom);

  if (accessToken) {
    const response = await fetch('/api/members', {
      headers: {
        Authorization: accessToken,
      },
    });

    const data = await response.json();
    return data;
  }

  return;
});
