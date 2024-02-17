export const getMusicInfo = (musicS3Url: string) =>
  fetch(musicS3Url, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
    .then((response) => response.text())
    .then((text) => text);
