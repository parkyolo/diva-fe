'use client';

import Post from '@/containers/feed/post/Post';
import { PostInterface } from '@/types/post';
import { useState } from 'react';

const PostContainer = ({ allPosts }: { allPosts: PostInterface[] }) => {
  const [currentPlayingPostId, setCurrentPlayingPostId] = useState<
    number | null
  >(null);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8">
        {allPosts
          .filter((post) => post.createDate)
          .sort((a, b) => b.createDate.localeCompare(a.createDate))
          .map((post: PostInterface) => (
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
