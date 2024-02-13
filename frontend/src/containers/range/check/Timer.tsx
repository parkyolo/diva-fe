import { useEffect, useState } from 'react';

interface TimerProps {
  onFinish: () => void;
}

const Timer = ({ onFinish }: TimerProps) => {
  const [count, setCount] = useState(0);

useEffect(() => {
  const intervalId = setInterval(() => {
    setCount((count) => {
      count = count + 1;
      console.log(count);
      if (count === 20) {
        onFinish();
        clearInterval(intervalId);
      }
      return count;
    });
  }, 1000);
}, []);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <div className="text-3xl">
      <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
      <span>:</span>
      <span className="text-skyblue">
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
};

export default Timer;
