import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Personal Management System",
  description: "Description todo",
  head: [
      [
        'link', {
            rel: 'icon',
            href: '/favicon.svg'
        }
      ]
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },
  appearance: {
    initialValue: 'light'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: 'http://personal-management-system.pl/' },
      { text: 'Source code', link: '/docs/base-information/repositories' },
      { text: 'Documentation', link: '/docs/base-information/repositories' }
    ],
    logo: '../assets/project/logo.svg',
    siteTitle: "PMS Docs",
    sidebar: [
      {
        text: 'Base information',
        items: [
          { text: 'Repositories / Code', link: '/docs/base-information/repositories' },
          { text: 'Requirements', link: '/docs/base-information/requirements' },
          { text: 'Limitations', link: '/docs/base-information/limitations' }
        ]
      },
      {
        text: 'Getting started',
        items: [
          { text: 'Installation', link: '/docs/getting-started/installation' },
          { text: 'Project urls', link: '/docs/getting-started/project-urls' },
          { text: 'First usage', link: '/docs/getting-started/first-usage' },
          { text: 'Migrating from v1', link: '/docs/getting-started/migrating-1-x' },
          { text: 'Updating v2', link: '/docs/getting-started/updating-2-x' },
          { text: 'Security concerns', link: '/docs/getting-started/security-concerns' }
        ]
      },
      {
        text: 'Special functionality',
        items: [
          { text: 'Lock mechanism', link: '/docs/functionality/lock-mechanism' },
        ]
      },
      {
        text: 'Technical',
        items: [
          { text: 'Tech stack', link: '/docs/technical/tech-stack' },
          { text: 'Development mode', link: '/docs/technical/dev-mode' },
          { text: 'Extending project', link: '/docs/technical/extending-project' },
          { text: 'Custom functionality', link: '/docs/technical/custom-functionality' },
          { text: 'Crons', link: '/docs/getting-started/crons' },
        ]
      },
      {
        text: 'Integration',
        items: [
          { text: 'Notifier Proxy Logger', link: '/docs/integration/notifier-proxy-logger' },
          { text: 'Personal management system IO', link: '/docs/integration/personal-management-system-io' },
        ]
      },
      {
        text: 'Other',
        items: [
          { text: 'Contributors', link: '/docs/other/contributors' },
          { text: 'Known issues', link: '/docs/other/known-issues' },
          { text: 'FAQ', link: '/docs/other/faq' }
        ]
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Volmarg'
      },
      {
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/volmarg/'
      },
      {
        icon: 'xing',
        link: 'https://www.xing.com/profile/Dariusz_Wlodarczyk2'
      },
      {
        icon: 'codersrank',
        link: 'https://profile.codersrank.io/user/volmarg/'
      },
      {
        icon: 'spotify',
        link: 'https://open.spotify.com/user/volmarg'
      }
    ]
  }
})
