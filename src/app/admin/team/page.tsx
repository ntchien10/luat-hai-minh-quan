"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Loader2,
  User,
  Shield,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  fetchTeamMembers,
  saveTeamMember,
  deleteTeamMember,
  toggleTeamMemberActive,
  DbTeamMember,
} from "@/lib/api";
import { allTeamMembersArchive } from "@/data/mockData";
import { ImageUploader } from "@/components/admin/ImageUploader";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/^ls\.?\s*/i, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TeamAdminPage() {
  const [members, setMembers] = useState<DbTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<DbTeamMember>({
    id: "",
    slug: "",
    name: "",
    role: "",
    image_url: "/images/attorneys/do-thi-thanh-hai.jpg",
    link: "",
    phone: "0967 932 555",
    email: "luathaiminhquan@gmail.com",
    card_no: "",
    qualifications: [],
    experience: [],
    expertise: [],
    bio: "",
    is_active: true,
  });

  // Helpers for multiline array inputs
  const [qualificationsText, setQualificationsText] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [expertiseText, setExpertiseText] = useState("");

  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    const res = await fetchTeamMembers();
    if (res.members && res.members.length > 0) {
      setMembers(res.members);
    } else {
      const fallback: DbTeamMember[] = allTeamMembersArchive.map((m, idx) => ({
        id: m.id,
        slug: m.link.replace("/thanh-vien/", "").replace(/\/$/, ""),
        name: m.name,
        role: m.role,
        image_url: m.imageUrl,
        link: m.link,
        phone: m.phone || "0967 932 555",
        email: m.email || "luathaiminhquan@gmail.com",
        card_no: m.cardNo || "",
        qualifications: m.qualifications || [],
        experience: m.experience || [],
        expertise: m.expertise || [],
        bio: m.bio || "",
        is_active: idx === 0, // Chỉ Ls. Đỗ Thị Thanh Hải active mặc định
        order_index: idx,
      }));

      setMembers(fallback);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const openCreateModal = () => {
    setIsEditing(false);
    setModalError(null);
    setFormData({
      id: `member-${Date.now()}`,
      slug: "",
      name: "",
      role: "Luật sư thành viên",
      image_url: "",
      link: "",
      phone: "0967 932 555",
      email: "luathaiminhquan@gmail.com",
      card_no: "",
      qualifications: [],
      experience: [],
      expertise: [],
      bio: "",
      is_active: true,
    });
    setQualificationsText("");
    setExperienceText("");
    setExpertiseText("");
    setIsModalOpen(true);
  };

  const openEditModal = (mem: DbTeamMember) => {
    setIsEditing(true);
    setModalError(null);
    setFormData({ ...mem });
    setQualificationsText((mem.qualifications || []).join("\n"));
    setExperienceText((mem.experience || []).join("\n"));
    setExpertiseText((mem.expertise || []).join("\n"));
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isEditing ? prev.slug : slugify(val),
      link: isEditing ? prev.link : `/thanh-vien/${slugify(val)}/`,
    }));
  };

  const handleToggleActive = async (member: DbTeamMember) => {
    const newStatus = !member.is_active;

    const res = await toggleTeamMemberActive(member.id, newStatus);
    if (!res.success) {
      alert(`Lỗi: ${res.error || "Không thể cập nhật trạng thái"}`);
      return;
    }

    await loadMembers();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setModalError("Vui lòng nhập họ và tên Luật sư / Thành viên.");
      return;
    }
    if (!formData.role.trim()) {
      setModalError("Vui lòng nhập chức danh / vai trò.");
      return;
    }
    if (!formData.image_url) {
      setModalError("Vui lòng tải lên ảnh chân dung thành viên.");
      return;
    }

    const finalSlug = formData.slug || slugify(formData.name);
    const finalPayload: DbTeamMember = {
      ...formData,
      slug: finalSlug,
      link: `/thanh-vien/${finalSlug}/`,
      qualifications: qualificationsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      experience: experienceText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      expertise: expertiseText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    setIsSaving(true);
    setModalError(null);

    const res = await saveTeamMember(finalPayload);
    if (!res.success) {
      setModalError(res.error || "Lỗi khi lưu dữ liệu lên Database.");
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setIsModalOpen(false);
    await loadMembers();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa thành viên "${name}" không?`)) {
      return;
    }

    const res = await deleteTeamMember(id);
    if (!res.success) {
      alert(`Lỗi: ${res.error || "Không thể xóa thành viên"}`);
      return;
    }

    await loadMembers();
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Quản Lý Đội Ngũ Luật Sư & Thành Viên
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bật/Tắt hiển thị từng luật sư hoặc thêm hồ sơ nhân sự mới
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#96794F] hover:bg-[#7d633e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Thêm thành viên mới
        </button>
      </div>

      {/* Tip Banner for Active Toggle */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Gợi ý:</strong> Bạn có thể bấm nút gạt trạng thái để ẩn/hiện
            luật sư trên trang chủ và trang thành viên chỉ trong 1 giây mà không
            cần xóa dữ liệu!
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên luật sư, chức danh..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
          />
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="w-8 h-8 text-[#96794F] animate-spin mx-auto mb-2" />
            <p className="text-xs">Đang tải danh sách thành viên...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">
              Không tìm thấy thành viên nào
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[960px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 min-w-[280px]">Luật sư / Thành viên</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[160px]">Chức danh</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[180px]">Số thẻ / Liên hệ</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap min-w-[150px]">Hiển thị ngoài web</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap min-w-[120px] pr-6">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          <Image
                            src={member.image_url}
                            alt={member.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-slate-900 text-sm whitespace-nowrap">
                            {member.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono truncate block">
                            {member.link}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-medium text-slate-800">
                        {member.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-0.5 text-slate-600">
                        {member.card_no && (
                          <div className="text-[11px] font-mono text-[#96794F] font-semibold">
                            Thẻ LS: {member.card_no}
                          </div>
                        )}
                        <div className="text-[11px]">{member.phone}</div>
                      </div>
                    </td>

                    {/* Toggle Active Switch */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(member)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          member.is_active
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        title="Bấm để bật hoặc tắt hiển thị"
                      >
                        {member.is_active ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-emerald-600" />
                            Đang hiển thị
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-slate-400" />
                            Đang ẩn
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={member.link}
                          target="_blank"
                          title="Xem trang cá nhân"
                          className="p-1.5 text-slate-400 hover:text-[#96794F] hover:bg-slate-100 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(member)}
                          title="Chỉnh sửa"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(member.id, member.name)}
                          title="Xóa"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit Member */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-[#0F1E36] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">
                  {isEditing ? "Chỉnh Sửa Hồ Sơ Luật Sư" : "Thêm Thành Viên Mới"}
                </h3>
                <p className="text-xs text-[#E5B869]">
                  Quản lý thông tin đội ngũ Luật Hải Minh Quân
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="VD: Ls. Đỗ Thị Thanh Hải"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Chức vụ / Vai trò *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, role: e.target.value }))
                    }
                    placeholder="VD: Giám đốc - Luật sư điều hành"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>
              </div>

              {/* Card No, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Số thẻ Luật sư
                  </label>
                  <input
                    type="text"
                    value={formData.card_no}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, card_no: e.target.value }))
                    }
                    placeholder="18239/LS"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="0967 932 555"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="luathaiminhquan@gmail.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>
              </div>

              {/* Image Uploader */}
              <div className="pt-2">
                <ImageUploader
                  value={formData.image_url}
                  onChange={(url) =>
                    setFormData((prev) => ({ ...prev, image_url: url }))
                  }
                  folder="team"
                  label="Ảnh chân dung Luật sư (Lưu trữ trực tiếp trên Hosting /uploads/) *"
                  description="Ảnh chân dung tỷ lệ 3:4 hoặc vuông, chân thực và sắc nét"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tiểu sử / Giới thiệu tóm tắt
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Giới thiệu kinh nghiệm và quá trình công tác..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                />
              </div>

              {/* Qualifications & Expertise & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Bằng cấp (Mỗi dòng 1 mục)
                  </label>
                  <textarea
                    rows={4}
                    value={qualificationsText}
                    onChange={(e) => setQualificationsText(e.target.value)}
                    placeholder="Cử nhân Luật - ĐH Luật Hà Nội&#10;Thẻ Luật sư Đoàn LS TP Hà Nội"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Lĩnh vực chuyên sâu (Mỗi dòng 1 mục)
                  </label>
                  <textarea
                    rows={4}
                    value={expertiseText}
                    onChange={(e) => setExpertiseText(e.target.value)}
                    placeholder="Tố tụng Dân sự & Hình sự&#10;Tranh chấp Đất đai&#10;Tư vấn Doanh nghiệp"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Kinh nghiệm (Mỗi dòng 1 mục)
                  </label>
                  <textarea
                    rows={4}
                    value={experienceText}
                    onChange={(e) => setExperienceText(e.target.value)}
                    placeholder="Trên 15 năm kinh nghiệm tranh tụng&#10;Bảo vệ quyền lợi hơn 500 khách hàng"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>
              </div>

              {/* Active checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active_toggle"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_active: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-[#96794F] rounded border-slate-300 focus:ring-[#96794F]"
                />
                <label
                  htmlFor="is_active_toggle"
                  className="text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  Hiển thị ra ngoài trang chủ & trang thành viên website
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#0F1E36] hover:bg-[#162a4d] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isEditing ? "Cập nhật thành viên" : "Lưu thành viên"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
