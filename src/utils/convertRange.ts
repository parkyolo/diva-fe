const syllables = ['라', '시', '도', '레', '미', '파', '솔'];

/**
 * C2:1부터 E7:32까지 숫자로 변환하는 함수
 * @param enVocalRange 음역대
 * @returns 음역대를 숫자로 변환한 값
 */
export const convertRange2Num = (enVocalRange: string) => {
  const [pitchName, _octave] = enVocalRange.split('');
  const octave: number = +_octave;
  let result_num = 0;
  result_num += pitchName.charCodeAt(0);
  if (result_num > 66) result_num -= 7;
  result_num = (result_num % 10) + 7 * (octave - 2) + 1;

  return result_num;
};

export const convertVocalRangeEn2Ko = (enVocalRange: string) => {
  const [pitchName, _octave] = enVocalRange.split('');
  const octave: number = +_octave - 2;

  const syllable_name = syllables[pitchName.charCodeAt(0) - 65];
  return String(octave) + '옥타브 ' + syllable_name;
};
