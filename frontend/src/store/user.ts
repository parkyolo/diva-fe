import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const accessTokenAtom = atomWithStorage('accessToken', '');

export const userAtom = atom(async (get, { signal }) => {
  const accessToken = get(accessTokenAtom);

  if (accessToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/members`,
      {
        headers: {
          Authorization: accessToken,
        },
        signal,
      },
    );

    return response.json();
  }

  return;
});
