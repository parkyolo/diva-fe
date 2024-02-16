'use client';

import Link from 'next/link';
import PostContainer from './post/PostContainer';
import UploadButton from './UploadButton';
import UpdateForm from './UpdateForm';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import UploadForm from '@/containers/feed/UploadForm';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { feedPage, uploadForm, feedPageAtom } from '@/store/feed';
import { PostInterface } from '@/types/post';
import { useFetch } from '@/hooks/useFetch';
import { req } from '@/services';
import { HeaderLogo } from '../../../public/svgs';
import { fetchingAtom, reFetchingAtom } from './store';

const PAGE_SIZE = 7;

const Feed = () => {
  // 피드 페이지, 업로드 폼 토글
  const [isFeedPage] = useAtom(feedPageAtom);

  // data fetch
  const viewportRef = useRef<HTMLDivElement>(null);
  const throttle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isFetching, setFetching] = useAtom(fetchingAtom);
  const [isReFetching, setIsReFetching] = useAtom(reFetchingAtom);
  const [isLastPost, setIsLastPost] = useState<boolean>(false);
  const [lastPostId, setLastPostId] = useState<number>();
  const [allPosts, setPosts] = useState<PostInterface[]>([]);
  const [isLoading, getPosts, error, getAllPosts] = useFetch<PostInterface[]>(
    req.post.getAllPosts,
  );

  const clearState = () => {
    setPosts([]);
    setLastPostId(undefined);
    setIsLastPost(false);
  };

  useEffect(() => {
    if (isReFetching) {
      clearState();
      setFetching(true);
      setIsReFetching(false);
    }
  }, [isReFetching]);

  useEffect(() => {
    if (getPosts) {
      if (getPosts.length) {
        setPosts([...allPosts, ...getPosts]);
        setLastPostId(getPosts[getPosts.length - 1].postId);
      } else {
        setIsLastPost(true);
      }
    }
  }, [getPosts]);

  useEffect(() => {
    if (isFetching && !isLastPost) {
      if (!throttle.current) {
        throttle.current = setTimeout(async () => {
          getAllPosts({ postId: lastPostId, pageSize: PAGE_SIZE });
          setFetching(false);
          throttle.current = null;
        }, 300);
      }
    }
  }, [isFetching]);

  useEffect(() => {
    // page 끝 도달 감지
    const handleScroll = () => {
      if (!!viewportRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = viewportRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          setFetching(true);
        }
      }
    };
    setFetching(true);
    viewportRef.current?.addEventListener('scroll', handleScroll);
    return () =>
      viewportRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isFeedPage === feedPage ? (
        <>
          <Header
            LeftComponent={
              <Link href="/">
                <HeaderLogo />
              </Link>
            }
          />
          <main ref={viewportRef}>
            {allPosts && allPosts.length ? (
              <PostContainer allPosts={allPosts} />
            ) : (
              <div className="flex flex-col h-full w-full text-xl justify-center items-center">
                게시글이 없습니다
              </div>
            )}
            <UploadButton />
          </main>
          <Navigation />
        </>
      ) : isFeedPage === uploadForm ? (
        <UploadForm />
      ) : (
        <UpdateForm />
      )}
    </>
  );
};

export default Feed;
