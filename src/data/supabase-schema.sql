-- ==============================================================================
-- CÔNG TY LUẬT TNHH HẢI MINH QUÂN - SUPABASE DATABASE INITIALIZATION SCRIPT
-- Copy và dán toàn bộ đoạn mã này vào mục: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. BẢNG BÀI VIẾT & CẨM NANG PHÁP LÝ (articles)
CREATE TABLE IF NOT EXISTS public.articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  service_slug TEXT DEFAULT 'to-tung-dan-su',
  category TEXT DEFAULT 'Tư vấn pháp luật',
  date TEXT DEFAULT '',
  author TEXT DEFAULT 'Luật sư Đỗ Thị Thanh Hải',
  image_url TEXT DEFAULT '',
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tạo chỉ mục tìm kiếm nhanh
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_service_slug ON public.articles(service_slug);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);

-- Bật Row Level Security (RLS) cho bảng articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người (public) đọc các bài viết đã xuất bản
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
CREATE POLICY "Public can view published articles" 
ON public.articles FOR SELECT 
USING (true);

-- Cho phép tài khoản đã đăng nhập (Admin) có toàn quyền thêm, sửa, xóa bài viết
DROP POLICY IF EXISTS "Authenticated users can manage articles" ON public.articles;
CREATE POLICY "Authenticated users can manage articles" 
ON public.articles FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- (Tùy chọn) Cho phép anon full quyền nếu bạn muốn test nhanh không cần đăng nhập:
DROP POLICY IF EXISTS "Anon can manage articles during dev" ON public.articles;
CREATE POLICY "Anon can manage articles during dev" 
ON public.articles FOR ALL 
TO anon 
USING (true) 
WITH CHECK (true);


-- 2. BẢNG ĐỘI NGŨ LUẬT SƯ & THÀNH VIÊN (team_members)
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  link TEXT DEFAULT '',
  phone TEXT DEFAULT '0967 932 555',
  email TEXT DEFAULT 'luathaiminhquan@gmail.com',
  card_no TEXT DEFAULT '',
  qualifications JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  expertise JSONB DEFAULT '[]'::jsonb,
  bio TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Chỉ mục
CREATE INDEX IF NOT EXISTS idx_team_members_slug ON public.team_members(slug);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON public.team_members(order_index ASC);

-- Bật Row Level Security (RLS) cho bảng team_members
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người xem danh sách thành viên
DROP POLICY IF EXISTS "Public can view active team members" ON public.team_members;
CREATE POLICY "Public can view active team members" 
ON public.team_members FOR SELECT 
USING (true);

-- Cho phép tài khoản đã đăng nhập (Admin) quản lý thành viên
DROP POLICY IF EXISTS "Authenticated users can manage team members" ON public.team_members;
CREATE POLICY "Authenticated users can manage team members" 
ON public.team_members FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

DROP POLICY IF EXISTS "Anon can manage team members during dev" ON public.team_members;
CREATE POLICY "Anon can manage team members during dev" 
ON public.team_members FOR ALL 
TO anon 
USING (true) 
WITH CHECK (true);


-- 3. CẤU HÌNH STORAGE BUCKET CHO UPLOAD HÌNH ẢNH (law-firm-media)
-- Tạo bucket public 'law-firm-media' nếu chưa tồn tại
INSERT INTO storage.buckets (id, name, public)
VALUES ('law-firm-media', 'law-firm-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Cho phép mọi người xem và tải ảnh từ bucket này
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'law-firm-media');

-- Cho phép upload ảnh vào bucket
DROP POLICY IF EXISTS "Allow Upload Media" ON storage.objects;
CREATE POLICY "Allow Upload Media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'law-firm-media');

-- Cho phép cập nhật hoặc xóa ảnh
DROP POLICY IF EXISTS "Allow Update and Delete Media" ON storage.objects;
CREATE POLICY "Allow Update and Delete Media" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'law-firm-media');

DROP POLICY IF EXISTS "Allow Delete Media" ON storage.objects;
CREATE POLICY "Allow Delete Media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'law-firm-media');
