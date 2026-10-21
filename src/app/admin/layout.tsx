"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  UserCog,
  Server,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";
  const [isLoading, setIsLoading] = useState(!isLoginPage);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("admin");
  const [userName, setUserName] = useState<string>("Admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) {
      return;
    }

    let isMounted = true;

    const checkAuth = async () => {
      await Promise.resolve();
      if (!isMounted) return;

      const session = typeof window !== "undefined" ? localStorage.getItem("hmq_admin_session") : null;
      const role = typeof window !== "undefined" ? localStorage.getItem("hmq_admin_role") : null;
      const name = typeof window !== "undefined" ? localStorage.getItem("hmq_admin_name") : null;

      if (session) {
        setUserEmail(session);
        setUserRole(role || (session === "admin" ? "admin" : "editor"));
        setUserName(name || session);
        setIsLoading(false);
        return;
      }

      // Chưa đăng nhập -> chuyển về /admin/login/
      if (isMounted) {
        router.push("/admin/login/");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hmq_admin_session");
      localStorage.removeItem("hmq_admin_token");
      localStorage.removeItem("hmq_admin_role");
      localStorage.removeItem("hmq_admin_name");
    }
    router.push("/admin/login/");
  };

  // Nếu là trang login, hiển thị trực tiếp form đăng nhập không có khung sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#96794F] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm font-medium text-slate-300">
            Đang kiểm tra quyền truy cập...
          </p>
        </div>
      </div>
    );
  }

  const navLinks = [
    {
      label: "Tổng quan",
      href: "/admin/",
      icon: LayoutDashboard,
      active: pathname === "/admin" || pathname === "/admin/",
    },
    {
      label: "Quản lý bài viết",
      href: "/admin/articles/",
      icon: FileText,
      active: pathname.startsWith("/admin/articles"),
    },
    {
      label: "Quản lý thành viên",
      href: "/admin/team/",
      icon: Users,
      active: pathname.startsWith("/admin/team"),
    },
    {
      label: "Quản lý tài khoản",
      href: "/admin/users/",
      icon: UserCog,
      active: pathname.startsWith("/admin/users") || pathname.startsWith("/admin/setup"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-[#0F1E36] text-white sticky top-0 z-50 border-b border-[#96794F]/30 shadow-md">
        <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/admin/" className="flex items-center gap-3.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 p-1.5 border border-[#96794F]/40 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="Công ty Luật TNHH Hải Minh Quân"
                  width={64}
                  height={64}
                  priority
                  className="w-full h-full object-contain drop-shadow"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wide text-white block leading-tight group-hover:text-[#E5B869] transition-colors">
                  HẢI MINH QUÂN
                </span>
                <span className="text-[11px] sm:text-xs text-[#E5B869] font-semibold tracking-wider uppercase block">
                  Hệ Thống Quản Trị CMS
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Host SQLite status badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hosting PHP &amp; SQLite (100% Free)</span>
            </div>

            {/* Public site link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Xem website</span>
            </Link>

            {/* User info & logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <div className="hidden md:block text-right">
                <span className="block text-xs font-semibold text-white truncate max-w-[150px]">
                  {userName || userEmail || "Quản trị viên"}
                </span>
                <span className="block text-[10px] text-[#DFBA73] font-semibold uppercase tracking-wider">
                  {userRole === "admin" ? "Admin" : "Biên tập viên"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Đăng xuất"
                className="p-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a1424] border-t border-slate-800 px-4 py-3 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm rounded font-medium ${
                    item.active
                      ? "bg-[#96794F] text-white"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 max-w-[1720px] w-full mx-auto px-3 sm:px-5 lg:px-6 py-5 flex flex-col lg:flex-row gap-5">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 xl:w-60 shrink-0">
          <nav className="bg-white rounded-lg border border-slate-200 shadow-sm p-3 space-y-1 sticky top-24">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Danh mục quản trị
            </div>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                    item.active
                      ? "bg-[#0F1E36] text-[#E5B869] shadow-sm font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      item.active ? "text-[#E5B869]" : "text-slate-400"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="px-3 py-2 bg-slate-50 rounded text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#96794F]" />
                  Phiên bản 1.0 CMS Host
                </div>
                Luật Hải Minh Quân - Hệ thống quản lý dữ liệu trực tiếp trên Hosting.
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
