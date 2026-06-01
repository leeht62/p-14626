"use client";

import LoginForm2 from "@/components/business/LoginForm2";

export default function ClinetPage() {
  return (
    <>
      <div>회원 로그인 페이지</div>
      <LoginForm2
        url="http://api.main.ticketone.site:9000/api/v1/users/login"
        nameKey="email"
        passKey="password"
        nameValue="test@test.com"
        passValue="test"
      />
    </>
  );
}
