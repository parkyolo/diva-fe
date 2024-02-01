'use client';
import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import { Song } from '@/types/song';
import Main from '@/components/Main';
import SongCarousel from './SongCarousel';

const SongRecommendations: Song[] = [
  {
    id: '0',
    title: '서울의 달',
    artist: '김건모',
    similarity: '90',
    coverImg: '/images/3.jpg',
    difficulty: 4,
    isLiked: false,
    mrUrl: '/audio/폰서트.mp3',
  },
  {
    id: '1',
    title: '오랜만에',
    artist: '죠지',
    similarity: '70',
    coverImg: '/images/4.jpg',
    difficulty: 5,
    isLiked: false,
    mrUrl: '/audio/형.mp3',
  },
  {
    id: '2',
    title: '부럽지가 않어',
    artist: '장기하',
    similarity: '50',
    coverImg: '/images/5.jpg',
    difficulty: 3,
    isLiked: true,
    mrUrl: '/audio/흰수염고래.mp3',
  },
];

const Content = ({ onModeChange }: { onModeChange: Function }) => {
  const [isOpen, open, close] = useModal();
  const changeModeToReal = () => {
    onModeChange(0b01);
  };
  const changeModetoTutorial = () => {
    onModeChange(0b10);
  };

  return (
    <>
      <Main className="relative">
        <SongCarousel
          interval={50000}
          onClick={open}
          songs={SongRecommendations}
        ></SongCarousel>
      </Main>

      {/* bottomsheet modal */}
      {isOpen && (
        <BottomSheet close={close}>
          <BottomSheet.Button btnColor="bg-blue" onClick={changeModeToReal}>
            실전모드
          </BottomSheet.Button>
          <BottomSheet.Button
            btnColor="bg-btn-black"
            onClick={changeModetoTutorial}
          >
            튜토리얼
          </BottomSheet.Button>
        </BottomSheet>
      )}
    </>
  );
};

export default Content;
