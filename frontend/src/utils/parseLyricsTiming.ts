import { LyricsInterface } from '@/types/lyrics';
import { convertBeat2Seconds } from './convertBeat2Seconds';

const baseSecond = 7;

export const parseLyricsTiming = (
  lyricsArray: string[],
  bpm: number,
  gap: number,
) => {
  let parsedLyrics: LyricsInterface[] = [];
  const delay = 0.5;

  for (let i = 10; i < lyricsArray.length - 1; i++) {
    const line = lyricsArray[i].trim().split(' ');
    if (line.length === 5) {
      const [type, startBeat, duration, pitch, lyrics] = line;
      const startSeconds = convertBeat2Seconds(bpm, gap, +startBeat, delay);
      const endSeconds =
        startSeconds + convertBeat2Seconds(bpm, gap, +duration, delay);
      if (parsedLyrics.length) {
        if (
          parsedLyrics[parsedLyrics.length - 1].endSeconds -
            parsedLyrics[parsedLyrics.length - 1].startSeconds <=
          baseSecond
        ) {
          parsedLyrics[parsedLyrics.length - 1].endSeconds = endSeconds;
          parsedLyrics[parsedLyrics.length - 1].lyrics =
            parsedLyrics[parsedLyrics.length - 1].lyrics + ' ' + lyrics;
          continue;
        }
      }
      const newLyrics: LyricsInterface = {
        startSeconds: startSeconds,
        endSeconds: endSeconds,
        lyrics: lyrics,
      };
      parsedLyrics = [...parsedLyrics, newLyrics];
    }
  }

  return parsedLyrics;
};
