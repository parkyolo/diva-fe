export const convertBeat2Seconds = (bpm: number, gap: number, beat: number) => {
  return (beat * 60) / bpm + gap;
};
