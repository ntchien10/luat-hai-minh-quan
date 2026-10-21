"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { uploadImageToSupabase, isSupabaseConfigured } from "@/lib/supabase";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: "articles" | "team";
  label?: string;
  description?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder = "articles",
  label = "Hình ảnh đại diện",
  description = "Hỗ trợ định dạng JPG, PNG, WEBP tối đa 5MB",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, WEBP...)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Dung lượng file vượt quá giới hạn 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    // Kiểm tra Supabase
    if (!isSupabaseConfigured()) {
      // Nếu chưa cấu hình Supabase, hỗ trợ fallback đọc ảnh dạng Base64 Data URL để người dùng vẫn preview và lưu được ngay!
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        setUploadError("Không thể đọc file trên trình duyệt");
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      return;
    }

    // Upload lên Supabase Storage
    const result = await uploadImageToSupabase(file, folder);
    setIsUploading(false);

    if (result.error || !result.url) {
      setUploadError(result.error || "Lỗi khi upload ảnh lên Supabase");
    } else {
      onChange(result.url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setCustomUrl("");
      setShowUrlInput(false);
      setUploadError(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#96794F] hover:text-[#7d633e] font-medium flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? "Tải file từ máy tính" : "Nhập link ảnh trực tiếp"}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            placeholder="Dán đường dẫn ảnh: https://... hoặc /images/..."
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:border-[#96794F]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2 bg-[#0F1E36] text-white text-xs font-semibold rounded hover:bg-[#162a4d] transition-colors"
          >
            Áp dụng
          </button>
        </div>
      ) : (
        <div>
          {value ? (
            <div className="relative border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center gap-4">
              <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                <Image
                  src={value}
                  alt="Ảnh đã chọn"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Đã tải ảnh thành công
                </div>
                <p className="text-xs text-slate-500 truncate" title={value}>
                  {value}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-medium text-[#0F1E36] hover:underline"
                  >
                    Thay đổi ảnh
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-white transition-colors"
                title="Xóa ảnh"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-[#96794F] bg-[#96794F]/5"
                  : "border-slate-300 hover:border-[#96794F]/60 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center py-3">
                  <Loader2 className="w-8 h-8 text-[#96794F] animate-spin mb-2" />
                  <p className="text-sm font-medium text-slate-700">
                    Đang tải ảnh lên...
                  </p>
                  <p className="text-xs text-slate-400">
                    Vui lòng chờ trong giây lát
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
                    <UploadCloud className="w-6 h-6 text-[#96794F]" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    <span className="text-[#96794F] hover:underline">
                      Bấm để chọn ảnh
                    </span>{" "}
                    hoặc kéo thả ảnh vào đây
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{description}</p>
                </div>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-500 mt-1.5 font-medium">{uploadError}</p>
      )}
    </div>
  );
}
