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
  const [deleteisLoading, deletePost, deleteError, doDeletePost] = useFetch<
    PostInterface[]
  >(req.post.deletePost);
  const [doLikeisLoading, like, doLikeError, doLike] = useFetch<
    PostInterface[]
  >(req.post.doLike);
  useEffect(() => {
    getAllPosts();
  }, []);
  console.log(allPosts);
  const handleRemovePost = async (postId: number) => {
    try {
      await doDeletePost({ postId });
      await getAllPosts();
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = async (postId: number) => {
    try {
      await doLike({ postId });
      await getAllPosts();
    } catch (error) {
      console.log(error);
    }
  };
  const [currentPlayingPostId, setCurrentPlayingPostId] = useState<
    number | null
  >(null);

  return (
    <>
      {Array.isArray(allPosts) ? (
        <div className="flex flex-col justify-center items-center gap-8">
          {allPosts.map((post: PostInterface) => (
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
              handleRemovePost={handleRemovePost}
              handleLikePost={handleLike}
            ></Post>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 p-5">
          <p> 게시글이 없습니다</p>
        </div>
      )}
    </>
  );
};

export default PostContainer;
