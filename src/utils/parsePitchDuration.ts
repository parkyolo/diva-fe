import { PitchInterface } from '@/types/pitch';
import { convertBeat2Seconds } from './convertBeat2Seconds';

export const parsePitchDuration = (
  pitchArray: string[],
  bpm: number,
  gap: number,
) => {
  let parsedPitches: PitchInterface[] = [];
  const delay = 0.5;

  for (let i = 10; i < pitchArray.length - 1; i++) {
    const line = pitchArray[i].trim().split(' ');
    if (line.length === 5) {
      const [type, startBeat, duration, pitch, lyrics] = line;
      const startSeconds = convertBeat2Seconds(bpm, gap, +startBeat, delay);
      const endSeconds = convertBeat2Seconds(
        bpm,
        gap,
        +startBeat + +duration,
        delay,
      );
      const durationSeconds = convertBeat2Seconds(bpm, gap, +duration, delay);

      const newPitch: PitchInterface = {
        startSeconds: startSeconds,
        endSeconds: endSeconds,
        duration: durationSeconds,
        pitch: +pitch,
      };
      parsedPitches = [...parsedPitches, newPitch];
    }
  }

  return parsedPitches;
};
