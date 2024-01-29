'use client';

import Header from '@/components/Header';
import Link from 'next/link';
import MainLogo from '/public/svgs/logo.svg';
import Navigation from '@/components/Navigation';
import FeedContent from './Content';
import { useState } from 'react';
import UploadButton from './UploadButton';

const Feed = () => {
  const feedPage = 0b0;
  const uploadForm = 0b1;

  const [currentPage, setCurrentPage] = useState<number>(feedPage);
  const handleCurrentPage = () => {
    setCurrentPage(uploadForm);
  };

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
          <main>
            <FeedContent />
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
