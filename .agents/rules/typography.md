# Quy Tắc Typography & Ký Tự Ampersand (&)

## 1. Yêu cầu bắt buộc
- **Ký tự `&` (Ampersand):**
  - Tuyệt đối **KHÔNG ĐƯỢC** để ký tự `&` hiển thị theo kiểu nét vẽ ligature nghệ thuật / uốn lượn của font serif (như `Playfair Display`), vì trông giống ký tự lạ hoặc lỗi hiển thị font đối với người dùng Việt Nam.
  - Ký tự `&` **BẮT BUỘC** phải luôn hiển thị bằng font chuẩn bình thường (sans-serif như `Plus Jakarta Sans`, `Arial`, `Helvetica Neue`) với kiểu dáng cân đối, hiện đại và sạch sẽ.

## 2. Giải pháp kỹ thuật được triển khai
1. **Global CSS Font Fallback (`src/app/globals.css`):**
   - Định nghĩa `@font-face` với `unicode-range: U+0026` cho `font-family: "NormalAmpersand"`.
   - Cấu hình `--font-serif` và `.font-serif` ưu tiên `"NormalAmpersand"` trước font serif chính. Khi gặp ký tự `&`, trình duyệt tự động vẽ `&` bằng font sans-serif chuẩn thay vì ligature của Playfair Display.
2. **React Helper / Component (`src/components/ui/Ampersand.tsx`):**
   - Hàm `formatAmpersand(text)` và component `<Ampersand />` bọc ký tự `&` trong thẻ `<span className="font-sans font-semibold text-[0.88em] select-all">&amp;</span>`.
   - Áp dụng trên toàn bộ tiêu đề trang, quy trình các bước (process steps), danh mục sidebar, bài viết và cẩm nang pháp lý.
3. **Dữ liệu & Nội dung:**
   - Sử dụng ký tự văn bản thuần túy `&` trong file dữ liệu, tránh để lọt các mã thô chưa decode như `&amp;` ra ngoài giao diện người dùng.
