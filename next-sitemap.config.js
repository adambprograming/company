/** @type {import('next-sitemap').IConfig} */
const iConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.newageweb.cz",
  generateRobotsTxt: true,
  exclude: ['/api/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/api/', '/_next/', '/static/', '/404', '/500'],
      },
    ],
  },
};

export default iConfig;
