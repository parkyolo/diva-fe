import ClayButton from '@/components/ClayButton';
import { useEffect, useRef, useState } from 'react';


interface PitchDetectorProps {
  audioStream: MediaStream | null;
}

const PitchDetector: React.FC<PitchDetectorProps> = ({ audioStream }) => {
  const [valueToDisplay, setValueToDisplay] = useState<number>(0);
  const audioContextRef = useRef(new AudioContext());
  const analyserRef = useRef(audioContextRef.current.createAnalyser());
      const handleStopButtonClick = () => {
        console.log('버튼 눌림')
        if (audioStream) {
          audioStream.getTracks().forEach((track) => track.stop());
          
        }
      };
  useEffect(() => {
    if (audioStream) {
      let source = audioContextRef.current.createMediaStreamSource(audioStream);
      source.connect(analyserRef.current);
      visualize();
    }
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

      console.log(valueToDisplay);
      setValueToDisplay(valueToDisplay);
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

    // Find the last index where that value is greater than the next one (the dip)
    var d = 0;
    while (c[d] > c[d + 1]) {
      d++;
    }

    // Iterate from that index through the end and find the maximum sum
    var maxValue = -1;
    var maxIndex = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxValue) {
        maxValue = c[i];
        maxIndex = i;
      }
    }

    var T0 = maxIndex;

    // Not as sure about this part, don't @ me
    // From the original author:
    // interpolation is parabolic interpolation. It helps with precision. We suppose that a parabola pass through the
    // three points that comprise the peak. 'a' and 'b' are the unknowns from the linear equation system and b/(2a) is
    // the "error" in the abscissa. Well x1,x2,x3 should be y1,y2,y3 because they are the ordinates.
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
    <div className="text-3xl">
      <span>음높이 : </span>
      <span className="text-skyblue">{valueToDisplay}</span>
      <span>Hz</span>
      <br /><br /><br />
    <button onClick={handleStopButtonClick}>정지버튼</button>
    </div>
  
  );
};

export default PitchDetector;
