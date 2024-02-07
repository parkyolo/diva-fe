import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 요청으로부터 토큰정보 추출
  const accessToken: string = request.cookies.get('accessToken')?.value ?? '';
  console.log('token ', accessToken);

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  // TODO: '/' 이외의 다른 요청은 모두 검사하게 변경
  matcher: ['/range'],
};
