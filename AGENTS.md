<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Quy Tắc Quan Trọng Về Typography & Ký Tự Ampersand (&)

- **Quy tắc bắt buộc về ký tự `&` (Ampersand):**
  - Tuyệt đối **KHÔNG ĐƯỢC** để ký tự `&` hiển thị bằng nét font serif nghệ thuật/cách điệu (như nét uốn lượn ligature của font `Playfair Display`), vì trông giống ký tự lạ/bị lỗi font.
  - Ký tự `&` **BẮT BUỘC** phải luôn hiển thị bằng font chuẩn bình thường (sans-serif như `Plus Jakarta Sans`, `Arial`, `Helvetica`) sạch sẽ, chuẩn xác, hiện đại.
  - Cơ chế kỹ thuật:
    1. Giữ nguyên khai báo `@font-face { font-family: "NormalAmpersand"; unicode-range: U+0026; }` trong `src/app/globals.css` để tự động thay thế font cho ký tự `&` trong mọi thành phần có class `font-serif`.
    2. Đối với các tiêu đề, quy trình, danh mục, bài viết, sử dụng helper `formatAmpersand` (hoặc component `<Ampersand />` từ `@/components/ui/Ampersand`) để bọc ký tự `&` trong class `font-sans font-semibold text-[0.88em] select-all`.
    3. Giữ nguyên ký tự `&` dưới dạng văn bản thật (plain text `&`), không để lọt mã thô chưa decode như `&amp;` ra ngoài giao diện hoặc thẻ meta/title.

## Quy Tắc Về Tên Thương Hiệu & Danh Xưng Luật Sư

- **"Hải Minh Quân" là tên CÔNG TY LUẬT** (`Công ty Luật TNHH Hải Minh Quân` / `Luật Hải Minh Quân`), **KHÔNG PHẢI là tên của một cá nhân luật sư**.
- **Tuyệt đối KHÔNG viết:** *"Luật sư Hải Minh Quân"*, *"Ls. Hải Minh Quân"*.
- **Cách viết chuẩn xác:**
  - Khi nói về pháp nhân/công ty: *"Công ty Luật Hải Minh Quân"*, *"Luật Hải Minh Quân"*.
  - Khi nói về luật sư: *"Các Luật sư của Hải Minh Quân"*, *"Đội ngũ Luật sư Luật Hải Minh Quân"*, *"Luật sư thuộc Luật Hải Minh Quân"*, hoặc ghi rõ danh tính luật sư cụ thể (*"Ls. Đỗ Thị Thanh Hải"*, *"Ls. Phan Bá Dương"*, *"Ls. Nguyễn Minh Thúy"*, ...).

## Thông Tin Liên Hệ Chính Thức

- **Email liên hệ chính thức duy nhất:** `luathaiminhquan@gmail.com` (Tuyệt đối không tự ý đổi sang email tên miền).
- **Hotline chính:** `0967 932 555` - `0924 189 868`.

