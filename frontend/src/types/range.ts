export interface rangeChart {
  distFromTop: number;
  rangeHeight: number;
}

export type pianoRange = {
  highestNote: number;
  lowestNote: number;
};

export type vocalRange = {
  highestNote: string;
  lowestNote: string;
};

export interface rangeResult {
  highestNote: string;
  lowestNote: string;
  hightestMidi: string;
  lowestMidi: string;
  matchingArtist: string;
}
