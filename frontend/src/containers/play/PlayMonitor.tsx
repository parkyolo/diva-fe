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

  const [widthPadding, setPadding] = useState<number>(0);
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(0);
  const [finishSeconds, setFinishSeconds] = useState<number>(0);

  useEffect(() => {
    if (finishSeconds) {
      setPadding(4000 / finishSeconds);
    }
  }, [finishSeconds]);

  useEffect(() => {
    if (parsedPitches.length) {
      // 정규화를 위한 min, max pitch값 계산
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

      // 음악이 끝나는 시간 계산
      setFinishSeconds(
        parsedPitches[parsedPitches.length - 1].startSeconds +
          parsedPitches[parsedPitches.length - 1].duration,
      );
    }
  }, [parsedPitches]);

  return (
    <>
      <div className="w-full h-[120px] mb-3">
        <div
          ref={pitchesRef}
          className="w-full h-[100px] fixed"
          style={{
            animation: `pitchbar ${finishSeconds}s`,
          }}
        >
          {parsedPitches.map((pitch) => {
            const left = pitch.startSeconds * widthPadding;
            const width = pitch.duration * widthPadding;
            const bottom = pitchesRef.current
              ? ((pitch.pitch - minVal) / (maxVal - minVal)) *
                pitchesRef.current.clientHeight
              : 0;

            return (
              <div
                key={pitch.startSeconds}
                className={`absolute h-1 bg-white`}
                style={{
                  width: `${width}px`,
                  left: `${left}px`,
                  bottom: `${bottom}px`,
                }}
              ></div>
            );
          })}
        </div>
        <div className="relative h-[120px] border-r-2 border-skyblue bg-skyblue/50 w-20 ml-[-2.5rem]"></div>
      </div>
    </>
  );
};

export default PlayMonitor;
