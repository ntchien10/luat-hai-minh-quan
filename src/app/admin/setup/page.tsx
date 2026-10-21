"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SetupRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/users/");
  }, [router]);

  return (
    <div className="p-8 text-center text-slate-500 text-sm">
      Đang chuyển hướng tới trang Quản lý tài khoản...
    </div>
  );
}
