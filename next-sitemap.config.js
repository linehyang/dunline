module.exports = {
  siteUrl: process.env.SITE_URL || "https://dunline.kr/",
  generateRobotsTxt: true, // default: false, true 라고 설정해야 robots.txt 생성
  exclude: ["/server-sitemap.xml"], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL}server-sitemap.xml`, // <==== Add here
    ],
  },
};
