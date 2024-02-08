'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import UploadForm from '@/containers/feed/UploadForm';
import { feedPage, feedPageAtom } from '@/store/feed';
import { PostInterface } from '@/types/post';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import PostContainer from './post/PostContainer';
import UploadButton from './UploadButton';
import { HeaderLogo } from '../../../public/svgs';

const PAGE_SIZE = 5;

const Feed = () => {
  // 피드 페이지, 업로드 폼 토글
  const [isFeedPage] = useAtom(feedPageAtom);

  // data fetch
  const viewportRef = useRef<HTMLDivElement>(null);
  const throttle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isFetching, setFetching] = useState(false);
  const [isLastPage, setLastPage] = useState(false);

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
            <PostContainer />
            <UploadButton />
          </main>
          <Navigation />
        </>
      ) : (
        <UploadForm />
      )}
    </>
  );
};

export default Feed;
