'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import MainLogo from '/public/svgs/logo.svg';
import Navigation from '@/components/Navigation';
import PostContainer from '../../components/post/PostContainer';
import { useCallback, useEffect, useRef, useState } from 'react';
import UploadButton from './UploadButton';
import { PostInterface } from '@/types/post';

const PAGE_SIZE = 5;

const Feed = () => {
  // 피드 페이지, 업로드 폼 토글
  const feedPage = 0b0;
  const uploadForm = 0b1;

  const [currentPage, setCurrentPage] = useState<number>(feedPage);
  const handleCurrentPage = () => {
    setCurrentPage(uploadForm);
  };

  // data fetch
  const viewportRef = useRef<HTMLDivElement>(null);
  const throttle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isFetching, setFetching] = useState(false);
  const [isLastPage, setLastPage] = useState(false);

  const [posts, setPosts] = useState<PostInterface[]>([
    {
      postId: 1,
      audioUrl: '/audio/Unavailable.mp3',
      content:
        '게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 ',
      writerId: 1,
      nickname: '가벼운해바라기씨',
      profileUrl: '/images/6.jpg',
      songTitle: 'Unavailable',
      coverImgUrl: '/images/2.jpg',
      artist: 'Unknown',
      likes: 3,
      liked: true,
      practiceResultId: 1,
    },
    {
      postId: 2,
      audioUrl: '/audio/폰서트.m4a',
      content:
        '게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 ',
      writerId: 2,
      nickname: '가벼운해바라기씨',
      profileUrl: '/images/6.jpg',
      songTitle: '폰서트',
      coverImgUrl: '/images/2.jpg',
      artist: '10cm',
      likes: 3,
      liked: false,
      practiceResultId: 1,
    },
    {
      postId: 3,
      audioUrl: '/audio/Unavailable.mp3',
      content:
        '게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 ',
      writerId: 1,
      nickname: '가벼운해바라기씨',
      profileUrl: '/images/6.jpg',
      songTitle: 'Drama',
      coverImgUrl: '/images/2.jpg',
      artist: '에스파',
      likes: 3,
      liked: true,
      practiceResultId: 1,
    },
    {
      postId: 4,
      audioUrl: '/audio/Unavailable.mp3',
      content:
        '게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 ',
      writerId: 3,
      nickname: '가벼운해바라기씨',
      profileUrl: '/images/6.jpg',
      songTitle: 'Drama',
      coverImgUrl: '/images/2.jpg',
      artist: '에스파',
      likes: 3,
      liked: true,
      practiceResultId: 1,
    },
    {
      postId: 5,
      audioUrl: '/audio/Unavailable.mp3',
      content:
        '게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 ',
      writerId: 4,
      nickname: '가벼운해바라기씨',
      profileUrl: '/images/6.jpg',
      songTitle: 'Drama',
      coverImgUrl: '/images/2.jpg',
      artist: '에스파',
      likes: 3,
      liked: false,
      practiceResultId: 1,
    },
  ]);

  /**
   * @todo data fetch
   */
  const fetchPosts = useCallback(async () => {
    if (!throttle.current) {
      throttle.current = setTimeout(async () => {
        // data fetch
        // fetch(...);

        setFetching(false);
        throttle.current = null;
      }, 300);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    if (isFetching && !isLastPage) {
      fetchPosts();
    } else if (isLastPage) setFetching(false);
  }, [isFetching]);

  return (
    <>
      {currentPage === feedPage ? (
        <>
          <Header
            LeftComponent={
              <Link href="/">
                <MainLogo />
              </Link>
            }
          />
          <main ref={viewportRef}>
            <PostContainer posts={posts} />
            <UploadButton />
          </main>
          <Navigation />
        </>
      ) : (
        <>업로드페이지</>
      )}
    </>
  );
};

export default Feed;
