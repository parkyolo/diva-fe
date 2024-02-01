'use client';

import Post from '@/components/post/Post';
import { PostInterface } from '@/types/post';
import { useState } from 'react';

const PostContainer = ({ posts }: { posts: PostInterface[] }) => {
  // audio 제어
  const [currentPlayingPostId, setCurrentPlayingPostId] = useState<
    number | null
  >(null);

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {posts.map((post) => (
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
  );
};

export default PostContainer;
