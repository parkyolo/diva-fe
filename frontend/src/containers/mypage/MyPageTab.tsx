import { useState } from 'react';
import SongContent from './Song/SongContent';
import LikeContent from './Like/LikeContent';
import ShareContent from './Share/ShareContent';

const myPageTab = () => {
  const song = 0b00;
  const like = 0b01;
  const share = 0b10;
  const [mode, setMode] = useState(song);

  return (
    <>
      <div className="basis-full flex flex-col">
        <div className="flex flex-row w-full justify-around h-1/6 items-center p-5">
          <div
            className={
              mode === song
                ? 'decoration-skyblue text-center font-bold underline underline-offset-8'
                : ''
            }
            onClick={(e) => {
              setMode(song);
            }}
          >
            부른 노래
          </div>
          <div
            className={
              mode === like
                ? 'decoration-skyblue text-center font-bold underline underline-offset-8'
                : ''
            }
            onClick={(e) => {
              setMode(like);
            }}
          >
            찜한 노래
          </div>
          <div
            className={
              mode === share
                ? 'decoration-skyblue text-center font-bold underline underline-offset-8'
                : ''
            }
            onClick={(e) => {
              setMode(share);
            }}
          >
            공유한 노래
          </div>
        </div>
      </div>
      <div className="basis-full">
        {mode === song ? (
          <SongContent />
        ) : mode === like ? (
          <LikeContent />
        ) : (
          <ShareContent />
        )}
      </div>
    </>
  );
};

export default myPageTab;
