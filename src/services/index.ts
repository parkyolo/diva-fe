import { feedRequest } from '@/types/post';
import { RealModeRequest } from '@/types/song';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type RequestConfig = {
  method: Method;
  url: string;
  body?: string | FormData;
};

export interface IRequestConfigResolver {
  (data: any): RequestConfig;
}

interface IRequests {
  member: {
    getMember: IRequestConfigResolver;
    updateMember: IRequestConfigResolver;
  };
  sing: {
    saveTestResult: IRequestConfigResolver;
    getTestResult: IRequestConfigResolver;
    tutorial: IRequestConfigResolver;
    live: IRequestConfigResolver;
    saveLiveResult: IRequestConfigResolver;
    realModeScore: IRequestConfigResolver;
  };
  recommend: {
    getSongRecommendation: IRequestConfigResolver;
    getSingerRecommendation: IRequestConfigResolver;
  };
  post: {
    getMyPosts: IRequestConfigResolver;
    getAllPosts: IRequestConfigResolver;
    getPost: IRequestConfigResolver;
    writePost: IRequestConfigResolver;
    deletePost: IRequestConfigResolver;
    updatePost: IRequestConfigResolver;
    doLike: IRequestConfigResolver;
    doUnlike: IRequestConfigResolver;
  };
  song: {
    getSangSong: IRequestConfigResolver;
  };
}

const req: IRequests = {
  member: {
    getMember: () => ({
      method: 'GET',
      url: '/members',
    }),
    updateMember: (data: FormData) => ({
      method: 'PATCH',
      url: '/members',
      body: data,
    }),
  },
  sing: {
    saveTestResult: (data: { highestNote: string; lowestNote: string }) => ({
      method: 'POST',
      url: '/vocal-test',
      body: JSON.stringify(data),
    }),
    getTestResult: () => ({
      method: 'GET',
      url: '/vocal-test',
    }),
    tutorial: ({ songId }: { songId: number }) => ({
      method: 'GET',
      url: `/sing/${songId}/tutorial`,
    }),
    live: ({ songId }: { songId: number }) => ({
      method: 'GET',
      url: `/sing/${songId}/live`,
    }),
    saveLiveResult: ({
      songId,
      record,
    }: {
      songId: number;
      record: FormData;
    }) => ({
      method: 'POST',
      url: `/sing/${songId}/upload`,
      body: record,
    }),
    realModeScore: ({ artist, title, practiceResultId }: RealModeRequest) => ({
      method: 'POST',
      url: `/sing/${practiceResultId}/score`,
      body: JSON.stringify({ artist: artist, title: title }),
    }),
  },
  recommend: {
    getSongRecommendation: () => ({
      method: 'GET',
      url: '/recommend/songs',
    }),
    getSingerRecommendation: () => ({
      method: 'GET',
      url: '/recommend/artists',
    }),
  },
  post: {
    getMyPosts: () => ({
      method: 'GET',
      url: '/members/posts',
    }),
    getAllPosts: (param: feedRequest) => ({
      method: 'GET',
      url: param.postId
        ? `/posts?postId=${param.postId}&pageSize=${param.pageSize}`
        : `/posts?postId=&pageSize=${param.pageSize}`,
    }),
    getPost: (practiceResultId: number) => ({
      method: 'GET',
      url: `/posts/${practiceResultId}`,
    }),
    writePost: (data: {
      content: string;
      practiceResultId: number;
      score: number;
      songId: number;
      title: string;
      artist: string;
    }) => ({
      method: 'POST',
      url: '/posts',
      body: JSON.stringify(data),
    }),
    deletePost: ({ postId }: { postId: number }) => ({
      method: 'DELETE',
      url: `/posts/${postId}`,
    }),
    updatePost: ({ postId, content }: { postId: number; content: string }) => ({
      method: 'PATCH',
      url: `/posts/${postId}`,
      body: JSON.stringify(content),
    }),
    doLike: ({ postId }: { postId: number }) => ({
      method: 'POST',
      url: `/posts/${postId}/heart`,
    }),
    doUnlike: ({ postId }: { postId: number }) => ({
      method: 'DELETE',
      url: `/posts/${postId}/heart`,
    }),
  },
  song: {
    getSangSong: () => ({
      method: 'GET',
      url: `/members/list`,
    }),
  },
};

export { req };
