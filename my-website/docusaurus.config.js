// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Карьерный навигатор',
  tagline: 'Платформа с экспертным контентом для развития карьеры',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://VaryaPavlova.github.io',
  baseUrl: '/hw-doc-as-a-code/',
  organizationName: 'VaryaPavlova',
  projectName: 'hw-doc-as-a-code',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [
            [
              require('@akebifiky/remark-simple-plantuml'),
              {baseUrl: 'https://www.plantuml.com/plantuml/svg'},
            ],
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            spec: 'docs/api/Integration.yaml',
            route: '/docs/api/reference',
          },
        ],
        theme: {
          primaryColor: '#1890ff',
        },
      },
    ],
  ],

  plugins: [
    'docusaurus-plugin-drawio',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Карьерный навигатор',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Документация',
          },
          {
            href: 'https://github.com/VaryaPavlova/hw-doc-as-a-code',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Документация',
            items: [
              {label: 'Введение', to: '/docs/intro'},
              {label: 'Архитектура', to: '/docs/architecture/overview'},
              {label: 'API', to: '/docs/api/overview'},
            ],
          },
          {
            title: 'Проект',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/VaryaPavlova/hw-doc-as-a-code',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Карьерный навигатор. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
