"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scale, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2, Server } from "lucide-react";
import { loginAdmin } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin@123");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const res = await loginAdmin(username, password);
    setIsLoading(false);

    if (res.success) {
      if (typeof window !== "undefined") {
        const u = res.user?.username || username;
        const role = res.user?.role || (u === "admin" ? "admin" : "editor");
        const name = res.user?.name || u;
        localStorage.setItem("hmq_admin_session", u);
        localStorage.setItem("hmq_admin_role", role);
        localStorage.setItem("hmq_admin_name", name);
        if (res.token) {
          localStorage.setItem("hmq_admin_token", res.token);
        }
      }
      router.push("/admin/");
    } else {
      setErrorMsg(res.error || "Tài khoản hoặc mật khẩu không chính xác.");
    }
  };

  const handleQuickDemoLogin = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hmq_admin_session", "admin");
      localStorage.setItem("hmq_admin_role", "admin");
      localStorage.setItem("hmq_admin_name", "Quản Trị Viên Trưởng");
      localStorage.setItem("hmq_admin_token", "local-demo-token");
    }
    router.push("/admin/");
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex flex-col justify-center items-center px-4 py-12 text-slate-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#96794F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#0F1E36]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-[#0F1E36]/90 backdrop-blur-md border border-[#96794F]/30 rounded-xl shadow-2xl p-6 sm:p-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#96794F]/30 to-[#96794F]/10 border border-[#96794F]/50 flex items-center justify-center text-[#E5B869] mx-auto mb-4 shadow-lg shadow-[#96794F]/10">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
            CÔNG TY LUẬT HẢI MINH QUÂN
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#96794F] font-semibold mt-1">
            Hệ Thống Quản Trị Nội Dung (CMS)
          </p>
        </div>

        {/* Free Hosting SQLite info badge */}
        <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-200/90 leading-relaxed">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
            <Server className="w-4 h-4 text-emerald-400 shrink-0" />
            Lưu trữ Hosting 100% Miễn Phí (PHP + SQLite)
          </div>
          Hệ thống chạy trực tiếp trên hosting của bạn, không tốn chi phí bên thứ 3, không bao giờ bị tạm dừng (sleep) và tự động lưu ảnh vào thư mục <code>/uploads/</code>.
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Tài khoản quản trị
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#96794F] focus:ring-1 focus:ring-[#96794F] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin@123"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#96794F] focus:ring-1 focus:ring-[#96794F] transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Mật khẩu mặc định: <code className="text-[#E5B869] font-mono">admin@123</code> (Đổi trong <code className="text-slate-300">public/api/index.php</code>)
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.99] text-[#14130F] font-bold text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#14130F]" />
                Đang xác thực...
              </>
            ) : (
              <>
                Đăng Nhập Quản Trị
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Button */}
        <div className="mt-4 pt-4 border-t border-slate-700/60 text-center">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="text-xs text-[#E5B869] hover:text-white font-medium inline-flex items-center gap-1.5 py-1 px-3 rounded hover:bg-white/5 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#96794F]" />
            Vào thẳng trang quản trị (1-Click)
          </button>
        </div>

        {/* Return to public site */}
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            ← Quay lại trang chủ website
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        © 2026 Công ty Luật TNHH Hải Minh Quân. Bảo mật thông tin nội bộ.
      </div>
    </div>
  );
}
