/**
 * ==============================================================================
 * THƯ VIỆN GIAO TIẾP VỚI BACKEND PHP & SQLITE NỘI BỘ CỦA WEBSITE
 * Hoàn toàn miễn phí, lưu trực tiếp trên hosting của khách hàng
 * ==============================================================================
 */

import { allArticlesData, ArticleItem } from "@/data/articlesData";
import { allTeamMembersArchive, TeamMember } from "@/data/mockData";

export interface DbArticle {
  id: string;
  slug: string;
  title: string;
  service_slug: string;
  category: string;
  date: string;
  author: string;
  image_url: string;
  excerpt: string;
  content: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DbTeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  image_url: string;
  link: string;
  phone?: string;
  email?: string;
  card_no?: string;
  qualifications?: string[];
  experience?: string[];
  expertise?: string[];
  bio?: string;
  is_active: boolean;
  order_index?: number;
  created_at?: string;
}

const getApiBase = (): string => {
  if (typeof window === "undefined") return "";
  return "/api";
};

/**
 * 1. UPLOAD HÌNH ẢNH TRỰC TIẾP LÊN HOSTING (thư mục /uploads/)
 */
export async function uploadImageToHost(
  file: File,
  folder: "articles" | "team" = "articles"
): Promise<{ url: string | null; error: string | null }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch(`${getApiBase()}/?action=upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        return { url: data.url, error: null };
      }
      return { url: null, error: data.error || "Lỗi khi upload ảnh lên hosting" };
    }
  } catch (e) {
    console.warn("API upload failed, checking local fallback...", e);
  }

  // Fallback khi chạy dev trên máy tính không có server PHP: Đọc base64 Data URL để người dùng vẫn xem và lưu được
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result as string, error: null });
    };
    reader.onerror = () => {
      resolve({ url: null, error: "Không thể đọc file trên trình duyệt" });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 2. LẤY DANH SÁCH BÀI VIẾT TỪ DATABASE SQLITE TRÊN HOST
 */
export async function fetchArticles(): Promise<{
  articles: DbArticle[];
  error: string | null;
}> {
  try {
    const res = await fetch(`${getApiBase()}/?action=articles`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        return { articles: data.articles, error: null };
      }
    }
  } catch (e) {
    console.warn("Fetch articles API offline, using fallback data", e);
  }

  // Fallback localStorage hoặc dữ liệu tĩnh mẫu
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_articles");
    if (local) {
      try {
        return { articles: JSON.parse(local), error: null };
      } catch (err) {
        console.error(err);
      }
    }
  }

  const fallback: DbArticle[] = allArticlesData.map((a: ArticleItem) => ({
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

  return { articles: fallback, error: null };
}

/**
 * 3. LƯU HOẶC CẬP NHẬT BÀI VIẾT VÀO SQLITE
 */
export async function saveArticle(
  article: Partial<DbArticle>
): Promise<{ success: boolean; error: string | null }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=save_article`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, error: null };
      }
      return { success: false, error: data.error || "Không thể lưu bài viết" };
    }
  } catch (e) {
    console.warn("Save article API offline, saving to localStorage...", e);
  }

  // Lưu fallback vào localStorage
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_articles");
    const current: DbArticle[] = local ? JSON.parse(local) : allArticlesData;
    const exists = current.find((a) => a.id === article.id);
    let updated: DbArticle[];
    if (exists) {
      updated = current.map((a) =>
        a.id === article.id ? ({ ...a, ...article } as DbArticle) : a
      );
    } else {
      updated = [article as DbArticle, ...current];
    }
    localStorage.setItem("hmq_local_articles", JSON.stringify(updated));
    return { success: true, error: null };
  }

  return { success: false, error: "Lỗi kết nối API" };
}

/**
 * 4. XÓA BÀI VIẾT KHỎI SQLITE
 */
export async function deleteArticle(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=delete_article`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, error: null };
      }
      return { success: false, error: data.error || "Không thể xóa bài viết" };
    }
  } catch (e) {
    console.warn("Delete article API offline, removing from localStorage...", e);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_articles");
    if (local) {
      const current: DbArticle[] = JSON.parse(local);
      const updated = current.filter((a) => a.id !== id);
      localStorage.setItem("hmq_local_articles", JSON.stringify(updated));
    }
    return { success: true, error: null };
  }

  return { success: false, error: "Lỗi kết nối API" };
}

/**
 * 5. LẤY DANH SÁCH THÀNH VIÊN TỪ DATABASE SQLITE
 */
export async function fetchTeamMembers(): Promise<{
  members: DbTeamMember[];
  error: string | null;
}> {
  try {
    const res = await fetch(`${getApiBase()}/?action=team`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.members)) {
        return { members: data.members, error: null };
      }
    }
  } catch (e) {
    console.warn("Fetch team API offline, using fallback data", e);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_members");
    if (local) {
      try {
        return { members: JSON.parse(local), error: null };
      } catch (err) {
        console.error(err);
      }
    }
  }

  const fallback: DbTeamMember[] = allTeamMembersArchive.map(
    (m: TeamMember, idx) => ({
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
      is_active: idx === 0,
      order_index: idx,
    })
  );

  return { members: fallback, error: null };
}

/**
 * 6. LƯU HOẶC CẬP NHẬT THÀNH VIÊN VÀO SQLITE
 */
export async function saveTeamMember(
  member: Partial<DbTeamMember>
): Promise<{ success: boolean; error: string | null }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=save_member`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, error: null };
      }
      return { success: false, error: data.error || "Không thể lưu thành viên" };
    }
  } catch (e) {
    console.warn("Save member API offline, saving to localStorage...", e);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_members");
    const current: DbTeamMember[] = local ? JSON.parse(local) : allTeamMembersArchive;
    const exists = current.find((m) => m.id === member.id);
    let updated: DbTeamMember[];
    if (exists) {
      updated = current.map((m) =>
        m.id === member.id ? ({ ...m, ...member } as DbTeamMember) : m
      );
    } else {
      updated = [...current, member as DbTeamMember];
    }
    localStorage.setItem("hmq_local_members", JSON.stringify(updated));
    return { success: true, error: null };
  }

  return { success: false, error: "Lỗi kết nối API" };
}

/**
 * 7. BẬT/TẮT HIỂN THỊ THÀNH VIÊN
 */
export async function toggleTeamMemberActive(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error: string | null }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=toggle_member`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_active: isActive }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, error: null };
      }
    }
  } catch (e) {
    console.warn("Toggle member API offline...", e);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_members");
    if (local) {
      const current: DbTeamMember[] = JSON.parse(local);
      const updated = current.map((m) =>
        m.id === id ? { ...m, is_active: isActive } : m
      );
      localStorage.setItem("hmq_local_members", JSON.stringify(updated));
    }
    return { success: true, error: null };
  }

  return { success: false, error: "Lỗi kết nối API" };
}

/**
 * 8. XÓA THÀNH VIÊN KHỎI SQLITE
 */
export async function deleteTeamMember(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=delete_member`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return { success: true, error: null };
      }
    }
  } catch (e) {
    console.warn("Delete member API offline...", e);
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_local_members");
    if (local) {
      const current: DbTeamMember[] = JSON.parse(local);
      const updated = current.filter((m) => m.id !== id);
      localStorage.setItem("hmq_local_members", JSON.stringify(updated));
    }
    return { success: true, error: null };
  }

  return { success: false, error: "Lỗi kết nối API" };
}

/**
 * 9. ĐĂNG NHẬP ADMIN VỚI MẬT KHẨU NỘI BỘ
 */
export async function loginAdmin(
  username: string,
  password: string
): Promise<{
  success: boolean;
  token?: string;
  error?: string;
  user?: { id?: string; username: string; name?: string; role?: "admin" | "editor" | string; email?: string };
}> {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (!cleanUsername || !cleanPassword) {
    return { success: false, error: "Vui lòng nhập tên đăng nhập và mật khẩu." };
  }

  try {
    const res = await fetch(`${getApiBase()}/?action=login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: cleanUsername, password: cleanPassword }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.warn("Login API offline, validating with local accounts...", e);
  }

  // Khi test local trên máy tính (chưa deploy lên hosting PHP):
  // Mặc định tài khoản:
  // admin -> admin@123
  // bientapvien -> editor@123
  let validAccounts: Record<string, { password: string; name: string; role: "admin" | "editor" }> = {
    admin: { password: "admin@123", name: "Quản Trị Viên Trưởng", role: "admin" },
    bientapvien: { password: "editor@123", name: "Biên Tập Viên Tin Tức", role: "editor" },
  };

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("hmq_admin_credentials");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        validAccounts = { ...validAccounts, ...parsed };
      } catch {}
    }
  }

  const account = validAccounts[cleanUsername];
  if (account && account.password === cleanPassword) {
    return {
      success: true,
      token: "session-" + Date.now(),
      user: {
        id: `user-${cleanUsername}`,
        username: cleanUsername,
        name: account.name,
        role: account.role,
        email: "luathaiminhquan@gmail.com",
      },
    };
  }

  return { success: false, error: "Tên đăng nhập hoặc mật khẩu không chính xác." };
}

/**
 * 10. KIỂM TRA TRẠNG THÁI HỆ THỐNG
 */
export async function getSystemStatus(): Promise<{
  success: boolean;
  database?: string;
  articles_count?: number;
  team_count?: number;
  uploads_writable?: boolean;
}> {
  try {
    const res = await fetch(`${getApiBase()}/?action=status`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Status API offline...", e);
  }
  return {
    success: true,
    database: "Chế độ Dự phòng / Local Storage",
    articles_count: allArticlesData.length,
    team_count: allTeamMembersArchive.length,
    uploads_writable: true,
  };
}

/**
 * 11. KHÔI PHỤC DỮ LIỆU BAN ĐẦU
 */
export async function reseedDatabase(): Promise<{
  success: boolean;
  articles_count?: number;
  team_count?: number;
  error?: string;
}> {
  try {
    const res = await fetch(`${getApiBase()}/?action=reseed`, {
      method: "POST",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Reseed API offline...", e);
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem("hmq_local_articles");
    localStorage.removeItem("hmq_local_members");
  }

  return {
    success: true,
    articles_count: allArticlesData.length,
    team_count: allTeamMembersArchive.length,
  };
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: "admin" | "editor";
  created_at?: string;
  updated_at?: string;
}

/**
 * 12. LẤY DANH SÁCH TÀI KHOẢN
 */
export async function fetchAdminUsers(): Promise<{
  users: AdminUser[];
  error?: string;
}> {
  try {
    const res = await fetch(`${getApiBase()}/?action=users`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        return { users: data.users };
      }
    }
  } catch (e) {
    console.warn("fetchAdminUsers failed, using local fallback...", e);
  }

  // Fallback local storage
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_admin_users");
    if (local) {
      try {
        return { users: JSON.parse(local) };
      } catch {}
    }
  }

  const defaultUsers: AdminUser[] = [
    {
      id: "user-admin-1",
      username: "admin",
      name: "Quản Trị Viên Trưởng",
      role: "admin",
      created_at: new Date().toISOString(),
    },
    {
      id: "user-editor-1",
      username: "bientapvien",
      name: "Biên Tập Viên Tin Tức",
      role: "editor",
      created_at: new Date().toISOString(),
    },
  ];

  return { users: defaultUsers };
}

/**
 * 13. THÊM / CẬP NHẬT TÀI KHOẢN (Chỉ admin mới được phép)
 */
export async function saveAdminUser(
  user: Partial<AdminUser> & { password?: string },
  requesterUsername: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=save_user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, requester_username: requesterUsername }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("saveAdminUser failed, saving to local...", e);
  }

  // Fallback
  if (requesterUsername !== "admin") {
    return { success: false, error: "Chỉ tài khoản Quản trị viên (admin) mới có quyền thêm/sửa tài khoản" };
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_admin_users");
    const current: AdminUser[] = local ? JSON.parse(local) : [
      { id: "user-admin-1", username: "admin", name: "Quản Trị Viên Trưởng", role: "admin" }
    ];
    const exists = current.find((u) => u.id === user.id || u.username === user.username);
    let updated: AdminUser[];
    if (exists) {
      updated = current.map((u) => u.id === exists.id ? { ...u, name: user.name || u.name, role: user.role || u.role } : u);
    } else {
      updated = [...current, {
        id: user.id || `user-${Date.now()}`,
        username: user.username || "",
        name: user.name || "",
        role: user.role || "editor",
        created_at: new Date().toISOString()
      }];
    }
    if (user.password && user.username) {
      const savedCreds = localStorage.getItem("hmq_admin_credentials");
      let creds: Record<string, { password: string; name: string; role: "admin" | "editor" }> = {
        admin: { password: "admin@123", name: "Quản Trị Viên Trưởng", role: "admin" },
        bientapvien: { password: "editor@123", name: "Biên Tập Viên Tin Tức", role: "editor" },
      };
      if (savedCreds) {
        try {
          creds = { ...creds, ...JSON.parse(savedCreds) };
        } catch {}
      }
      creds[user.username.toLowerCase()] = {
        password: user.password,
        name: user.name || user.username,
        role: user.role || "editor",
      };
      localStorage.setItem("hmq_admin_credentials", JSON.stringify(creds));
    }

    localStorage.setItem("hmq_admin_users", JSON.stringify(updated));
    return { success: true, message: "Lưu tài khoản thành công" };
  }

  return { success: false, error: "Không thể lưu tài khoản" };
}

/**
 * 14. XÓA TÀI KHOẢN (Chỉ admin mới được phép)
 */
export async function deleteAdminUser(
  id: string,
  requesterUsername: string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${getApiBase()}/?action=delete_user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, requester_username: requesterUsername }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("deleteAdminUser failed...", e);
  }

  if (requesterUsername !== "admin") {
    return { success: false, error: "Chỉ tài khoản Quản trị viên (admin) mới có quyền xóa tài khoản" };
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem("hmq_admin_users");
    if (local) {
      const current: AdminUser[] = JSON.parse(local);
      const target = current.find((u) => u.id === id);
      if (target?.username === "admin") {
        return { success: false, error: "Không thể xóa tài khoản Quản trị viên gốc (admin)" };
      }
      const updated = current.filter((u) => u.id !== id);
      localStorage.setItem("hmq_admin_users", JSON.stringify(updated));

      if (target?.username) {
        const savedCreds = localStorage.getItem("hmq_admin_credentials");
        if (savedCreds) {
          try {
            const creds = JSON.parse(savedCreds);
            delete creds[target.username.toLowerCase()];
            localStorage.setItem("hmq_admin_credentials", JSON.stringify(creds));
          } catch {}
        }
      }

      return { success: true, message: "Đã xóa tài khoản" };
    }
  }

  return { success: true };
}

/**
 * 15. ĐỔI MẬT KHẨU (TẤT CẢ TÀI KHOẢN ĐỀU CÓ QUYỀN ĐỔI MẬT KHẨU)
 */
export async function changeAdminPassword(params: {
  username: string;
  oldPassword?: string;
  newPassword: string;
  requesterUsername?: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  const cleanUsername = params.username.trim().toLowerCase();
  const cleanNewPassword = params.newPassword.trim();
  const cleanOldPassword = params.oldPassword ? params.oldPassword.trim() : "";
  const requester = (params.requesterUsername || params.username).trim().toLowerCase();

  try {
    const res = await fetch(`${getApiBase()}/?action=change_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: cleanUsername,
        old_password: cleanOldPassword,
        new_password: cleanNewPassword,
        requester_username: requester,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      if (!data.success) {
        return data;
      }
    }
  } catch (e) {
    console.warn("changeAdminPassword API offline...", e);
  }

  // Cập nhật vào localStorage khi test local
  if (typeof window !== "undefined") {
    const savedCreds = localStorage.getItem("hmq_admin_credentials");
    let creds: Record<string, { password: string; name: string; role: "admin" | "editor" }> = {
      admin: { password: "admin@123", name: "Quản Trị Viên Trưởng", role: "admin" },
      bientapvien: { password: "editor@123", name: "Biên Tập Viên Tin Tức", role: "editor" },
    };
    if (savedCreds) {
      try {
        creds = { ...creds, ...JSON.parse(savedCreds) };
      } catch {}
    }

    const currentAcc = creds[cleanUsername];
    // Nếu người dùng tự đổi mật khẩu của mình: bắt buộc kiểm tra mật khẩu cũ
    const isSelf = requester === cleanUsername;
    if (isSelf) {
      const expectedOld = currentAcc ? currentAcc.password : "admin@123";
      if (cleanOldPassword !== expectedOld) {
        return { success: false, error: "Mật khẩu hiện tại không chính xác" };
      }
    }

    if (currentAcc) {
      currentAcc.password = cleanNewPassword;
      creds[cleanUsername] = currentAcc;
    } else {
      creds[cleanUsername] = {
        password: cleanNewPassword,
        name: cleanUsername === "admin" ? "Quản Trị Viên Trưởng" : cleanUsername,
        role: cleanUsername === "admin" ? "admin" : "editor",
      };
    }
    localStorage.setItem("hmq_admin_credentials", JSON.stringify(creds));
    return { success: true, message: "Đổi mật khẩu thành công" };
  }

  return { success: true, message: "Đổi mật khẩu thành công" };
}
