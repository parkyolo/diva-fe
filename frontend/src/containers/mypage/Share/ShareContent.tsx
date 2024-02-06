import ShareItems from './ShareItems';
import { SharedSong, Song } from '@/types/song';
import { useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';


const ShareContent = () => {
  const [isLoading, sharedSongs, error, getSharedSongs] = useFetch<SharedSong[]>(
    req.post.getMyPosts,
  );

  useEffect(() => {
    getSharedSongs();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full justify-center">
        {sharedSongs?.map((song: SharedSong) => (
          <ShareItems key={song.postId} song={song}></ShareItems>
        ))}
      </div>
    </>
  );
};

export default ShareContent;
