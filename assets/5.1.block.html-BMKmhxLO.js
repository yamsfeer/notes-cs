import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as a,b as o}from"./app-BzW9chhs.js";const l={},c=o('<h1 id="文件系统" tabindex="-1"><a class="header-anchor" href="#文件系统"><span>文件系统</span></a></h1><h2 id="raw-disk" tabindex="-1"><a class="header-anchor" href="#raw-disk"><span>raw disk</span></a></h2><p>磁盘的访问单位是扇区，一个扇区 512 字节，这个大小兼顾了传输速率和避免磁盘碎片。</p><p>磁盘的读写需要几个信息：柱面、磁道、扇区、缓存位置。</p><h3 id="block" tabindex="-1"><a class="header-anchor" href="#block"><span>block</span></a></h3><p>第一层抽象：block，block 可以转换成磁道扇区等关键信息。</p><p>磁盘访问时间 = 写入控制器时间 + 寻道时间 + 旋转时间 + 传输时间。</p><p>磁盘访问瓶颈在于寻道时间。为了减少寻道时间，根据局部性原理，尽量让 block 在同一磁道且连续。</p><p>对于操作系统来说，磁盘访问的基本单位是 block，一个 block 对应两个扇区，即 512B * 2 = 1K。</p><h3 id="请求队列" tabindex="-1"><a class="header-anchor" href="#请求队列"><span>请求队列</span></a></h3><p>进程访问磁盘时，需要进入请求队列排队（磁盘只有一个磁臂）。</p><p>请求队列又涉及到调度算法，哪个进程优先？</p><p>调度的目标：平均访问延迟小</p><p>主要关注点：寻道时间</p><ul><li><p>FCFS：公平，但磁头移动距离长</p></li><li><p>SSTF：shortest-seek-time First：饥饿问题</p></li><li><p>scan 磁盘调度，电梯算法</p><p>SSTF + 中途不折返，每个请求都有处理机会</p></li></ul>',15),i=[c];function r(p,s){return t(),a("div",null,i)}const h=e(l,[["render",r],["__file","5.1.block.html.vue"]]),m=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/5.1.block.html","title":"文件系统","lang":"zh-CN","frontmatter":{"description":"文件系统 raw disk 磁盘的访问单位是扇区，一个扇区 512 字节，这个大小兼顾了传输速率和避免磁盘碎片。 磁盘的读写需要几个信息：柱面、磁道、扇区、缓存位置。 block 第一层抽象：block，block 可以转换成磁道扇区等关键信息。 磁盘访问时间 = 写入控制器时间 + 寻道时间 + 旋转时间 + 传输时间。 磁盘访问瓶颈在于寻道时间。为...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/5.1.block.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"文件系统"}],["meta",{"property":"og:description","content":"文件系统 raw disk 磁盘的访问单位是扇区，一个扇区 512 字节，这个大小兼顾了传输速率和避免磁盘碎片。 磁盘的读写需要几个信息：柱面、磁道、扇区、缓存位置。 block 第一层抽象：block，block 可以转换成磁道扇区等关键信息。 磁盘访问时间 = 写入控制器时间 + 寻道时间 + 旋转时间 + 传输时间。 磁盘访问瓶颈在于寻道时间。为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"文件系统\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"raw disk","slug":"raw-disk","link":"#raw-disk","children":[{"level":3,"title":"block","slug":"block","link":"#block","children":[]},{"level":3,"title":"请求队列","slug":"请求队列","link":"#请求队列","children":[]}]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.98,"words":293},"filePathRelative":"计算机基础/操作系统/5.1.block.md","localizedDate":"2024年4月12日","autoDesc":true}');export{h as comp,m as data};
