import { MetadataRoute } from "next";
import { practiceServices, usefulArticles, teamMembersList } from "@/data/mockData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luathaiminhquan.vn";
  const now = new Date();

  // 1. Các trang tĩnh chính
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/thanh-vien/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/lien-he/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // 2. Các trang dịch vụ chi tiết (/service/[slug]/)
  const serviceRoutes: MetadataRoute.Sitemap = practiceServices.map((service) => ({
    url: `${siteUrl}/service/${service.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Các bài viết blog chuyên sâu (/blog/[slug]/)
  const blogRoutes: MetadataRoute.Sitemap = usefulArticles.map((article) => ({
    url: `${siteUrl}/blog/${article.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // 4. Các trang hồ sơ luật sư (/thanh-vien/[slug]/)
  const attorneyRoutes: MetadataRoute.Sitemap = teamMembersList.map((member) => ({
    url: `${siteUrl}/thanh-vien/${member.id}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...attorneyRoutes,
  ];
}
