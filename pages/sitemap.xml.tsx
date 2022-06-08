// pages/server-sitemap.xml/index.tsx
import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const fields = [
    {
      loc: process.env.SITE_URL || "https://dunline.kr", // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.SITE_URL}/example` || "https://dunline.lr/example", // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ];
  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {
  return;
};
