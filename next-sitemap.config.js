/** @type {import('next-sitemap').IConfig} */
const iConfig = {
  siteUrl: 'https://www.adam-bartusek.cz', // ← uprav na svou doménu
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