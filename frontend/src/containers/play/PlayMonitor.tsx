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
  const pivot = 100;

  const [widthPadding, setPadding] = useState<number>(0);
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(0);
  const [finishSeconds, setFinishSeconds] = useState<number>(0);

  useEffect(() => {
    if (finishSeconds) {
      setPadding(8000 / finishSeconds);
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
      setFinishSeconds(parsedPitches[parsedPitches.length - 1].endSeconds);
    }
  }, [parsedPitches]);

  return (
    <>
      <div className="mb-3">
        <div
          className="flex absolute h-2"
          style={{
            width: `${pitchesRef ? pitchesRef.current?.scrollWidth : 0}px`,
            left: `${-currentSeconds * widthPadding + pivot}px`,
          }}
        >
          <div ref={pitchesRef} className="flex flex-nowrap relative h-28">
            {parsedPitches.map((pitch) => {
              const left = pitch.startSeconds * widthPadding;
              const width =
                (pitch.endSeconds - pitch.startSeconds) * widthPadding;
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
        </div>
        <div
          className="relative h-28 border-r-2 border-skyblue bg-skyblue/50 ml-[-2.5rem]"
          style={{
            width: `${pivot}px`,
          }}
        ></div>
      </div>
    </>
  );
};

export default PlayMonitor;
