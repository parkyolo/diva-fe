import Bookmark from '/public/svgs/bookmark.svg';

import { useEffect, useState } from 'react';

interface BookmarkButtonProps {
  isLiked: boolean;
}

const LIKE_BUTTON_COLOR = '#32c5ff';

const BookmarkButton = ({ isLiked }: BookmarkButtonProps) => {
  const [likeButtonColor, setLikeButtonColor] = useState(
    isLiked ? LIKE_BUTTON_COLOR : 'none',
  );

  //버튼 최초 렌더링 시 기존 상태를 반영하기 위함.
  // console.log(isLiked) 를 찍어보면 false -> true 로 바뀌는 이해할 수 없는 현상?
  useEffect(() => {
    setLikeButtonColor(() => (isLiked ? LIKE_BUTTON_COLOR : 'none'));
  }, [isLiked]);

  const handleLikeButton: React.MouseEventHandler = () => {
    setLikeButtonColor((prev) =>
      prev === LIKE_BUTTON_COLOR ? 'none' : LIKE_BUTTON_COLOR,
    );
  };

  return (
    <button onClick={handleLikeButton}>
      <Bookmark fill={likeButtonColor} />
    </button>
  );
};

export default BookmarkButton;
