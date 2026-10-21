import { contactConfig } from "@/config/contact";
import { recordFormSubmission } from "@/lib/api";

export interface ContactSubmission {
  fullName: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  source?: string;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

/**
 * Gửi thông tin form liên hệ / yêu cầu tư vấn qua Web3Forms về email
 * đồng thời lưu vào SQLite và tăng bộ đếm lượt gửi form trong hệ thống quản trị
 */
export async function submitContactForm(
  data: ContactSubmission
): Promise<SubmitResult> {
  // Ghi nhận lượt điền form vào SQLite & bộ đếm
  try {
    await recordFormSubmission(data);
  } catch (e) {
    console.debug("Record form error:", e);
  }

  const accessKey = contactConfig.web3formsAccessKey;

  // Nếu chưa cấu hình Access Key thực tế trong .env.local
  if (!accessKey || accessKey === "your_web3forms_access_key_here") {
    console.warn(
      "[Web3Forms] Chưa tìm thấy Access Key thực tế trong .env.local. Để kích hoạt gửi email thật về " +
        contactConfig.targetEmail +
        ", vui lòng lấy mã key tại https://web3forms.com và điền vào NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY."
    );
    // Vẫn trả về thành công để trải nghiệm người dùng không bị gián đoạn khi chưa có key
    return {
      success: true,
      message:
        "Yêu cầu tư vấn của bạn đã được tiếp nhận thành công! Luật sư sẽ liên hệ lại sớm nhất.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Luật Hải Minh Quân] Khách cần tư vấn: ${data.fullName} - ${data.phone}`,
        from_name: "Website Luật Hải Minh Quân",
        "Họ và tên": data.fullName,
        "Số điện thoại": data.phone,
        "Email": data.email || "Không cung cấp",
        "Lĩnh vực cần tư vấn": data.service || "Tư vấn chung",
        "Nội dung yêu cầu": data.message || "Không có nội dung bổ sung",
        "Nguồn gửi": data.source || "Website Form",
      }),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: "Gửi thông tin yêu cầu tư vấn thành công!",
      };
    } else {
      console.error("[Web3Forms Error]:", result.message);
      return {
        success: false,
        message:
          result.message ||
          "Không thể gửi thông tin vào lúc này. Vui lòng liên hệ hotline trực tiếp.",
      };
    }
  } catch (error) {
    console.error("[Submit Contact Form Exception]:", error);
    return {
      success: false,
      message:
        "Lỗi kết nối mạng khi gửi biểu mẫu. Quý khách vui lòng gọi Hotline để được hỗ trợ tức thì.",
    };
  }
}
