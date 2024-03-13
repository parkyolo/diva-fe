import Image from 'next/image';

import StarFilled from '/public/images/star_filled.png';
import StarEmpty from '/public/images/star_empty.png';
import { DifficultyRange } from '@/types/song';

interface Props {
  difficulty: DifficultyRange;
}

const DifficultyStars = ({ difficulty }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <span className="text-2xl font-bold mr-2">난이도</span>
      {[...Array(difficulty)].map((_, idx) => (
        <div
          key={idx}
          className="w-[2.2rem] flex justify-center items-center -mr-[0.3rem]"
        >
          <Image src={StarFilled} alt="채워진 별" />
        </div>
      ))}
      {[...Array(5 - difficulty)].map((_, idx) => (
        <div
          key={idx}
          className="w-[2.2rem] flex justify-center items-center -mr-[0.3rem]"
        >
          <Image src={StarEmpty} alt="빈 별" />
        </div>
      ))}
    </div>
  );
};

export default DifficultyStars;
