import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://heartofclassy.com";
  const locales = ["en", "vi"];
  const paths = ["", "/shop", "/services", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    paths.forEach((path) => {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1.0 : path === "/shop" ? 0.9 : 0.8,
      });
    });
  });

  return entries;
}
