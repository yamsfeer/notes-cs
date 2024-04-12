import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as a,b as s}from"./app-BzW9chhs.js";const o={},n=s(`<h1 id="bootsect" tabindex="-1"><a class="header-anchor" href="#bootsect"><span>bootsect</span></a></h1><p>MBR ( master boot record ) 主引导记录 主引导扇区</p><p>一个扇区 512B，</p><ul><li><p>代码 446B</p></li><li><p>硬盘分区表</p></li><li><p>将 setup 代码载入内存</p></li><li><p>将 OS 代码载入内存</p></li></ul><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>.global begtext,begdata,begbss,endtext,enddata,endbss
.text
begtext:
.data # 数据段
begdata:
.bss # 未初始化数据段
begbss:
entry start # 关键字 entry 告知连接器“程序入口”

# BOOTSEG = 0x07c0
# INITSEG = 0x9000
# SETUPSEG = 0x9020

start:
  mov ax,BOOTSEG		mov ds,ax
  mov ax,INITSEG		mov es,ax
  mov cx,256
  sub si,si # si = 0
  sub di,di # di = 0
  rep movw
  jmpi go,INITSEG
</code></pre></div><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>go:
	mov ax,cs # cs=0x9000
	mov ds,ax		mov es,ax		mov ss,ax		mov sp,0xff00 # 为 call 做准备

load_setup: # 载入 setup 模块
	mov dx,0x0000		mov cx,0x0002		mov bx,0x0200
	mov ax,0x0200+SETUPLEN		int 0x13 # BIOS 中断
	jnc ok_load_setup # 读入 setup 成功

	mov dx,0x0000		mov ax,0x0000 # 复位
	int 0x13
	j load_setup # 重新读
</code></pre></div><h3 id="读入-setup-模块" tabindex="-1"><a class="header-anchor" href="#读入-setup-模块"><span>读入 setup 模块</span></a></h3><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>ok_load_setup:
	mov dl,0x00		mov ax,0x0800
	int 0x13		 	mov ch,0x00			mov sectors,cx
	mov ah,0x03 	xor bh,bh				int 0x10 # 读光标
	mov cs,24			mov bx,0x0007
	mov bp,msg1		mov ax,1301			int 0x10 # 显示字符
	mov ax,SYSSEG # SYSSEG=0x1000
	mov es,ax
	call read_it # 读入 system 模块
	jmpi 0,SETUPSEG
</code></pre></div><h3 id="读入-system-模块" tabindex="-1"><a class="header-anchor" href="#读入-system-模块"><span>读入 system 模块</span></a></h3><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>read_it:
	mov ax,es		cmp ax,ENDSEG		jb ok1_read
	ret
ok1_read:
	mov ax,sectors
	sub ax,sread # seread是当前磁道已读扇区数，ax 为未读扇区数
	call read_track # 读磁道
</code></pre></div><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>.org 510
.word 0xAA55
</code></pre></div><h2 id="makefile-生成磁盘布局" tabindex="-1"><a class="header-anchor" href="#makefile-生成磁盘布局"><span>makefile 生成磁盘布局</span></a></h2>`,12),l=[n];function m(i,r){return e(),a("div",null,l)}const p=t(o,[["render",m],["__file","1.2.MBR.html.vue"]]),x=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1.2.MBR.html","title":"bootsect","lang":"zh-CN","frontmatter":{"description":"bootsect MBR ( master boot record ) 主引导记录 主引导扇区 一个扇区 512B， 代码 446B 硬盘分区表 将 setup 代码载入内存 将 OS 代码载入内存 读入 setup 模块 读入 system 模块 makefile 生成磁盘布局","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/1.2.MBR.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"bootsect"}],["meta",{"property":"og:description","content":"bootsect MBR ( master boot record ) 主引导记录 主引导扇区 一个扇区 512B， 代码 446B 硬盘分区表 将 setup 代码载入内存 将 OS 代码载入内存 读入 setup 模块 读入 system 模块 makefile 生成磁盘布局"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"bootsect\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":3,"title":"读入 setup 模块","slug":"读入-setup-模块","link":"#读入-setup-模块","children":[]},{"level":3,"title":"读入 system 模块","slug":"读入-system-模块","link":"#读入-system-模块","children":[]},{"level":2,"title":"makefile 生成磁盘布局","slug":"makefile-生成磁盘布局","link":"#makefile-生成磁盘布局","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.05,"words":316},"filePathRelative":"计算机基础/操作系统/1.2.MBR.md","localizedDate":"2024年4月12日","autoDesc":true}');export{p as comp,x as data};
