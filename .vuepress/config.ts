import { defineUserConfig } from 'vuepress'
// import { viteBundler } from '@vuepress/bundler-vite'
import theme from './theme.js'

export default defineUserConfig({
  base: '/notes-cs/',
  title: 'yamsfeer',
  lang: 'zh-CN',

  theme,

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

  // bundler: viteBundler({
  //   viteOptions: {},
  //   vuePluginOptions: {},
  // }),
})
