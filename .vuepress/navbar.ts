import { navbar } from 'vuepress-theme-hope'

export default navbar([
  {
    text: '计算机',
    children: [
      { text: '编译原理', link: '/计算机基础/编译原理/1. 编译器介绍' },
      { text: '计算机通识', link: '/计算机基础/计算机通识/RSA算法' },
      { text: '体系结构', link: '/计算机基础/体系结构/冯诺依曼结构' },
      { text: '计算机科学', link: '/计算机基础/计算机科学/计算理论' },
      // { text: '汇编语言', link: '/计算机基础/汇编语言/MIPS汇编入门' },
      { text: '操作系统', link: '/计算机基础/操作系统/1.0计算机启动' },
    ],
  },
  {
    text: '编程',
    children: [
      { text: '编程概论', link: '/编程/编程概论/编程范式' },
      { text: 'leetcode', link: '/编程/leetcode/0.概述' },
      { text: '手写代码', link: '/编程/手写代码/防抖节流' },
      { text: '数据结构算法', link: '/编程/数据结构算法/堆' },
      { text: '算法分析', link: '/编程/算法设计与分析/1.概述' },
      { text: '设计模式', link: '/编程/设计模式/1.单例模式' },
    ],
  },
  {
    text: '图形学',
    children: [
      { text: 'games101', link: '/图形学/games101/0.序言' },
      { text: 'games104', link: '/图形学/games104/1.导论' },
      { text: 'webGPU', link: '/图形学/webGPU/1.webGPU' },
      { text: '虚幻引擎', link: '/图形学/unreal/1.概览' },
    ],
  },
])
