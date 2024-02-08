'use client';

import Post from '@/containers/feed/post/Post';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { PostInterface } from '@/types/post';
import { useEffect, useState } from 'react';

const PostContainer = () => {
  const [isLoading, allPosts, error, getAllPosts] = useFetch<PostInterface[]>(
    req.post.getAllPosts,
  );

  useEffect(() => {
    getAllPosts();
  }, []);
  // audio 제어
  console.log(allPosts);
  const [currentPlayingPostId, setCurrentPlayingPostId] = useState<
    number | null
  >(null);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8">
        {allPosts?.map((post) => (
          <Post
            key={post.postId}
            post={post}
            isPlaying={
              currentPlayingPostId
                ? currentPlayingPostId === post.postId
                  ? true
                  : false
                : false
            }
            handleCurrentAudio={setCurrentPlayingPostId}
          ></Post>
        ))}
      </div>
    </>
  );
};

export default PostContainer;
