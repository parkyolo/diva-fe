import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 요청으로부터 리프레쉬 토큰정보 추출
  const refreshToken: string =
    request.cookies.get('AuthorizationRefresh')?.value ?? '';
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  // TODO: '/' 이외의 다른 요청은 모두 검사하게 변경
  // matcher: '/((?!_next|auth|mypage|$).*)',
  matcher: ['/range', '/mypage', '/feed'],
};
