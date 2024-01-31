import { RefObject } from 'react';
import LyricsComponent from './Lyrics';

const TutorialMode = ({
  audioRef,
}: {
  audioRef: RefObject<HTMLAudioElement>;
}) => {
  return (
    <main>
      <LyricsComponent audioRef={audioRef} />
    </main>
  );
};

export default TutorialMode;
