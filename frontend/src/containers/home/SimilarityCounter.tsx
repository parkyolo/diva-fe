import CountUp from 'react-countup';

interface SimilarityCounterProps {
  label: number;
}

const SimilarityCounter = ({ label }: SimilarityCounterProps) => {
  return (
    <span
      key={label}
      className="text-3xl text-center text-skyblue animate-blink"
    >
      <CountUp className="" start={0} end={label} />%
    </span>
  );
};

export default SimilarityCounter;
