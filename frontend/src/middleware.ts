import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const { isLogin } = parseAccessToken(accessToken);

  if (!isLogin && isProtectedRoute(request.nextUrl.pathname)) {
    return createUnauthorizedResponse();
  }

  return NextResponse.next();
}

function parseAccessToken(accessToken: { value: string } | undefined) {
  let payload = null;

  if (accessToken) {
    try {
      const tokenParts = accessToken.value.split(".");
      payload = JSON.parse(atob(tokenParts[1]));
    } catch (e) {
      console.error("토큰 파싱 중 오류 발생:", e);
    }
  }

  const isLogin = payload !== null;

  return { isLogin, payload };
}

function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith("/post/write") || pathname.startsWith("/post/edit");
}

function createUnauthorizedResponse(): NextResponse {
  return new NextResponse("로그인이 필요합니다.", {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/post/write/:path*", "/post/edit/:path*"],
};