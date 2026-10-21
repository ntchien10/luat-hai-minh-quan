"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Users,
  Database,
  PlusCircle,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Eye,
  Edit,
} from "lucide-react";
import {
  fetchArticlesFromSupabase,
  fetchTeamMembersFromSupabase,
  seedInitialDataToSupabase,
  isSupabaseConfigured,
  DbArticle,
  DbTeamMember,
} from "@/lib/supabase";
import { allArticlesData } from "@/data/articlesData";
import { allTeamMembersArchive } from "@/data/mockData";

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [members, setMembers] = useState<DbTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const hasSupabase = isSupabaseConfigured();

  const loadData = useCallback(async () => {
    await Promise.resolve();
    if (hasSupabase) {
      const [artRes, memRes] = await Promise.all([
        fetchArticlesFromSupabase(),
        fetchTeamMembersFromSupabase(),
      ]);
      setArticles(artRes.articles);
      setMembers(memRes.members);
    } else {
      // Fallback hiển thị dữ liệu tĩnh
      const fallbackArticles: DbArticle[] = allArticlesData.slice(0, 5).map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        service_slug: a.serviceSlug,
        category: a.category,
        date: a.date,
        author: a.author,
        image_url: a.imageUrl,
        excerpt: a.excerpt,
        content: a.content,
        is_published: true,
      }));

      const fallbackMembers: DbTeamMember[] = allTeamMembersArchive.map((m, idx) => ({
        id: m.id,
        slug: m.link.replace("/thanh-vien/", "").replace(/\/$/, ""),
        name: m.name,
        role: m.role,
        image_url: m.imageUrl,
        link: m.link,
        phone: m.phone,
        email: m.email,
        is_active: idx === 0,
      }));

      setArticles(fallbackArticles);
      setMembers(fallbackMembers);
    }
    setIsLoading(false);
  }, [hasSupabase]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSeedData = async () => {
    if (!hasSupabase) {
      alert("Vui lòng cấu hình biến môi trường Supabase trong .env.local trước khi đồng bộ.");
      return;
    }

    if (
      !confirm(
        "Bạn có chắc muốn nạp toàn bộ 40+ bài viết và danh sách luật sư ban đầu lên Supabase không?"
      )
    ) {
      return;
    }

    setIsSeeding(true);
    setSeedResult(null);

    const res = await seedInitialDataToSupabase();
    setIsSeeding(false);

    if (res.error) {
      setSeedResult(`❌ ${res.error}`);
    } else {
      setSeedResult(
        `✅ Đồng bộ thành công ${res.articlesCount} bài viết và ${res.membersCount} thành viên lên Supabase!`
      );
      loadData();
    }
  };

  const totalArticles = hasSupabase && articles.length > 0 ? articles.length : allArticlesData.length;
  const totalMembers = hasSupabase && members.length > 0 ? members.length : allTeamMembersArchive.length;
  const activeMembersCount = members.filter((m) => m.is_active).length || 1;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F1E36] via-[#162a4d] to-[#0F1E36] rounded-xl p-6 sm:p-8 text-white border border-[#96794F]/40 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-[#96794F]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#96794F]/20 text-[#E5B869] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#96794F]/40">
            <Sparkles className="w-3.5 h-3.5" />
            Bảng điều khiển quản trị
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Chào mừng đến với Cổng Quản Trị Luật Hải Minh Quân
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Hệ thống cho phép quản lý toàn bộ bài viết, tin tức pháp luật, thông
            tin đội ngũ luật sư thành viên và tải lên hình ảnh lưu trữ trực tiếp
            lên Supabase.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/admin/articles/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#96794F] hover:bg-[#7d633e] text-white text-xs font-bold rounded-lg shadow transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Viết bài mới
            </Link>

            <Link
              href="/admin/team/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors"
            >
              <Users className="w-4 h-4" />
              Quản lý thành viên
            </Link>

            {hasSupabase && (
              <button
                type="button"
                onClick={handleSeedData}
                disabled={isSeeding}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSeeding ? "animate-spin" : ""}`} />
                {isSeeding ? "Đang đồng bộ..." : "Đồng bộ dữ liệu mẫu lên Supabase"}
              </button>
            )}
          </div>

          {seedResult && (
            <div className="mt-4 p-3 bg-black/40 rounded-lg text-xs font-medium border border-white/10">
              {seedResult}
            </div>
          )}
        </div>
      </div>

      {/* Supabase Notice Banner if not configured */}
      {!hasSupabase && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold text-amber-800">
                Supabase chưa được cấu hình biến môi trường
              </h3>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Hệ thống đang chạy ở chế độ Demo cục bộ. Để dữ liệu bài viết, thành viên và ảnh upload được lưu trữ vĩnh viễn trên đám mây, hãy xem hướng dẫn tại trang{" "}
                <Link
                  href="/admin/setup/"
                  className="font-bold underline hover:text-amber-900"
                >
                  Cài đặt & Dữ liệu
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

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
              {totalArticles}
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
              {totalMembers}
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
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                hasSupabase ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="text-sm font-bold text-slate-800">
              {hasSupabase ? "Supabase Cloud" : "Dữ liệu tĩnh / Demo"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">PostgreSQL + Realtime Sync</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Lưu trữ hình ảnh
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-bold text-slate-900">
              law-firm-media
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Supabase Storage Bucket</p>
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
                Các bài viết & phân tích pháp luật mới nhất
              </p>
            </div>
            <Link
              href="/admin/articles/"
              className="text-xs font-bold text-[#96794F] hover:text-[#7d633e] flex items-center gap-1"
            >
              Xem tất cả
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {isLoading ? (
              <div className="p-8 text-center text-xs text-slate-400">Đang tải dữ liệu...</div>
            ) : articles.slice(0, 5).map((article) => (
              <div
                key={article.id}
                className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={article.image_url || "/images/blog/phan-chia-di-san-theo-di-chuc.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 truncate" title={article.title}>
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span className="text-[#96794F] font-medium">{article.category}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${article.slug}/`}
                  target="_blank"
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"
                  title="Xem ngoài web"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Đội ngũ Luật sư & Thành viên
              </h2>
              <p className="text-xs text-slate-400">
                Danh sách chuyên gia và trạng thái hiển thị
              </p>
            </div>
            <Link
              href="/admin/team/"
              className="text-xs font-bold text-[#96794F] hover:text-[#7d633e] flex items-center gap-1"
            >
              Quản lý
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {members.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                      {member.name}
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        member.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {member.is_active ? "Đang hiển thị" : "Đang ẩn"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {member.role}
                  </p>
                </div>
                <Link
                  href="/admin/team/"
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-200 transition-colors"
                  title="Sửa thông tin"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
