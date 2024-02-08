// import { Song } from '@/types/song';
// import Image from 'next/image';
// import useModal from '@/hooks/useModal';
// import BottomSheet from '@/components/BottomSheet/BottomSheet';
// import Link from 'next/link';
// import { useState } from 'react';
// import { useAtom, useSetAtom } from 'jotai';
// import { feedPageAtom } from '@/store/feed';
// import { homePageAtom } from '@/store/feed';

// interface ContentProps {
//   song: Song;
// }

// const LikeItems = ({ song }: ContentProps) => {
//   const [isOpen, open, close] = useModal();
//   const realMode = 0b01;
//   const setHomePageAtom = useSetAtom(homePageAtom);
//   const handleModeChange = (newMode: number) => {
//     setHomePageAtom(newMode);
//   };
//   const [mode, setMode] = useState(realMode);
//   const changeModeToReal = () => {
//     setMode(0b01);
//   };
//   const changeModetoTutorial = () => {
//     setMode(0b10);
//   };
//   return (
//     <>
//       <div className="w-1/3 aspect-square p-1 relative">
//         <div className="relative" onClick={open}>
//           <Image
//             src={song.coverImg}
//             alt={song.title}
//             width={500}
//             height={500}
//           />
//           <div className="absolute top-0 w-full h-full  bg-opacity-45 bg-bg-black "></div>
//           <span className="w-full text-center absolute top-1/2 -translate-y-1/2  text-white">
//             {song.title}
//           </span>
//         </div>
//       </div>
//       {isOpen && (
//         <BottomSheet close={close}>
//           <BottomSheet.Button btnColor="bg-blue" onClick={changeModeToReal}>
//             <Link href="/" onClick={() => handleModeChange(0b01)}>
//               실전모드
//             </Link>
//           </BottomSheet.Button>
//           <BottomSheet.Button
//             btnColor="bg-btn-black"
//             onClick={changeModetoTutorial}
//           >
//             <Link href="/" onClick={() => handleModeChange(0b10)}>
//               튜토리얼
//             </Link>
//           </BottomSheet.Button>
//         </BottomSheet>
//       )}
//     </>
//   );
// };

// export default LikeItems;
