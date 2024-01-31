import Image from 'next/image';

import StarFilled from '/public/images/star_filled.png';
import StarEmpty from '/public/images/star_empty.png';
import { DifficultyRange } from '@/types/song';

interface Props {
  difficulty: DifficultyRange;
}

const DifficultyStars = ({ difficulty }: Props) => {
  return (
    <div className="flex justify-center">
      {[...Array(difficulty)].map(() => (
        <Image src={StarFilled} alt="채워진 별" />
      ))}
      {[...Array(5 - difficulty)].map(() => (
        <Image src={StarEmpty} alt="빈 별" />
      ))}
    </div>
  );
};

export default DifficultyStars;
