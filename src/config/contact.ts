/**
 * Cấu hình hệ thống nhận thông tin tư vấn / liên hệ
 * Các biến được nạp tự động từ file .env.local hoặc môi trường triển khai
 */
export const contactConfig = {
  // Web3Forms Access Key (lấy miễn phí tại https://web3forms.com với email luathaiminhquan@gmail.com)
  web3formsAccessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "86591422-94d3-4de0-b420-4def7c09ff54",

  targetEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "luathaiminhquan@gmail.com",

  // Tiêu đề email gửi đến hòm thư
  emailSubject: "[Luật Hải Minh Quân] Có khách hàng mới yêu cầu tư vấn pháp lý",
};
