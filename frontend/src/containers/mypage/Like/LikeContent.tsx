// import MyPageLikeItem from './LikeItems';
// import { useEffect, useState, useRef, useCallback } from 'react';

// const LikeContent = () => {
//   const [songs, setSongs] = useState<any[]>([]);
//   const [isFetching, setFetching] = useState(false);
//   const throttle = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const fetchSong = useCallback(async () => {
//     if (!throttle.current) {
//       throttle.current = setTimeout(async () => {
//         try {
//           // const response = await fetch('/members/list');
//           // const data = await response.json();
//           const data = [
//             {
//               id: '0',
//               title: '서울의 달',
//               artist: '김건모',
//               similarity: '90',
//               coverImg: '/images/3.jpg',
//               createDate: new Date(2024, 2, 3),
//             },
//             {
//               id: '1',
//               title: '오랜만에',
//               artist: '죠지',
//               similarity: '70',
//               coverImg: '/images/4.jpg',
//               createDate: new Date(2024, 1, 2),
//             },
//             {
//               id: '2',
//               title: '부럽지가 않어',
//               artist: '장기하',
//               similarity: '50',
//               coverImg: '/images/5.jpg',
//               createDate: new Date(2024, 1, 2),
//             },
//           ];
//           setSongs(data);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//         setFetching(false);
//         throttle.current = null;
//       }, 100);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSong();
//   }, []);
//   return (
//     <>
//       <div className="flex flex-row flex-wrap ">
//         {songs?.map((item, songId) => (
//           <MyPageLikeItem key={songId} song={item}></MyPageLikeItem>
//         ))}
//       </div>
//     </>
//   );
// };

// export default LikeContent;
