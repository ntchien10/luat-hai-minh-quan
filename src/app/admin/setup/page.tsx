"use client";

import React, { useState, useEffect } from "react";
import {
  Server,
  Database,
  FolderArchive,
  RefreshCw,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  DownloadCloud,
} from "lucide-react";
import { reseedDatabase, getSystemStatus } from "@/lib/api";

export default function SetupAdminPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [systemInfo, setSystemInfo] = useState<{
    database?: string;
    articles_count?: number;
    team_count?: number;
    uploads_writable?: boolean;
    online?: boolean;
  }>({});

  const checkStatus = async () => {
    setIsChecking(true);
    const res = await getSystemStatus();
    setIsChecking(false);
    if (res.success) {
      setSystemInfo({
        database: res.database,
        articles_count: res.articles_count,
        team_count: res.team_count,
        uploads_writable: res.uploads_writable,
        online: true,
      });
    } else {
      setSystemInfo({ online: false });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleSeed = async () => {
    if (
      !confirm(
        "Thao tác này sẽ nạp lại toàn bộ 50 bài viết mẫu và 6 luật sư vào file Database SQLite trên host. Bạn có muốn tiếp tục?"
      )
    ) {
      return;
    }

    setIsSeeding(true);
    setSeedStatus(null);

    const res = await reseedDatabase();
    setIsSeeding(false);

    if (res.error) {
      setSeedStatus(`❌ Lỗi: ${res.error}`);
    } else {
      setSeedStatus(
        `✅ Thành công! Đã nạp ${res.articles_count ?? 50} bài viết và ${res.team_count ?? 6} thành viên vào Database.`
      );
      checkStatus();
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#96794F] mb-1">
            <Server className="w-4 h-4" />
            Hệ Thống Lưu Trữ Nội Bộ Trực Tiếp Trên Hosting
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Cài Đặt, Cơ Sở Dữ Liệu &amp; Sao Lưu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Giải pháp 100% Miễn Phí trọn đời • Không phụ thuộc Supabase • Chạy độc lập trên PHP &amp; SQLite
          </p>
        </div>

        <button
          type="button"
          onClick={checkStatus}
          disabled={isChecking}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? "animate-spin" : ""}`} />
          {isChecking ? "Đang kiểm tra..." : "Kiểm tra kết nối"}
        </button>
      </div>

      {/* Highlights / Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Miễn Phí Trọn Đời
          </div>
          <p className="text-xs text-emerald-700 leading-relaxed">
            Không tốn bất kỳ chi phí nào cho dịch vụ cloud bên ngoài. Không cần thẻ visa và không bao giờ lo hết hạn gói dịch vụ.
          </p>
        </div>

        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 font-bold text-sm text-blue-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Không Bị Ngủ (No Sleep)
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            Khác với gói free của Supabase (tự động ngủ sau 7 ngày không ai truy cập), SQLite nằm trực tiếp trên host và luôn luôn hoạt động 24/7.
          </p>
        </div>

        <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-2 font-bold text-sm text-purple-900 mb-1">
            <DownloadCloud className="w-4 h-4 text-purple-600" />
            Tái Sử Dụng Không Giới Hạn
          </div>
          <p className="text-xs text-purple-700 leading-relaxed">
            Bạn có thể đóng gói toàn bộ bộ mã nguồn này và bàn giao cho bao nhiêu khách hàng khác tùy thích mà không sợ bị giới hạn quota dự án.
          </p>
        </div>
      </div>

      {/* System Status Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-900">
              Trạng Thái Tài Nguyên Trên Máy Chủ
            </h2>
            <p className="text-xs text-slate-500">
              Kiểm tra tình trạng tệp cơ sở dữ liệu và thư mục tải ảnh
            </p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Cơ sở dữ liệu
              </span>
              <span className="text-sm font-bold text-slate-800 block mt-1">
                SQLite 3 (PDO)
              </span>
              <span className="text-xs text-slate-400 block mt-0.5 font-mono truncate">
                {systemInfo.database || "api/database.sqlite"}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Thư mục tải ảnh
              </span>
              <span className="text-sm font-bold text-slate-800 block mt-1">
                public_html/uploads/
              </span>
              <span className="text-xs text-emerald-600 font-medium block mt-0.5">
                {systemInfo.uploads_writable !== false ? "Quyền ghi hợp lệ (755)" : "Cần cấp quyền 755"}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Bài viết hiện có
              </span>
              <span className="text-sm font-bold text-slate-800 block mt-1">
                {systemInfo.articles_count !== undefined ? `${systemInfo.articles_count} bài` : "50 bài mẫu"}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Đầy đủ slug, ảnh &amp; danh mục
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Đội ngũ thành viên
              </span>
              <span className="text-sm font-bold text-slate-800 block mt-1">
                {systemInfo.team_count !== undefined ? `${systemInfo.team_count} nhân sự` : "6 nhân sự"}
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                Luật sư sáng lập &amp; cộng sự
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1-Click Restore / Seed Database */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#96794F]" />
              Khởi Tạo / Khôi Phục Dữ Liệu Gốc (1-Click)
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Nếu bạn vừa triển khai web lên hosting mới hoặc lỡ xóa nhầm bài viết, hãy bấm nút bên cạnh để hệ thống tự động nạp lại toàn bộ 50 bài viết tư vấn pháp luật chuẩn xác và 6 luật sư thành viên.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSeed}
            disabled={isSeeding}
            className="px-5 py-2.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isSeeding ? "animate-spin" : ""}`} />
            {isSeeding ? "Đang xử lý..." : "Khởi tạo dữ liệu gốc ngay"}
          </button>
        </div>

        {seedStatus && (
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800">
            {seedStatus}
          </div>
        )}
      </div>

      {/* Backup Guide */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
          <FolderArchive className="w-5 h-5 text-[#96794F]" />
          Hướng Dẫn Sao Lưu (Backup) &amp; Phục Hồi Dữ Liệu Siêu Nhanh
        </h2>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Khác với các hệ thống phức tạp dùng MySQL hay PostgreSQL phải xuất tệp SQL lằng nhằng, toàn bộ dữ liệu của bạn nằm gọn trong đúng 1 tệp và 1 thư mục trên DirectAdmin Hosting:
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#0F1E36] text-white flex items-center justify-center text-xs font-bold shrink-0">
              1
            </span>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong>Tệp Cơ Sở Dữ Liệu:</strong> <code>public_html/api/database.sqlite</code>
              <p className="text-slate-500 mt-0.5">
                Chứa toàn bộ bài viết, nội dung bài viết, danh mục, tài khoản admin và danh sách luật sư. Chỉ cần tải tệp này về máy tính là bạn đã sao lưu 100% dữ liệu văn bản.
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#0F1E36] text-white flex items-center justify-center text-xs font-bold shrink-0">
              2
            </span>
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong>Thư Mục Hình Ảnh:</strong> <code>public_html/uploads/</code>
              <p className="text-slate-500 mt-0.5">
                Chứa tất cả ảnh bài viết và ảnh đại diện luật sư mà bạn tải lên qua trang quản trị. Để sao lưu ảnh, chỉ cần nén (zip) thư mục này lại và tải về.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Password Changing */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
          <KeyRound className="w-5 h-5 text-[#96794F]" />
          Đổi Mật Khẩu Quản Trị Viên
        </h2>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">
          Tài khoản quản trị mặc định:
        </p>
        <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs space-y-1 mb-4">
          <div>Tài khoản : <span className="text-[#E5B869]">admin</span></div>
          <div>Mật khẩu  : <span className="text-[#E5B869]">admin@123</span></div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Để đổi mật khẩu, bạn chỉ cần mở file <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">public/api/index.php</code> (hoặc trực tiếp trong trình File Manager của DirectAdmin tại <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">public_html/api/index.php</code>), tìm dòng:
        </p>
        <div className="mt-2 p-3 bg-slate-100 border border-slate-200 rounded font-mono text-xs text-slate-800">
          $ADMIN_PASS = &apos;admin@123&apos;; // Thay đổi mật khẩu mới của bạn ở đây
        </div>
      </div>
    </div>
  );
}
