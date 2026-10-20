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

// 2. Danh mục 8 Dịch vụ trong khối "Chúng tôi ở đây để hỗ trợ bạn mọi vấn đề về Pháp lý"
export const practiceServices: PracticeService[] = [
  {
    id: "to-tung-dan-su",
    slug: "to-tung-dan-su",
    title: "Tố tụng dân sự",
    seoTitle: "Luật Sư Tố Tụng Dân Sự Tại Hà Nội",
    shortDesc: "Đại diện bảo vệ quyền và lợi ích hợp pháp tại Tòa án các cấp trong tranh chấp đất đai, nhà ở, hôn nhân và gia đình, ly hôn, thừa kế và hợp đồng.",
    iconName: "Scale",
    href: "/service/to-tung-dan-su/",
    hoverImage: "/images/services/to-tung-dan-su.webp",
    overview: "Dịch vụ luật sư tố tụng dân sự tại Công ty Luật TNHH Hải Minh Quân đại diện và bảo vệ quyền, lợi ích hợp pháp tối đa cho thân chủ trong các vụ án tranh chấp dân sự phức tạp. Chúng tôi có bề dày kinh nghiệm thực chiến trong các lĩnh vực tranh chấp đất đai, nhà ở, hợp đồng kinh tế, thừa kế di sản và hôn nhân gia đình tại Tòa án nhân dân các cấp trên địa bàn Hà Nội và toàn quốc.",
    scope: [
      "Tư vấn và đại diện giải quyết tranh chấp quyền sử dụng đất, tranh chấp mua bán - chuyển nhượng nhà đất, chia tài sản chung",
      "Tư vấn và tham gia tố tụng trong các vụ án ly hôn thuận tình, ly hôn đơn phương, tranh chấp quyền nuôi con và cấp dưỡng",
      "Đại diện giải quyết tranh chấp thừa kế theo di chúc và theo pháp luật, khai nhận di sản thừa kế phức tạp",
      "Bảo vệ quyền lợi trong tranh chấp hợp đồng mua bán tài sản, hợp đồng vay tài sản, hợp đồng hợp tác kinh doanh",
      "Đại diện theo ủy quyền trong giai đoạn thi hành án dân sự nhằm thu hồi tài sản nhanh chóng và hợp pháp",
    ],
    process: [
      { step: "01", title: "Tiếp nhận thông tin & Hồ sơ", desc: "Luật sư lắng nghe vụ việc, nghiên cứu chi tiết tài liệu chứng cứ hiện có và xác định rõ yêu cầu của thân chủ." },
      { step: "02", title: "Thẩm định pháp lý & Định hướng", desc: "Đánh giá tính hợp pháp, phân tích rủi ro và xây dựng chiến lược tranh tụng hoặc phương án hòa giải tối ưu." },
      { step: "03", title: "Soạn thảo văn bản & Thu thập chứng cứ", desc: "Soạn đơn khởi kiện, bản tự khai, thu thập thêm các chứng cứ có lợi và nộp hồ sơ tại Tòa án có thẩm quyền." },
      { step: "04", title: "Tham gia tranh tụng tại Tòa án", desc: "Luật sư trực tiếp có mặt tại các buổi hòa giải, đối chất và phiên tòa xét xử để bảo vệ quyền lợi tối đa cho thân chủ." },
    ],
    faq: [
      { question: "Thời gian giải quyết một vụ án dân sự kéo dài bao lâu?", answer: "Theo quy định của Bộ luật Tố tụng dân sự, thời hạn chuẩn bị xét xử thường từ 2 đến 4 tháng (vụ án phức tạp có thể gia hạn). Đội ngũ luật sư của Luật Hải Minh Quân luôn nỗ lực đẩy nhanh tiến độ thu thập chứng cứ để rút ngắn tối đa thời gian cho khách hàng." },
      { question: "Khách hàng bận rộn có thể ủy quyền toàn bộ cho Luật sư không?", answer: "Hoàn toàn được. Thân chủ có thể ủy quyền cho Luật sư thay mặt tham gia toàn bộ quá trình làm việc, thu thập tài liệu và tranh tụng tại Tòa án (trừ trường hợp pháp luật bắt buộc đương sự phải có mặt trực tiếp như ly hôn)." },
    ],
  },
  {
    id: "to-tung-hinh-su",
    slug: "to-tung-hinh-su",
    title: "Tố tụng hình sự",
    seoTitle: "Luật Sư Bào Chữa Tố Tụng Hình Sự Tại Hà Nội",
    shortDesc: "Bào chữa cho người bị tạm giữ, khởi tố, bị can, bị cáo và bảo vệ quyền lợi hợp pháp của người bị hại trong tất cả giai đoạn vụ án hình sự.",
    iconName: "ShieldAlert",
    href: "/service/to-tung-hinh-su/",
    hoverImage: "/images/services/to-tung-hinh-su.webp",
    overview: "Dịch vụ luật sư hình sự của Luật Hải Minh Quân cung cấp giải pháp bào chữa và bảo vệ quyền lợi hợp pháp kịp thời, quyết liệt cho người bị tạm giữ, bị can, bị cáo và người bị hại. Chúng tôi có mặt ngay từ những giờ đầu tiên của giai đoạn điều tra, làm việc trực tiếp tại trại tạm giam và cơ quan công an để chống oan sai, đảm bảo quyền con người và hướng tới bản án công bằng, đúng pháp luật.",
    scope: [
      "Tham gia tố tụng từ giai đoạn khởi tố, lấy lời khai, hỏi cung bị can tại cơ quan điều tra",
      "Bào chữa cho bị can, bị cáo trong các tội phạm về kinh tế, chức vụ, ma túy, trật tự xã hội và xâm phạm tính mạng sức khỏe",
      "Bảo vệ quyền và lợi ích hợp pháp cho người bị hại, đương sự trong vụ án hình sự để yêu cầu bồi thường thiệt hại thỏa đáng",
      "Soạn thảo đơn xin bảo lãnh tại ngoại, đơn khiếu nại quyết định tố tụng trái pháp luật, đơn kêu oan",
      "Đại diện tham gia các phiên tòa sơ thẩm, phúc thẩm, giám đốc thẩm và tái thẩm trên toàn quốc",
    ],
    process: [
      { step: "01", title: "Tiếp nhận khẩn cấp 24/7", desc: "Luật sư nắm bắt thông tin bắt giữ hoặc khởi tố, kiểm tra tính pháp lý của lệnh bắt, tạm giam, tạm giữ." },
      { step: "02", title: "Đăng ký bào chữa & Tiếp cận bị can", desc: "Làm thủ tục đăng ký người bào chữa tại Cơ quan điều tra, vào trại tạm giam thăm gặp và hướng dẫn khai báo đúng sự thật." },
      { step: "03", title: "Thu thập chứng cứ gỡ tội", desc: "Độc lập thu thập chứng cứ ngoại phạm, tình tiết giảm nhẹ trách nhiệm hình sự và kiến nghị cơ quan tiến hành tố tụng." },
      { step: "04", title: "Tranh tụng tại phiên tòa", desc: "Tham gia thẩm vấn công khai, tranh luận quyết liệt với Viện kiểm sát để bảo vệ quyền con người và giảm nhẹ hình phạt tối đa." },
    ],
  },
  {
    id: "to-tung-hanh-chinh",
    slug: "to-tung-hanh-chinh",
    title: "Tố tụng hành chính",
    seoTitle: "Luật Sư Tố Tụng Hành Chính Tại Hà Nội",
    shortDesc: "Tư vấn và đại diện khởi kiện, khiếu nại các quyết định hành chính, hành vi hành chính trái pháp luật của cơ quan nhà nước các cấp.",
    iconName: "Building2",
    href: "/service/to-tung-hanh-chinh/",
    hoverImage: "/images/services/to-tung-hanh-chinh.webp",
    overview: "Luật Hải Minh Quân chuyên sâu tư vấn và đại diện thân chủ khởi kiện các quyết định hành chính, hành vi hành chính trái pháp luật của cơ quan nhà nước và người có thẩm quyền. Với sự am hiểu sâu sắc về Luật Tố tụng Hành chính và các quy định quản lý đất đai, quy hoạch, đền bù giải phóng mặt bằng, chúng tôi giúp người dân và doanh nghiệp bảo vệ tài sản, quyền lợi hợp pháp trước cơ quan công quyền.",
    scope: [
      "Khiếu nại và khởi kiện quyết định thu hồi đất, quyết định bồi thường, hỗ trợ tái định cư trái pháp luật",
      "Khiếu nại quyết định xử phạt vi phạm hành chính, quyết định cưỡng chế công trình xây dựng",
      "Khởi kiện hành vi hành chính không cấp sổ đỏ, chậm trễ giải quyết thủ tục cấp phép kinh doanh",
      "Đại diện đối thoại trực tiếp với người bị kiện tại Tòa án nhân dân các cấp",
      "Tham gia phiên tòa xét xử sơ thẩm, phúc thẩm để bảo vệ phán quyết có lợi cho người khởi kiện",
    ],
    process: [
      { step: "01", title: "Đánh giá tính hợp pháp quyết định", desc: "Kiểm tra thẩm quyền, căn cứ pháp lý và trình tự ban hành của quyết định hành chính bị khiếu kiện." },
      { step: "02", title: "Soạn thảo hồ sơ khiếu nại hoặc khởi kiện", desc: "Lựa chọn phương án khiếu nại lần 1, lần 2 hoặc khởi kiện trực tiếp ra Tòa án có thẩm quyền để tối ưu thời gian." },
      { step: "03", title: "Tham gia quá trình đối thoại", desc: "Đại diện thân chủ làm việc, đối thoại với đại diện cơ quan nhà nước nhằm tháo gỡ vướng mắc trên tinh thần thượng tôn pháp luật." },
      { step: "04", title: "Tranh tụng tại Tòa án", desc: "Bảo vệ quan điểm khởi kiện, chứng minh thiệt hại thực tế và yêu cầu hủy bỏ quyết định hành chính trái luật, bồi thường thiệt hại." },
    ],
  },
  {
    id: "tu-van-dau-tu",
    slug: "tu-van-dau-tu",
    title: "Tư vấn đầu tư",
    seoTitle: "Luật Sư Tư Vấn Đầu Tư & Dự Án FDI Tại Hà Nội",
    shortDesc: "Tư vấn cấp phép dự án đầu tư trong nước và nước ngoài (FDI), thẩm định pháp lý dự án (Due Diligence), M&A và ưu đãi đầu tư.",
    iconName: "TrendingUp",
    href: "/service/tu-van-dau-tu/",
    hoverImage: "/images/services/tu-van-dau-tu.webp",
    overview: "Luật Hải Minh Quân đồng hành cùng các nhà đầu tư trong nước và quốc tế trong mọi giai đoạn của dự án đầu tư tại Việt Nam. Chúng tôi cung cấp dịch vụ thẩm định pháp lý dự án (Due Diligence), xin cấp Giấy chứng nhận đăng ký đầu tư (IRC), Giấy chứng nhận đăng ký doanh nghiệp (ERC), đàm phán hợp đồng liên doanh và tối ưu chính sách ưu đãi đầu tư, thuế, đất đai công nghiệp.",
    scope: [
      "Thẩm định pháp lý toàn diện địa điểm thực hiện dự án, khu công nghiệp và đối tác liên doanh",
      "Thực hiện thủ tục xin cấp mới, điều chỉnh Giấy chứng nhận đăng ký đầu tư (IRC) cho nhà đầu tư FDI",
      "Tư vấn thành lập công ty có vốn nước ngoài (100% vốn ngoại hoặc liên doanh)",
      "Hỗ trợ xin phê duyệt chủ trương đầu tư từ Thủ tướng Chính phủ, UBND cấp tỉnh",
      "Tư vấn chuyển nhượng dự án đầu tư, chuyển nhượng phần vốn góp và sáp nhập M&A",
    ],
    process: [
      { step: "01", title: "Tư vấn mô hình & Địa điểm đầu tư", desc: "Phân tích điều kiện tiếp cận thị trường của nhà đầu tư nước ngoài theo cam kết WTO và biểu cam kết FTA." },
      { step: "02", title: "Soạn thảo bộ hồ sơ đăng ký đầu tư", desc: "Hoàn thiện đề xuất dự án đầu tư, giải trình năng lực tài chính và phương án công nghệ môi trường chuẩn xác." },
      { step: "03", title: "Đại diện làm việc với Sở KH&ĐT, Ban Quản lý", desc: "Nộp hồ sơ, theo dõi tiến độ thẩm định và trực tiếp giải trình các yêu cầu chuyên môn từ cơ quan cấp phép." },
      { step: "04", title: "Bàn giao kết quả & Hỗ trợ sau cấp phép", desc: "Bàn giao Giấy chứng nhận đầu tư IRC, con dấu pháp nhân và tư vấn tuân thủ báo cáo định kỳ theo quy định." },
    ],
  },
  {
    id: "so-huu-tri-tue",
    slug: "so-huu-tri-tue",
    title: "Sở hữu trí tuệ",
    seoTitle: "Luật Sư Tư Vấn Sở Hữu Trí Tuệ Tại Hà Nội",
    shortDesc: "Đăng ký bảo hộ nhãn hiệu (Logo), bản quyền tác giả, sáng chế, kiểu dáng công nghiệp và đại diện xử lý hành vi xâm phạm quyền SHTT.",
    iconName: "Award",
    href: "/service/so-huu-tri-tue/",
    hoverImage: "/images/services/so-huu-tri-tue.webp",
    overview: "Tài sản trí tuệ là cốt lõi của giá trị thương hiệu trong nền kinh tế hiện đại. Luật Hải Minh Quân cung cấp dịch vụ đại diện sở hữu công nghiệp toàn diện: đăng ký nhãn hiệu (Logo), bản quyền tác giả, kiểu dáng công nghiệp, sáng chế và giải pháp hữu ích. Chúng tôi cũng đồng thời quyết liệt bảo vệ thân chủ trước các hành vi cạnh tranh không lành mạnh, xâm phạm nhãn hiệu và hàng giả hàng nhái.",
    scope: [
      "Tra cứu chuyên sâu khả năng đăng ký và nộp đơn bảo hộ nhãn hiệu độc quyền tại Cục Sở hữu trí tuệ",
      "Đăng ký bản quyền tác giả cho phần mềm máy tính, tác phẩm mỹ thuật ứng dụng, bài viết, âm nhạc",
      "Đăng ký bảo hộ sáng chế, kiểu dáng công nghiệp, bao bì sản phẩm độc quyền",
      "Đại diện giám định sở hữu trí tuệ và làm việc với Quản lý thị trường, Thanh tra Bộ KH&CN xử lý vi phạm",
      "Soạn thảo hợp đồng chuyển giao công nghệ, hợp đồng li-xăng nhãn hiệu (Franchise)",
    ],
    process: [
      { step: "01", title: "Tra cứu đánh giá khả năng bảo hộ", desc: "Tra cứu sơ bộ và chuyên sâu trên cơ sở dữ liệu WIPO và Cục SHTT để tránh trùng lặp hoặc tương tự gây nhầm lẫn." },
      { step: "02", title: "Thiết lập danh mục sản phẩm & Hồ sơ", desc: "Phân loại nhóm hàng hóa dịch vụ theo Bảng phân loại Nice và lập tờ khai bảo hộ chuẩn xác." },
      { step: "03", title: "Theo dõi thẩm định đơn tại Cục SHTT", desc: "Đại diện xử lý các thông báo thẩm định hình thức, công bố đơn trên Công báo và thẩm định nội dung." },
      { step: "04", title: "Nhận văn bằng bảo hộ độc quyền", desc: "Bàn giao Giấy chứng nhận đăng ký nhãn hiệu/bản quyền chính thức và theo dõi gia hạn sau 10 năm." },
    ],
  },
  {
    id: "luat-su-doanh-nghiep",
    slug: "luat-su-doanh-nghiep",
    title: "Luật sư doanh nghiệp",
    seoTitle: "Luật Sư Doanh Nghiệp & Tư Vấn Pháp Chế Nội Bộ",
    shortDesc: "Tư vấn thành lập, tái cấu trúc M&A, giải thể, quản trị vốn, kiểm soát rủi ro hợp đồng và dịch vụ luật sư nội bộ cho doanh nghiệp.",
    iconName: "Briefcase",
    href: "/service/luat-su-doanh-nghiep/",
    hoverImage: "/images/services/luat-su-doanh-nghiep.webp",
    overview: "Dịch vụ luật sư doanh nghiệp của Hải Minh Quân đóng vai trò như một phòng pháp chế nội bộ tinh nhuệ, giúp doanh nghiệp loại bỏ triệt để rủi ro pháp lý trong hoạt động kinh doanh thường nhật. Chúng tôi hỗ trợ thành lập, tái cấu trúc quản trị, soạn thảo và rà soát hợp đồng kinh tế, xử lý tranh chấp lao động và xây dựng quy chế vận hành chuẩn mực.",
    scope: [
      "Dịch vụ luật sư riêng trọn gói định kỳ tháng/năm cho doanh nghiệp vừa và nhỏ (SMEs)",
      "Rà soát, soạn thảo và đàm phán các loại hợp đồng kinh tế, thương mại, đại lý, mua bán hàng hóa",
      "Tư vấn tái cấu trúc doanh nghiệp, chia tách, hợp nhất, sáp nhập, chuyển nhượng cổ phần",
      "Xây dựng thỏa ước lao động tập thể, nội quy lao động, quy chế thưởng phạt và giải quyết tranh chấp nhân sự",
      "Tư vấn và thực hiện thủ tục giải thể doanh nghiệp, phá sản công ty đúng trình tự",
    ],
    process: [
      { step: "01", title: "Khảo sát hiện trạng pháp lý", desc: "Rà soát điều lệ, cơ cấu cổ đông, hệ thống hợp đồng mẫu và quy chế lao động hiện hành của doanh nghiệp." },
      { step: "02", title: "Nhận diện & Cảnh báo rủi ro", desc: "Chỉ ra các điểm xung đột pháp lý tiềm ẩn trong giao kết hợp đồng hoặc quản trị nội bộ để kịp thời khắc phục." },
      { step: "03", title: "Xây dựng khung pháp lý an toàn", desc: "Soạn thảo văn bản, điều lệ, hợp đồng mẫu phù hợp với Luật Doanh nghiệp mới nhất và đặc thù ngành nghề." },
      { step: "04", title: "Hỗ trợ thường xuyên 24/7", desc: "Luật sư trực tiếp giải đáp mọi thắc mắc phát sinh qua điện thoại, email và tham gia đàm phán thương vụ lớn." },
    ],
  },
  {
    id: "tu-van-ke-toan-thue",
    slug: "tu-van-ke-toan-thue",
    title: "Tư vấn Kế toán thuế",
    seoTitle: "Dịch Vụ Tư Vấn Kế Toán Thuế & Đại Diện Giải Trình",
    shortDesc: "Tư vấn chính sách thuế, rà soát sổ sách kế toán, tối ưu chi phí thuế hợp pháp và đại diện giải trình quyết toán thuế với cơ quan thuế.",
    iconName: "Calculator",
    href: "/service/tu-van-ke-toan-thue/",
    hoverImage: "/images/services/tu-van-ke-toan-thue.webp",
    overview: "Chính sách kế toán thuế tại Việt Nam thường xuyên cập nhật và tiềm ẩn nhiều rủi ro bị truy thu, phạt vi phạm hành chính lớn nếu không áp dụng đúng luật. Đội ngũ chuyên gia kế toán trưởng và luật sư thuế của Hải Minh Quân cung cấp giải pháp rà soát sổ sách kế toán, tối ưu chi phí thuế hợp pháp, hoàn thiện hồ sơ hoàn thuế và đại diện doanh nghiệp giải trình quyết toán thuế.",
    scope: [
      "Rà soát và hoàn thiện hệ thống sổ sách kế toán, chứng từ hợp lý hợp lệ trước kỳ quyết toán thuế",
      "Tư vấn chính sách thuế TNDN, thuế GTGT, thuế TNCN và thuế nhà thầu nước ngoài (FCT)",
      "Đại diện làm việc, giải trình số liệu trực tiếp với Chi cục Thuế, Cục Thuế các tỉnh thành",
      "Tư vấn hồ sơ hoàn thuế GTGT dự án đầu tư và hàng hóa xuất khẩu nhanh chóng",
      "Đại diện khiếu nại các quyết định xử phạt vi phạm hành chính về thuế không đúng quy định",
    ],
    process: [
      { step: "01", title: "Thu thập & Rà soát chứng từ", desc: "Kiểm tra tính hợp pháp của hóa đơn đầu vào, đầu ra, tờ khai thuế các quý và báo cáo tài chính các năm." },
      { step: "02", title: "Phát hiện sai lệch & Tối ưu hóa", desc: "Chỉ ra các chi phí có nguy cơ bị cơ quan thuế bóc tách, hướng dẫn bổ sung hồ sơ chứng minh hợp lệ." },
      { step: "03", title: "Điều chỉnh & Lập sổ sách chuẩn mực", desc: "Kê khai bổ sung điều chỉnh kịp thời trước khi có quyết định thanh tra, kiểm tra thuế tại trụ sở." },
      { step: "04", title: "Đại diện giải trình với Đoàn kiểm tra", desc: "Chuyên gia kế toán thuế và Luật sư trực tiếp làm việc với đoàn kiểm tra thuế để bảo vệ tối đa số liệu hợp pháp." },
    ],
  },
  {
    id: "dich-vu-khac",
    slug: "dich-vu-khac",
    title: "Dịch vụ khác",
    seoTitle: "Dịch Vụ Pháp Lý Trọn Gói Uy Tín Tại Hà Nội",
    shortDesc: "Tư vấn hôn nhân gia đình, thừa kế, lao động, giấy phép lao động (Work Permit), visa và các thủ tục tư pháp trọn gói.",
    iconName: "HeartHandshake",
    href: "/service/dich-vu-khac/",
    hoverImage: "/images/services/dich-vu-khac.webp",
    overview: "Nhằm đáp ứng tối đa mọi nhu cầu pháp lý của cá nhân và doanh nghiệp, Công ty Luật TNHH Hải Minh Quân cung cấp các dịch vụ pháp lý trọn gói khác bao gồm: giấy phép lao động cho người nước ngoài (Work Permit), thẻ tạm trú, thị thực, thủ tục công chứng, lập di chúc hợp pháp và đăng ký mã số mã vạch cho sản phẩm hàng hóa.",
    scope: [
      "Xin cấp mới, gia hạn Giấy phép lao động (Work Permit) và Thẻ tạm trú cho chuyên gia nước ngoài",
      "Tư vấn và thực hiện thủ tục đăng ký mã số mã vạch sản phẩm tại Tổng cục Tiêu chuẩn Đo lường Chất lượng",
      "Tư vấn soạn thảo và làm chứng di chúc hợp pháp, dịch vụ công chứng tại nhà",
      "Tư vấn thủ tục kết hôn có yếu tố nước ngoài, thủ tục nhập quốc tịch, thôi quốc tịch",
      "Tư vấn và hỗ trợ xin các loại Giấy phép con: an toàn thực phẩm, phòng cháy chữa cháy, an ninh trật tự",
    ],
    process: [
      { step: "01", title: "Khảo sát nhu cầu thực tế", desc: "Luật sư lắng nghe vụ việc cụ thể và hướng dẫn chuẩn bị các giấy tờ nhân thân, hồ sơ chuyên ngành cần thiết." },
      { step: "02", title: "Dịch thuật công chứng & Hợp pháp hóa", desc: "Thực hiện dịch thuật tư pháp, chứng thực chữ ký và hợp pháp hóa lãnh sự đối với tài liệu nước ngoài." },
      { step: "03", title: "Nộp hồ sơ tại cơ quan thẩm quyền", desc: "Đại diện nộp hồ sơ tại Cục Quản lý Xuất nhập cảnh, Sở Lao động - Thương binh & Xã hội hoặc Phòng Tư pháp." },
      { step: "04", title: "Bàn giao kết quả tận nơi", desc: "Bàn giao giấy phép, thẻ tạm trú hoặc văn bản tư pháp hoàn chỉnh đến tận tay khách hàng." },
    ],
  },
];

// 3. Danh mục Dịch vụ ở Dropdown Menu & Footer
export const allNavigationServices = [
  { title: "Tố tụng dân sự", href: "/service/to-tung-dan-su/" },
  { title: "Tố tụng hình sự", href: "/service/to-tung-hinh-su/" },
  { title: "Tố tụng hành chính", href: "/service/to-tung-hanh-chinh/" },
  { title: "Tư vấn đầu tư", href: "/service/tu-van-dau-tu/" },
  { title: "Sở hữu trí tuệ", href: "/service/so-huu-tri-tue/" },
  { title: "Luật sư doanh nghiệp", href: "/service/luat-su-doanh-nghiep/" },
  { title: "Tư vấn Kế toán thuế", href: "/service/tu-van-ke-toan-thue/" },
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
  issuingAuthority: "Sở Tư pháp Thành phố Hà Nội",
  licenseDate: "02/10/2026",
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
