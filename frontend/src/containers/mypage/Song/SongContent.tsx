import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { SangSong } from '@/types/song';
import { useEffect } from 'react';
import SongItems from './SongItems';


interface Group {
  [key: string]: SangSong[];
}
const groupBy = (array: SangSong[], key: keyof SangSong): Group => {
  return array.reduce((result: Group, currentValue: SangSong) => {
    const keyValue = currentValue[key]?.toString();
    if (keyValue !== undefined) {
      (result[keyValue] = result[keyValue] || []).push(currentValue);
    }
    return result;
  }, {} as Group);
};


const SongContent = () => {
  const [isLoading, sangSongs, error, getsangSongs] = useFetch<SangSong[]>(
    req.song.getSangSong,
  );
  useEffect(() => {
    getsangSongs();
  }, []);

  let sortedSongs;
  let groupedSongs: any;
  if (sangSongs) {
    sortedSongs = sangSongs!
    .slice()
    .sort((a, b) => a.createdDate.localeCompare(b.createdDate));
    groupedSongs = groupBy(sortedSongs, 'createdDate');
  }
  return (
    <div>
      {groupedSongs && Object.keys(groupedSongs).map((date, index) => (
        <div key={index}>
          <div className="flex justify-start px-3">
            {new Date(date).toLocaleDateString()}
          </div>
          <div className="flex flex-row flex-wrap">
            {groupedSongs[date].map((song:any) => (
              <SongItems key={song.practiceResultId} song={song}></SongItems>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongContent;
