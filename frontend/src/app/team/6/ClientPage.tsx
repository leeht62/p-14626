"use client";

import LoginForm2 from "@/components/business/LoginForm2";

export default function ClinetPage() {
  return (
    <>
      <div>회원 로그인 페이지</div>
      <LoginForm2
        url="https://api.app.mm.ts0608.life/api/auth/login"
        nameKey="email"
        passKey="password"
        nameValue="initUser1@example.com"
        passValue="testPassword123!"
      />
    </>
  );
}
