"use client";

import LoginForm2 from "@/components/business/LoginForm2";

export default function ClinetPage() {
  return (
    <>
      <div>회원 로그인 페이지</div>
      <LoginForm2
        url="https://api.team2.pick-go.shop/api/members/login"
        nameKey="email"
        passKey="password"
        nameValue="test@example.com"
        passValue="1234"
      />
    </>
  );
}
