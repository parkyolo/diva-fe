import ShareItems from './ShareItems';
import { SharedSong } from '@/types/song';
import { useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { PostInterface } from '@/types/post';

const ShareContent = () => {
  const [isLoading, sharedSongs, error, getSharedSongs] = useFetch<
    SharedSong[]
  >(req.post.getMyPosts);
  const [deleteisLoading, deletePost, deleteError, doDeletePost] = useFetch<
    PostInterface[]
  >(req.post.deletePost);
  const handleRemovePost = async (postId: number) => {
    try {
      await doDeletePost({ postId });
      await getSharedSongs();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSharedSongs();
  }, []);
  console.log(sharedSongs);
  return (
    <>
      {Array.isArray(sharedSongs) && sharedSongs.length > 0 ? (
        <div className="flex flex-col justify-center items-center gap-8 p-5">
          {sharedSongs
            .sort((a, b) =>
              b.lastModifiedDate.localeCompare(a.lastModifiedDate),
            )
            .map((song: SharedSong) => (
              <ShareItems
                key={song.postId}
                song={song}
                handleRemovePost={handleRemovePost}
              ></ShareItems>
            ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 p-5">
          <p>공유한 노래가 없습니다</p>
        </div>
      )}
    </>
  );
};

export default ShareContent;
