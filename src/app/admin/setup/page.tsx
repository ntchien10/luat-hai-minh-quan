"use client";

import React, { useState } from "react";
import {
  Database,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  KeyRound,
  FileCheck2,
} from "lucide-react";
import {
  isSupabaseConfigured,
  seedInitialDataToSupabase,
  fetchArticlesFromSupabase,
} from "@/lib/supabase";

export default function SetupAdminPage() {
  const [copied, setCopied] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const hasSupabase = isSupabaseConfigured();

  const sqlScript = `-- ==============================================================================
-- CÔNG TY LUẬT TNHH HẢI MINH QUÂN - SUPABASE DATABASE INITIALIZATION SCRIPT
-- Copy và dán toàn bộ đoạn mã này vào mục: Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. BẢNG BÀI VIẾT & CẨM NANG PHÁP LÝ (articles)
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  service_slug TEXT DEFAULT 'to-tung-dan-su',
  category TEXT DEFAULT 'Tư vấn pháp luật',
  date TEXT DEFAULT '',
  author TEXT DEFAULT 'Luật sư Đỗ Thị Thanh Hải',
  image_url TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_service_slug ON public.articles(service_slug);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
CREATE POLICY "Public can view published articles" 
ON public.articles FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage articles" ON public.articles;
CREATE POLICY "Authenticated users can manage articles" 
ON public.articles FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can manage articles during dev" ON public.articles;
CREATE POLICY "Anon can manage articles during dev" 
ON public.articles FOR ALL 
TO anon 
USING (true) 
WITH CHECK (true);

-- 2. BẢNG ĐỘI NGŨ LUẬT SƯ & THÀNH VIÊN (team_members)
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  link TEXT DEFAULT '',
  phone TEXT DEFAULT '0967 932 555',
  email TEXT DEFAULT 'luathaiminhquan@gmail.com',
  card_no TEXT DEFAULT '',
  qualifications JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  expertise JSONB DEFAULT '[]'::jsonb,
  bio TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_team_members_slug ON public.team_members(slug);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON public.team_members(order_index ASC);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active team members" ON public.team_members;
CREATE POLICY "Public can view active team members" 
ON public.team_members FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage team members" ON public.team_members;
CREATE POLICY "Authenticated users can manage team members" 
ON public.team_members FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can manage team members during dev" ON public.team_members;
CREATE POLICY "Anon can manage team members during dev" 
ON public.team_members FOR ALL 
TO anon 
USING (true) 
WITH CHECK (true);

-- 3. CẤU HÌNH STORAGE BUCKET CHO UPLOAD HÌNH ẢNH (law-firm-media)
INSERT INTO storage.buckets (id, name, public)
VALUES ('law-firm-media', 'law-firm-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'law-firm-media');

DROP POLICY IF EXISTS "Allow Upload Media" ON storage.objects;
CREATE POLICY "Allow Upload Media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'law-firm-media');

DROP POLICY IF EXISTS "Allow Update and Delete Media" ON storage.objects;
CREATE POLICY "Allow Update and Delete Media" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'law-firm-media');

DROP POLICY IF EXISTS "Allow Delete Media" ON storage.objects;
CREATE POLICY "Allow Delete Media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'law-firm-media');`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    if (!hasSupabase) {
      setTestResult("❌ Chưa phát hiện biến môi trường NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY trong file .env.local");
      setIsTesting(false);
      return;
    }

    const res = await fetchArticlesFromSupabase();
    setIsTesting(false);

    if (res.error) {
      setTestResult(`❌ Lỗi kết nối Supabase: ${res.error}. Hãy kiểm tra xem bạn đã chạy đoạn SQL khởi tạo bảng chưa.`);
    } else {
      setTestResult(`✅ Kết nối Supabase thành công! Hiện có ${res.articles.length} bài viết trong bảng articles.`);
    }
  };

  const handleSeed = async () => {
    if (!hasSupabase) {
      alert("Vui lòng nạp biến môi trường Supabase trong .env.local trước khi đồng bộ.");
      return;
    }

    if (!confirm("Hệ thống sẽ nạp 40+ bài viết và dữ liệu đội ngũ luật sư lên Supabase. Tiếp tục?")) {
      return;
    }

    setIsSeeding(true);
    setSeedStatus(null);

    const res = await seedInitialDataToSupabase();
    setIsSeeding(false);

    if (res.error) {
      setSeedStatus(`❌ ${res.error}`);
    } else {
      setSeedStatus(`✅ Nạp thành công ${res.articlesCount} bài viết và ${res.membersCount} luật sư lên Supabase!`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-slate-900">
          Cài Đặt Hệ Thống & Hướng Dẫn Supabase
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kết nối Database PostgreSQL và Storage lưu trữ ảnh trên đám mây Supabase
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-[#96794F]" />
          Trạng thái kết nối Supabase hiện tại
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <div
              className={`w-3.5 h-3.5 rounded-full ${
                hasSupabase ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <div>
              <p className="text-sm font-bold text-slate-900">
                {hasSupabase
                  ? "Đã nạp biến môi trường Supabase"
                  : "Chưa nạp biến môi trường trong .env.local"}
              </p>
              <p className="text-xs text-slate-500">
                {hasSupabase
                  ? "Hệ thống sẵn sàng đồng bộ và tải ảnh lên Supabase Storage"
                  : "Đang sử dụng dữ liệu tĩnh mẫu và bộ nhớ trình duyệt"}
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3 py-1.5 bg-[#0F1E36] hover:bg-[#162a4d] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
              Kiểm tra kết nối
            </button>

            {hasSupabase && (
              <button
                type="button"
                onClick={handleSeed}
                disabled={isSeeding}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <FileCheck2 className={`w-3.5 h-3.5 ${isSeeding ? "animate-spin" : ""}`} />
                Nạp dữ liệu mẫu
              </button>
            )}
          </div>
        </div>

        {testResult && (
          <div className="mt-3 p-3 bg-slate-100 rounded-lg text-xs font-medium text-slate-800">
            {testResult}
          </div>
        )}

        {seedStatus && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800">
            {seedStatus}
          </div>
        )}
      </div>

      {/* Step by step guide */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#96794F]" />
          3 Bước Kết Nối Supabase Miễn Phí (Mất 2 Phút)
        </h2>

        {/* Step 1 */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#96794F]/10 text-[#96794F] font-bold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900">
              Tạo Project mới trên Supabase
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Truy cập{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#96794F] font-bold underline inline-flex items-center gap-1"
              >
                supabase.com <ExternalLink className="w-3 h-3" />
              </a>{" "}
              (đăng nhập bằng tài khoản Github hoặc Google), bấm <strong>&quot;New project&quot;</strong>, đặt tên (ví dụ: <code>luat-hai-minh-quan</code>), chọn khu vực Singapore (gần Việt Nam nhất).
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#96794F]/10 text-[#96794F] font-bold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900">
              Lấy API URL và Anon Key dán vào file <code>.env.local</code>
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Trong dashboard Supabase, vào mục <strong>Project Settings -&gt; API</strong> (hoặc Data API), copy:
            </p>
            <div className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono">
              <div>NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh......</div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-[#96794F]/10 text-[#96794F] font-bold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900">
              Chạy mã SQL khởi tạo Bảng &amp; Bucket Storage
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Vào mục <strong>SQL Editor</strong> trên Supabase, bấm <strong>New Query</strong>, dán toàn bộ đoạn mã bên dưới và bấm nút <strong>Run</strong>:
            </p>

            <div className="mt-3 relative">
              <button
                type="button"
                onClick={copySql}
                className="absolute top-3 right-3 px-3 py-1.5 bg-[#96794F] hover:bg-[#7d633e] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Đã sao chép!" : "Sao chép mã SQL"}
              </button>

              <pre className="p-4 pt-12 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto max-h-80 leading-relaxed">
                {sqlScript}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
