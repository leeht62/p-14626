"use client";

import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm({
  url,
  nameKey,
  passKey,
  nameValue,
  passValue,
}: {
  url: string;
  nameKey: string;
  passKey: string;
  nameValue: string;
  passValue: string;
}) {
  const router = useRouter();
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const username = formData.get(nameKey);
    const password = formData.get(passKey);

    if (username?.toString().trim().length === 0) {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    if (password?.toString().trim().length === 0) {
      toast.error("패스워드를 입력해주세요.");
      return;
    }

    // const response = await client.POST("/api/v1/members/login", {
    //   body: {
    //     username,
    //     password,
    //   },
    //   credentials: "include",
    // });

    // if (response.error) {
    //   toast.error(response.error.msg);
    //   return;
    // }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        [nameKey]: username,
        [passKey]: password,
      }),
    });

    if (response.ok) {
      toast.success("로그인 성공");
      const data = await response.json();
      console.log(data);
      router.push("/team");
    } else {
      toast.error("로그인 실패");
    }
  }

  return (
    <>
      <form onSubmit={login} className="flex flex-col w-1/4 gap-3">
        <div className="flex flex-col gap-2">
          <label className="font-medium">아이디</label>
          <Input
            type="text"
            name={nameKey}
            placeholder="이메일을 입력해주세요"
            autoComplete="off"
            autoFocus
            defaultValue={nameValue}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">비밀번호</label>
          <Input
            type="password"
            name={passKey}
            placeholder="비밀번호를 입력해주세요"
            defaultValue={passValue}
          />
        </div>
        <Button type="submit" className="mt-2">
          로그인
        </Button>
      </form>
      <Toaster />
    </>
  );
}
