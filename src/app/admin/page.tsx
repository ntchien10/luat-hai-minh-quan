"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Users,
  PlusCircle,
  ArrowRight,
  Sparkles,
  Eye,
  Server,
  FolderOpen,
} from "lucide-react";
import {
  fetchArticles,
  fetchTeamMembers,
  getSystemStatus,
  DbArticle,
  DbTeamMember,
} from "@/lib/api";
import { allArticlesData } from "@/data/articlesData";
import { allTeamMembersArchive } from "@/data/mockData";

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [members, setMembers] = useState<DbTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState<{
    database?: string;
    uploads_writable?: boolean;
  }>({});

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [artRes, memRes, statusRes] = await Promise.all([
      fetchArticles(),
      fetchTeamMembers(),
      getSystemStatus(),
    ]);

    setArticles(artRes.articles || []);
    setMembers(memRes.members || []);
    if (statusRes.success) {
      setSystemStatus({
        database: statusRes.database,
        uploads_writable: statusRes.uploads_writable,
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalArticles = articles.length > 0 ? articles.length : allArticlesData.length;
  const totalMembers = members.length > 0 ? members.length : allTeamMembersArchive.length;
  const activeMembersCount = members.filter((m) => m.is_active).length || members.length || 1;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F1E36] via-[#162a4d] to-[#0F1E36] rounded-xl p-6 sm:p-8 text-white border border-[#96794F]/40 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-[#96794F]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#96794F]/20 text-[#E5B869] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#96794F]/40">
            <Sparkles className="w-3.5 h-3.5" />
            Hệ Thống Quản Trị Độc Lập 100% Miễn Phí
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Cổng Quản Trị Luật Hải Minh Quân
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Hệ thống chạy hoàn toàn độc lập trên hosting của bạn (PHP + SQLite), không phụ thuộc bên thứ 3, không bao giờ bị tạm dừng (sleep), không tốn chi phí duy trì hàng tháng.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/articles/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] text-xs font-bold uppercase tracking-wider rounded-lg shadow transition-transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              Viết bài mới
            </Link>

            <Link
              href="/admin/team/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors"
            >
              <Users className="w-4 h-4" />
              Quản lý đội ngũ
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tổng số bài viết
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isLoading ? "..." : totalArticles}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              Hoạt động
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Cẩm nang & tin tức pháp luật</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Đội ngũ thành viên
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#96794F] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">
              {isLoading ? "..." : totalMembers}
            </span>
            <span className="text-xs text-slate-500">
              ({activeMembersCount} hiển thị)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Luật sư & chuyên gia pháp lý</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cơ sở dữ liệu
            </span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-bold text-slate-800">
              SQLite (Hosting)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {systemStatus.database || "api/database.sqlite"}
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Lưu trữ hình ảnh
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">
              /uploads/
            </span>
            <span className="text-xs text-emerald-600 font-semibold">
              Trực tiếp trên host
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Không giới hạn dung lượng bucket</p>
        </div>
      </div>

      {/* Two Columns: Recent Articles & Members Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Articles */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Bài viết gần đây
              </h2>
              <p className="text-xs text-slate-400">
                Các bài viết &amp; phân tích pháp luật mới nhất
              </p>
            </div>
            <Link
              href="/admin/articles/"
              className="text-xs text-[#96794F] hover:text-[#7d633e] font-semibold flex items-center gap-1"
            >
              Xem tất cả ({totalArticles})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {articles.slice(0, 5).map((article) => (
              <div
                key={article.id}
                className="p-4 hover:bg-slate-50/80 transition-colors flex items-center gap-3.5"
              >
                <div className="relative w-14 h-12 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-semibold text-[#96794F] bg-[#96794F]/10 px-1.5 py-0.5 rounded mb-1">
                    {article.category || "Cẩm nang pháp lý"}
                  </span>
                  <h3
                    className="text-xs font-semibold text-slate-800 truncate"
                    title={article.title}
                  >
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {article.date} • {article.author}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/blog/${article.slug}/`}
                    target="_blank"
                    className="p-1.5 text-slate-400 hover:text-[#96794F] rounded hover:bg-white"
                    title="Xem bài viết ngoài website"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Đội ngũ luật sư &amp; nhân sự
              </h2>
              <p className="text-xs text-slate-400">
                Quản lý hồ sơ và trạng thái hiển thị
              </p>
            </div>
            <Link
              href="/admin/team/"
              className="text-xs text-[#96794F] hover:text-[#7d633e] font-semibold flex items-center gap-1"
            >
              Xem tất cả ({totalMembers})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {members.slice(0, 6).map((member) => (
              <div
                key={member.id}
                className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                    {member.image_url ? (
                      <Image
                        src={member.image_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-slate-900 truncate">
                      {member.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                      member.is_active
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {member.is_active ? "Đang hiển thị" : "Tạm ẩn"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
