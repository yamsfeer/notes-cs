import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as n,c as d,a as t,b as r,d as i,e}from"./app-706bfe03.js";const o={},c=e('<h1 id="mips汇编入门" tabindex="-1"><a class="header-anchor" href="#mips汇编入门" aria-hidden="true">#</a> MIPS汇编入门</h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2><p>MIPS（<strong>M</strong>icroprocessor without <strong>I</strong>nterlocked <strong>P</strong>ipeline <strong>S</strong>tages），是一种采取精简指令集（RISC: <strong>r</strong>educed <strong>i</strong>nstruction <strong>s</strong>et <strong>c</strong>omputer）的指令集架构。最早的MIPS架构是32 bits，最新的版本已经变成64 bits（本文介绍的是32位版本）。</p><p>本文主要介绍：</p><ul><li>寄存器</li><li>汇编程序结构</li><li>指令集 <ul><li>load / store 指令</li><li>算术指令</li><li>跳转指令</li><li>系统调用 / IO 指令</li></ul></li></ul><h3 id="数据的表示" tabindex="-1"><a class="header-anchor" href="#数据的表示" aria-hidden="true">#</a> 数据的表示</h3><ul><li>所有MIPS指令都是32位</li><li><code>1 byte = 8 bits, halfword = 2 bytes, 1 word = 4 bytes</code></li><li><code>1 char = 1 byte</code></li><li><code>1 int = 1 word = 4 bytes</code></li><li>数字（number）<strong>直接输入</strong>，例如：<code>10</code></li><li>单字符（character）用<strong>单引号</strong>括起来，例如：<code>&#39;b&#39;</code></li><li>字符串（string）用<strong>双引号</strong>括起来，例如：<code>&quot;A string&quot;</code></li></ul><h3 id="mips模拟器" tabindex="-1"><a class="header-anchor" href="#mips模拟器" aria-hidden="true">#</a> MIPS模拟器</h3>',8),g={href:"https://courses.missouristate.edu/KenVollmar/MARS/",target:"_blank",rel:"noopener noreferrer"},p=e(`<h2 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器" aria-hidden="true">#</a> 寄存器</h2><ul><li>MIPS共有32个<strong>通用寄存器</strong></li><li>在汇编指令中，寄存器以<code>$</code>开头，有两种表示方式 <ul><li>使用寄存器编号，例如：<code>$0 ~ $31</code></li><li>使用寄存器名称，例如：<code>$t1, $sp</code>（寄存器的编号及名称含义见下表）</li></ul></li><li>特殊的寄存器<code>Lo</code>和<code>Hi</code>用于存储乘法或除法运算的结果 <ul><li>不能直接访问<code>Lo</code>和<code>Hi</code>寄存器，它们的内容通过特殊的指令访问：<code>mfhi</code>（move from Hi）和<code>mflo</code>（move from Lo）</li></ul></li><li>栈的方向从存储器的<strong>高地址到低地址</strong></li></ul><p>各个寄存器编号、名称和描述：</p><table><thead><tr><th style="text-align:left;">寄存器编号</th><th style="text-align:left;">寄存器名称</th><th style="text-align:left;">英文全称</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">0</td><td style="text-align:left;">$zero</td><td style="text-align:left;">zero</td><td style="text-align:left;">值恒为0</td></tr><tr><td style="text-align:left;">1</td><td style="text-align:left;">$at</td><td style="text-align:left;"><strong>a</strong>ssembler <strong>t</strong>emporary</td><td style="text-align:left;">汇编保留寄存器（不可做其他用途）</td></tr><tr><td style="text-align:left;">2-3</td><td style="text-align:left;">$v0 , $v1</td><td style="text-align:left;"><strong>v</strong>alues</td><td style="text-align:left;">值来自于表达式求值和函数结果</td></tr><tr><td style="text-align:left;">4-7</td><td style="text-align:left;">$a0 - $a3</td><td style="text-align:left;"><strong>a</strong>rguments</td><td style="text-align:left;">存储子程序调用的前4个非浮点参数，在子程序中不会跨子程序保存</td></tr><tr><td style="text-align:left;">8-15</td><td style="text-align:left;">$t0 - $t7</td><td style="text-align:left;"><strong>t</strong>emporaries</td><td style="text-align:left;">暂存寄存器</td></tr><tr><td style="text-align:left;">16-23</td><td style="text-align:left;">$s0 - $s7</td><td style="text-align:left;"><strong>s</strong>aved values</td><td style="text-align:left;">通用寄存器</td></tr><tr><td style="text-align:left;">24-25</td><td style="text-align:left;">$t8 - $t9</td><td style="text-align:left;"><strong>t</strong>emporaries</td><td style="text-align:left;">临时变量，与$t0 - $t7一样</td></tr><tr><td style="text-align:left;">26-27</td><td style="text-align:left;">$k0, $k1</td><td style="text-align:left;"><strong>k</strong>ernel reserved</td><td style="text-align:left;">操作系统内核保留寄存器，用于中断处理</td></tr><tr><td style="text-align:left;">28</td><td style="text-align:left;">$gp</td><td style="text-align:left;"><strong>g</strong>lobal <strong>p</strong>ointer</td><td style="text-align:left;">全局指针</td></tr><tr><td style="text-align:left;">29</td><td style="text-align:left;">$sp</td><td style="text-align:left;"><strong>s</strong>tack <strong>p</strong>ointer</td><td style="text-align:left;">栈指针，指向栈顶</td></tr><tr><td style="text-align:left;">30</td><td style="text-align:left;">$s8 / $fp</td><td style="text-align:left;"><strong>s</strong>aved values / <strong>f</strong>rame <strong>p</strong>ointer</td><td style="text-align:left;">帧指针，用于过程调用</td></tr><tr><td style="text-align:left;">31</td><td style="text-align:left;">$ra</td><td style="text-align:left;"><strong>r</strong>eturn <strong>a</strong>ddress</td><td style="text-align:left;">返回地址</td></tr></tbody></table><h2 id="汇编程序结构" tabindex="-1"><a class="header-anchor" href="#汇编程序结构" aria-hidden="true">#</a> 汇编程序结构</h2><p>MIPS源程序文件（文件后缀<code>.s</code>或<code>.asm</code>）中包含<strong>数据声明</strong>和<strong>程序代码</strong>两部分，数据声明在程序代码之前</p><h3 id="数据声明" tabindex="-1"><a class="header-anchor" href="#数据声明" aria-hidden="true">#</a> 数据声明</h3><p>数据声明以汇编器指令<code>.data</code>作为开始标识。声明的语法为：<code>[name]: [storage_type] [value]</code></p><p><code>storage_type</code>可以为<code>.byte</code>、<code>.word</code>、<code>.space</code>、<code>ascii</code>、<code>.asciiz</code>，例如：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>.data
  var_name: .word 123 # 声明变量var_name，占用1个字（4字节）空间，值为123
  array1: .byte &#39;c&#39;, &#39;b&#39;
  array2: .space 40 # 长度为40的字符数组
  str1: .asciiz &quot;a string&quot;
</code></pre></div><ul><li><p>声明字符数组array1，包含2个字符元素，初始化为a和b</p></li><li><p>申请一段空间array2，在内存中分配连续的40个字节空间，array2未被初始化，可能是长度40的字符数组或长度为10的整型数组，因此建议<strong>在注释中说明用途</strong>。</p></li><li><p><code>.ascii</code> 会保存字符串在数据段但<strong>不会</strong>加<code>null</code>终止符</p></li><li><p><code>.asciiz</code> 会保存字符串在数据段<strong>且</strong>加<code>null</code>终止符</p></li></ul><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><ul><li>代码放在<code>.text</code>标识后</li><li>代码段文本包含程序代码指令，以<code>main</code>作为程序入口</li><li>主代码的结束点应该使用“退出系统调用（功能），详见后续的“系统调用篇”</li></ul><h3 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h3><p>在一行内，任何在#之后的内容，将会被（编译器）认为是<strong>注释</strong>。</p><h3 id="标签-label" tabindex="-1"><a class="header-anchor" href="#标签-label" aria-hidden="true">#</a> 标签(label)</h3><p>在代码中可以设定一个标签，方便跳转或标注，通常用于if - else 跳转或 jump，详见指令部分。</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>.text
__my_label:
  lw $t0, var1   # $t0 = var1
done
</code></pre></div><h3 id="mips程序示例" tabindex="-1"><a class="header-anchor" href="#mips程序示例" aria-hidden="true">#</a> MIPS程序示例</h3><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># example.s
.data
  # 数据声明
  var1: .word 123
  array1: .byte &#39;a&#39;,&#39;b&#39;
  array2: .space 40 # 申请40个字节的连续空间
.text
  # 指令代码 main为入口
main:
  lw	$t0, var1

</code></pre></div><h2 id="指令" tabindex="-1"><a class="header-anchor" href="#指令" aria-hidden="true">#</a> 指令</h2><h3 id="load-store-指令" tabindex="-1"><a class="header-anchor" href="#load-store-指令" aria-hidden="true">#</a> load / store 指令</h3><p>只能使用load / store指令来访问内存，其他指令都是寄存器操作。</p><p>load指令：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 从RAM_source 复制1个字的内容到寄存器
lw register_destination, RAM_source
# lb = load byte
lb register_destination, RAM_source
# li = load immediate value 加载一个立即数到寄存器
li register_destination, value
</code></pre></div><p>Store 指令：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 将寄存器的数据写入内存
sw register_source, RAM_destination
# sb = store byte
sb register_source, RAM_destination
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>example:
.data
  var1:	.word 23 # 声明一个整型var1 = 23
.text
__start:
  lw $t0, var1   # $t0 = var1
  li $t1, 5      # $t1 = 5
  sw $t1, var1   # var1 = $t1;
done
</code></pre></div><h3 id="立即寻址、间接寻址和偏移量" tabindex="-1"><a class="header-anchor" href="#立即寻址、间接寻址和偏移量" aria-hidden="true">#</a> 立即寻址、间接寻址和偏移量</h3><ul><li><p>直接寻址</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 将var1的RAM地址复制到t0寄存器
# la = load address
la $t0 var1
</code></pre></div></li><li><p>间接寻址</p><p>通过<code>($register)</code>将寄存器中的值作为地址：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 将t0寄存器中存放的值放到t2
# 括号可以认为是“取寄存器的值”
lw $t2, ($t0)
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 将t2中存放的值写入t0的值指向的内存
sw $t2, ($t0)
</code></pre></div></li><li><p>偏移量</p><p>偏移量通常用于数组或栈</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># $t2 = ($t0 + 4)
lw $t2, 4($t0)
</code></pre></div><p>可以是负数的偏移量：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># ($t0 - 12) = $t2
sw $t2, -12($t0)
</code></pre></div></li></ul><p>寻址的综合例子：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>example：
.data
  array1: .space <span class="token number">12</span> <span class="token comment"># 声明一个12字节长度的数组 array1, 可容纳3个整型</span>
.text
__start:
  la <span class="token variable">$t0</span>, array1  <span class="token comment"># $t0 = 数组首地址</span>
  li <span class="token variable">$t1</span>, <span class="token number">5</span>       <span class="token comment"># $t1 = 5</span>
  sw <span class="token variable">$t1</span>, <span class="token punctuation">(</span><span class="token variable">$t0</span><span class="token punctuation">)</span>   <span class="token comment"># array[0] = $t1 = 5</span>
  li <span class="token variable">$t1</span>, <span class="token number">13</span>      <span class="token comment"># $t1 = 13</span>
  sw <span class="token variable">$t1</span>, <span class="token number">4</span><span class="token punctuation">(</span><span class="token variable">$t0</span><span class="token punctuation">)</span>  <span class="token comment"># array[1] = $t1 = 13</span>
                  <span class="token comment"># 整型占4个字节，数组首地址偏移4字节就是array[1]的地址</span>
  li <span class="token variable">$t1</span>, <span class="token parameter variable">-7</span>      <span class="token comment"># $t1 = -7</span>
  sw <span class="token variable">$t1</span>, <span class="token number">8</span><span class="token punctuation">(</span><span class="token variable">$t0</span><span class="token punctuation">)</span>  <span class="token comment"># array + 8字节偏移 = array[2]的地址</span>
<span class="token keyword">done</span>
</code></pre></div><h3 id="算术指令" tabindex="-1"><a class="header-anchor" href="#算术指令" aria-hidden="true">#</a> 算术指令</h3><ul><li>算术指令最多3个操作数</li><li>操作数只能是寄存器</li><li>MIPS所有指令都是32 bits</li></ul><p>加减法指令：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>sub	$t2, $t3, $t4   # $t2 = $t3 - $t4
addi $t2, $t3, 5    # $t2 = $t3 + 5
                    # addi = add immediate
                    # 没有subi指令
addu $t1, $t6, $t7  # $t1 = $t6 + $t7
                    # addu = add unsigned integers
subu $t1, $t6, $t7  # $t1 = $t6 - $t7
</code></pre></div><p>乘除法指令：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>mult $t3, $t4       # $t3, $t4的两个32位数相乘，得到一个64位数据
                    # $hi 存放高位，$lo 存放低位
div	$t5, $t6        # $t5 / $t6
                    # 商数存放在 $lo, 余数存放在 $hi

mfhi $t0            # 不能直接获取 $hi 或 $lo 中的值， 需要mfhi, mflo指令传值给寄存器
mflo $t1
</code></pre></div><p>寄存器间赋值：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>move $t2, $t3       # $t2 = $t3
</code></pre></div><h3 id="结构控制" tabindex="-1"><a class="header-anchor" href="#结构控制" aria-hidden="true">#</a> 结构控制</h3><ul><li><p>分支（if - else）</p><p>满足条件则跳转到指定分支。</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>b	target              # 无条件跳转到target
beq	$t0, $t1, target  # $t0 = $t1
blt	$t0, $t1, target  # $t0 &lt; $t1
ble	$t0, $t1, target  # $t0 &lt;= $t1
bgt	$t0, $t1, target  # $t0 &gt; $t1
bge	$t0, $t1, target  # $t0 &gt;= $t1
bne	$t0, $t1, target  # $t0 != $t1
</code></pre></div></li><li><p>跳转</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>j	target # 无条件跳转
jr $t3   # 跳转到$t3存放的地址，jr = jump register
</code></pre></div></li><li><p>子程序调用（函数调用）</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code>jal sub_label  # jump and link
# 将当前的程序计数器（program counter PC指针）保存到$ra中
# 然后跳到sub_label（指针指向sub_label）
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 通过$ra保存的返回地址跳回函数调用前的位置
jr $ra # jump register
</code></pre></div><p>如果调用的子程序中有调用了其他子程序，如此往复， 则<strong>用栈来保存返回地址</strong>，毕竟$ra只有一个。</p></li></ul><h3 id="系统调用和io" tabindex="-1"><a class="header-anchor" href="#系统调用和io" aria-hidden="true">#</a> 系统调用和IO</h3><p>对参数寄存器进行设定后，执行<code>syscall</code>指令就可以进行系统调用和IO。</p><ul><li>通过系统调用实现终端的输入输出，以及声明程序结束</li><li>参数所使用的寄存器：$v0，$a0, $a1</li><li>返回值使用：$v0</li></ul><p>下表给出了系统调用中对应功能，代码，参数机返回值：</p><table><thead><tr><th style="text-align:center;">Service</th><th style="text-align:center;">描述</th><th style="text-align:center;">$v0对应功能的调用码</th><th style="text-align:center;">参数</th><th style="text-align:center;">返回值</th></tr></thead><tbody><tr><td style="text-align:center;">print_int</td><td style="text-align:center;">打印整数</td><td style="text-align:center;">$v0 = 1</td><td style="text-align:center;">$a0 = 目标整型数</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">print_float</td><td style="text-align:center;">打印浮点数</td><td style="text-align:center;">$v0 = 2</td><td style="text-align:center;">$f12 = 目标浮点数</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">print_double</td><td style="text-align:center;">打印双精度浮点数</td><td style="text-align:center;">$v0 = 3</td><td style="text-align:center;">$f12 = 目标双精度浮点数</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">print_string</td><td style="text-align:center;">打印字符串</td><td style="text-align:center;">$v0 = 4</td><td style="text-align:center;">$a0 = 目标字符串的地址</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">read_int</td><td style="text-align:center;">从键盘读取整型数</td><td style="text-align:center;">$v0 = 5</td><td style="text-align:center;"></td><td style="text-align:center;">返回整型给 $v0</td></tr><tr><td style="text-align:center;">read_float</td><td style="text-align:center;">从键盘读取浮点数</td><td style="text-align:center;">$v0 = 6</td><td style="text-align:center;"></td><td style="text-align:center;">返回浮点数给 $v0</td></tr><tr><td style="text-align:center;">read_double</td><td style="text-align:center;">从键盘读取双精度</td><td style="text-align:center;">$v0 = 7</td><td style="text-align:center;"></td><td style="text-align:center;">返回双精度给 $v0</td></tr><tr><td style="text-align:center;">read_string</td><td style="text-align:center;">从键盘读取字符串</td><td style="text-align:center;">$v0 = 8</td><td style="text-align:center;">$a0 = 目标字符串地址<br>$a1 = 目标字符串长度</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">sbrk</td><td style="text-align:center;">动态分配内存</td><td style="text-align:center;">$v0 = 9</td><td style="text-align:center;">$a0 = 需要分配的空间大小（单位bytes）</td><td style="text-align:center;">将分配好的空间首地址返回给 $v0</td></tr><tr><td style="text-align:center;">exit</td><td style="text-align:center;">退出</td><td style="text-align:center;">$v0 =10</td><td style="text-align:center;">退出码</td><td style="text-align:center;"></td></tr></tbody></table><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 打印一个存储在寄存器 $2 里的整型
li $v0, 1      # print_int 调用码为1
move $a0, $t2  # 目标整型数在放到$a0
syscall        # 进行系统调用
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 读取一个数，并且存储到内存中的 int_value 变量中
.data
	int_value: .word 12
.text
main:
  li $v0, 5	         # read_int 调用码为5
  syscall            # 键盘读取操作后，$v0 = 输入的数字
  sw $v0, int_value  # 将 $v0的值写入内存
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 打印一个字符串
.data
	string1 .asciiz	&quot;Print this.\\n&quot;
.text
main:
	li $v0, 4        # print_string 调用码为4
  la $a0, string1  # $a0 = address(string1)
  syscall
</code></pre></div><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># 系统退出
li $v0, 10 # exit 调用码为10
syscall
</code></pre></div>`,51);function y($,x){const a=l("ExternalLinkIcon");return n(),d("div",null,[c,t("p",null,[t("a",g,[r("MARS4.5"),i(a)])]),p])}const m=s(o,[["render",y],["__file","MIPS汇编入门.html.vue"]]);export{m as default};
