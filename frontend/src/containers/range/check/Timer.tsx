import { useEffect, useState } from 'react';

interface TimerProps {
  onFinish: () => void;
}

const Timer = ({ onFinish }: TimerProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 20) {
          clearInterval(intervalId);
          onFinish();
        }
        console.log(newCount)
        return newCount;
      });
    }, 1000)
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

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
