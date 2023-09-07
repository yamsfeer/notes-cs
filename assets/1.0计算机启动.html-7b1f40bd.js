import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as e,e as s}from"./app-706bfe03.js";const n={},o=s(`<h1 id="计算机启动" tabindex="-1"><a class="header-anchor" href="#计算机启动" aria-hidden="true">#</a> 计算机启动</h1><p>冯诺依曼架构的主要思想是：将程序和数据存放在存储器中，计算机在程序的控制下一步步进行处理。</p><p>计算机由 5 部分组成：输入设备、存储器、运算器、控制器、输出设备。其中存储器就是平常所说的内存，运算器和控制器构成了 CPU。</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsntjp3tn5j30ha0cjmxr.jpg" style="zoom:90%;"><p>简单来说，计算机的工作就是取指执行。</p><h2 id="rom-bios" tabindex="-1"><a class="header-anchor" href="#rom-bios" aria-hidden="true">#</a> ROM BIOS</h2><p>刚开机时，CPU 处于实模式，实模式与保护模式对应，和保护模式的寻址方式不同，实模式的寻址方式为 CS:IP，即 CS 左移 4 位加 IP。</p><p>以 x86 架构的机器为例，打开电源启动时，计算机会执行以下任务：</p><ul><li>CS=0xFFFF,IP=0x0000</li><li>寻址 0xFFFF0 ( ROM BIOS 映射区 )</li><li>检查 RAM、键盘、显示器、软硬磁盘</li><li>将磁盘 0 磁道 0 扇区读入 0x7c00 处</li><li>设置 cs=0x07c0，ip=0x0000</li></ul><p>以上这些行为都是由机器硬件的设计者决定并实现的，ROM BIOS 的内容一开始就固化在内存中。</p><p>磁盘 0 磁道 0 扇区是操作系统的引导扇区，共 512 个字节，里面存放着引导系统启动的代码 bootsect.s。</p><p>总的来说，计算机开机时，会执行 ROM BIOS 映射区的代码，它会检查 RAM、键盘、显示器、软硬磁盘，然后读入引导扇区代码，并设置 PC 指针执行引导代码。</p><h2 id="引导扇区代码-bootsect-s" tabindex="-1"><a class="header-anchor" href="#引导扇区代码-bootsect-s" aria-hidden="true">#</a> 引导扇区代码 bootsect.s</h2><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>.global begtext,begdata,begbss,endtext,enddata,endbss
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
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>go:
	mov ax,cs # cs=0x9000
	mov ds,ax		mov es,ax		mov ss,ax		mov sp,0xff00 # 为 call 做准备

load_setup: # 载入 setup 模块
	mov dx,0x0000		mov cx,0x0002		mov bx,0x0200
	mov ax,0x0200+SETUPLEN		int 0x13 # BIOS 中断
	jnc ok_load_setup # 读入 setup 成功

	mov dx,0x0000		mov ax,0x0000 # 复位
	int 0x13
	j load_setup # 重新读
</code></pre></div><h2 id="读入-setup-模块" tabindex="-1"><a class="header-anchor" href="#读入-setup-模块" aria-hidden="true">#</a> 读入 setup 模块</h2><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>ok_load_setup:
	mov dl,0x00		mov ax,0x0800
	int 0x13		 	mov ch,0x00			mov sectors,cx
	mov ah,0x03 	xor bh,bh				int 0x10 # 读光标
	mov cs,24			mov bx,0x0007
	mov bp,msg1		mov ax,1301			int 0x10 # 显示字符
	mov ax,SYSSEG # SYSSEG=0x1000
	mov es,ax
	call read_it # 读入 system 模块
	jmpi 0,SETUPSEG
</code></pre></div><h2 id="读入-system-模块" tabindex="-1"><a class="header-anchor" href="#读入-system-模块" aria-hidden="true">#</a> 读入 system 模块</h2><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>read_it:
	mov ax,es		cmp ax,ENDSEG		jb ok1_read
	ret
ok1_read:
	mov ax,sectors
	sub ax,sread # seread是当前磁道已读扇区数，ax 为未读扇区数
	call read_track # 读磁道
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>.org 510
.word 0xAA55
</code></pre></div>`,20),d=[o];function c(l,r){return a(),e("div",null,d)}const m=t(n,[["render",c],["__file","1.0计算机启动.html.vue"]]);export{m as default};
