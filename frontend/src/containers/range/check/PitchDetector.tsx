import { useEffect, useRef, useState } from 'react';

interface PitchDetectorProps {
  audioStream: MediaStream | null;
  pitchArr: number[];
  updatePitchArray: (newPitchArray: number[]) => void;
}

const PitchDetector: React.FC<PitchDetectorProps> = ({
  audioStream,
  pitchArr,
  updatePitchArray,
}) => {
  const [valueToDisplay, setValueToDisplay] = useState<number>(0);
  const audioContextRef = useRef(new AudioContext());
  const analyserRef = useRef(audioContextRef.current.createAnalyser());

  useEffect(() => {
    let source: MediaStreamAudioSourceNode;
    if (audioStream) {
      source = audioContextRef.current.createMediaStreamSource(audioStream);
      source.connect(analyserRef.current);
      visualize();
    }
    return () => {
      if (source) {
        console.log('disconnect source:', source);
        source.disconnect();
      }
    };
  }, [audioStream]);

  const visualize = () => {
    let previousValueToDisplay = 0;
    let smoothingCount = 0;
    let smoothingThreshold = 10;
    let smoothingCountThreshold = 5;

    const drawNote = () => {
      const drawVisual = requestAnimationFrame(drawNote);
      const bufferLength = analyserRef.current.fftSize;
      const buffer = new Float32Array(bufferLength);
      analyserRef.current.getFloatTimeDomainData(buffer);
      const autoCorrelateValue = autoCorrelate(
        buffer,
        audioContextRef.current.sampleRate,
      );
      let valueToDisplay = autoCorrelateValue;
      valueToDisplay = Math.round(valueToDisplay);
      if (autoCorrelateValue < 60) {
        setValueToDisplay(0);
      }

      function noteIsSimilarEnough() {
        if (typeof valueToDisplay == 'number') {
          return (
            Math.abs(valueToDisplay - previousValueToDisplay) <
            smoothingThreshold
          );
        } else {
          return valueToDisplay === previousValueToDisplay;
        }
      }
      if (noteIsSimilarEnough()) {
        if (smoothingCount < smoothingCountThreshold) {
          smoothingCount++;
          return;
        } else {
          previousValueToDisplay = valueToDisplay;
          smoothingCount = 0;
        }
      } else {
        previousValueToDisplay = valueToDisplay;
        smoothingCount = 0;
        return;
      }
      pitchArr.push(valueToDisplay);
      setValueToDisplay(valueToDisplay);
      updatePitchArray([...pitchArr, valueToDisplay]);
    };
    drawNote();
  };
  const autoCorrelate = (buffer: any, sampleRate: any) => {
    let SIZE = buffer.length;
    let sumOfSquares = 0;
    for (var i = 0; i < SIZE; i++) {
      var val = buffer[i];
      sumOfSquares += val * val;
    }
    let r1 = 0;
    let r2 = SIZE - 1;
    let threshold = 0.2;

    for (var i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }

    for (var i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) {
        r2 = SIZE - i;
        break;
      }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    var c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j + i];
      }
    }

    var d = 0;
    while (c[d] > c[d + 1]) {
      d++;
    }

    var maxValue = -1;
    var maxIndex = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxValue) {
        maxValue = c[i];
        maxIndex = i;
      }
    }

    var T0 = maxIndex;

    var x1 = c[T0 - 1];
    var x2 = c[T0];
    var x3 = c[T0 + 1];

    var a = (x1 + x3 - 2 * x2) / 2;
    var b = (x3 - x1) / 2;
    if (a) {
      T0 = T0 - b / (2 * a);
    }

    return sampleRate / T0;
  };

  return (
    <>
      <div className="text-3xl">
        <span>음높이 : </span>
        <span className="text-skyblue">{valueToDisplay}</span>
        <span>Hz</span>
      </div>
    </>
  );
};

export default PitchDetector;
