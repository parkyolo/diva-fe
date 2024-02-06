import ShareItems from './ShareItems';
import { Song } from '@/types/song';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { accessTokenAtom } from '@/store/user';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';

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
  // const [songs, setSongs] = useState<Song[]>([]);
  // const [isFetching, setFetching] = useState(false);
  // const throttle = useRef<ReturnType<typeof setTimeout> | null>(null);
  // const fetchSong = useCallback(async () => {
  //   if (!throttle.current) {
  //     throttle.current = setTimeout(async () => {
  //       try {
  //         // const response = await fetch('/members/list');
  //         // const data = await response.json();
  //         const data = [
  //           {
  //             id: '0',
  //             title: '서울의 달',
  //             artist: '김건모',
  //             similarity: '90',
  //             coverImg: '/images/3.jpg',
  //             createDate: new Date(2024, 2, 3),
  //           },
  //           {
  //             id: '1',
  //             title: '오랜만에',
  //             artist: '죠지',
  //             similarity: '70',
  //             coverImg: '/images/4.jpg',
  //             createDate: new Date(2024, 1, 2),
  //           },
  //           {
  //             id: '2',
  //             title: '부럽지가 않어',
  //             artist: '장기하',
  //             similarity: '50',
  //             coverImg: '/images/5.jpg',
  //             createDate: new Date(2024, 1, 2),
  //           },
  //         ];
  //         setSongs(data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //       setFetching(false);
  //       throttle.current = null;
  //     }, 100);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchSong();
  // }, []);

  const [isLoading, sharedSongs, error, getSharedSongs] = useFetch(
    req.post.getMyPosts,
  );

  // const [sharedSongs, setSharesSongs] = useState(null);

  // const getSharedSongs = async () => {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URI}/members/posts`,
  //     {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     },
  //   );
  //   const data = await res.json();

  //   console.log(data);
  // };

  const sortedSongs: Song[] = sharedSongs
    .slice()
    .sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
  console.log('sortedSongs:', sortedSongs);
  console.log('sortedSongs[0]:', sortedSongs[0]);
  const groupedSongs = groupBy(sortedSongs, 'createDate');
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

  const date: number = 240116;
  return (
    <>
      <div className="flex justify-start p-2">{date}</div>
      <div className="flex flex-col w-full justify-center">
        {ImagesItems?.map((item, id) => <ShareItems song={item}></ShareItems>)}
      </div>
    </>
  );
};

export default ShareContent;
