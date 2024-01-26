import { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [count, setCount] = useState(0);

  // TODO: 타이머 기능 개발
  const start = Date.now();
  // useEffect(() => {
  //   const timeoutId = setInterval(() => {
  //     const delta = Date.now() - start; // milliseconds elapsed since start
  //     setCount(() => Math.floor(delta / 1000));
  //     if (count >= 60) {
  //       clearInterval(timeoutId);
  //     }

  //     return () => clearInterval(timeoutId);
  //   }, 1000); // update about every second
  // }, []);

  return (
    <div className="text-4xl">
      <span>0</span>
      <span>:</span>
      <span className="text-skyblue">{count}</span>
    </div>
  );
};

export default Timer;
