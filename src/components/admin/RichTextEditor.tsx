"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Eraser,
  Code,
  AlignLeft,
  AlignCenter,
  AlignJustify,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Làm sạch mã HTML từ Word / Google Docs / Web khác
 * Giữ nguyên 100% in đậm, in nghiêng, gạch chân, tiêu đề H2/H3/H4, danh sách gạch đầu dòng/đánh số, bảng biểu, ảnh, link
 * Loại bỏ các thuộc tính rác mso, font lạ của Word và làm sạch span thừa từ Google Docs
 */
function cleanPastedHtml(rawHtml: string): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return rawHtml;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    // 1. Xóa các thẻ nhúng rác không mong muốn
    const elementsToRemove = doc.querySelectorAll("style, script, meta, link, xml");
    elementsToRemove.forEach((el) => el.remove());

    // 2. Chuyển đổi định dạng từ Google Docs & Word (font-weight, font-style, text-decoration)
    const spans = Array.from(doc.querySelectorAll("span"));
    for (const span of spans) {
      const style = span.getAttribute("style") || "";
      const isBold =
        span.style.fontWeight === "bold" ||
        span.style.fontWeight === "700" ||
        /font-weight:\s*(?:700|bold)/i.test(style);
      const isItalic =
        span.style.fontStyle === "italic" || /font-style:\s*italic/i.test(style);
      const isUnderline =
        span.style.textDecoration.includes("underline") ||
        /text-decoration:[^;]*underline/i.test(style);

      let currentTarget: HTMLElement = span;

      if (isBold) {
        const strong = doc.createElement("strong");
        strong.innerHTML = currentTarget.innerHTML;
        currentTarget.parentNode?.replaceChild(strong, currentTarget);
        currentTarget = strong;
      }

      if (isItalic) {
        const em = doc.createElement("em");
        em.innerHTML = currentTarget.innerHTML;
        currentTarget.parentNode?.replaceChild(em, currentTarget);
        currentTarget = em;
      }

      if (isUnderline) {
        const u = doc.createElement("u");
        u.innerHTML = currentTarget.innerHTML;
        currentTarget.parentNode?.replaceChild(u, currentTarget);
        currentTarget = u;
      }

      // Nếu vẫn còn là span (không có định dạng đặc biệt), giải phóng nội dung ra ngoài
      if (currentTarget.tagName.toLowerCase() === "span") {
        const parent = currentTarget.parentNode;
        while (currentTarget.firstChild) {
          parent?.insertBefore(currentTarget.firstChild, currentTarget);
        }
        parent?.removeChild(currentTarget);
      }
    }

    // 3. Chuẩn hóa H1 thành H2 (chuẩn SEO: mỗi bài viết chỉ có 1 thẻ H1 duy nhất)
    doc.querySelectorAll("h1").forEach((h1) => {
      const h2 = doc.createElement("h2");
      h2.innerHTML = h1.innerHTML;
      h1.parentNode?.replaceChild(h2, h1);
    });

    // 4. Chuẩn hóa <b> thành <strong>, <i> thành <em>
    doc.querySelectorAll("b").forEach((b) => {
      const strong = doc.createElement("strong");
      strong.innerHTML = b.innerHTML;
      b.parentNode?.replaceChild(strong, b);
    });
    doc.querySelectorAll("i").forEach((i) => {
      const em = doc.createElement("em");
      em.innerHTML = i.innerHTML;
      i.parentNode?.replaceChild(em, i);
    });

    // 5. Làm sạch thuộc tính rác trên toàn bộ các phần tử, giữ lại thuộc tính quan trọng
    const allowedAttrs = ["href", "src", "alt", "title", "colspan", "rowspan", "target"];
    const allEls = Array.from(doc.body.querySelectorAll("*"));
    for (const el of allEls) {
      const textAlign = (el as HTMLElement).style?.textAlign;
      const attrs = Array.from(el.attributes);
      for (const attr of attrs) {
        if (!allowedAttrs.includes(attr.name.toLowerCase())) {
          el.removeAttribute(attr.name);
        }
      }

      // Giữ lại căn lề nếu có
      if (textAlign && ["center", "right", "justify", "left"].includes(textAlign)) {
        (el as HTMLElement).style.textAlign = textAlign;
      }
    }

    return doc.body.innerHTML;
  } catch (err) {
    console.error("Lỗi khi xử lý HTML dán:", err);
    // Fallback regex cơ bản
    let clean = rawHtml.replace(/<!--[\s\S]*?-->/g, "");
    clean = clean.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    clean = clean.replace(/<xml[^>]*>[\s\S]*?<\/xml>/gi, "");
    clean = clean.replace(/<\/?(meta|link|o:p)[^>]*>/gi, "");
    clean = clean.replace(/<h1([^>]*)>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
    clean = clean.replace(/<b>/gi, "<strong>").replace(/<\/b>/gi, "</strong>");
    clean = clean.replace(/<i>/gi, "<em>").replace(/<\/i>/gi, "</em>");
    clean = clean.replace(/\sclass="[^"]*"/gi, "");
    return clean;
  }
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value || "");

  // Đồng bộ giá trị từ ngoài vào editor khi khởi tạo hoặc thay đổi bài viết
  useEffect(() => {
    setHtmlContent(value || "");
    if (editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, isSourceMode]);

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (isSourceMode) return;
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange(updated);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      setHtmlContent(updated);
      onChange(updated);
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setHtmlContent(val);
    onChange(val);
  };

  // XỬ LÝ SỰ KIỆN PASTE (DÁN VĂN BẢN TỪ WORD / GOOGLE DOCS / WEB KHÁC)
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const clipboardHtml = e.clipboardData.getData("text/html");
    const clipboardText = e.clipboardData.getData("text/plain");

    let contentToInsert = "";

    if (clipboardHtml && clipboardHtml.trim()) {
      // Có định dạng HTML phong phú (từ Word, Docs, Website)
      contentToInsert = cleanPastedHtml(clipboardHtml);
    } else if (clipboardText && clipboardText.trim()) {
      // Dán dạng plain text: tự động chia thành các đoạn văn <p>
      const paragraphs = clipboardText
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

      contentToInsert = paragraphs
        .map((p) => {
          if (p.startsWith("## ")) {
            return `<h2>${p.replace(/^##\s+/, "")}</h2>`;
          }
          if (p.startsWith("### ")) {
            return `<h3>${p.replace(/^###\s+/, "")}</h3>`;
          }
          if (p.startsWith("- ")) {
            const listItems = p
              .split(/\r?\n/)
              .map((li) => `<li>${li.replace(/^-\s+/, "")}</li>`)
              .join("");
            return `<ul>${listItems}</ul>`;
          }
          return `<p>${p.replace(/\r?\n/g, "<br>")}</p>`;
        })
        .join("");
    }

    if (contentToInsert) {
      document.execCommand("insertHTML", false, contentToInsert);
      handleInput();
    }
  };

  const handleAddLink = () => {
    const url = prompt("Nhập đường dẫn liên kết (URL):", "https://");
    if (url && url !== "https://") {
      exec("createLink", url);
    }
  };

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm focus-within:border-[#96794F] transition-colors">
      {/* Thanh công cụ định dạng trực quan */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 text-slate-700 text-xs select-none">
        <button
          type="button"
          onClick={() => exec("bold")}
          title="In đậm (Ctrl+B)"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors font-bold disabled:opacity-40"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("italic")}
          title="In nghiêng (Ctrl+I)"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors italic disabled:opacity-40"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("underline")}
          title="Gạch chân (Ctrl+U)"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors underline disabled:opacity-40"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("formatBlock", "<h2>")}
          title="Tiêu đề mục lớn (H2)"
          disabled={isSourceMode}
          className="px-2 py-1 rounded hover:bg-slate-200 transition-colors font-serif font-bold text-xs flex items-center gap-1 disabled:opacity-40"
        >
          <Heading2 className="w-3.5 h-3.5 text-[#96794F]" />
          <span>H2</span>
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<h3>")}
          title="Tiêu đề mục nhỏ (H3)"
          disabled={isSourceMode}
          className="px-2 py-1 rounded hover:bg-slate-200 transition-colors font-serif font-bold text-xs flex items-center gap-1 disabled:opacity-40"
        >
          <Heading3 className="w-3.5 h-3.5 text-slate-600" />
          <span>H3</span>
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<p>")}
          title="Đoạn văn bình thường (Paragraph)"
          disabled={isSourceMode}
          className="px-1.5 py-1 rounded hover:bg-slate-200 transition-colors font-sans text-xs disabled:opacity-40"
        >
          ¶ Văn bản
        </button>

        <span className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          title="Danh sách gạch đầu dòng"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          title="Danh sách đánh số (1, 2, 3)"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<blockquote>")}
          title="Đoạn trích dẫn / Lời khuyên luật sư"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleAddLink}
          title="Chèn liên kết đường dẫn"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("justifyLeft")}
          title="Căn trái"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyCenter")}
          title="Căn giữa"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyFull")}
          title="Căn đều 2 bên"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors disabled:opacity-40"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("removeFormat")}
          title="Xóa định dạng rác"
          disabled={isSourceMode}
          className="p-1.5 rounded hover:bg-slate-200 transition-colors text-slate-500 hover:text-red-600 disabled:opacity-40"
        >
          <Eraser className="w-3.5 h-3.5" />
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsSourceMode(!isSourceMode)}
            className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
              isSourceMode
                ? "bg-slate-800 text-[#DFBA73]"
                : "bg-slate-200 hover:bg-slate-300 text-slate-700"
            }`}
            title="Chuyển đổi giữa Soạn thảo trực quan và Xem mã HTML"
          >
            <Code className="w-3.5 h-3.5" />
            <span>{isSourceMode ? "Xem Trực Quan" : "Xem Mã HTML"}</span>
          </button>
        </div>
      </div>

      {/* Vùng soạn thảo */}
      {isSourceMode ? (
        <textarea
          rows={14}
          value={htmlContent}
          onChange={handleSourceChange}
          placeholder="Mã HTML bài viết..."
          className="w-full p-4 font-mono text-xs leading-relaxed text-slate-800 bg-slate-900 text-emerald-400 focus:outline-none"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          data-placeholder={placeholder || "Dán nội dung bài viết từ Word, Google Docs hoặc soạn thảo tại đây..."}
          className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto text-slate-800 text-[14px] leading-relaxed focus:outline-none article-rich-content empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:italic"
        />
      )}

      {/* Thanh hướng dẫn nhỏ bên dưới */}
      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          💡 <strong>Mẹo:</strong> Bạn có thể copy trực tiếp từ Word, Google Docs hoặc web khác rồi bấm <strong>Ctrl+V / Cmd+V</strong>, toàn bộ in đậm, danh sách và tiêu đề sẽ được giữ nguyên 100%!
        </span>
        <span className="font-mono text-[10px] text-slate-400">WYSIWYG Pro</span>
      </div>
    </div>
  );
}
