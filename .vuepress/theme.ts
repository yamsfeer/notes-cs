import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import sidebar from './sidebar.js'

export default hopeTheme({
  navbar,
  sidebar,

  hostname: 'https://yamsfeer.github.io',
  repo: 'https://github.com/yamsfeer',
  repoLabel: 'GitHub',
  repoDisplay: true,

  /* 页面主题配置 */
  pageInfo: false,
  editLink: false,
  prevLink: false,
  nextLink: false,

  plugins: {
    mdEnhance: {
      katex: true,
      flowchart: true,
      mermaid: true,
      demo: true,
    },
  },
})
