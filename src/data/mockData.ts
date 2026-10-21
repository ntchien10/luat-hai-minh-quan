export interface FeatureBox {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  flaticonClass: string;
}

export interface PracticeService {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  shortDesc: string;
  iconName: string;
  href: string;
  hoverImage?: string;
  overview?: string;
  scope?: string[];
  process?: { step: string; title: string; desc: string }[];
  faq?: { question: string; answer: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  link: string;
  phone?: string;
  email?: string;
  cardNo?: string;
  qualifications?: string[];
  experience?: string[];
  expertise?: string[];
  bio?: string;
}

export interface PressItem {
  id: string;
  name: string;
  logoUrl: string;
  articleTitle: string;
  articleUrl: string;
}

export interface BlogItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  imageUrl: string;
  href: string;
  excerpt?: string;
  category?: string;
  serviceSlug?: string;
  content?: string;
}

import { allArticlesData } from "./articlesData";

// 1. 3 Khối Feature Box ngay dưới Slider của luatvanbao.com
export const featureBoxes: FeatureBox[] = [
  {
    id: "luat-su-kinh-nghiem",
    title: "Luật sư kinh nghiệm",
    desc: "Luật Hải Minh Quân có đội ngũ luật sư giỏi nhiều năm kinh nghiệm luôn tận tâm với các công việc mà Quý khách hàng giao.",
    iconName: "UserCheck",
    flaticonClass: "flaticon-teamwork",
  },
  {
    id: "bao-mat-thong-tin",
    title: "Bảo Mật Thông Tin",
    desc: "Luật Hải Minh Quân cam kết mọi thông tin và các yêu cầu của Quý khách hàng đều được bảo mật tuyệt đối.",
    iconName: "Lock",
    flaticonClass: "flaticon-fingerprint",
  },
  {
    id: "tu-van-luat-247",
    title: "Tư Vấn Luật 24/7",
    desc: "Luật Hải Minh Quân tư vấn 24/7 cho Quý khách hàng qua Hotline, hoặc mời Quý khách hàng đến trực tiếp văn phòng.",
    iconName: "Clock",
    flaticonClass: "flaticon-on-time-support",
  },
];

// 2. Danh mục 9 Dịch vụ chuẩn theo Danh thiếp Giám đốc Ls. Đỗ Thị Thanh Hải + Dịch vụ khác
export const practiceServices: PracticeService[] = [
  {
    id: "luat-dan-su",
    slug: "luat-dan-su",
    title: "Luật dân sự",
    seoTitle: "Luật Sư Tư Vấn & Giải Quyết Tranh Chấp Dân Sự Tại Hà Nội",
    shortDesc: "Tư vấn và đại diện giải quyết tranh chấp hợp đồng, giao dịch dân sự, quyền sở hữu tài sản, thừa kế di sản và bồi thường thiệt hại.",
    iconName: "Scale",
    href: "/service/luat-dan-su/",
    hoverImage: "/images/services/luat-dan-su.webp",
    overview: "Dịch vụ Luật dân sự tại Công ty Luật TNHH Hải Minh Quân đại diện và bảo vệ quyền, lợi ích hợp pháp tối đa cho thân chủ trong các quan hệ dân sự, giao dịch hợp đồng và phân chia di sản thừa kế. Với bề dày kinh nghiệm thực chiến tại Tòa án nhân dân các cấp trên địa bàn Hà Nội và toàn quốc, chúng tôi hỗ trợ khách hàng hóa giải rủi ro, thu hồi quyền lợi và bảo vệ khối tài sản chính đáng.",
    scope: [
      "Tư vấn và đại diện giải quyết tranh chấp hợp đồng mua bán, hợp đồng vay mượn tài sản, hợp đồng ủy quyền và hợp đồng hợp tác",
      "Tư vấn lập di chúc hợp pháp, khai nhận di sản thừa kế và đại diện giải quyết tranh chấp thừa kế theo di chúc hoặc theo pháp luật",
      "Bảo vệ quyền sở hữu, quyền chiếm hữu, sử dụng và định đoạt tài sản hợp pháp của cá nhân, tổ chức",
      "Yêu cầu bồi thường thiệt hại ngoài hợp đồng do danh dự, nhân phẩm, uy tín, sức khỏe hoặc tài sản bị xâm phạm",
      "Đại diện theo ủy quyền tham gia toàn bộ quá trình hòa giải, tố tụng tại Tòa án và giai đoạn thi hành án dân sự",
    ],
    process: [
      { step: "01", title: "Tiếp nhận thông tin & Thẩm định vụ việc", desc: "Luật sư lắng nghe thân chủ, rà soát hồ sơ chứng cứ và xác định rõ yêu cầu, quyền lợi pháp lý." },
      { step: "02", title: "Xây dựng phương án đàm phán hoặc tranh tụng", desc: "Đánh giá căn cứ pháp luật, cân nhắc ưu tiên hòa giải đàm phán trước khi khởi kiện nhằm tiết kiệm chi phí." },
      { step: "03", title: "Soạn thảo văn bản pháp lý & Thu thập chứng cứ", desc: "Soạn đơn khởi kiện, bản tự khai, thu thập thêm các tài liệu có lợi và nộp hồ sơ tại Tòa án có thẩm quyền." },
      { step: "04", title: "Đại diện tham gia tố tụng & Thi hành án", desc: "Luật sư trực tiếp tham gia các buổi làm việc, phiên hòa giải và phiên tòa xét xử để bảo vệ quyền lợi tối đa." },
    ],
    faq: [
      { question: "Thời gian giải quyết một vụ án dân sự kéo dài bao lâu?", answer: "Theo quy định của Bộ luật Tố tụng dân sự, thời hạn chuẩn bị xét xử thường từ 2 đến 4 tháng (vụ án phức tạp có thể gia hạn). Đội ngũ luật sư của Luật Hải Minh Quân luôn nỗ lực đẩy nhanh tiến độ thu thập chứng cứ để rút ngắn tối đa thời gian cho khách hàng." },
      { question: "Khách hàng bận rộn có thể ủy quyền toàn bộ cho Luật sư không?", answer: "Hoàn toàn được. Thân chủ có thể ủy quyền cho Luật sư thay mặt tham gia toàn bộ quá trình làm việc, thu thập tài liệu và tranh tụng tại Tòa án, giúp khách hàng tiết kiệm tối đa thời gian và công sức." },
    ],
  },
  {
    id: "luat-hinh-su",
    slug: "luat-hinh-su",
    title: "Luật hình sự",
    seoTitle: "Luật Sư Bào Chữa & Bảo Vệ Vụ Án Hình Sự Tại Hà Nội",
    shortDesc: "Bào chữa cho người bị tạm giữ, bị can, bị cáo và bảo vệ quyền lợi hợp pháp của người bị hại trong tất cả giai đoạn tố tụng hình sự, chống oan sai.",
    iconName: "ShieldAlert",
    href: "/service/luat-hinh-su/",
    hoverImage: "/images/services/luat-hinh-su.webp",
    overview: "Dịch vụ Luật hình sự của Công ty Luật TNHH Hải Minh Quân cung cấp giải pháp bào chữa và bảo vệ quyền lợi hợp pháp kịp thời, quyết liệt cho người bị tạm giữ, bị can, bị cáo và người bị hại. Chúng tôi có mặt ngay từ những giờ đầu tiên của giai đoạn điều tra, làm việc trực tiếp tại trại tạm giam và cơ quan công an để chống oan sai, đảm bảo quyền con người và hướng tới phán quyết công bằng, đúng pháp luật.",
    scope: [
      "Tham gia tố tụng từ giai đoạn tiền khởi tố, lấy lời khai, hỏi cung bị can tại cơ quan điều tra",
      "Bào chữa cho bị can, bị cáo trong các tội phạm kinh tế, chức vụ, ma túy, trật tự xã hội và xâm phạm tính mạng sức khỏe",
      "Bảo vệ quyền và lợi ích hợp pháp cho người bị hại, người có quyền lợi nghĩa vụ liên quan để yêu cầu bồi thường thỏa đáng",
      "Soạn thảo đơn xin bảo lãnh tại ngoại, đơn kiến nghị khởi tố, đơn kêu oan và đơn khiếu nại quyết định tố tụng trái luật",
      "Đại diện tham gia các phiên tòa sơ thẩm, phúc thẩm, giám đốc thẩm và tái thẩm trên toàn quốc",
    ],
    process: [
      { step: "01", title: "Tiếp nhận khẩn cấp 24/7", desc: "Luật sư nắm bắt thông tin bắt giữ hoặc khởi tố, kiểm tra tính pháp lý của lệnh bắt, tạm giam, tạm giữ." },
      { step: "02", title: "Đăng ký bào chữa & Tiếp cận bị can", desc: "Làm thủ tục đăng ký người bào chữa tại Cơ quan điều tra, vào trại tạm giam thăm gặp và hướng dẫn khai báo đúng sự thật." },
      { step: "03", title: "Độc lập thu thập chứng cứ gỡ tội", desc: "Độc lập thu thập chứng cứ ngoại phạm, tình tiết giảm nhẹ trách nhiệm hình sự và kiến nghị cơ quan tiến hành tố tụng." },
      { step: "04", title: "Tranh tụng quyết liệt tại phiên tòa", desc: "Tham gia thẩm vấn công khai, tranh luận quyết liệt với Viện kiểm sát để bảo vệ quyền con người và giảm nhẹ hình phạt tối đa." },
    ],
    faq: [
      { question: "Khi nào người nhà nên mời luật sư hình sự?", answer: "Càng sớm càng tốt, lý tưởng nhất là ngay từ thời điểm bị tạm giữ, bắt giữ hoặc nhận giấy triệu tập của cơ quan điều tra. Sự hiện diện kịp thời của Luật sư giúp bảo đảm thân chủ không bị bức cung, nhục hình và bảo toàn quyền lợi hợp pháp." },
      { question: "Luật sư có thể vào trại tạm giam thăm gặp bị can không?", answer: "Có. Sau khi đăng ký người bào chữa theo quy định của Bộ luật Tố tụng hình sự, Luật sư của Luật Hải Minh Quân có quyền vào trại tạm giam để làm việc, trao đổi và hướng dẫn bị can khai báo đúng sự thật khách quan." },
    ],
  },
  {
    id: "luat-hanh-chinh",
    slug: "luat-hanh-chinh",
    title: "Luật hành chính",
    seoTitle: "Luật Sư Tư Vấn Khiếu Nại & Khởi Kiện Hành Chính Tại Hà Nội",
    shortDesc: "Tư vấn và đại diện khiếu nại, khởi kiện các quyết định hành chính, hành vi hành chính trái pháp luật của cơ quan nhà nước các cấp.",
    iconName: "Building2",
    href: "/service/luat-hanh-chinh/",
    hoverImage: "/images/services/luat-hanh-chinh.webp",
    overview: "Luật Hải Minh Quân chuyên sâu tư vấn và đại diện thân chủ khiếu nại, khởi kiện các quyết định hành chính, hành vi hành chính trái pháp luật của cơ quan nhà nước và người có thẩm quyền. Với sự am hiểu sâu sắc về Luật Tố tụng Hành chính và các quy định quản lý đất đai, quy hoạch, đền bù giải phóng mặt bằng, chúng tôi giúp người dân và doanh nghiệp bảo vệ tài sản, quyền lợi hợp pháp trước cơ quan công quyền.",
    scope: [
      "Khiếu nại và khởi kiện quyết định thu hồi đất, quyết định phê duyệt phương án bồi thường, hỗ trợ tái định cư trái pháp luật",
      "Khiếu nại quyết định xử phạt vi phạm hành chính, quyết định áp dụng biện pháp khắc phục hậu quả, cưỡng chế tháo dỡ",
      "Khởi kiện hành vi hành chính chậm trễ cấp giấy chứng nhận quyền sử dụng đất hoặc từ chối giải quyết hồ sơ trái quy định",
      "Đại diện tham gia quá trình đối thoại trực tiếp giữa người khởi kiện và người bị kiện tại Tòa án",
      "Tham gia phiên tòa xét xử sơ thẩm, phúc thẩm để yêu cầu hủy bỏ quyết định hành chính trái luật và đòi bồi thường thiệt hại",
    ],
    process: [
      { step: "01", title: "Thẩm định tính hợp pháp của quyết định", desc: "Kiểm tra thẩm quyền, căn cứ pháp lý và trình tự ban hành của quyết định hành chính bị khiếu kiện." },
      { step: "02", title: "Soạn thảo đơn khiếu nại hoặc khởi kiện", desc: "Lựa chọn phương án khiếu nại lần 1, lần 2 hoặc khởi kiện trực tiếp ra Tòa án có thẩm quyền để tối ưu thời gian." },
      { step: "03", title: "Tham gia quá trình đối thoại", desc: "Đại diện thân chủ làm việc, đối thoại với đại diện cơ quan nhà nước nhằm tháo gỡ vướng mắc trên tinh thần thượng tôn pháp luật." },
      { step: "04", title: "Tranh tụng tại phiên tòa hành chính", desc: "Bảo vệ quan điểm khởi kiện, chứng minh thiệt hại thực tế và yêu cầu hủy bỏ quyết định hành chính trái luật, bồi thường thiệt hại." },
    ],
    faq: [
      { question: "Có bắt buộc phải khiếu nại trước khi khởi kiện ra Tòa án hành chính không?", answer: "Theo Luật Tố tụng hành chính, người dân hoặc doanh nghiệp có quyền khởi kiện trực tiếp ra Tòa án nhân dân có thẩm quyền mà không bắt buộc phải qua bước khiếu nại hành chính tại cơ quan đã ban hành quyết định." },
      { question: "Thời hiệu khởi kiện vụ án hành chính là bao lâu?", answer: "Thời hiệu khởi kiện thông thường là 01 năm kể từ ngày nhận được hoặc biết được quyết định hành chính, hành vi hành chính. Quý khách hàng cần liên hệ sớm với luật sư để tránh hết thời hiệu." },
    ],
  },
  {
    id: "luat-dat-dai",
    slug: "luat-dat-dai",
    title: "Luật đất đai",
    seoTitle: "Luật Sư Tư Vấn & Giải Quyết Tranh Chấp Đất Đai Tại Hà Nội",
    shortDesc: "Tư vấn thủ tục cấp sổ đỏ lần đầu theo Luật Đất đai 2024, chuyển nhượng, tặng cho, giải quyết tranh chấp ranh giới, bồi thường thu hồi đất.",
    iconName: "MapPin",
    href: "/service/luat-dat-dai/",
    hoverImage: "/images/services/luat-dat-dai.webp",
    overview: "Luật Đất đai 2024 có hiệu lực mở ra nhiều quy định mới về cấp Giấy chứng nhận quyền sử dụng đất, thu hồi đất, bảng giá đất và định giá bồi thường. Công ty Luật TNHH Hải Minh Quân với đội ngũ luật sư chuyên sâu về bất động sản sẵn sàng tư vấn, hỗ trợ trọn gói thủ tục hành chính đất đai và đại diện giải quyết mọi tranh chấp đất đai phức tạp nhằm bảo toàn tài sản lớn cho thân chủ.",
    scope: [
      "Tư vấn và thực hiện thủ tục cấp Giấy chứng nhận quyền sử dụng đất (Sổ đỏ/Sổ hồng) lần đầu cho đất không có giấy tờ, đất xen kẹt",
      "Tư vấn soạn thảo, công chứng và sang tên hợp đồng mua bán, chuyển nhượng, tặng cho, thừa kế quyền sử dụng đất",
      "Giải quyết tranh chấp ranh giới thửa đất, lối đi chung, tranh chấp mua bán đất bằng giấy viết tay",
      "Tư vấn khiếu nại phương án bồi thường, hỗ trợ tái định cư khi nhà nước thu hồi đất để đảm bảo giá đền bù sát thị trường",
      "Đại diện hòa giải tranh chấp đất đai tại UBND cấp xã, phường và tranh tụng tại Tòa án nhân dân các cấp",
    ],
    process: [
      { step: "01", title: "Kiểm tra pháp lý & Trích lục hồ sơ", desc: "Kiểm tra quy hoạch, nguồn gốc đất đai và thu thập hồ sơ địa chính từ các thời kỳ để củng cố căn cứ." },
      { step: "02", title: "Tư vấn phương án giải quyết tối ưu", desc: "Xác định rõ đường lối giải quyết thông qua cấp phép hành chính, hòa giải nội bộ hoặc khởi kiện Tòa án." },
      { step: "03", title: "Soạn thảo hồ sơ & Nộp cơ quan thẩm quyền", desc: "Hoàn thiện hồ sơ cấp sổ đỏ hoặc đơn khởi kiện tranh chấp nộp tại Văn phòng đăng ký đất đai / Tòa án." },
      { step: "04", title: "Đồng hành đến khi nhận kết quả", desc: "Theo sát tiến độ thẩm định, đo đạc thực địa và bảo vệ quyền sử dụng đất hợp pháp cho thân chủ." },
    ],
    faq: [
      { question: "Đất sử dụng trước năm 2014 không có giấy tờ theo Luật Đất đai 2024 có được cấp Sổ đỏ không?", answer: "Theo Luật Đất đai 2024, hộ gia đình, cá nhân sử dụng đất trước ngày 01/07/2014 không có giấy tờ, nếu được UBND cấp xã xác nhận là không có tranh chấp và phù hợp với quy hoạch thì sẽ được xem xét cấp Sổ đỏ. Luật sư Hải Minh Quân sẽ hỗ trợ thẩm định và hoàn thiện bộ hồ sơ hoàn chỉnh." },
      { question: "Tranh chấp đất đai có bắt buộc phải hòa giải tại UBND xã không?", answer: "Tranh chấp ai là người có quyền sử dụng đất bắt buộc phải qua hòa giải tại UBND cấp xã/phường nơi có đất trước khi khởi kiện ra Tòa án. Các tranh chấp về giao dịch chuyển nhượng, thừa kế đất đai thì không bắt buộc qua bước này." },
    ],
  },
  {
    id: "luat-hon-nhan-va-gia-dinh",
    slug: "luat-hon-nhan-va-gia-dinh",
    title: "Luật hôn nhân và gia đình",
    seoTitle: "Luật Sư Tư Vấn Hôn Nhân & Gia Đình Uy Tín Tại Hà Nội",
    shortDesc: "Tư vấn ly hôn thuận tình, ly hôn đơn phương nhanh, phân chia tài sản chung, tranh chấp quyền nuôi con, cấp dưỡng và yếu tố nước ngoài.",
    iconName: "Users",
    href: "/service/luat-hon-nhan-va-gia-dinh/",
    hoverImage: "/images/services/luat-hon-nhan-va-gia-dinh.webp",
    overview: "Hôn nhân và gia đình là lĩnh vực pháp lý tế nhị, đòi hỏi luật sư không chỉ vững vàng chuyên môn mà còn phải thấu hiểu và bảo mật thông tin tuyệt đối. Công ty Luật TNHH Hải Minh Quân cung cấp dịch vụ tư vấn ly hôn thuận tình nhanh gọn, đại diện giải quyết ly hôn đơn phương, tranh chấp quyền nuôi con, cấp dưỡng và bảo vệ quyền lợi tài sản hợp pháp của thân chủ.",
    scope: [
      "Tư vấn và thực hiện thủ tục ly hôn thuận tình nhanh chóng, chỉ cần lên Tòa 01 lần duy nhất",
      "Đại diện tham gia tố tụng trong các vụ án ly hôn đơn phương có tranh chấp gay gắt về tài sản hoặc quyền nuôi con",
      "Tư vấn thu thập chứng cứ chứng minh điều kiện kinh tế, thời gian chăm sóc để giành quyền trực tiếp nuôi con",
      "Giải quyết phân chia tài sản chung vợ chồng trong thời kỳ hôn nhân, tài sản bố mẹ tặng cho riêng và các khoản nợ chung",
      "Tư vấn ly hôn có yếu tố nước ngoài (vợ hoặc chồng đang định cư, làm việc tại nước ngoài hoặc vắng mặt)",
    ],
    process: [
      { step: "01", title: "Lắng nghe tâm tư & Đánh giá hồ sơ", desc: "Luật sư lắng nghe hoàn cảnh cụ thể, đánh giá tài liệu hiện có và tư vấn phương án giải quyết hài hòa nhất." },
      { step: "02", title: "Soạn thảo hồ sơ ly hôn chuẩn mực", desc: "Soạn đơn ly hôn, bản tự khai và hướng dẫn thu thập đầy đủ tài liệu nhân thân, chứng minh tài sản chung." },
      { step: "03", title: "Đại diện làm việc với Tòa án", desc: "Nộp hồ sơ và trực tiếp làm việc với Tòa án có thẩm quyền để đẩy nhanh tiến độ thụ lý và hòa giải." },
      { step: "04", title: "Tham gia phiên Tòa bảo vệ quyền lợi", desc: "Đồng hành cùng thân chủ tại phiên Tòa để bảo vệ quyền trực tiếp nuôi con và phân chia tài sản công bằng." },
    ],
    faq: [
      { question: "Ly hôn thuận tình mất bao lâu tại Luật Hải Minh Quân?", answer: "Với sự hỗ trợ soạn thảo hồ sơ chuẩn mực và liên hệ Tòa án chuyên nghiệp của Luật Hải Minh Quân, thủ tục ly hôn thuận tình có thể được giải quyết nhanh chóng trong vòng 7 - 15 ngày làm việc, các bên chỉ cần lên Tòa 01 lần." },
      { question: "Vợ hoặc chồng giấu giấy đăng ký kết hôn thì có ly hôn được không?", answer: "Hoàn toàn được. Luật sư của chúng tôi sẽ hướng dẫn hoặc trực tiếp hỗ trợ trích lục bản sao Giấy chứng nhận đăng ký kết hôn tại UBND có thẩm quyền để hoàn thiện hồ sơ nộp Tòa án." },
    ],
  },
  {
    id: "luat-so-huu-tri-tue",
    slug: "luat-so-huu-tri-tue",
    title: "Luật sở hữu trí tuệ",
    seoTitle: "Đại Diện Sở Hữu Trí Tuệ & Đăng Ký Bảo Hộ Nhãn Hiệu Tại Hà Nội",
    shortDesc: "Đăng ký nhãn hiệu (Logo), bản quyền tác giả, phần mềm máy tính, kiểu dáng công nghiệp, xử lý vi phạm thương hiệu độc quyền.",
    iconName: "Award",
    href: "/service/luat-so-huu-tri-tue/",
    hoverImage: "/images/services/luat-so-huu-tri-tue.webp",
    overview: "Tài sản trí tuệ là cốt lõi của giá trị thương hiệu trong kỷ nguyên kinh tế số. Công ty Luật TNHH Hải Minh Quân cung cấp dịch vụ đại diện sở hữu công nghiệp toàn diện: tra cứu khả năng bảo hộ, nộp đơn đăng ký nhãn hiệu (Logo), bản quyền tác giả phần mềm, kiểu dáng công nghiệp, sáng chế và đại diện xử lý triệt để các hành vi làm giả, nhái nhãn hiệu và cạnh tranh không lành mạnh.",
    scope: [
      "Tra cứu chuyên sâu và đại diện nộp đơn đăng ký nhãn hiệu độc quyền (Logo thương hiệu) tại Cục Sở hữu trí tuệ",
      "Đăng ký bản quyền tác giả cho phần mềm máy tính, ứng dụng di động, tác phẩm mỹ thuật ứng dụng, bài viết, âm nhạc",
      "Đăng ký bảo hộ kiểu dáng công nghiệp, giải pháp hữu ích, sáng chế và bao bì sản phẩm độc quyền",
      "Soạn thảo hợp đồng chuyển nhượng quyền sở hữu trí tuệ, hợp đồng li-xăng (Franchise) và chuyển giao công nghệ",
      "Đại diện giám định sở hữu trí tuệ, phối hợp Quản lý thị trường, Thanh tra Bộ KH&CN xử lý hành vi xâm phạm quyền",
    ],
    process: [
      { step: "01", title: "Tra cứu & Đánh giá khả năng bảo hộ", desc: "Tra cứu sơ bộ và chuyên sâu trên cơ sở dữ liệu WIPO và Cục SHTT để tránh trùng lặp hoặc tương tự gây nhầm lẫn." },
      { step: "02", title: "Thiết lập danh mục sản phẩm & Hồ sơ", desc: "Phân loại nhóm hàng hóa dịch vụ theo Bảng phân loại Nice và lập tờ khai bảo hộ chuẩn xác." },
      { step: "03", title: "Theo dõi thẩm định đơn tại Cục SHTT", desc: "Đại diện xử lý các thông báo thẩm định hình thức, công bố đơn trên Công báo và thẩm định nội dung." },
      { step: "04", title: "Nhận văn bằng bảo hộ độc quyền", desc: "Bàn giao Giấy chứng nhận đăng ký nhãn hiệu/bản quyền chính thức và theo dõi bảo hộ lâu dài." },
    ],
    faq: [
      { question: "Đăng ký nhãn hiệu mất bao lâu để có văn bằng bảo hộ?", answer: "Theo Luật SHTT, thời gian thẩm định đơn nhãn hiệu qua các giai đoạn hình thức và nội dung thường kéo dài từ 12 - 18 tháng. Tuy nhiên ngay khi nộp đơn hợp lệ, quý khách sẽ có ngày ưu tiên (nguyên tắc nộp đơn đầu tiên) để ngăn chặn đối thủ đăng ký trước." },
      { question: "Đăng ký logo bản quyền tác giả khác gì đăng ký nhãn hiệu độc quyền?", answer: "Bản quyền tác giả bảo hộ hình thức thể hiện của tác phẩm mỹ thuật (tại Cục Bản quyền tác giả). Nhãn hiệu bảo hộ việc gắn logo đó lên nhóm sản phẩm, dịch vụ kinh doanh cụ thể để tránh đối thủ dùng tương tự (tại Cục Sở hữu trí tuệ). Doanh nghiệp nên đăng ký đồng thời cả hai để được bảo vệ toàn diện." },
    ],
  },
  {
    id: "luat-doanh-nghiep",
    slug: "luat-doanh-nghiep",
    title: "Luật doanh nghiệp",
    seoTitle: "Luật Sư Doanh Nghiệp & Tư Vấn Pháp Chế Nội Bộ Trọn Gói",
    shortDesc: "Tư vấn thành lập công ty, cơ cấu vốn, hợp đồng kinh tế thương mại, giải thể, M&A và dịch vụ luật sư nội bộ cho doanh nghiệp.",
    iconName: "Briefcase",
    href: "/service/luat-doanh-nghiep/",
    hoverImage: "/images/services/luat-doanh-nghiep.webp",
    overview: "Dịch vụ Luật doanh nghiệp của Luật Hải Minh Quân đóng vai trò như một bộ phận pháp chế nội bộ tinh nhuệ, giúp doanh nghiệp thiết lập hành lang pháp lý an toàn, loại bỏ triệt để rủi ro trong quản trị và kinh doanh. Chúng tôi đồng hành từ bước thành lập doanh nghiệp, soạn thảo hợp đồng thương mại, xử lý tranh chấp nội bộ cổ đông đến tái cấu trúc, mua bán sáp nhập và giải thể.",
    scope: [
      "Dịch vụ luật sư riêng trọn gói định kỳ tháng/quý/năm cho doanh nghiệp vừa và nhỏ (SMEs)",
      "Tư vấn thành lập công ty TNHH, cổ phần, chi nhánh, công ty con, đăng ký ngành nghề kinh doanh có điều kiện",
      "Soạn thảo, rà soát và đàm phán hợp đồng kinh tế, thương mại, đại lý phân phối, hợp tác đầu tư",
      "Tư vấn chuyển nhượng vốn góp, cổ phần, cơ cấu quản trị nội bộ và giải quyết xung đột cổ đông",
      "Tư vấn và thực hiện thủ tục tạm ngừng kinh doanh, giải thể công ty hoặc phá sản theo Luật Doanh nghiệp",
    ],
    process: [
      { step: "01", title: "Khảo sát hiện trạng & Nhu cầu doanh nghiệp", desc: "Rà soát điều lệ, cơ cấu cổ đông, hệ thống hợp đồng mẫu và quy chế lao động hiện hành của doanh nghiệp." },
      { step: "02", title: "Nhận diện & Cảnh báo rủi ro pháp lý", desc: "Chỉ ra các điểm xung đột tiềm ẩn trong giao kết hợp đồng hoặc quản trị nội bộ để kịp thời khắc phục." },
      { step: "03", title: "Xây dựng khung pháp lý an toàn", desc: "Soạn thảo văn bản, điều lệ, hợp đồng mẫu phù hợp với Luật Doanh nghiệp mới nhất và đặc thù ngành nghề." },
      { step: "04", title: "Hỗ trợ thường xuyên 24/7", desc: "Luật sư trực tiếp giải đáp mọi thắc mắc phát sinh qua điện thoại, email và tham gia đàm phán thương vụ lớn." },
    ],
    faq: [
      { question: "Chi phí thuê Luật sư nội bộ định kỳ so với tuyển nhân sự pháp chế thế nào?", answer: "Dịch vụ luật sư doanh nghiệp của Hải Minh Quân giúp doanh nghiệp tiết kiệm 60 - 70% chi phí so với việc trả lương, bảo hiểm cho nhân sự pháp chế toàn thời gian, đồng thời được phục vụ bởi cả một đội ngũ luật sư đa lĩnh vực dày dặn kinh nghiệm." },
      { question: "Thành lập công ty trọn gói tại Luật Hải Minh Quân mất bao nhiêu ngày?", answer: "Chỉ từ 3 - 5 ngày làm việc, quý khách sẽ nhận được Giấy chứng nhận đăng ký doanh nghiệp, con dấu pháp nhân và toàn bộ hồ sơ khai thuế ban đầu hợp lệ." },
    ],
  },
  {
    id: "luat-dau-tu",
    slug: "luat-dau-tu",
    title: "Luật đầu tư",
    seoTitle: "Luật Sư Tư Vấn Đầu Tư Trong Nước & Dự Án FDI Tại Việt Nam",
    shortDesc: "Cấp mới, điều chỉnh Giấy chứng nhận đầu tư (IRC), thẩm định pháp lý dự án (Due Diligence), M&A, liên doanh và ưu đãi đầu tư nước ngoài.",
    iconName: "TrendingUp",
    href: "/service/luat-dau-tu/",
    hoverImage: "/images/services/luat-dau-tu.webp",
    overview: "Luật Hải Minh Quân đồng hành cùng các nhà đầu tư trong nước và nước ngoài (FDI) trong mọi giai đoạn của dự án đầu tư tại Việt Nam. Chúng tôi cung cấp dịch vụ thẩm định pháp lý dự án (Due Diligence), xin cấp Giấy chứng nhận đăng ký đầu tư (IRC), thành lập doanh nghiệp có vốn nước ngoài, đàm phán hợp đồng liên doanh và tối ưu chính sách ưu đãi đầu tư, thuế, đất đai công nghiệp.",
    scope: [
      "Thẩm định pháp lý toàn diện địa điểm thực hiện dự án đầu tư, khu công nghiệp và đối tác liên doanh",
      "Thực hiện thủ tục xin cấp mới, điều chỉnh Giấy chứng nhận đăng ký đầu tư (IRC) cho nhà đầu tư FDI",
      "Tư vấn thành lập công ty 100% vốn nước ngoài hoặc công ty liên doanh phù hợp với cam kết WTO",
      "Hỗ trợ xin phê duyệt chủ trương đầu tư từ Thủ tướng Chính phủ, UBND cấp tỉnh và Ban Quản lý các KCN",
      "Tư vấn chuyển nhượng dự án đầu tư, mua bán sáp nhập M&A doanh nghiệp FDI",
    ],
    process: [
      { step: "01", title: "Tư vấn mô hình & Địa điểm đầu tư", desc: "Phân tích điều kiện tiếp cận thị trường của nhà đầu tư nước ngoài theo cam kết WTO và biểu cam kết FTA." },
      { step: "02", title: "Soạn thảo bộ hồ sơ đăng ký đầu tư", desc: "Hoàn thiện đề xuất dự án đầu tư, giải trình năng lực tài chính và phương án công nghệ môi trường chuẩn xác." },
      { step: "03", title: "Đại diện làm việc với Sở KH&ĐT, Ban Quản lý", desc: "Nộp hồ sơ, theo dõi tiến độ thẩm định và trực tiếp giải trình các yêu cầu chuyên môn từ cơ quan cấp phép." },
      { step: "04", title: "Bàn giao kết quả & Hỗ trợ sau cấp phép", desc: "Bàn giao Giấy chứng nhận đầu tư IRC, con dấu pháp nhân và tư vấn tuân thủ báo cáo định kỳ theo quy định." },
    ],
    faq: [
      { question: "Nhà đầu tư nước ngoài cần những điều kiện gì để đầu tư vào Việt Nam?", answer: "Tùy theo ngành nghề đăng ký, nhà đầu tư cần đáp ứng tỷ lệ sở hữu vốn theo cam kết WTO/FTA, chứng minh năng lực tài chính (sao kê ngân hàng hợp pháp hóa lãnh sự) và có địa điểm thực hiện dự án hợp pháp. Luật Hải Minh Quân sẽ hỗ trợ thẩm định chi tiết trước khi nộp hồ sơ." },
      { question: "Thời gian xin cấp Giấy chứng nhận đăng ký đầu tư (IRC) là bao lâu?", answer: "Theo luật định là 15 ngày làm việc kể từ ngày nhận đủ hồ sơ hợp lệ. Đội ngũ luật sư của chúng tôi sẽ đồng hành giải trình chuyên môn để bảo đảm tiến độ nhanh nhất cho dự án." },
    ],
  },
  {
    id: "dich-vu-khac",
    slug: "dich-vu-khac",
    title: "Dịch vụ khác",
    seoTitle: "Dịch Vụ Pháp Lý Trọn Gói Uy Tín Tại Hà Nội - Luật Hải Minh Quân",
    shortDesc: "Tư vấn kế toán thuế, cấp Giấy phép lao động (Work Permit), visa người nước ngoài, đăng ký mã số mã vạch và các thủ tục pháp lý tổng hợp.",
    iconName: "FileCheck",
    href: "/service/dich-vu-khac/",
    hoverImage: "/images/services/dich-vu-khac.webp",
    overview: "Nhằm đáp ứng tối đa mọi nhu cầu pháp lý của cá nhân và doanh nghiệp, Công ty Luật TNHH Hải Minh Quân cung cấp các dịch vụ pháp lý trọn gói khác bao gồm: tư vấn chính sách kế toán thuế, xin cấp Giấy phép lao động cho người nước ngoài (Work Permit), thẻ tạm trú, thị thực, đăng ký mã số mã vạch sản phẩm và các thủ tục tư pháp hành chính nhanh gọn.",
    scope: [
      "Tư vấn chính sách thuế, rà soát sổ sách kế toán, đại diện giải trình quyết toán thuế với cơ quan thuế",
      "Xin cấp mới, gia hạn Giấy phép lao động (Work Permit) và Thẻ tạm trú cho chuyên gia, lao động nước ngoài",
      "Tư vấn và thực hiện thủ tục cấp Mã số mã vạch sản phẩm tại Tổng cục Tiêu chuẩn Đo lường Chất lượng",
      "Tư vấn và hỗ trợ xin các loại Giấy phép con: An toàn thực phẩm, Phòng cháy chữa cháy, An ninh trật tự",
      "Dịch thuật công chứng tư pháp, hợp pháp hóa lãnh sự giấy tờ nước ngoài dùng tại Việt Nam",
    ],
    process: [
      { step: "01", title: "Tiếp nhận nhu cầu cụ thể & Tư vấn phương án", desc: "Luật sư lắng nghe vụ việc cụ thể và hướng dẫn chuẩn bị các giấy tờ nhân thân, hồ sơ chuyên ngành cần thiết." },
      { step: "02", title: "Dịch thuật công chứng & Hợp pháp hóa", desc: "Thực hiện dịch thuật tư pháp, chứng thực chữ ký và hợp pháp hóa lãnh sự đối với tài liệu nước ngoài." },
      { step: "03", title: "Nộp hồ sơ tại cơ quan thẩm quyền", desc: "Đại diện nộp hồ sơ tại Cục Quản lý Xuất nhập cảnh, Sở Lao động - Thương binh & Xã hội hoặc Phòng Tư pháp." },
      { step: "04", title: "Bàn giao kết quả tận nơi", desc: "Bàn giao giấy phép, thẻ tạm trú hoặc văn bản tư pháp hoàn chỉnh đến tận tay khách hàng." },
    ],
    faq: [
      { question: "Doanh nghiệp thuê chuyên gia nước ngoài bắt buộc phải có giấy phép lao động không?", answer: "Có. Người lao động nước ngoài làm việc tại Việt Nam bắt buộc phải có Giấy phép lao động (Work Permit) hoặc văn bản xác nhận không thuộc diện cấp giấy phép lao động, nếu không sẽ bị xử phạt hành chính nặng và bị trục xuất." },
      { question: "Đăng ký mã số mã vạch sản phẩm mất bao lâu?", answer: "Sau khi nộp hồ sơ hợp lệ tại cơ quan thẩm quyền, thông thường trong vòng 1 - 2 ngày làm việc doanh nghiệp sẽ được cấp mã số mã vạch tạm thời để in lên bao bì đưa sản phẩm ra thị trường." },
    ],
  },
];

// 3. Danh mục 9 Dịch vụ ở Dropdown Menu & Footer
export const allNavigationServices = [
  { title: "Luật dân sự", href: "/service/luat-dan-su/" },
  { title: "Luật hình sự", href: "/service/luat-hinh-su/" },
  { title: "Luật hành chính", href: "/service/luat-hanh-chinh/" },
  { title: "Luật đất đai", href: "/service/luat-dat-dai/" },
  { title: "Luật hôn nhân và gia đình", href: "/service/luat-hon-nhan-va-gia-dinh/" },
  { title: "Luật sở hữu trí tuệ", href: "/service/luat-so-huu-tri-tue/" },
  { title: "Luật doanh nghiệp", href: "/service/luat-doanh-nghiep/" },
  { title: "Luật đầu tư", href: "/service/luat-dau-tu/" },
  { title: "Dịch vụ khác", href: "/service/dich-vu-khac/" },
];

// 4. Báo chí nói gì 1:1 từ luatvanbao.com
export const pressItems: PressItem[] = [
  {
    id: "vneconomy",
    name: "VnEconomy",
    logoUrl: "/images/press/vneconomy-logo.png",
    articleTitle: "Ngân hàng điêu đứng vì thẩm định giá nâng khống tài sản bảo đảm",
    articleUrl: "https://vneconomy.vn/ngan-hang-dieu-dung-vi-tham-dinh-gia-nang-khong-tai-san-bao-dam.htm",
  },
  {
    id: "nguoiduatin",
    name: "Người Đưa Tin",
    logoUrl: "/images/press/nguoiduatin-logo.png",
    articleTitle: "Nghề luật sư phải có tâm với nghề chứ không phải ba đâu cãi đấy",
    articleUrl: "https://www.nguoiduatin.vn/nghe-luat-su-phai-co-tam-voi-nghe-chu-khong-phai-ba-dau-cai-day-a607911.html",
  },
  {
    id: "thanhtravietnam",
    name: "Thanh Tra Việt Nam",
    logoUrl: "/images/press/thanhtravietnam-logo.png",
    articleTitle: "Ủy ban Chứng khoán Nhà nước cần sớm thanh tra công ty chứng khoán Phố Wall",
    articleUrl: "https://baophapluat.vn/",
  },
  {
    id: "cafef",
    name: "CafeF",
    logoUrl: "/images/press/cafef-logo.png",
    articleTitle: "Thấy gì từ việc nhân viên ngân hàng lừa tiền khách hàng",
    articleUrl: "https://cafef.vn/thay-gi-tu-viec-nhan-vien-ngan-hang-lua-tien-khach-hang-20210516151533469.chn",
  },
  {
    id: "anninhtiente",
    name: "An Ninh Tiền Tệ",
    logoUrl: "/images/press/anninhtiente-logo.png",
    articleTitle: "Các hãng xe công nghệ có đang trốn đóng bảo hiểm xã hội?",
    articleUrl: "https://antt.vn/cac-hang-xe-cong-nghe-co-dang-tron-dong-bao-hiem-xa-hoi-341195.htm",
  },
  {
    id: "thuonggia",
    name: "Thương Gia",
    logoUrl: "/images/press/thuong-gia-logo.png",
    articleTitle: "Vụ 4 nữ tiếp viên Vietnam Airlines xách tay ma túy về Việt Nam: Luật sư nhận định ra sao",
    articleUrl: "https://thuonggiaonline.vn/vu-4-nu-tiep-vien-vietnam-airlines-xach-tay-ma-tuy-ve-viet-nam-luat-su-nhan-dinh-ra-sao-post55557.html",
  },
];

// 5. Toàn bộ danh sách nhân sự (Lưu trữ đầy đủ để kích hoạt lại khi cần)
export const allTeamMembersArchive: TeamMember[] = [
  {
    id: "do-thi-thanh-hai",
    name: "Ls. Đỗ Thị Thanh Hải",
    role: "Giám đốc điều hành - Đại diện theo PL",
    imageUrl: "/images/team/do-thi-thanh-hai.jpg",
    link: "/thanh-vien/do-thi-thanh-hai/",
    phone: "0924 189 868",
    email: "luathaiminhquan@gmail.com",
    cardNo: "20673/LS (Đoàn Luật sư TP. Hà Nội, cấp ngày 10/01/2024)",
    qualifications: [
      "Cử nhân Luật - Đại học Luật Hà Nội",
      "Luật sư thuộc Đoàn Luật sư Thành phố Hà Nội",
      "Thẻ Luật sư số 20673/LS do Liên đoàn Luật sư Việt Nam cấp",
      "Chứng chỉ hành nghề Luật sư do Bộ Tư pháp cấp",
    ],
    experience: [
      "Giám đốc điều hành Công ty Luật TNHH Hải Minh Quân",
      "Hơn 15 năm kinh nghiệm thực chiến trong lĩnh vực tư vấn pháp lý và đại diện tranh tụng tại Tòa án các cấp",
      "Trực tiếp bào chữa, bảo vệ thành công quyền lợi hợp pháp trong hàng trăm vụ án Dân sự, Hình sự, Kinh doanh thương mại, Đất đai",
      "Cố vấn pháp lý chiến lược thường xuyên cho nhiều doanh nghiệp, tập đoàn kinh tế",
    ],
    expertise: [
      "Tranh tụng Hình sự, Dân sự & Kinh doanh thương mại",
      "Tư vấn Doanh nghiệp, Đầu tư & M&A",
      "Giải quyết tranh chấp Đất đai, Thừa kế & Hợp đồng",
      "Tư vấn Hôn nhân & Gia đình phức tạp",
    ],
    bio: "Luật sư Đỗ Thị Thanh Hải là Người đại diện theo pháp luật và Giám đốc điều hành Công ty Luật TNHH Hải Minh Quân. Với phương châm 'Đức sáng • Tâm trong • Trí vững', Luật sư luôn tận tâm cống hiến vì quyền lợi hợp pháp tối đa của Quý thân chủ, mang lại giải pháp pháp lý an toàn, bền vững và hiệu quả nhất.",
  },
  {
    id: "phan-ba-duong",
    name: "Phan Bá Dương",
    role: "Luật sư",
    imageUrl: "/images/team/phan-ba-duong.png",
    link: "/thanh-vien/phan-ba-duong/",
    phone: "0924 189 868",
    email: "luathaiminhquan@gmail.com",
    qualifications: [
      "Cử nhân Luật - Đại học Luật Hà Nội",
      "Luật sư thuộc Đoàn Luật sư Thành phố Hà Nội",
    ],
    experience: [
      "Hơn 20 năm làm quản lý điều hành của Công ty Cổ phần Định giá và Tư vấn Đầu tư Quốc tế",
      "Nhiều kinh nghiệm trong lĩnh vực Tư vấn Đầu tư, Xúc tiến Thương mại",
      "Thẩm định giá, Tái cấu trúc doanh nghiệp và M&A",
    ],
    expertise: [
      "Tư vấn Đầu tư & Dự án thương mại",
      "Tái cấu trúc Doanh nghiệp & M&A",
      "Thẩm định giá tài sản & Quản trị rủi ro pháp lý",
    ],
    bio: "Luật sư Phan Bá Dương có hơn hai thập kỷ kinh nghiệm trong lĩnh vực quản lý đầu tư, tài chính và xúc tiến thương mại quốc tế, mang đến góc nhìn kinh doanh sâu sắc và giải pháp pháp lý thực tiễn cho doanh nghiệp.",
  },
  {
    id: "nguyen-minh-thuy",
    name: "Nguyễn Minh Thúy",
    role: "Luật sư",
    imageUrl: "/images/team/nguyen-minh-thuy.png",
    link: "/thanh-vien/nguyen-minh-thuy/",
    phone: "0924 189 868",
    email: "luathaiminhquan@gmail.com",
    qualifications: [
      "Cử nhân Luật - Đại học Luật Hà Nội",
      "Luật sư thuộc Đoàn Luật sư Thành phố Hà Nội",
    ],
    experience: [
      "Hơn 10 năm kinh nghiệm giải quyết tranh chấp Dân sự, Hợp đồng và Lao động",
      "Đại diện bảo vệ quyền và lợi ích hợp pháp của khách hàng tại Tòa án và Trọng tài thương mại",
    ],
    expertise: [
      "Tranh tụng Dân sự & Hợp đồng kinh tế",
      "Pháp luật Lao động & Tiền lương",
      "Giải quyết tranh chấp Hôn nhân & Gia đình",
    ],
    bio: "Luật sư Nguyễn Minh Thúy luôn đồng hành sát sao cùng thân chủ với sự tỉ mỉ, thấu đáo và tinh thần trách nhiệm cao nhất trong từng vụ việc pháp lý.",
  },
  {
    id: "nguyen-dieu-linh",
    name: "Nguyễn Diệu Linh",
    role: "Luật sư",
    imageUrl: "/images/team/nguyen-dieu-linh.png",
    link: "/thanh-vien/nguyen-dieu-linh/",
    phone: "0924 189 868",
    email: "luathaiminhquan@gmail.com",
    qualifications: [
      "Cử nhân Luật học",
      "Luật sư thuộc Đoàn Luật sư Thành phố Hà Nội",
    ],
    experience: [
      "Chuyên sâu trong lĩnh vực tư vấn pháp luật Doanh nghiệp và Sở hữu trí tuệ",
      "Hỗ trợ hàng trăm doanh nghiệp khởi nghiệp hoàn thiện hồ sơ pháp lý và đăng ký bảo hộ thương hiệu",
    ],
    expertise: [
      "Tư vấn Pháp lý Doanh nghiệp thường xuyên",
      "Đăng ký Nhãn hiệu & Sở hữu trí tuệ",
      "Thủ tục cấp phép đầu tư & Giấy phép con",
    ],
    bio: "Luật sư Nguyễn Diệu Linh nổi bật với tư duy pháp lý hiện đại, nhạy bén và tác phong làm việc chuyên nghiệp, chu đáo.",
  },
  {
    id: "nong-thi-kim-cuc",
    name: "Nông Thị Kim Cúc",
    role: "Luật sư",
    imageUrl: "/images/team/nong-thi-kim-cuc.png",
    link: "/thanh-vien/nong-thi-kim-cuc/",
    phone: "0924 189 868",
    email: "luathaiminhquan@gmail.com",
    qualifications: [
      "Cử nhân Luật học",
      "Chứng chỉ đào tạo nghề Luật sư",
    ],
    experience: [
      "Nhiều năm kinh nghiệm hỗ trợ giải quyết hồ sơ Đất đai, Thừa kế và Giao dịch bất động sản",
    ],
    expertise: [
      "Pháp luật Đất đai & Nhà ở",
      "Thủ tục thừa kế & Công chứng",
    ],
  },
  {
    id: "vu-thuy-tien",
    name: "Vũ Thủy Tiên",
    role: "Chuyên gia Tài chính",
    imageUrl: "/images/team/vu-thuy-tien.png",
    link: "/thanh-vien/vu-thuy-tien/",
    phone: "0924 189 868",
    email: "luathaiminhquan@gmail.com",
    qualifications: [
      "Thạc sĩ Tài chính - Ngân hàng",
      "Chứng chỉ Kế toán trưởng & Tư vấn thuế",
    ],
    experience: [
      "Chuyên gia tư vấn tái cấu trúc tài chính và thuế cho doanh nghiệp",
    ],
    expertise: [
      "Tài chính doanh nghiệp & Quản trị rủi ro",
      "Tư vấn Thuế & Báo cáo tài chính",
    ],
  },
];

// Tạm thời chỉ hiển thị Luật sư Đỗ Thị Thanh Hải theo yêu cầu
export const teamMembersList: TeamMember[] = [
  allTeamMembersArchive[0], // Ls. Đỗ Thị Thanh Hải (Giám đốc điều hành)
];

// 6. Toàn bộ Bài viết & Cẩm nang pháp lý chuyên sâu của Luật Hải Minh Quân
export const usefulArticles: BlogItem[] = allArticlesData.map((item) => ({
  ...item,
  href: `/blog/${item.slug}/`,
}));

// 7. 6 Ảnh Gallery trong Footer
export const footerGalleryImages = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
];


// 8. Thông tin định danh pháp lý chính thức (Theo Giấy đăng ký hoạt động Sở Tư pháp TP. Hà Nội)
export const firmInfo = {
  name: "Công ty Luật TNHH Hải Minh Quân",
  fullName: "Công ty Luật Trách nhiệm Hữu hạn Hải Minh Quân",
  companyTitle: "Công ty Luật Trách nhiệm Hữu hạn Hải Minh Quân",
  tradingName: "HAI MINH QUAN LAW FIRM",
  shortName: "HMQ LAW",
  registrationType: "Công ty Luật Trách nhiệm Hữu hạn Một thành viên",
  licenseNumber: "01.2026.02.2924/TP/ĐKHĐ",
  licenseTitle: "Giấy đăng ký hoạt động Công ty Luật TNHH Một thành viên",
  issuingAuthority: "Sở Tư pháp Thành phố Hà Nội",
  director: "Luật sư Đỗ Thị Thanh Hải",
  directorRole: "Giám đốc / Người đại diện theo pháp luật",
  lawyerCard: "20673/LS (Đoàn Luật sư TP. Hà Nội, cấp ngày 10/01/2024)",
  phone: "0967 932 555 - 0924 189 868",
  phoneRaw: "0967932555",
  hotline: "0967 932 555",
  hotlineRaw: "0967932555",
  secondaryPhone: "0924 189 868",
  secondaryPhoneRaw: "0924189868",
  email: "luathaiminhquan@gmail.com",
  backupEmail: "luathaiminhquan@gmail.com",
  facebookUrl: "https://www.facebook.com/luathaiminhquan.vn",
  headquarters: "Tầng 2, No13 - LK13-17 Khu đất dịch vụ Dọc Bún 1, Phường Hà Đông, Thành phố Hà Nội",
  hanoiOffice: "Tầng 2, No13 - LK13-17 Khu đất dịch vụ Dọc Bún 1, Phường Hà Đông, Thành phố Hà Nội",
  addressShort: "No13 - LK13-17 Khu ĐDV Dọc Bún 1, P. Hà Đông, Hà Nội",
  hcmOffice: "244/29 Huỳnh Văn Bánh, phường Phú Nhuận, Tp Hồ Chí Minh",
  achievementsHeading: "Hơn 5 năm, chúng tôi đã có nhiều thành tựu",
  mission: "Sứ mệnh của Công ty Luật TNHH Hải Minh Quân là bảo vệ quyền và lợi ích hợp pháp của khách hàng với phương châm Đức Sáng - Tâm Trong - Trí Vững.",
  vision: "Tầm nhìn của chúng tôi là trở thành công ty luật hàng đầu cung cấp giải pháp pháp lý toàn diện, tin cậy cho cá nhân và doanh nghiệp.",
  practiceFields: [
    "Tham gia tố tụng",
    "Tư vấn pháp luật",
    "Đại diện ngoài tố tụng",
    "Dịch vụ pháp lý khác",
  ],
  counters: {
    dossiers: "1000+",
    clients: "500+",
    branches: "Toàn quốc",
    staff: "+10",
  },
};

// Aliases for backward compatibility
export const officeContact = firmInfo;
export const servicesList = practiceServices;
