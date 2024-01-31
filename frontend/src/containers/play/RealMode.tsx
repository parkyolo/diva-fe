import { RefObject } from 'react';
import LyricsComponent from './Lyrics';

const RealMode = ({ audioRef }: { audioRef: RefObject<HTMLAudioElement> }) => {
  return (
    <main>
      <LyricsComponent audioRef={audioRef} />
    </main>
  );
};

export default RealMode;
