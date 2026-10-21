"use client";

import React, { useRef, useEffect } from "react";
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
 * Làm sạch mã HTML từ Word / Google Docs / Website
 * ĐẢM BẢO 100% MỌI CHỮ IN ĐẬM ĐƯỢC GIỮ NGUYÊN (thẻ strong, b, h1-h6, font-weight >= 600, class bold/semibold)
 */
function cleanPastedHtml(rawHtml: string): string {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return rawHtml;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    // 1. Xóa các thẻ rác hệ thống (script, style, meta, link, xml, o:p của Word)
    doc
      .querySelectorAll("script, style, meta, link, xml, o\\:p")
      .forEach((el) => el.remove());

    // 2. Chuyển đổi H1 thành H2 (chuẩn SEO: mỗi bài viết chỉ có 1 thẻ H1 duy nhất)
    doc.querySelectorAll("h1").forEach((h1) => {
      const h2 = doc.createElement("h2");
      h2.innerHTML = h1.innerHTML;
      h1.parentNode?.replaceChild(h2, h1);
    });

    // 3. Quét TẤT CẢ các thẻ để phát hiện in đậm (font-weight >= 600, bold, class bold)
    const allEls = Array.from(doc.body.querySelectorAll("*"));
    for (const el of allEls) {
      if (!el.parentNode) continue;
      const htmlEl = el as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      const styleAttr = el.getAttribute("style") || "";
      const classAttr = el.getAttribute("class") || "";

      // Kiểm tra in đậm từ MỌI nguồn:
      const styleWeight = htmlEl.style?.fontWeight || "";
      const isBoldStyle =
        styleWeight === "bold" ||
        styleWeight === "bolder" ||
        parseInt(styleWeight, 10) >= 600 ||
        /font-weight\s*:\s*(?:bold|bolder|[6-9]\d{2})/i.test(styleAttr);

      const isBoldClass =
        /\b(?:bold|font-bold|font-semibold|fw-bold|fw-bolder|semibold)\b/i.test(classAttr);

      const isHeadingTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName);

      const isBold = isBoldStyle || isBoldClass || tagName === "b" || tagName === "strong";

      // Kiểm tra in nghiêng
      const styleStyle = htmlEl.style?.fontStyle || "";
      const isItalic =
        styleStyle === "italic" ||
        styleStyle === "oblique" ||
        /font-style\s*:\s*italic/i.test(styleAttr) ||
        /\b(?:italic|fst-italic)\b/i.test(classAttr) ||
        tagName === "i" ||
        tagName === "em";

      // Kiểm tra gạch chân
      const textDecor = htmlEl.style?.textDecoration || "";
      const isUnderline =
        textDecor.includes("underline") ||
        /text-decoration\s*:[^;]*underline/i.test(styleAttr) ||
        /\b(?:underline|text-decoration-underline)\b/i.test(classAttr) ||
        tagName === "u";

      // Nếu phần tử có định dạng in đậm và chưa được bọc trong strong/b/heading
      if (isBold && tagName !== "strong" && tagName !== "b" && !isHeadingTag) {
        if (!el.closest("strong") && !el.closest("b") && !el.closest("h1, h2, h3, h4, h5, h6")) {
          const strong = doc.createElement("strong");
          strong.innerHTML = el.innerHTML;
          el.innerHTML = "";
          el.appendChild(strong);
        }
      }

      // Xử lý in nghiêng
      if (isItalic && tagName !== "em" && tagName !== "i") {
        if (!el.closest("em") && !el.closest("i")) {
          const em = doc.createElement("em");
          em.innerHTML = el.innerHTML;
          el.innerHTML = "";
          el.appendChild(em);
        }
      }

      // Xử lý gạch chân
      if (isUnderline && tagName !== "u") {
        if (!el.closest("u")) {
          const u = doc.createElement("u");
          u.innerHTML = el.innerHTML;
          el.innerHTML = "";
          el.appendChild(u);
        }
      }
    }

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

    // 5. Giải phóng các thẻ font và span không cần thiết
    doc.querySelectorAll("font, span").forEach((sp) => {
      const parent = sp.parentNode;
      if (parent) {
        while (sp.firstChild) {
          parent.insertBefore(sp.firstChild, sp);
        }
        parent.removeChild(sp);
      }
    });

    // 6. Làm sạch thuộc tính rác, chỉ giữ lại các thuộc tính có ích
    const allowedAttrs = ["href", "src", "alt", "title", "colspan", "rowspan", "target"];
    doc.querySelectorAll("*").forEach((el) => {
      const htmlEl = el as HTMLElement;
      const textAlign = htmlEl.style?.textAlign;
      const color = htmlEl.style?.color;

      const attrs = Array.from(el.attributes);
      for (const attr of attrs) {
        if (!allowedAttrs.includes(attr.name.toLowerCase())) {
          el.removeAttribute(attr.name);
        }
      }

      // Giữ căn lề nếu có
      if (textAlign && ["center", "right", "justify", "left"].includes(textAlign)) {
        htmlEl.style.textAlign = textAlign;
      }
      // Giữ màu chữ nổi bật (như màu xanh của câu hỏi)
      if (color && !/rgb\(0,\s*0,\s*0\)|#000000|#000/i.test(color)) {
        htmlEl.style.color = color;
      }
    });

    return doc.body.innerHTML;
  } catch (err) {
    console.error("Lỗi khi xử lý HTML dán:", err);
    return rawHtml;
  }
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Đồng bộ giá trị từ ngoài vào editor khi khởi tạo hoặc thay đổi bài viết
  useEffect(() => {
    if (editorRef.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const exec = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      onChange(updated);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML;
      onChange(updated);
    }
  };

  // XỬ LÝ SỰ KIỆN PASTE (DÁN VĂN BẢN TỪ WORD / GOOGLE DOCS / WEB / CHAT)
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    const clipboardHtml = e.clipboardData.getData("text/html");
    const clipboardText = e.clipboardData.getData("text/plain");

    let contentToInsert = "";

    if (clipboardHtml && clipboardHtml.trim()) {
      // Có định dạng HTML phong phú (từ Word, Docs, Website)
      contentToInsert = cleanPastedHtml(clipboardHtml);
    } else if (clipboardText && clipboardText.trim()) {
      // Dán dạng plain text: tự động nhận diện markdown và tiêu đề câu hỏi/mục
      const paragraphs = clipboardText
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

      contentToInsert = paragraphs
        .map((p) => {
          let line = p;
          // Chuyển markdown **in đậm** thành <strong>
          line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          line = line.replace(/__(.*?)__/g, "<strong>$1</strong>");
          // Chuyển markdown *in nghiêng* thành <em>
          line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
          line = line.replace(/_(.*?)_/g, "<em>$1</em>");

          if (line.startsWith("## ")) {
            return `<h2>${line.replace(/^##\s+/, "")}</h2>`;
          }
          if (line.startsWith("### ")) {
            return `<h3>${line.replace(/^###\s+/, "")}</h3>`;
          }
          if (line.startsWith("- ")) {
            const listItems = line
              .split(/\r?\n/)
              .map((li) => `<li>${li.replace(/^-\s+/, "")}</li>`)
              .join("");
            return `<ul>${listItems}</ul>`;
          }

          // Tự động nhận diện dòng tiêu đề câu hỏi / mục có số thứ tự (ví dụ: "8. Garbage Collector hoạt động thế nào?", "Điều 1. ...")
          const isNumberedHeading =
            /^(\d+[\.\)]\s+[^.!?\n]{3,120}\??|\b(?:Câu|Bài|Phần|Mục|Điều|Khoản)\s+\d+[^:\n]*:?[^\n]{0,80})$/i.test(
              p.trim()
            );

          if (isNumberedHeading && !line.includes("<strong>")) {
            return `<p><strong>${line}</strong></p>`;
          }

          return `<p>${line.replace(/\r?\n/g, "<br>")}</p>`;
        })
        .join("");
    }

    if (contentToInsert) {
      // Chèn an toàn tại vị trí con trỏ bằng Range API hiện đại
      const selection = window.getSelection();
      if (
        selection &&
        selection.rangeCount > 0 &&
        editorRef.current?.contains(selection.anchorNode)
      ) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = contentToInsert;
        const fragment = document.createDocumentFragment();
        let node: ChildNode | null;
        let lastNode: ChildNode | null = null;
        while ((node = tempDiv.firstChild)) {
          lastNode = fragment.appendChild(node);
        }
        range.insertNode(fragment);
        if (lastNode) {
          range.setStartAfter(lastNode);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        // Nếu không có con trỏ, chèn vào cuối
        if (editorRef.current) {
          editorRef.current.innerHTML += contentToInsert;
        }
      }
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
          className="p-1.5 rounded hover:bg-slate-200 transition-colors font-bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("italic")}
          title="In nghiêng (Ctrl+I)"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("underline")}
          title="Gạch chân (Ctrl+U)"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("formatBlock", "<h2>")}
          title="Tiêu đề mục lớn (H2)"
          className="px-2 py-1 rounded hover:bg-slate-200 transition-colors font-serif font-bold text-xs flex items-center gap-1"
        >
          <Heading2 className="w-3.5 h-3.5 text-[#96794F]" />
          <span>H2</span>
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<h3>")}
          title="Tiêu đề mục nhỏ (H3)"
          className="px-2 py-1 rounded hover:bg-slate-200 transition-colors font-serif font-bold text-xs flex items-center gap-1"
        >
          <Heading3 className="w-3.5 h-3.5 text-slate-600" />
          <span>H3</span>
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<p>")}
          title="Đoạn văn bình thường (Paragraph)"
          className="px-1.5 py-1 rounded hover:bg-slate-200 transition-colors font-sans text-xs"
        >
          ¶ Văn bản
        </button>

        <span className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          title="Danh sách gạch đầu dòng"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          title="Danh sách đánh số (1, 2, 3)"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("formatBlock", "<blockquote>")}
          title="Đoạn trích dẫn / Lời khuyên luật sư"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleAddLink}
          title="Chèn liên kết đường dẫn"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() => exec("justifyLeft")}
          title="Căn trái"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyCenter")}
          title="Căn giữa"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("justifyFull")}
          title="Căn đều 2 bên"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => exec("removeFormat")}
          title="Xóa định dạng rác"
          className="p-1.5 rounded hover:bg-slate-200 transition-colors text-slate-500 hover:text-red-600"
        >
          <Eraser className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Vùng soạn thảo trực quan WYSIWYG */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={
          placeholder ||
          "Dán nội dung bài viết từ Word, Google Docs hoặc soạn thảo tại đây..."
        }
        className="p-4 min-h-[300px] max-h-[550px] overflow-y-auto text-slate-800 text-[14.5px] leading-relaxed focus:outline-none article-rich-content empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:italic"
      />

      {/* Thanh hướng dẫn nhỏ bên dưới */}
      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          💡 <strong>Mẹo:</strong> Bạn có thể copy trực tiếp từ Word, Google Docs, Website rồi bấm <strong>Ctrl+V / Cmd+V</strong>, toàn bộ chữ in đậm, tiêu đề và danh sách sẽ được giữ nguyên 100%!
        </span>
        <span className="font-mono text-[10px] text-slate-400">WYSIWYG Direct</span>
      </div>
    </div>
  );
}
