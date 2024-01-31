import SongItems from './SongItems';
import { Song } from '@/types/song';

const SongContent = () => {
  const date = 240111;
  const ImagesItems: Song[] = [
    {
      id: '0',
      title: '서울의 달',
      artist: '김건모',
      similarity: '90',
      coverImg: '/images/3.jpg',
      difficulty: 4,
    },
    {
      id: '1',
      title: '오랜만에',
      artist: '죠지',
      similarity: '70',
      coverImg: '/images/4.jpg',
      difficulty: 5,
    },
    {
      id: '2',
      title: '부럽지가 않어',
      artist: '장기하',
      similarity: '50',
      coverImg: '/images/5.jpg',
      difficulty: 3,
    },
  ];
  return (
    <div>
      <div className="flex justify-start p-2">{date}</div>
      <div className="flex flex-row flex-wrap ">
        {ImagesItems?.map((item, songId) => (
          <SongItems song={item}></SongItems>
        ))}
      </div>
    </div>
  );
};

export default SongContent;
