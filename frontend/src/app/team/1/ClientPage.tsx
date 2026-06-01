"use client";

import LoginForm2 from "@/components/business/LoginForm2";

export default function ClinetPage() {
  return (
    <>
      <div>회원 로그인 페이지</div>
      <LoginForm2
        url="https://api.main.ticketone.site/api/v1/users/login"
        nameKey="email"
        passKey="password"
        nameValue="user@example.com"
        passValue="password123"
      />
    </>
  );
}
