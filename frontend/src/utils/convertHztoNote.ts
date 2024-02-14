export const convertHztoNote = (pitchArray: number[]) => {
  const sortedArray = pitchArray.slice().sort((a, b) => a - b);
  const lowerBoundIndex = Math.floor(sortedArray.length * 0.025);
  const UpperBoundIndex = Math.floor(sortedArray.length * 0.975);
  const filteredArray = sortedArray.slice(lowerBoundIndex, UpperBoundIndex);
  const minValue = filteredArray[0];
  const maxValue = filteredArray[filteredArray.length - 1];

  const getNoteName = (frequecy: number) => {
    const noteNames = [
      'C',
      'C',
      'D',
      'D',
      'E',
      'F',
      'F',
      'G',
      'G',
      'A',
      'A',
      'B',
    ];
    const noteNumber: number = 12 * Math.log2(frequecy / 440) + 69;
    const octave = Math.floor((noteNumber - 12) / 12);
    const noteIndex = Math.round(noteNumber) % 12;
    return `${noteNames[noteIndex]}${octave}`;
  };

  const minNoteName = getNoteName(minValue);
  const maxNoteName = getNoteName(maxValue);

  return { minNoteName, maxNoteName };
};
