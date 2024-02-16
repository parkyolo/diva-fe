import CountUp from 'react-countup';

interface SimilarityCounterProps {
  label: number;
}

const SimilarityCounter = ({ label }: SimilarityCounterProps) => {
  return (
    <span
      // 애니메이션 활성화를 위해 key 부여
      key={label}
      className="text-3xl text-center text-skyblue animate-blink"
    >
      <CountUp className="" start={0} end={label} />%
    </span>
  );
};

export default SimilarityCounter;
