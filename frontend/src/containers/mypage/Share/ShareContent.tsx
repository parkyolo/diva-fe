import ShareItems from './ShareItems';
import { Song } from '@/types/song';
import { useEffect, useState, useRef, useCallback } from 'react';

interface Group {
  [key: string]: Song[];
}
const groupBy = (array: Song[], key: keyof Song): Group => {
  return array.reduce((result: Group, currentValue: Song) => {
    const keyValue = currentValue[key]?.toString();
    if (keyValue !== undefined) {
      (result[keyValue] = result[keyValue] || []).push(currentValue);
    }
    return result;
  }, {} as Group);
};

const ShareContent = () => {
const [songs, setSongs] = useState<Song[]>([]);
const [isFetching, setFetching] = useState(false);
const throttle = useRef<ReturnType<typeof setTimeout> | null>(null);
const fetchSong = useCallback(async () => {
  if (!throttle.current) {
    throttle.current = setTimeout(async () => {
      try {
        // const response = await fetch('/members/list');
        // const data = await response.json();
        const data = [
          {
            id: '0',
            title: '서울의 달',
            artist: '김건모',
            similarity: '90',
            coverImg: '/images/3.jpg',
            createDate: new Date(2024, 2, 3),
          },
          {
            id: '1',
            title: '오랜만에',
            artist: '죠지',
            similarity: '70',
            coverImg: '/images/4.jpg',
            createDate: new Date(2024, 1, 2),
          },
          {
            id: '2',
            title: '부럽지가 않어',
            artist: '장기하',
            similarity: '50',
            coverImg: '/images/5.jpg',
            createDate: new Date(2024, 1, 2),
          },
        ];
        setSongs(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setFetching(false);
      throttle.current = null;
    }, 100);
  }
}, []);
  
useEffect(() => {
  fetchSong();
}, []);
  const sortedSongs: Song[] = songs
    .slice()
    .sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
  console.log('sortedSongs:', sortedSongs);
  console.log('sortedSongs[0]:', sortedSongs[0]);
  const groupedSongs = groupBy(sortedSongs, 'createDate');
  return (
    <>
      {Object.keys(groupedSongs).map((date, index) => (
        <div key={index}>
          <div className="flex justify-start px-3">
            {new Date(date).toLocaleDateString()}
          </div>
          <div className="flex flex-col w-full justify-center gap-2">
            {groupedSongs[date].map((song) => (
              <ShareItems key={song.id} song={song}></ShareItems>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ShareContent;
