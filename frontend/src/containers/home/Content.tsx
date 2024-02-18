'use client';

import useModal from '@/hooks/useModal';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Main from '@/components/Main';
import SongCarousel from './SongCarousel';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  RecommendedSong,
  RecommendedSongResponse,
  S3SongInfo,
} from '@/types/song';
import { useFetch } from '@/hooks/useFetch';
import { realMode, tutorialMode } from '.';
import { req } from '@/services';

const Content = ({
  onModeChange,
  setActiveMusicId,
  setActiveSong,
}: {
  onModeChange: Function;
  setActiveMusicId: Dispatch<SetStateAction<number>>;
  setActiveSong: Dispatch<SetStateAction<S3SongInfo>>;
}) => {
  const [isOpen, open, close] = useModal();
  const [activeMusicIdx, setActiveMusicIdx] = useState<number>(0);
  const [isLoading, recommendedSongsData, error, getRecommendedSongs] =
    useFetch<RecommendedSongResponse[]>(req.recommend.getSongRecommendation);
  const [recommendedSongs, setSongs] = useState<RecommendedSong[]>();

  const changeModeToReal = () => {
    if (recommendedSongs) {
      setActiveMusicId(recommendedSongs[activeMusicIdx].songId);
      setActiveSong({
        artist: recommendedSongs[activeMusicIdx].artist,
        songTitle: recommendedSongs[activeMusicIdx].songTitle,
      });
      onModeChange(realMode);
    }
  };

  const changeModetoTutorial = () => {
    if (recommendedSongs) {
      setActiveMusicId(recommendedSongs[activeMusicIdx].songId);
      setActiveSong({
        artist: recommendedSongs[activeMusicIdx].artist,
        songTitle: recommendedSongs[activeMusicIdx].songTitle,
      });
      onModeChange(tutorialMode);
    }
  };

  useEffect(() => {
    if (recommendedSongsData) {
      setSongs(
        recommendedSongsData.map((song) => {
          return {
            songId: song.songId,
            songTitle: song.title,
            artist: song.artist,
            similarity: song.similarity,
            coverUrl: song.coverImg,
          };
        }),
      );
    }
  }, [recommendedSongsData]);

  useEffect(() => {
    try {
      getRecommendedSongs();
    } catch (_) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {!!recommendedSongs ? (
        <Main className="relative py-10">
          <SongCarousel
            interval={50000}
            onClick={open}
            songs={recommendedSongs}
            setActiveMusicIdx={setActiveMusicIdx}
          ></SongCarousel>
        </Main>
      ) : (
        <></>
      )}

      {/* bottomsheet modal */}
      {isOpen && (
        <BottomSheet close={close}>
          <BottomSheet.Button btnColor="bg-blue" onClick={changeModeToReal}>
            실전모드
          </BottomSheet.Button>
          <BottomSheet.Button
            btnColor="bg-btn-black"
            onClick={changeModetoTutorial}
          >
            튜토리얼
          </BottomSheet.Button>
        </BottomSheet>
      )}
    </>
  );
};

export default Content;
