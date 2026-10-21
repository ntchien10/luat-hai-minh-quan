import { createClient, SupabaseClient } from "@supabase/supabase-js";
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === "string" &&
    supabaseUrl.trim().length > 0 &&
    typeof supabaseAnonKey === "string" &&
    supabaseAnonKey.trim().length > 0 &&
    supabaseUrl.startsWith("https://")
  );
};

// Khởi tạo Supabase client an toàn
let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
};

export const STORAGE_BUCKET_NAME = "law-firm-media";

/**
 * Upload hình ảnh lên Supabase Storage bucket
 */
export async function uploadImageToSupabase(
  file: File,
  folder: "articles" | "team" = "articles"
): Promise<{ url: string | null; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      url: null,
      error: "Chưa cấu hình Supabase URL hoặc Anon Key trong file .env.local",
    };
  }

  try {
    // Tạo tên file an toàn không dấu
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 30);
    const filePath = `${folder}/${Date.now()}-${cleanBase}.${ext}`;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload image error:", error);
      return { url: null, error: error.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET_NAME)
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi upload ảnh";
    return { url: null, error: message };
  }
}

/**
 * Lấy danh sách bài viết từ Supabase
 */
export async function fetchArticlesFromSupabase(): Promise<{
  articles: DbArticle[];
  error: string | null;
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return { articles: [], error: "Supabase chưa được kết nối" };
  }

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { articles: [], error: error.message };
    }
    return { articles: (data as DbArticle[]) || [], error: null };
  } catch (err: unknown) {
    return {
      articles: [],
      error: err instanceof Error ? err.message : "Lỗi khi lấy dữ liệu bài viết",
    };
  }
}

/**
 * Lưu hoặc cập nhật bài viết lên Supabase
 */
export async function saveArticleToSupabase(
  article: Partial<DbArticle>
): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: "Supabase chưa được kết nối" };
  }

  try {
    const payload = {
      ...article,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("articles").upsert(payload);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Lỗi khi lưu bài viết",
    };
  }
}

/**
 * Xóa bài viết khỏi Supabase
 */
export async function deleteArticleFromSupabase(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: "Supabase chưa được kết nối" };
  }

  try {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Lỗi khi xóa bài viết",
    };
  }
}

/**
 * Lấy danh sách thành viên từ Supabase
 */
export async function fetchTeamMembersFromSupabase(): Promise<{
  members: DbTeamMember[];
  error: string | null;
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return { members: [], error: "Supabase chưa được kết nối" };
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      return { members: [], error: error.message };
    }
    return { members: (data as DbTeamMember[]) || [], error: null };
  } catch (err: unknown) {
    return {
      members: [],
      error:
        err instanceof Error ? err.message : "Lỗi khi lấy dữ liệu thành viên",
    };
  }
}

/**
 * Lưu hoặc cập nhật thành viên lên Supabase
 */
export async function saveTeamMemberToSupabase(
  member: Partial<DbTeamMember>
): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: "Supabase chưa được kết nối" };
  }

  try {
    const { error } = await supabase.from("team_members").upsert(member);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Lỗi khi lưu thành viên",
    };
  }
}

/**
 * Bật/Tắt hiển thị thành viên
 */
export async function toggleTeamMemberActive(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: "Supabase chưa được kết nối" };
  }

  try {
    const { error } = await supabase
      .from("team_members")
      .update({ is_active: isActive })
      .eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: unknown) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Lỗi khi cập nhật trạng thái",
    };
  }
}

/**
 * Xóa thành viên khỏi Supabase
 */
export async function deleteTeamMemberFromSupabase(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: false, error: "Supabase chưa được kết nối" };
  }

  try {
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Lỗi khi xóa thành viên",
    };
  }
}

/**
 * Hàm đồng bộ nạp sẵn toàn bộ dữ liệu bài viết & thành viên ban đầu lên Supabase
 */
export async function seedInitialDataToSupabase(): Promise<{
  articlesCount: number;
  membersCount: number;
  error: string | null;
}> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      articlesCount: 0,
      membersCount: 0,
      error: "Supabase chưa được kết nối",
    };
  }

  try {
    // 1. Chuyển đổi dữ liệu bài viết mẫu
    const mappedArticles: DbArticle[] = allArticlesData.map((item: ArticleItem, idx) => ({
      id: item.id || `article-${idx}`,
      slug: item.slug,
      title: item.title,
      service_slug: item.serviceSlug,
      category: item.category,
      date: item.date,
      author: item.author,
      image_url: item.imageUrl,
      excerpt: item.excerpt,
      content: item.content,
      is_published: true,
      created_at: new Date(Date.now() - idx * 86400000).toISOString(),
    }));

    const { error: artError } = await supabase
      .from("articles")
      .upsert(mappedArticles, { onConflict: "id" });

    if (artError) {
      return {
        articlesCount: 0,
        membersCount: 0,
        error: `Lỗi đồng bộ bài viết: ${artError.message}`,
      };
    }

    // 2. Chuyển đổi dữ liệu thành viên mẫu (Ls Đỗ Thị Thanh Hải active = true, các luật sư khác lưu tạm is_active = false hoặc true tùy ý)
    const mappedMembers: DbTeamMember[] = allTeamMembersArchive.map(
      (m: TeamMember, idx) => {
        const slug = m.link.replace("/thanh-vien/", "").replace(/\/$/, "");
        return {
          id: m.id,
          slug: slug,
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
          is_active: idx === 0, // Mặc định chỉ hiển thị Ls Đỗ Thị Thanh Hải, các luật sư khác đã lưu sẵn có thể bật lên bất cứ lúc nào
          order_index: idx,
        };
      }
    );

    const { error: memError } = await supabase
      .from("team_members")
      .upsert(mappedMembers, { onConflict: "id" });

    if (memError) {
      return {
        articlesCount: mappedArticles.length,
        membersCount: 0,
        error: `Lỗi đồng bộ thành viên: ${memError.message}`,
      };
    }

    return {
      articlesCount: mappedArticles.length,
      membersCount: mappedMembers.length,
      error: null,
    };
  } catch (err: unknown) {
    return {
      articlesCount: 0,
      membersCount: 0,
      error: err instanceof Error ? err.message : "Lỗi khi đồng bộ dữ liệu",
    };
  }
}
