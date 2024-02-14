import { useState } from 'react';
import SongContent from './Song/SongContent';
import ShareContent from './Share/ShareContent';

const myPageTab = () => {
  const song = 0b00;
  const share = 0b10;
  const [mode, setMode] = useState(song);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row w-full justify-around h-1/6 items-center p-5">
          <button
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
          </button>
          <div       
          >
            
          </div>
          <button
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
          </button>
        </div>
      </div>
      <div className="basis-full">
        {mode === song ? (
          <>
            <SongContent />
          </>
        ) : (
          <ShareContent />
        )}
      </div>
    </>
  );
};

export default myPageTab;
