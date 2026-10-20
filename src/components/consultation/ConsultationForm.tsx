"use client";

import React, { useState } from "react";
import { PhoneCall, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { firmInfo, practiceServices } from "@/data/mockData";
import { submitContactForm } from "@/lib/contact";

export const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    serviceCategory: "Luật doanh nghiệp",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.description.trim()) newErrors.description = "Vui lòng mô tả yêu cầu pháp lý";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const result = await submitContactForm({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.serviceCategory,
      message: formData.description,
      source: "Khối Form Tư Vấn (Consultation Section)",
    });
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        serviceCategory: "Luật doanh nghiệp",
        description: "",
      });
    } else {
      alert(result.message || "Không thể gửi yêu cầu lúc này. Vui lòng gọi trực tiếp hotline.");
    }
  };

  return (
    <section id="tu-van" className="py-20 bg-[#1A1714] text-white border-t border-white/10">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-snug">
              Liên Hệ Chúng Tôi Để Được Tư Vấn Nhanh Chóng
            </h2>
            <p className="text-slate-300 text-[14px] leading-relaxed">
              Quý khách vui lòng để lại thông tin hoặc liên hệ trực tiếp qua số hotline.
              Đội ngũ Luật sư của chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>

            <div className="p-5 rounded-sm bg-[#1A1714] border border-[#DFBA73]/40 space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#DFBA73]">
                Hotline trực tuyến 24/7
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#96794F] flex items-center justify-center text-white">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-serif text-lg sm:text-xl font-bold text-white">
                  <a
                    href={`tel:${firmInfo.phoneRaw}`}
                    className="hover:text-[#DFBA73] transition-colors"
                  >
                    {firmInfo.hotline}
                  </a>
                  <span className="text-[#DFBA73]">-</span>
                  <a
                    href={`tel:${firmInfo.secondaryPhoneRaw}`}
                    className="hover:text-[#DFBA73] transition-colors"
                  >
                    {firmInfo.secondaryPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-sm bg-[#26211C] border border-white/10 shadow-xl">
              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">Gửi Thông Tin Thành Công</h3>
                  <p className="text-xs text-slate-300">
                    Cảm ơn Quý khách. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-3 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 text-[#14130F] font-bold text-xs uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-white border-b border-white/10 pb-3">
                    Đăng Ký Tư Vấn Pháp Lý
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        placeholder="Họ và tên của bạn"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1714] border border-white/20 text-white text-xs focus:outline-none focus:border-[#DFBA73]"
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        placeholder="Số điện thoại liên hệ"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1714] border border-white/20 text-white text-xs focus:outline-none focus:border-[#DFBA73]"
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Dịch vụ cần tư vấn
                    </label>
                    <select
                      value={formData.serviceCategory}
                      onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1714] border border-white/20 text-white text-xs focus:outline-none focus:border-[#DFBA73]"
                    >
                      {practiceServices.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nội dung tóm tắt *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mô tả sơ bộ vụ việc hoặc câu hỏi pháp lý..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-sm bg-[#1A1714] border border-white/20 text-white text-xs focus:outline-none focus:border-[#DFBA73] resize-none"
                    />
                    {errors.description && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-[0.98] text-[#14130F] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg transform hover:-translate-y-0.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi yêu cầu tư vấn</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
