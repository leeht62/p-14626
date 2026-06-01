"use client";

import LoginForm2 from "@/components/business/LoginForm2";

export default function ClinetPage() {
  return (
    <>
      <div>회원 로그인 페이지</div>
      <LoginForm2
        url="https://api.devapi.store/api/v1/auth/login"
        nameKey="email"
        passKey="password"
        nameValue="example@example.com"
        passValue="password1!"
      />
    </>
  );
}
