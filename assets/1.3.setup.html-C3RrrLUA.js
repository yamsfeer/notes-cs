import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as s,b as d}from"./app-BzW9chhs.js";const a={},p=d('<h1 id="setup-s" tabindex="-1"><a class="header-anchor" href="#setup-s"><span>setup.s</span></a></h1><p>setup 占 4 个扇区，512 * 4 字节。</p><table><thead><tr><th>段</th><th>地址</th><th>说明</th></tr></thead><tbody><tr><td>BOOTSEG</td><td>0x7c00</td><td>历史遗留</td></tr><tr><td>INITSEG</td><td>0x9000</td><td></td></tr><tr><td>SETUPSEG</td><td>0x9020</td><td></td></tr></tbody></table><h2 id="setup-的工作" tabindex="-1"><a class="header-anchor" href="#setup-的工作"><span>setup 的工作</span></a></h2><table><thead><tr><th>内存地址</th><th>长度（字节）</th><th>名称</th></tr></thead><tbody><tr><td>0x90000</td><td>2</td><td>光标位置</td></tr><tr><td>0x90002</td><td>2</td><td>拓展内存数</td></tr><tr><td>0x9000c</td><td>2</td><td>显卡参数</td></tr><tr><td>0x901fc</td><td>2</td><td>根设备号</td></tr></tbody></table><ul><li>获取内存大小</li><li>bootset 已经读入 os，setup 会将 os 移动到 0 地址</li><li>进入保护模式</li></ul><h2 id="保护模式" tabindex="-1"><a class="header-anchor" href="#保护模式"><span>保护模式</span></a></h2><p>保护模式的作用是切换到 32 为寻址模式。</p><p>原本的实模式下 cs &lt;&lt; 4 + ip 只能访问 1M 的内存空间，32 位寻址可以访问 4G 内存。</p><p>保护模式下，有新的寻址方式和中断向量表。</p><p>cr0 寄存器，最后一位</p><ul><li>1：保护模式</li><li>0：实模式</li></ul><p>保护模式下，根据 cs 寄存器查 GDT ( global describe table ) 表，然后 + ip。</p><p>GDT 表似乎是在 head.S 中建立的，setup 只是将 cr0 寄存器最后一位置为 1，这就算进入保护模式了。</p>',14),r=[p];function o(i,l){return e(),s("div",null,r)}const h=t(a,[["render",o],["__file","1.3.setup.html.vue"]]),u=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1.3.setup.html","title":"setup.s","lang":"zh-CN","frontmatter":{"description":"setup.s setup 占 4 个扇区，512 * 4 字节。 setup 的工作 获取内存大小 bootset 已经读入 os，setup 会将 os 移动到 0 地址 进入保护模式 保护模式 保护模式的作用是切换到 32 为寻址模式。 原本的实模式下 cs << 4 + ip 只能访问 1M 的内存空间，32 位寻址可以访问 4G 内存。 保护...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1.3.setup.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"setup.s"}],["meta",{"property":"og:description","content":"setup.s setup 占 4 个扇区，512 * 4 字节。 setup 的工作 获取内存大小 bootset 已经读入 os，setup 会将 os 移动到 0 地址 进入保护模式 保护模式 保护模式的作用是切换到 32 为寻址模式。 原本的实模式下 cs << 4 + ip 只能访问 1M 的内存空间，32 位寻址可以访问 4G 内存。 保护..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"setup.s\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"setup 的工作","slug":"setup-的工作","link":"#setup-的工作","children":[]},{"level":2,"title":"保护模式","slug":"保护模式","link":"#保护模式","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.79,"words":236},"filePathRelative":"计算机基础/操作系统/1.3.setup.md","localizedDate":"2024年4月12日","autoDesc":true}');export{h as comp,u as data};
