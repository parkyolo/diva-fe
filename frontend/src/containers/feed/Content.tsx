import Post from '@/components/post/Post';

const FeedContent = () => {
  // 서버에서 데이터 가져오기
  const posts = [
    {
      profileImg: '/images/6.jpg',
      nickname: '가벼운해바라기씨',
      writerId: '10190@gmail.com',
      songTitle: 'Drama',
      artistName: '에스파',
      contents:
        '게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 게시글이에용 ',
      coverImg: '/images/2.jpg',
      audiofile: '/audio/Unavailable.mp3',
      likes: 38,
      liked: true,
      postId: 1,
    },
    {
      profileImg: '/images/5.jpg',
      nickname: '굴러가는다람쥐',
      writerId: '101@gmail.com',
      songTitle: 'Love wins all',
      artistName: 'IU',
      contents: '게시글이에용 게시글이에용 ',
      coverImg: '/images/3.jpg',
      audiofile: '/audio/Unavailable.mp3',
      likes: 0,
      liked: false,
      postId: 2,
    },
    {
      profileImg: '/images/5.jpg',
      nickname: '굴러가는다람쥐',
      writerId: '101@gmail.com',
      songTitle: 'Love wins all',
      artistName: 'IU',
      contents: '게시글이에용 게시글이에용 ',
      coverImg: '/images/4.jpg',
      audiofile: '/audio/Unavailable.mp3',
      likes: 0,
      liked: false,
      postId: 3,
    },
    {
      profileImg: '/images/5.jpg',
      nickname: '굴러가는다람쥐',
      writerId: '101@gmail.com',
      songTitle: 'Love wins all',
      artistName: 'IU',
      contents: '게시글이에용 게시글이에용 ',
      coverImg: '/imgaes/5.jpg',
      audiofile: '/audio/Unavailable.mp3',
      likes: 0,
      liked: false,
      postId: 4,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      {posts.map(
        ({
          profileImg,
          nickname,
          writerId,
          songTitle,
          artistName,
          contents,
          coverImg,
          audiofile,
          likes,
          liked,
          postId,
        }) => (
          <Post
            profileImg={profileImg}
            nickname={nickname}
            writerId={writerId}
            songTitle={songTitle}
            artistName={artistName}
            contents={contents}
            coverImg={coverImg}
            audiofile={audiofile}
            likes={likes}
            liked={liked}
            key={postId}
          ></Post>
        ),
      )}
    </div>
  );
};

export default FeedContent;
