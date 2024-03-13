import { useEffect, useState } from 'react';

interface TimerProps {
  setIsTimeout: any;
}

const TIMEOUT_SECONDS = 20;

const Timer = ({ setIsTimeout }: TimerProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCnt) => prevCnt + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (count === TIMEOUT_SECONDS) {
      console.log('timeisrunningout');
      setIsTimeout(true);
    }
  }, [count]);

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
