import { sidebar } from 'vuepress-theme-hope'
import path from 'path'
import { readdirSync } from 'fs'

function dir(dirname) {
  return readdirSync(path.resolve(`${__dirname}/../${dirname}`))
    .filter((filename) => filename.includes('.md'))
    .map((filename) => {
      return {
        text: filename.split('.md')[0],
        link: filename,
      }
    })
}

function sort(files) {
  return files.sort((A, B) => {
    const { text: nameA } = A,
      { text: nameB } = B
    const reg = /[\d+.]+/
    if (nameA.match(reg) && nameB.match(reg)) {
      const indexA = nameA.match(reg)[0].split('.') // '12.1.3'
      const indexB = nameB.match(reg)[0].split('.')

      let i = 0
      let length = Math.max(indexA.length, indexB.length)
      while (i < length) {
        let A = indexA[i] || 0 // 超出的部分用 0 补充
        let B = indexB[i] || 0
        if (A === B) {
          i++
          continue
        }
        return A - B
      }
    }
  })
}

export default sidebar({
  /* 编程 */
  '/编程/算法设计与分析/': [
    { text: '算法设计与分析', children: sort(dir('编程/算法设计与分析/')) },
  ],
  '/编程/leetcode/': [
    { text: 'leetcode', children: sort(dir('编程/leetcode')) },
  ],
  '/编程/数据结构算法/': [
    { text: '数据结构算法', children: dir('编程/数据结构算法') },
  ],
  '/编程/手写代码/': [{ text: '手写代码', children: dir('编程/手写代码') }],
  '/编程/设计模式/': [
    { text: '设计模式', children: sort(dir('编程/设计模式')) },
  ],
  '/编程/编程概论/': [
    { text: '编程概论', children: sort(dir('编程/编程概论')) },
  ],

  /* 计算机基础 */
  '/计算机基础/计算机科学': [
    { text: '计算机科学', children: dir('计算机基础/计算机科学') },
  ],
  '/计算机基础/计算机体系结构': [
    { text: '计算机体系结构', children: dir('计算机基础/体系结构') },
  ],
  '/计算机基础/计算机通识': [
    { text: '计算机通识', children: dir('计算机基础/计算机通识') },
  ],
  '/计算机基础/操作系统': [
    { text: '操作系统', children: dir('计算机基础/操作系统') },
  ],
  '/计算机基础/编译原理': [
    { text: '编译原理', children: dir('计算机基础/编译原理') },
  ],

  /* 图形学 */
  '/图形学/games101': [{ text: 'games101', children: dir('图形学/games101') }],
  '/图形学/games104': [{ text: 'games104', children: dir('图形学/games104') }],
  '/图形学/webGPU': [{ text: 'webGPU', children: dir('图形学/webGPU') }],
  '/图形学/unreal': [{ text: 'unreal', children: dir('图形学/unreal') }],
})
