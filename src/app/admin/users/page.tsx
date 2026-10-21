"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  UserCog,
  Plus,
  KeyRound,
  Trash2,
  Edit2,
  ShieldCheck,
  ShieldAlert,
  Lock,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Server,
  Database,
} from "lucide-react";
import {
  fetchAdminUsers,
  saveAdminUser,
  deleteAdminUser,
  changeAdminPassword,
  reseedDatabase,
  getSystemStatus,
  AdminUser,
} from "@/lib/api";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>("admin");
  const [currentRole, setCurrentRole] = useState<string>("admin");
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal Thêm / Sửa User
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);
  const [userModalError, setUserModalError] = useState<string | null>(null);
  const [userFormData, setUserFormData] = useState<{
    id: string;
    username: string;
    name: string;
    role: "admin" | "editor";
    password?: string;
  }>({
    id: "",
    username: "",
    name: "",
    role: "editor",
    password: "",
  });

  // Modal Đổi Mật Khẩu
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordModalError, setPasswordModalError] = useState<string | null>(null);
  const [targetPasswordUser, setTargetPasswordUser] = useState<AdminUser | null>(null);
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Trạng thái hệ thống & sao lưu
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [systemInfo, setSystemInfo] = useState<{ database?: string; uploads_writable?: boolean }>({});

  const isAdmin = currentRole === "admin" || currentUser === "admin";

  const loadData = useCallback(async () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("hmq_admin_session") || "admin";
      const role = localStorage.getItem("hmq_admin_role") || (session === "admin" ? "admin" : "editor");
      setCurrentUser(session);
      setCurrentRole(role);
    }

    const [uRes, sRes] = await Promise.all([fetchAdminUsers(), getSystemStatus()]);
    if (uRes.users) {
      setUsers(uRes.users);
    }
    if (sRes.success) {
      setSystemInfo({
        database: sRes.database,
        uploads_writable: sRes.uploads_writable,
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Mở modal tạo tài khoản (Chỉ admin)
  const openCreateUserModal = () => {
    if (!isAdmin) {
      alert("Chỉ tài khoản Quản trị viên (admin) mới có quyền thêm tài khoản mới!");
      return;
    }
    setIsEditingUser(false);
    setUserModalError(null);
    setUserFormData({
      id: `user-${Date.now()}`,
      username: "",
      name: "",
      role: "editor",
      password: "",
    });
    setIsUserModalOpen(true);
  };

  // Mở modal sửa thông tin tài khoản (Chỉ admin)
  const openEditUserModal = (u: AdminUser) => {
    if (!isAdmin && u.username !== currentUser) {
      alert("Chỉ tài khoản Quản trị viên (admin) mới có quyền sửa tài khoản khác!");
      return;
    }
    setIsEditingUser(true);
    setUserModalError(null);
    setUserFormData({
      id: u.id,
      username: u.username,
      name: u.name,
      role: u.role,
      password: "",
    });
    setIsUserModalOpen(true);
  };

  // Lưu tài khoản (Thêm/Sửa)
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormData.username.trim()) {
      setUserModalError("Vui lòng nhập tên đăng nhập.");
      return;
    }
    if (!userFormData.name.trim()) {
      setUserModalError("Vui lòng nhập họ và tên.");
      return;
    }
    if (!isEditingUser && (!userFormData.password || userFormData.password.length < 4)) {
      setUserModalError("Vui lòng nhập mật khẩu (tối thiểu 4 ký tự).");
      return;
    }

    setIsSavingUser(true);
    setUserModalError(null);

    const res = await saveAdminUser(
      {
        id: userFormData.id,
        username: userFormData.username.trim().toLowerCase(),
        name: userFormData.name.trim(),
        role: userFormData.role,
        password: userFormData.password ? userFormData.password.trim() : undefined,
      },
      currentUser
    );

    setIsSavingUser(false);

    if (!res.success) {
      setUserModalError(res.error || "Không thể lưu tài khoản.");
      return;
    }

    setIsUserModalOpen(false);
    setActionMessage({ type: "success", text: res.message || "Đã lưu tài khoản thành công!" });
    setTimeout(() => setActionMessage(null), 4000);
    await loadData();
  };

  // Xóa tài khoản (Chỉ admin)
  const handleDeleteUser = async (u: AdminUser) => {
    if (!isAdmin) {
      alert("Chỉ tài khoản Quản trị viên (admin) mới có quyền xóa tài khoản!");
      return;
    }

    if (u.username === "admin") {
      alert("Tuyệt đối không thể xóa tài khoản Quản trị viên gốc (admin)!");
      return;
    }

    if (u.username === currentUser) {
      alert("Bạn không thể tự xóa tài khoản đang đăng nhập của chính mình!");
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${u.name}" (${u.username}) không?`)) {
      return;
    }

    const res = await deleteAdminUser(u.id, currentUser);
    if (!res.success) {
      alert(`Lỗi: ${res.error || "Không thể xóa tài khoản"}`);
      return;
    }

    setActionMessage({ type: "success", text: `Đã xóa tài khoản ${u.username} thành công!` });
    setTimeout(() => setActionMessage(null), 4000);
    await loadData();
  };

  // Mở modal đổi mật khẩu (TẤT CẢ TÀI KHOẢN ĐỀU CÓ QUYỀN)
  const openChangePasswordModal = (u: AdminUser) => {
    setTargetPasswordUser(u);
    setPasswordModalError(null);
    setPasswordFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsPasswordModalOpen(true);
  };

  // Lưu mật khẩu mới
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPasswordUser) return;

    const isSelf = targetPasswordUser.username === currentUser;

    if (isSelf && !passwordFormData.oldPassword) {
      setPasswordModalError("Vui lòng nhập mật khẩu hiện tại của bạn.");
      return;
    }

    if (!passwordFormData.newPassword || passwordFormData.newPassword.length < 4) {
      setPasswordModalError("Mật khẩu mới phải có tối thiểu 4 ký tự.");
      return;
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordModalError("Xác nhận mật khẩu mới không trùng khớp.");
      return;
    }

    setIsSavingPassword(true);
    setPasswordModalError(null);

    const res = await changeAdminPassword({
      username: targetPasswordUser.username,
      oldPassword: passwordFormData.oldPassword,
      newPassword: passwordFormData.newPassword,
      requesterUsername: currentUser,
    });

    setIsSavingPassword(false);

    if (!res.success) {
      setPasswordModalError(res.error || "Không thể đổi mật khẩu.");
      return;
    }

    setIsPasswordModalOpen(false);
    setActionMessage({
      type: "success",
      text: `Đổi mật khẩu cho tài khoản "${targetPasswordUser.username}" thành công!`,
    });
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Khôi phục dữ liệu mẫu
  const handleSeedData = async () => {
    if (!isAdmin) {
      alert("Chỉ tài khoản Admin mới có quyền khôi phục dữ liệu mẫu!");
      return;
    }
    if (!confirm("Thao tác này sẽ nạp lại toàn bộ 50 bài viết và 6 luật sư gốc vào Database SQLite. Tiếp tục?")) {
      return;
    }
    setIsSeeding(true);
    setSeedResult(null);
    const res = await reseedDatabase();
    setIsSeeding(false);
    if (res.error) {
      setSeedResult(`❌ Lỗi: ${res.error}`);
    } else {
      setSeedResult(`✅ Đã nạp thành công ${res.articles_count ?? 50} bài viết và ${res.team_count ?? 6} thành viên!`);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert toast notification */}
      {actionMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-md transition-all ${
            actionMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#96794F]/10 text-[#96794F]">
              <UserCog className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#96794F]">
              Hệ thống phân quyền CMS
            </span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">
            Quản Lý Tài Khoản Quản Trị
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Chỉ tài khoản <strong>Admin</strong> mới có quyền thêm và xóa tài khoản.{" "}
            <strong>Tất cả tài khoản</strong> đều có thể tự đổi mật khẩu của mình.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Role status badge */}
          <div
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border ${
              isAdmin
                ? "bg-amber-50 text-[#8c6f45] border-amber-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-4 h-4 text-[#96794F]" />
                <span>Quyền Quản Trị Viên (Admin)</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Quyền Biên Tập Viên (Editor)</span>
              </>
            )}
          </div>

          {/* Add user button (Admin only) */}
          {isAdmin ? (
            <button
              type="button"
              onClick={openCreateUserModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] hover:brightness-110 active:scale-95 text-[#14130F] font-bold text-xs uppercase tracking-wider rounded-lg shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Thêm tài khoản mới
            </button>
          ) : (
            <div
              title="Chỉ tài khoản Admin mới có quyền thêm tài khoản"
              className="px-4 py-2 bg-slate-100 text-slate-400 text-xs font-semibold rounded-lg border border-slate-200 cursor-not-allowed"
            >
              Chỉ Admin mới được thêm tài khoản
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-900">
              Danh Sách Tài Khoản ({users.length})
            </h2>
            <p className="text-xs text-slate-500">
              Bấm vào biểu tượng chìa khóa để đổi mật khẩu cho từng tài khoản
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <Loader2 className="w-8 h-8 text-[#96794F] animate-spin mx-auto mb-2" />
            <p className="text-xs">Đang tải danh sách tài khoản...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[960px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 min-w-[220px]">Tài khoản</th>
                  <th className="py-3.5 px-4 min-w-[220px]">Họ &amp; Tên</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[160px]">Vai trò</th>
                  <th className="py-3.5 px-4 whitespace-nowrap min-w-[160px]">Ngày tạo</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap min-w-[180px] pr-6">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {users.map((u) => {
                  const isCurrent = u.username === currentUser;
                  const isPrimaryAdmin = u.username === "admin";
                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isCurrent ? "bg-amber-50/30" : ""
                      }`}
                    >
                      {/* Username */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0F1E36] text-[#DFBA73] font-bold text-xs flex items-center justify-center shrink-0">
                            {u.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block font-mono">
                              {u.username}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] text-emerald-600 font-semibold">
                                (Đang đăng nhập)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {u.name}
                      </td>

                      {/* Role badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            u.role === "admin"
                              ? "bg-amber-100 text-[#8c6f45] border border-amber-300"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {u.role === "admin" ? (
                            <>
                              <ShieldCheck className="w-3.5 h-3.5 text-[#96794F]" />
                              Quản trị viên (Admin)
                            </>
                          ) : (
                            <>
                              <User className="w-3.5 h-3.5 text-blue-600" />
                              Biên tập viên (Editor)
                            </>
                          )}
                        </span>
                      </td>

                      {/* Created date */}
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString("vi-VN") : "Hệ thống"}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {/* ĐỔI MẬT KHẨU - TẤT CẢ TÀI KHOẢN ĐỀU BẤM ĐƯỢC (Tự đổi cho mình hoặc Admin đổi cho người khác) */}
                          <button
                            type="button"
                            onClick={() => openChangePasswordModal(u)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-[#96794F] text-slate-700 hover:text-white rounded-md transition-colors"
                            title={`Đổi mật khẩu cho ${u.username}`}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Đổi mật khẩu</span>
                          </button>

                          {/* SỬA THÔNG TIN - Chỉ admin hoặc tự sửa tên của mình */}
                          {(isAdmin || isCurrent) && (
                            <button
                              type="button"
                              onClick={() => openEditUserModal(u)}
                              title="Sửa thông tin"
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* XÓA TÀI KHOẢN - CHỈ ADMIN MỚI ĐƯỢC XÓA, KHÔNG ĐƯỢC XÓA ADMIN GỐC */}
                          {isAdmin && !isPrimaryAdmin && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u)}
                              title="Xóa tài khoản này"
                              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Backup & System Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System info */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
          <h2 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Server className="w-5 h-5 text-[#96794F]" />
            Trạng Thái Cơ Sở Dữ Liệu Hosting
          </h2>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Hệ thống quản trị và dữ liệu tài khoản được lưu trữ an toàn trong tệp SQLite nội bộ trên host của bạn.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
              <span className="text-slate-500">Tệp SQLite:</span>
              <span className="font-mono font-bold text-slate-800">
                {systemInfo.database || "api/database.sqlite"}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
              <span className="text-slate-500">Thư mục Uploads:</span>
              <span className="font-semibold text-emerald-600">
                {systemInfo.uploads_writable !== false ? "public_html/uploads/ (Quyền ghi 755)" : "Cần cấp quyền 755"}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
              <span className="text-slate-500">Sao lưu dữ liệu:</span>
              <span className="text-slate-700">
                Chỉ cần tải file <code>database.sqlite</code> về máy là đã sao lưu 100%!
              </span>
            </div>
          </div>
        </div>

        {/* 1-click restore (Admin only) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-[#96794F]" />
              Khởi Tạo / Khôi Phục Dữ Liệu Gốc (1-Click)
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Nạp lại 50 bài viết tư vấn pháp luật chuẩn xác và 6 luật sư mẫu vào file Database SQLite bất cứ khi nào cần.
            </p>
          </div>

          <div>
            {isAdmin ? (
              <button
                type="button"
                onClick={handleSeedData}
                disabled={isSeeding}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isSeeding ? "animate-spin text-[#DFBA73]" : ""}`} />
                {isSeeding ? "Đang nạp lại dữ liệu..." : "Nạp lại 50 bài viết & thành viên gốc"}
              </button>
            ) : (
              <div className="p-3 bg-slate-100 text-slate-500 text-xs rounded-lg text-center font-medium">
                Chỉ tài khoản Admin mới có quyền thực hiện khôi phục dữ liệu gốc
              </div>
            )}

            {seedResult && (
              <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-semibold text-slate-800">
                {seedResult}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: THÊM / SỬA TÀI KHOẢN (Chỉ admin) */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-[#0F1E36] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold">
                  {isEditingUser ? "Chỉnh Sửa Tài Khoản" : "Thêm Tài Khoản Mới"}
                </h3>
                <p className="text-[11px] text-[#DFBA73]">
                  Phân quyền quản trị cho nhân sự công ty luật
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="p-6 space-y-4 text-xs">
              {userModalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{userModalError}</span>
                </div>
              )}

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tên đăng nhập (Username) *
                </label>
                <input
                  type="text"
                  required
                  disabled={isEditingUser}
                  value={userFormData.username}
                  onChange={(e) =>
                    setUserFormData((prev) => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))
                  }
                  placeholder="Ví dụ: luatsuhai, nhansu1..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F] disabled:bg-slate-100 font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Chỉ dùng chữ cái viết thường không dấu, số, gạch nối.
                </span>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Họ và tên hiển thị *
                </label>
                <input
                  type="text"
                  required
                  value={userFormData.name}
                  onChange={(e) => setUserFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ví dụ: Ls. Đỗ Thị Thanh Hải"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Vai trò / Phân quyền *
                </label>
                <select
                  disabled={!isAdmin || userFormData.username === "admin"}
                  value={userFormData.role}
                  onChange={(e) =>
                    setUserFormData((prev) => ({ ...prev, role: e.target.value as "admin" | "editor" }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F] bg-white disabled:bg-slate-100"
                >
                  <option value="editor">Biên tập viên (Editor) - Quản lý bài viết &amp; thành viên</option>
                  <option value="admin">Quản trị viên (Admin) - Toàn quyền thêm, sửa, xóa tài khoản</option>
                </select>
              </div>

              {(!isEditingUser || isAdmin) && (
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    {isEditingUser ? "Đặt lại mật khẩu mới (Bỏ trống nếu giữ nguyên)" : "Mật khẩu ban đầu *"}
                  </label>
                  <input
                    type="password"
                    value={userFormData.password || ""}
                    onChange={(e) => setUserFormData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F]"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Tối thiểu 4 ký tự.
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSavingUser}
                  className="px-5 py-2 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] font-bold uppercase tracking-wider rounded shadow hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingUser ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  {isEditingUser ? "Lưu thay đổi" : "Tạo tài khoản"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ĐỔI MẬT KHẨU (TẤT CẢ TÀI KHOẢN ĐỀU DÙNG ĐƯỢC) */}
      {isPasswordModalOpen && targetPasswordUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-[#0F1E36] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#DFBA73]" />
                  Đổi Mật Khẩu Tài Khoản
                </h3>
                <p className="text-[11px] text-[#DFBA73]">
                  Tài khoản: <strong>{targetPasswordUser.username}</strong> ({targetPasswordUser.name})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="p-6 space-y-4 text-xs">
              {passwordModalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordModalError}</span>
                </div>
              )}

              {/* Nếu là tự đổi mật khẩu của mình: Bắt buộc nhập mật khẩu cũ */}
              {targetPasswordUser.username === currentUser && (
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Mật khẩu hiện tại *
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordFormData.oldPassword}
                    onChange={(e) =>
                      setPasswordFormData((prev) => ({ ...prev, oldPassword: e.target.value }))
                    }
                    placeholder="Nhập mật khẩu đang dùng"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F]"
                  />
                </div>
              )}

              {/* Mật khẩu mới */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Mật khẩu mới *
                </label>
                <input
                  type="password"
                  required
                  value={passwordFormData.newPassword}
                  onChange={(e) =>
                    setPasswordFormData((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  placeholder="Tối thiểu 4 ký tự"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F]"
                />
              </div>

              {/* Xác nhận mật khẩu mới */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Xác nhận lại mật khẩu mới *
                </label>
                <input
                  type="password"
                  required
                  value={passwordFormData.confirmPassword}
                  onChange={(e) =>
                    setPasswordFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                  }
                  placeholder="Nhập lại mật khẩu mới vừa gõ"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#96794F]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="px-5 py-2 bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#96794F] text-[#14130F] font-bold uppercase tracking-wider rounded shadow hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingPassword ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  Xác nhận đổi mật khẩu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
