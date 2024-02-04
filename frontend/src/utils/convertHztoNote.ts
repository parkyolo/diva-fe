export const convertHztoNote = (pitchArray: number[]) => {
  const sortedArray = pitchArray.slice().sort((a, b) => a - b);
  const lowerBoundIndex = Math.floor(sortedArray.length * 0.1);
  const UpperBoundIndex = Math.floor(sortedArray.length * 0.9);
  const filteredArray = sortedArray.slice(lowerBoundIndex, UpperBoundIndex);
  const minValue = filteredArray[0];
  const maxValue = filteredArray[filteredArray.length - 1];
  
  const getNoteName = (frequecy: number) => {
    const noteNames = [
      'A',
      'A#',
      'B',
      'C',
      'C#',
      'D',
      'D#',
      'E',
      'F',
      'F#',
      'G',
      'G#',
    ];
    const noteNumber: number = 12 * Math.log2(frequecy / 440) + 69;
    const octave = 4 + Math.ceil(Math.log(frequecy / 440) / Math.log(2));
    const noteIndex = Math.round(noteNumber) % 12;
    return `${noteNames[noteIndex]}${octave}`;
  }

  const minNoteName = getNoteName(minValue);
  const maxNoteName = getNoteName(maxValue);
  
  return { minNoteName, maxNoteName };
};
