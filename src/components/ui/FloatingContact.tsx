"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  ArrowUp,
  MessageSquareText,
  X,
  CheckCircle2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { firmInfo, allNavigationServices } from "@/data/mockData";
import { submitContactForm } from "@/lib/contact";

export const FloatingContact: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "Tố tụng dân sự",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dialog on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDialogOpen(false);
      }
    };
    if (isDialogOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isDialogOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert("Vui lòng nhập Họ và tên cùng Số điện thoại của bạn.");
      return;
    }
    setIsSubmitting(true);
    const result = await submitContactForm({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      source: "Hộp thoại tư vấn nổi (Floating Dialog)",
    });
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      alert(result.message || "Không thể gửi yêu cầu lúc này. Vui lòng liên hệ Hotline trực tiếp.");
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      service: "Tố tụng dân sự",
      message: "",
    });
    setIsSubmitted(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* ════════ FLOATING BOTTOM-RIGHT ACTION BUTTONS STACK ════════ */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3">
        {/* 1. Nút Gửi Thông Tin Yêu Cầu Tư Vấn (Icon ban đầu, bấm vào mở Dialog) */}
        <button
          onClick={() => {
            setIsSubmitted(false);
            setIsDialogOpen(true);
          }}
          className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F26] hover:scale-110 text-white shadow-[0_4px_16px_rgba(212,175,55,0.5)] flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="Gửi thông tin yêu cầu tư vấn"
        >
          <MessageSquareText className="w-5 h-5 text-white" />
          {/* Subtle Ping Radar Animation */}
          <span className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-35 animate-ping pointer-events-none" />
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded bg-[#1A1816] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Gửi Yêu Cầu Tư Vấn
          </span>
        </button>

        {/* 2. Nút Chat Zalo */}
        <a
          href={`https://zalo.me/${firmInfo.phoneRaw}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0068FF] hover:bg-[#0052cc] hover:scale-110 text-white shadow-[0_4px_14px_rgba(0,104,255,0.45)] flex items-center justify-center transition-all duration-300"
          aria-label="Chat Zalo với Luật sư"
        >
          <span className="font-bold text-[13px] sm:text-[13.5px] tracking-tight leading-none text-white select-none">
            Zalo
          </span>
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded bg-[#1A1816] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat Zalo: {firmInfo.phone}
          </span>
        </a>

        {/* 3. Nút Gọi Điện Thoại Hotline */}
        <a
          href={`tel:${firmInfo.phoneRaw}`}
          className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#DFBA73] to-[#96794F] hover:scale-110 text-white shadow-[0_4px_16px_rgba(150,121,79,0.5)] flex items-center justify-center transition-all duration-300"
          aria-label="Gọi hotline tư vấn"
        >
          <Phone className="w-5 h-5 animate-pulse text-white" />
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded bg-[#1A1816] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Hotline: {firmInfo.phone}
          </span>
        </a>

        {/* 4. Nút Về Đầu Trang (Xuất hiện khi cuộn > 300px) */}
        {showTop && (
          <button
            onClick={scrollToTop}
            className="relative group w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#96794F] hover:bg-[#82673E] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            aria-label="Về đầu trang"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#1A1816] text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
              Đầu trang
            </span>
          </button>
        )}
      </div>

      {/* ════════ DIALOG MODAL: GỬI THÔNG TIN YÊU CẦU TƯ VẤN ════════ */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsDialogOpen(false)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Warm Espresso Gold gradient */}
            <div className="bg-gradient-to-r from-[#26211C] via-[#382E26] to-[#96794F] p-5 sm:p-6 text-white relative shrink-0">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#D4AF37] tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Bảo mật thông tin 100%</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                Gửi Thông Tin Yêu Cầu Tư Vấn
              </h3>
              <p className="text-slate-200 text-xs sm:text-[13px] mt-1 leading-relaxed">
                Đội ngũ Luật sư {firmInfo.name} sẽ tiếp nhận và liên hệ tư vấn trực tiếp cho bạn sớm nhất.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#1A1816]">
                    Gửi Yêu Cầu Thành Công!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                    Cảm ơn <strong>{formData.fullName}</strong>. Yêu cầu tư vấn của bạn đã được chuyển tới Luật sư chuyên trách. Chúng tôi sẽ liên hệ lại qua số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Hoàn tất
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3.5 py-2.5 rounded-none border border-slate-300 text-sm focus:outline-none focus:border-[#96794F] text-[#1A1816]"
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="0912 345 678"
                        className="w-full px-3.5 py-2.5 rounded-none border border-slate-300 text-sm focus:outline-none focus:border-[#96794F] text-[#1A1816]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="example@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-none border border-slate-300 text-sm focus:outline-none focus:border-[#96794F] text-[#1A1816]"
                      />
                    </div>

                    {/* Dịch vụ cần tư vấn */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Lĩnh vực cần tư vấn
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-none border border-slate-300 text-sm focus:outline-none focus:border-[#96794F] text-[#1A1816] bg-white"
                      >
                        {allNavigationServices.map((svc, idx) => (
                          <option key={idx} value={svc.title}>
                            {svc.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Nội dung yêu cầu */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nội dung vụ việc / Câu hỏi pháp lý
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Mô tả tóm tắt sự việc hoặc câu hỏi pháp lý bạn cần Luật sư hỗ trợ giải đáp..."
                      className="w-full px-3.5 py-2.5 rounded-none border border-slate-300 text-sm focus:outline-none focus:border-[#96794F] text-[#1A1816] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Đang gửi thông tin...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Gửi Yêu Cầu Tư Vấn Ngay</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hotline direct */}
                  <div className="pt-3 text-center border-t border-slate-100 text-xs text-slate-500">
                    Cần hỗ trợ gấp? Gọi Hotline 24/7:{" "}
                    <a
                      href={`tel:${firmInfo.phoneRaw}`}
                      className="text-[#96794F] font-bold hover:underline"
                    >
                      {firmInfo.hotline}
                    </a>
                    {" - "}
                    <a
                      href={`tel:${firmInfo.secondaryPhoneRaw}`}
                      className="text-[#96794F] font-bold hover:underline"
                    >
                      {firmInfo.secondaryPhone}
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
