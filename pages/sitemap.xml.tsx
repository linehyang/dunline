// pages/server-sitemap.xml/index.tsx
import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [
    {
      loc: process.env.SITE_URL || "https://dunline.kr",
      lastmod: new Date().toISOString(),
    },
  ];
  return getServerSideSitemap(ctx, fields);
};

export default () => {
  return;
};
