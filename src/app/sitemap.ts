import type { MetadataRoute } from "next";

const baseUrl = "https://nexa-flow.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/dashboard",
    "/generator",
    "/projects",
    "/history",
    "/pricing",
    "/faq"
  ];

  return routes.map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7
  }));
}
