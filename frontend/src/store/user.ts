import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage('accessToken', '');

// TODO: setUserAtom
export const userAtom = atom(async (get, { signal }) => {
  const accessToken = get(accessTokenAtom);

  if (accessToken) {
    const response = await fetch('/api/members', {
      headers: {
        Authorization: accessToken,
      },
      signal,
    });

    return response.json();
  }

  return;
});
