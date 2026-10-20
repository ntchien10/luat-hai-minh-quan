"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { allNavigationServices } from "@/data/mockData";
import { submitContactForm } from "@/lib/contact";

export const ContactFormBlock: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Tố tụng dân sự",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitContactForm({
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      source: "Trang Liên hệ (/lien-he)",
    });
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.message || "Không thể gửi yêu cầu lúc này. Vui lòng liên hệ Hotline trực tiếp.");
    }
  };

  return (
    <div className="lg:col-span-6 border border-slate-200/90 p-8 sm:p-10 bg-white shadow-sm">
      <h2 className="font-serif text-2xl font-bold text-[#1A1816] mb-2">
        Gửi Thông Tin Yêu Cầu Tư Vấn
      </h2>
      <div className="h-gap mb-6">
        <span>
          <i /> <i /> <i /> <i />
        </span>
      </div>

      {submitted ? (
        <div className="p-8 bg-[#FAF6F0] border border-[#96794F]/30 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-[#96794F] mx-auto" />
          <h3 className="font-serif text-xl font-bold text-[#1A1816]">
            Gửi yêu cầu thành công!
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Cảm ơn Quý khách. Đội ngũ Luật sư của Hải Minh Quân sẽ liên hệ lại trực tiếp qua số điện thoại <strong>{formData.phone}</strong> trong thời gian sớm nhất.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] text-xs font-bold uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Gửi yêu cầu khác
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Họ và tên *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#96794F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Số điện thoại *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="09xx xxx xxx"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#96794F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#96794F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Lĩnh vực quan tâm
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#96794F]"
            >
              {allNavigationServices.map((svc, idx) => (
                <option key={idx} value={svc.title}>
                  {svc.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Nội dung tóm tắt vụ việc *
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Mô tả tóm tắt tình huống pháp lý cần hỗ trợ..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#96794F]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-lg transform hover:-translate-y-0.5"
          >
            {submitting ? (
              <span>Đang gửi thông tin...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Gửi Thông Tin Yêu Cầu Tư Vấn</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
