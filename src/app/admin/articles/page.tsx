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
  CheckCircle,
  X,
  Loader2,
  AlertCircle,
  FileText,
} from "lucide-react";
import {
  fetchArticles,
  saveArticle,
  deleteArticle,
  DbArticle,
} from "@/lib/api";
import { allArticlesData } from "@/data/articlesData";
import { practiceServices } from "@/data/mockData";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ArticlesAdminPage() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<DbArticle>({
    id: "",
    slug: "",
    title: "",
    service_slug: "luat-dan-su",
    category: "Luật dân sự",
    date: "21 Tháng 10, 2026",
    author: "Ls. Đỗ Thị Thanh Hải",
    image_url: "/images/blog/phan-chia-di-san-theo-di-chuc.jpg",
    excerpt: "",
    content: "",
    is_published: true,
  });

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    const res = await fetchArticles();
    if (res.articles && res.articles.length > 0) {
      setArticles(res.articles);
    } else {
      const fallback: DbArticle[] = allArticlesData.map((a) => ({
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
      setArticles(fallback);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const openCreateModal = () => {
    setIsEditing(false);
    setModalError(null);
    const today = new Date();
    const dateFormatted = `${today.getDate()} Tháng ${today.getMonth() + 1}, ${today.getFullYear()}`;
    setFormData({
      id: `article-${Date.now()}`,
      slug: "",
      title: "",
      service_slug: "luat-dan-su",
      category: "Luật dân sự",
      date: dateFormatted,
      author: "Ls. Đỗ Thị Thanh Hải",
      image_url: "",
      excerpt: "",
      content: "",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (art: DbArticle) => {
    setIsEditing(true);
    setModalError(null);
    setFormData({ ...art });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: isEditing ? prev.slug : slugify(val),
    }));
  };

  const handleServiceChange = (serviceSlug: string) => {
    const s = practiceServices.find((p) => p.slug === serviceSlug);
    setFormData((prev) => ({
      ...prev,
      service_slug: serviceSlug,
      category: s ? s.title : prev.category,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }
    if (!formData.slug.trim()) {
      setModalError("Vui lòng nhập đường dẫn URL (slug).");
      return;
    }
    if (!formData.image_url) {
      setModalError("Vui lòng tải lên ảnh đại diện cho bài viết.");
      return;
    }

    setIsSaving(true);
    setModalError(null);

    const res = await saveArticle(formData);
    if (!res.success) {
      setModalError(res.error || "Lỗi khi lưu bài viết vào Database.");
      setIsSaving(false);
      return;
    }

    setIsSaving(false);
    setIsModalOpen(false);
    await loadArticles();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" không?`)) {
      return;
    }

    const res = await deleteArticle(id);
    if (!res.success) {
      alert(`Lỗi: ${res.error || "Không thể xóa bài viết"}`);
      return;
    }

    await loadArticles();
  };

  // Filtered list
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      a.service_slug === categoryFilter ||
      a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Quản Lý Bài Viết
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng: <strong>{articles.length}</strong> bài viết pháp luật
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#96794F] hover:bg-[#7d633e] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          Thêm bài viết mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tiêu đề, tác giả..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* <Filter className="w-4 h-4 text-slate-500 shrink-0" /> */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-64 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F] bg-white"
          >
            <option value="all">Tất cả chuyên mục pháp lý</option>
            {practiceServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table / List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="w-8 h-8 text-[#96794F] animate-spin mx-auto mb-2" />
            <p className="text-xs">Đang tải danh sách bài viết...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">
              Không tìm thấy bài viết nào
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Thử tìm kiếm với từ khóa khác hoặc bấm &quot;Thêm bài viết mới&quot;.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3">Bài viết</th>
                  <th className="py-2.5 px-2 w-[115px] whitespace-nowrap">Lĩnh vực</th>
                  <th className="py-2.5 px-2 w-[105px] whitespace-nowrap">Tác giả</th>
                  <th className="py-2.5 px-2 w-[95px] whitespace-nowrap">Ngày đăng</th>
                  <th className="py-2.5 px-2 text-center w-[85px] whitespace-nowrap">Trạng thái</th>
                  <th className="py-2.5 px-3 text-right w-[80px] whitespace-nowrap pr-3">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-xs">
                          <Image
                            src={art.image_url || "/images/blog/phan-chia-di-san-theo-di-chuc.jpg"}
                            alt={art.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-slate-900 truncate text-xs sm:text-sm" title={art.title}>
                            {art.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono truncate block max-w-[200px]">
                            /blog/{art.slug}/
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#96794F]/10 text-[#7d633e] font-semibold text-[10.5px] whitespace-nowrap truncate max-w-[110px]" title={art.category}>
                        {art.category}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 whitespace-nowrap">
                      <span className="font-medium text-slate-800 text-xs truncate max-w-[100px] block" title={art.author}>
                        {art.author}
                      </span>
                    </td>

                    <td className="py-2.5 px-2 text-slate-500 whitespace-nowrap text-[11px]">
                      {art.date}
                    </td>

                    <td className="py-2.5 px-2 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 whitespace-nowrap">
                        <CheckCircle className="w-3 h-3 shrink-0" />
                        Đã đăng
                      </span>
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap pr-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/blog/${art.slug}/`}
                          target="_blank"
                          title="Xem bài viết"
                          className="p-1.5 text-slate-400 hover:text-[#96794F] hover:bg-slate-100 rounded transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(art)}
                          title="Chỉnh sửa"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(art.id, art.title)}
                          title="Xóa"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Modal Add / Edit Article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0F1E36] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">
                  {isEditing ? "Chỉnh Sửa Bài Viết" : "Thêm Bài Viết Mới"}
                </h3>
                <p className="text-xs text-[#E5B869]">
                  Quản lý nội dung cẩm nang pháp luật
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

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Title & Slug */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Tiêu đề bài viết *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="VD: Điều kiện lập di chúc hợp pháp theo Bộ luật Dân sự 2015"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Đường dẫn tĩnh (Slug) *
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-xs text-slate-500 font-mono">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      placeholder="dieu-kien-lap-di-chuc-hop-phap"
                      className="flex-1 px-3 py-2 text-xs font-mono border border-slate-300 rounded-r-lg focus:outline-none focus:border-[#96794F]"
                    />
                  </div>
                </div>
              </div>

              {/* Category, Author, Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Chuyên mục pháp lý
                  </label>
                  <select
                    value={formData.service_slug}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F] bg-white"
                  >
                    {practiceServices.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Luật sư tác giả
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, author: e.target.value }))
                    }
                    placeholder="Ls. Đỗ Thị Thanh Hải"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Ngày đăng
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    placeholder="21 Tháng 10, 2026"
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
                  folder="articles"
                  label="Ảnh bài viết (Lưu trữ trực tiếp trên Hosting /uploads/) *"
                  description="Ảnh tỷ lệ 16:9 hoặc 3:2, dung lượng tối đa 5MB"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Đoạn tóm tắt ngắn (Excerpt / Meta description)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="Tóm tắt ngắn gọn nội dung bài viết từ 1-3 câu để thu hút bạn đọc và tối ưu SEO Google..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-[#96794F]"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nội dung chi tiết bài viết (Giữ nguyên định dạng Word, Docs, In đậm, Danh sách, Tiêu đề)
                  </label>
                </div>
                <RichTextEditor
                  value={formData.content}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, content: val }))
                  }
                  placeholder="Dán nội dung từ Word, Docs hoặc soạn thảo trực tiếp tại đây..."
                />
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
                  {isEditing ? "Cập nhật bài viết" : "Lưu bài viết"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
