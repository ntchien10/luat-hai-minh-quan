import React from "react";
import { firmInfo } from "@/data/mockData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://luathaiminhquan.vn";

/**
 * Schema.org LegalService / Attorney cho toàn website
 * Tăng cường nhận diện thực thể (Entity SEO) và Local SEO trên Google
 */
export const LegalServiceSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    "@id": `${SITE_URL}/#organization`,
    name: firmInfo.name,
    alternateName: "HMQ Law Firm",
    legalName: firmInfo.name,
    identifier: firmInfo.licenseNumber,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/about/about-court.jpg`,
    description:
      "Công ty Luật TNHH uy tín tại Hà Nội và toàn quốc: tố tụng dân sự, hình sự, hành chính, tư vấn đầu tư, sở hữu trí tuệ, luật sư doanh nghiệp, tư vấn kế toán thuế.",
    telephone: ["+84967932555", "+84924189868"],
    email: firmInfo.email,
    priceRange: "$$$",
    currenciesAccepted: "VND",
    paymentAccepted: "Tiền mặt, Chuyển khoản ngân hàng",
    founder: {
      "@type": "Person",
      name: firmInfo.director,
      jobTitle: firmInfo.directorRole,
      image: `${SITE_URL}/images/team/do-thi-thanh-hai.jpg`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tầng 2, No13 - LK13-17 Khu đất dịch vụ Dọc Bún 1",
      addressLocality: "Hà Đông",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.9719",
      longitude: "105.7766",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:30",
        closes: "12:00",
      },
    ],
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Hà Nội",
      },
      {
        "@type": "Country",
        name: "Việt Nam",
      },
    ],
    knowsAbout: [
      "Tố tụng Dân sự",
      "Tố tụng Hình sự",
      "Tố tụng Hành chính",
      "Tư vấn Đầu tư",
      "Sở hữu Trí tuệ",
      "Luật sư Doanh nghiệp",
      "Tư vấn Kế toán thuế",
      "Dịch vụ pháp lý khác",
    ],
    sameAs: [
      firmInfo.facebookUrl || "https://www.facebook.com/profile.php?id=61595585123041",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Schema.org BreadcrumbList cho các trang con
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export const BreadcrumbSchema: React.FC<{ items: BreadcrumbItem[] }> = ({
  items,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Schema.org Article / BlogPosting cho bài viết
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  authorName?: string;
  authorUrl?: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  authorName = "Luật sư Đỗ Thị Thanh Hải",
  authorUrl = "/thanh-vien/do-thi-thanh-hai/",
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl.startsWith("http") ? imageUrl : `${SITE_URL}${imageUrl}`,
    datePublished: datePublished,
    dateModified: datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${SITE_URL}${url}`,
    },
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl.startsWith("http") ? authorUrl : `${SITE_URL}${authorUrl}`,
    },
    publisher: {
      "@type": "Organization",
      name: firmInfo.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
