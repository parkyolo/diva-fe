import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { SangSong } from '@/types/song';
import { useEffect, useState } from 'react';
import SongItems from './SongItems';

interface Group {
  [key: string]: SangSong[];
}
const groupBy = (array: SangSong[], key: keyof SangSong): Group => {
  return array.reduce((result: Group, currentValue: SangSong) => {
    const keyValue = currentValue[key]?.toString();
    if (keyValue !== undefined) {
      const day = keyValue.substring(0, 10);
      (result[day] = result[day] || []).push(currentValue);
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
  // 날짜별로 그룹화 된 노래 (key: 날짜 - value: 부른 노래의 배열)
  const [groupedSongs, setGroupedSongs] = useState<Group>({});
  // 데이터 페칭 후 온 노래들을 날짜별로 정렬
  useEffect(() => {
    if (!isLoading && Array.isArray(sangSongs)) {
      // console.log(sangSongs[sangSongs.length - 1].createdDate);
      // console.log(sangSongs[sangSongs.length - 2].createdDate);
      const filteredAndSortedSongs = sangSongs
        .filter((song) => song.createdDate) // Filtering out songs without createdDate
        .sort((a, b) => b.createdDate.localeCompare(a.createdDate));

      const groupedSongs = groupBy(filteredAndSortedSongs, 'createdDate');
      setGroupedSongs(groupedSongs);
    }
  }, [isLoading, sangSongs]);

  return (
    <div>
      <div>
        {Array.isArray(sangSongs) &&
          (Object.keys(groupedSongs).length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-8 p-5">
              <p>부른 노래가 없습니다</p>
            </div>
          ) : (
            Object.keys(groupedSongs).map((date, index) => (
              <div key={index}>
                <div className="flex justify-start px-3">
                  {new Date(date).toLocaleDateString()}
                </div>
                <div className="flex flex-row flex-wrap">
                  {groupedSongs[date].map((song: any) => (
                    <SongItems
                      key={song.practiceResultId}
                      song={song}
                    ></SongItems>
                  ))}
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
};

export default SongContent;
