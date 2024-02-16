import BottomSheet from '@/components/BottomSheet/BottomSheet';
import AudioPlayer from '@/containers/feed/AudioPlayer';
import { useFetch } from '@/hooks/useFetch';
import useModal from '@/hooks/useModal';
import { req } from '@/services';
import { feedPageAtom, postAtom } from '@/store/feed';
import { userAtom } from '@/store/user';
import { PostInterface, UpdateSongs } from '@/types/post';
import { SharedSong } from '@/types/song';
import { coverUrl } from '@/utils/getS3URL';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import DotsThreeVertical from '/public/svgs/dots-three-vertical.svg';

interface ContentProps {
  song: SharedSong;
  handleRemovePost: (postId: number) => void;
}

const ShareItems = ({ song, handleRemovePost }: ContentProps) => {
  const user = useAtomValue(userAtom);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const router = useRouter();
  const handleAudioPause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleAudioPlay = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, open, close] = useModal();
  const setFeedPageAtom = useSetAtom(feedPageAtom);
  const setPostData = useSetAtom(postAtom);
  const sendDatatoJotaiStore = () => {
    if (song.songTitle !== '' && song.artist !== '') {
      const dataTosend: UpdateSongs = {
        postId: song.postId,
        content: song.content,
        score: song.score,
        title: song.songTitle,
        artist: song.artist,
        coverImg: coverUrl({ artist: song.artist, songTitle: song.songTitle }),
        practiceResultId: song.practiceResultId,
      };
      setPostData(dataTosend);
      setFeedPageAtom(0b10);
      router.push('/feed');
    }
  };
  const [delteisLoading, deletePost, deleteError, doDeletePost] = useFetch<
    PostInterface[]
  >(req.post.deletePost);

  const handleRemove = async () => {
    // 삭제 버튼 클릭 시 handleRemovePost 호출
    await handleRemovePost(song.postId);
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 justify-start items-center">
          <div className="text-gray text-overflow-one">
            <span>{song.songTitle}</span> &middot;&nbsp;
            <span>{song.artist}</span>
          </div>
        </div>
        <button onClick={open}>
          <DotsThreeVertical />
        </button>
      </div>
      {song.content}
      <div className="relative w-full h-24">
        <AudioPlayer
          artist={song.artist}
          practiceResultId={song.practiceResultId}
          songTitle={song.songTitle}
        />
      </div>

      {isOpen && (
        <BottomSheet close={close}>
          <BottomSheet.Button
            btnColor="bg-blue"
            onClick={() => sendDatatoJotaiStore()}
          >
            수정하기
          </BottomSheet.Button>

          <BottomSheet.Button
            btnColor="bg-btn-black"
            onClick={() => {
              handleRemove();
              close();
            }}
          >
            삭제하기
          </BottomSheet.Button>
        </BottomSheet>
      )}
    </div>
  );
};

export default ShareItems;
