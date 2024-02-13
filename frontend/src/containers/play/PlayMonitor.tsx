import { PitchInterface } from '@/types/pitch';
import { useEffect, useRef, useState } from 'react';

const PlayMonitor = ({
  currentSeconds,
  parsedPitches,
}: {
  currentSeconds: number;
  parsedPitches: PitchInterface[];
}) => {
  const pitchesRef = useRef<HTMLDivElement>(null);
  const [pitches, setPitches] = useState<PitchInterface[]>([]);
  const [fullWidth, setFullWidth] = useState<number>(0);
  const [pitchesIndex, setPitchesIndex] = useState<number>(0);

  const pivot: number = 100;
  const widthPadding = 20;
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(0);
  const [isCalced, setCalced] = useState<boolean>(false);

  useEffect(() => {
    // 정규화를 위한 min, max pitch값 계산
    if (!isCalced) {
      if (!!parsedPitches.length) {
        setMinVal(
          parsedPitches.reduce(
            (min, val) => (val.pitch < min ? val.pitch : min),
            parsedPitches[0].pitch,
          ),
        );
        setMaxVal(
          parsedPitches.reduce(
            (min, val) => (val.pitch > min ? val.pitch : min),
            parsedPitches[0].pitch,
          ),
        );
        setCalced(true);
      }
    }

    // width 안에 들어오는 pitch 파싱
    if (pitchesRef.current) {
      if (pitchesIndex < parsedPitches.length) {
        if (
          (fullWidth + parsedPitches[pitchesIndex].duration) * widthPadding <
          pitchesRef.current.clientWidth + 100
        ) {
          setPitches([...pitches, parsedPitches[pitchesIndex]]);
          setFullWidth(fullWidth + parsedPitches[pitchesIndex].duration);
          setPitchesIndex(pitchesIndex + 1);
        } else {
          const [out, ...remain] = pitches;
          setPitches(remain);
          setFullWidth(fullWidth - out.duration);
        }
      }
    }
  }, [currentSeconds]);

  return (
    <>
      <div
        ref={pitchesRef}
        className="flex flex-col items-center relative w-full h-1/5 overflow-x-hidden"
      >
        {pitches.map((pitch, index) => {
          const leftDistance =
            pitches
              .slice(0, index)
              .reduce((sum, val) => sum + val.duration, 0) * widthPadding;

          return (
            <div
              key={pitch.startSeconds}
              className={`absolute h-1 bg-white`}
              style={{
                width: `${pitch.duration * widthPadding}px`,
                left: `${leftDistance}px`,
                bottom: `${
                  pitchesRef.current
                    ? ((pitch.pitch - minVal) / (maxVal - minVal)) *
                      pitchesRef.current.clientHeight
                    : 0
                }px`,
              }}
            >
              <div
                className={`relative h-full ${
                  pitchesIndex < parsedPitches.length
                    ? leftDistance <= pivot
                      ? 'bg-skyblue'
                      : 'bg-white'
                    : pitch.startSeconds < currentSeconds
                      ? 'bg-skyblue'
                      : 'bg-white'
                }`}
                style={{
                  animation: `${
                    pitchesIndex < parsedPitches.length
                      ? leftDistance <= pivot
                        ? `pitchbar 0.2s ease-in-out`
                        : ''
                      : pitch.startSeconds < currentSeconds
                        ? `pitchbar 0.2s ease-in-out`
                        : ''
                  }`,
                }}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PlayMonitor;
