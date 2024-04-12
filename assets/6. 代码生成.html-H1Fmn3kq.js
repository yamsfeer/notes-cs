import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as e,e as o,b as c,a as n}from"./app-BzW9chhs.js";const l={},u=c(`<h1 id="代码生成" tabindex="-1"><a class="header-anchor" href="#代码生成"><span>代码生成</span></a></h1><p>代码生成负责把源程序翻译成“目标机器”上的代码。目标机器可以是</p><ul><li>真实的物理机器，比如x86、arm等CPU架构的机器</li><li>虚拟机，比如JVM</li></ul><p>生成的代码主要有两个重要任务：</p><ul><li><p>给源程序的<strong>数据</strong>分配<strong>计算资源</strong></p><p><strong>数据</strong>包括全局变量、局部变量、动态分配内存等。<strong>计算资源</strong>包括寄存器、数据区、代码区、栈区、堆区。</p><p>代码生成需要根据程序的特点和编译器的设计目标合理的为数据分配计算资源。比如函数调用的数据通常放在栈中，动态分配的内存通常在堆中分配。</p></li><li><p>给源程序的<strong>代码</strong>选择<strong>指令</strong></p><p><strong>代码</strong>包括表达式运算、语句、函数等。<strong>指令</strong>通常包括算术运算、比较、跳转、函数调用、返回等。</p></li></ul><h2 id="栈计算机" tabindex="-1"><a class="header-anchor" href="#栈计算机"><span>栈计算机</span></a></h2><p>栈式计算机在历史上非常流行，但是由于<strong>效率问题</strong>现今已基本退出历史舞台。</p><p>我们还要讨论栈式计算机的代码生成主要有两个原因：</p><ul><li>得益于栈计算机的简单结构，对栈计算机的代码生成是最容易的</li><li>仍有许多栈式的虚拟机，比如JVM</li></ul><h3 id="栈计算机stack的结构" tabindex="-1"><a class="header-anchor" href="#栈计算机stack的结构"><span>栈计算机Stack的结构</span></a></h3><p>栈计算机Stack主要由以下几部分组成：</p><ul><li>内存Memory：存放所有的变量</li><li>栈Stack：进行运算的空间</li><li>算术逻辑单元ALU：执行指令</li></ul><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gt9qsdtvgoj306v059dfs.jpg" alt=""></p><h3 id="栈计算机的指令集-isa" tabindex="-1"><a class="header-anchor" href="#栈计算机的指令集-isa"><span>栈计算机的指令集(ISA)</span></a></h3><p>栈计算机的ISA用上下文无关文法(CFG)表示如下：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>s -&gt; push NUM
   | load x
   | store x
   | add
   | sub
   | times
   | div
</code></pre></div><ul><li><code>push NUM</code>：栈操作，将一个立即数压入栈</li><li><code>load / store</code>：访存操作，将一个数从内存压入栈或将栈顶元素出栈并保存到内存中</li><li><code>add / sub / times / div</code>：算术运算</li></ul><p>指令的语义：</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>push NUM:
	top++;
	stack[top] = NUM;
load x:
	top++;
	stack[top] = x;
store x:
	x = stack[top];
	top--;
add:
	temp = stack[top - 1] + stack[top];
	top -= 2;
	push temp;
sub,times,div: // ...
</code></pre></div><p>Stack机器只支持<code>int</code>一种数据类型，给变量<code>x</code>分配内存的伪指令是：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>.int x
</code></pre></div><p>Stack机器在装载一个程序时，就会读取伪指令，给相关变量分配内存。</p><h3 id="一个例子" tabindex="-1"><a class="header-anchor" href="#一个例子"><span>一个例子</span></a></h3><p>假设有如下源代码：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">int</span> x<span class="token punctuation">;</span> <span class="token keyword">int</span> y<span class="token punctuation">;</span> <span class="token keyword">int</span> z<span class="token punctuation">;</span>

x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
y <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
z <span class="token operator">=</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
y <span class="token operator">=</span> z <span class="token operator">*</span> x<span class="token punctuation">;</span>
</code></pre></div><p>生成的指令如下：</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>// 分配内存
.int x
.int y
.int z

// x = 10
push 10
store x
// y = 5
push 5
store y
// z = x + y
push x
push y
add
store z
// y = z * x
load z
load x
times
store y
</code></pre></div><h3 id="面向栈计算机的代码生成" tabindex="-1"><a class="header-anchor" href="#面向栈计算机的代码生成"><span>面向栈计算机的代码生成</span></a></h3><p>上面的例子介绍了代码生成的结果是怎样的，下面介绍如何生成代码。</p><p>在语义分析中我们提到了<code>C--</code>语言，它的文法结构如下：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>P -&gt; D S
D -&gt; T id; D
	 |
T -&gt; int
   | bool
S -&gt; id = E
   | printi(E)
   | printb(E)
E -&gt; n
   | id
   | true
   | false
   | E + E
   | E &amp;&amp; E
</code></pre></div><p>面向栈计算机的代码生成要做的就是：将<code>C--</code>程序代码翻译成栈计算机可以执行的指令序列。我们可以用递归下降的代码生成算法完成这个工作，它大概包含以下几个函数：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token function">Gen_P</span><span class="token punctuation">(</span>D<span class="token punctuation">,</span> S<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Gen_D</span><span class="token punctuation">(</span>T id<span class="token punctuation">,</span> D<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Gen_T</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Gen_S</span><span class="token punctuation">(</span>S<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">Gen_E</span><span class="token punctuation">(</span>E<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h4 id="表达式" tabindex="-1"><a class="header-anchor" href="#表达式"><span>表达式</span></a></h4><p>在生成表达式代码的<code>Gen_E</code>中，需要保证的不变式：表达式的值总在栈顶。</p><p><code>Gen_E</code>的伪代码实现：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token function">Gen_E</span><span class="token punctuation">(</span>E e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> n<span class="token operator">:</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;push n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> id<span class="token operator">:</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;load id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> true<span class="token operator">:</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;push 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> false<span class="token operator">:</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;push 0&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> e1 <span class="token operator">+</span> e2<span class="token operator">:</span>
      <span class="token function">Gen_E</span><span class="token punctuation">(</span>e1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">Gen_E</span><span class="token punctuation">(</span>e2<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;add&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="语句" tabindex="-1"><a class="header-anchor" href="#语句"><span>语句</span></a></h4><p>在生成语句代码的<code>Gen_S</code>中，需要保证的不变式：栈的规模不变。</p><p><code>Gen_S</code>的伪代码实现：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token function">Gen_S</span><span class="token punctuation">(</span>S s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> id <span class="token operator">=</span> e<span class="token operator">:</span> <span class="token comment">// 赋值语句</span>
      <span class="token function">Gen_E</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;store id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token function">printi</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token comment">// 函数调用</span>
      <span class="token function">Gen_E</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;printi&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="类型、变量声明、程序" tabindex="-1"><a class="header-anchor" href="#类型、变量声明、程序"><span>类型、变量声明、程序</span></a></h4><p>生成类型、变量声明、程序的不变式：只生成<code>.int</code>类型。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token function">Gen_T</span><span class="token punctuation">(</span>T t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token keyword">int</span><span class="token operator">:</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;.int&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> bool<span class="token operator">:</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;.int&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">Gen_D</span><span class="token punctuation">(</span>T id<span class="token punctuation">,</span> D<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Gen_T</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">Gen_D</span><span class="token punctuation">(</span>D<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">Gen_P</span><span class="token punctuation">(</span>D<span class="token punctuation">,</span> S<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">Gen_D</span><span class="token punctuation">(</span>D<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">Gen_S</span><span class="token punctuation">(</span>S<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="运行生成的代码" tabindex="-1"><a class="header-anchor" href="#运行生成的代码"><span>运行生成的代码</span></a></h3><ul><li>使用一台真实的物理机</li><li>写一个类似JVM的虚拟机（解释器）</li><li>在非栈式计算机上进行模拟，比如用x86的调用栈模拟</li></ul><h2 id="寄存器计算机" tabindex="-1"><a class="header-anchor" href="#寄存器计算机"><span>寄存器计算机</span></a></h2><p>寄存器计算机是目前最流行的计算机体系结构之一。它运行效率高且体系结构规整。</p><p>寄存器计算机通常有16、32或更多个的寄存器，所有操作都在寄存器中进行；内存不能直接运算，通过load / store指令进行访存操作。</p><h3 id="寄存器计算机reg的结构" tabindex="-1"><a class="header-anchor" href="#寄存器计算机reg的结构"><span>寄存器计算机Reg的结构</span></a></h3><p>与栈计算机类似，寄存器计算机由内存、寄存器、ALU组成。</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gt9qs7ojuwj306v059dfs.jpg" alt=""></p><h3 id="寄存器计算机reg的指令集" tabindex="-1"><a class="header-anchor" href="#寄存器计算机reg的指令集"><span>寄存器计算机Reg的指令集</span></a></h3><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>s -&gt; movn n, r
   | mov r1, r2
   | load [x], r
   | store r, [x]
   | add r1, r2, r3
   | sub r1, r2, r3
   | times r1, r2, r3
   | div r1, r2, r3
</code></pre></div><ul><li>数据移动 <ul><li><code>movn n, r</code>：将立即数<code>n</code>放入寄存器<code>r</code></li><li><code>mov r1, r2</code>：将寄存器<code>r1</code>的值复制到寄存器<code>r2</code></li></ul></li><li>访存操作，<code>load / store [x], r</code>：将内存中<code>x</code>的值加载到寄存器或相反</li><li>算术运算，<code>add r1, r2, r3</code>：将<code>r1, r2</code>的值相加，结果写入<code>r3</code></li></ul><p>在代码生成的阶段，假设Reg机器上有无限多个寄存器。</p><p>每个声明变量和临时变量都会占用一个虚拟寄存器，把虚拟寄存器分配到物理寄存器的过程称为<strong>寄存器分配</strong>。</p><h3 id="面向寄存器计算机的代码生成" tabindex="-1"><a class="header-anchor" href="#面向寄存器计算机的代码生成"><span>面向寄存器计算机的代码生成</span></a></h3><p>与栈式计算机类似，面向寄存器计算机的递归下降代码生成如下：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">Gen_P</span><span class="token punctuation">(</span>D<span class="token punctuation">,</span> S<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">Gen_D</span><span class="token punctuation">(</span>T id<span class="token punctuation">,</span> D<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">Gen_T</span><span class="token punctuation">(</span>T<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">Gen_S</span><span class="token punctuation">(</span>S<span class="token punctuation">)</span><span class="token punctuation">;</span>
Reg <span class="token function">Gen_E</span><span class="token punctuation">(</span>E<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code>Reg <span class="token function">Gen_E</span><span class="token punctuation">(</span>E e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> n<span class="token operator">:</span>
      r <span class="token operator">=</span> <span class="token function">fresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;move n, r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token keyword">case</span> id<span class="token operator">:</span>
      r <span class="token operator">=</span> <span class="token function">fresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;mov id, r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token keyword">case</span> e1 <span class="token operator">+</span> e2<span class="token operator">:</span>
      r1 <span class="token operator">=</span> <span class="token function">Gen_E</span><span class="token punctuation">(</span>e1<span class="token punctuation">)</span><span class="token punctuation">;</span> r2 <span class="token operator">=</span> <span class="token function">Gen_E</span><span class="token punctuation">(</span>e2<span class="token punctuation">)</span><span class="token punctuation">;</span> r3 <span class="token operator">=</span> <span class="token function">fresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;add r1, r2, r3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> r3<span class="token punctuation">;</span>
    <span class="token keyword">case</span> e1 <span class="token operator">&amp;&amp;</span> e2<span class="token operator">:</span>
    <span class="token comment">//...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...</span>
</code></pre></div><h3 id="寄存器计算机的例子" tabindex="-1"><a class="header-anchor" href="#寄存器计算机的例子"><span>寄存器计算机的例子</span></a></h3><p>有如下代码：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">int</span> x<span class="token punctuation">;</span>
x <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre></div><p>这段代码对应的AST大概如下：</p>`,65),i=n("p",null,"代码生成后的结果：",-1),r=n("div",{class:"language-assembly","data-ext":"assembly","data-title":"assembly"},[n("pre",{class:"language-assembly"},[n("code",null,`.int x

moven 1, r1;
moven 2, r2;
add r1, r2, r3; // r3 = 1 + 2
moven 3, r4;
add r3, r4, r5;
`)])],-1),k=n("h3",{id:"运行代码",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#运行代码"},[n("span",null,"运行代码")])],-1),d=n("p",null,"要运行面向寄存器计算机的生成代码，可以",-1),g=n("ul",null,[n("li",null,"写一个虚拟机（解释器）"),n("li",null,"在真实的物理机上运行，需要进行寄存器分配")],-1);function h(m,y){const s=t("Mermaid");return p(),e("div",null,[u,o(s,{id:"mermaid-271",code:"eJyNzUEOwiAQBdC1PcUk3dBIE4EdTVwYb6AXIIUR0ok0gFFvL1YTdefsZv6b/FMys4fjrgFIMRbG1l0Hfb+F0QeyYtlr9juv7ItVJ/5xkjFZ3epZ9TkrxtTyTeE8HcqdHGy44JIryCXFyfXXYIvXYr4NVY1kct47BOvQXKgABiLdIiJ/ew2tUmpoHkzWOeo="}),i,r,k,d,g])}const v=a(l,[["render",h],["__file","6. 代码生成.html.vue"]]),b=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/6.%20%E4%BB%A3%E7%A0%81%E7%94%9F%E6%88%90.html","title":"代码生成","lang":"zh-CN","frontmatter":{"description":"代码生成 代码生成负责把源程序翻译成“目标机器”上的代码。目标机器可以是 真实的物理机器，比如x86、arm等CPU架构的机器 虚拟机，比如JVM 生成的代码主要有两个重要任务： 给源程序的数据分配计算资源 数据包括全局变量、局部变量、动态分配内存等。计算资源包括寄存器、数据区、代码区、栈区、堆区。 代码生成需要根据程序的特点和编译器的设计目标合理的为...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/6.%20%E4%BB%A3%E7%A0%81%E7%94%9F%E6%88%90.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"代码生成"}],["meta",{"property":"og:description","content":"代码生成 代码生成负责把源程序翻译成“目标机器”上的代码。目标机器可以是 真实的物理机器，比如x86、arm等CPU架构的机器 虚拟机，比如JVM 生成的代码主要有两个重要任务： 给源程序的数据分配计算资源 数据包括全局变量、局部变量、动态分配内存等。计算资源包括寄存器、数据区、代码区、栈区、堆区。 代码生成需要根据程序的特点和编译器的设计目标合理的为..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gt9qsdtvgoj306v059dfs.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"代码生成\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gt9qsdtvgoj306v059dfs.jpg\\",\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gt9qs7ojuwj306v059dfs.jpg\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"栈计算机","slug":"栈计算机","link":"#栈计算机","children":[{"level":3,"title":"栈计算机Stack的结构","slug":"栈计算机stack的结构","link":"#栈计算机stack的结构","children":[]},{"level":3,"title":"栈计算机的指令集(ISA)","slug":"栈计算机的指令集-isa","link":"#栈计算机的指令集-isa","children":[]},{"level":3,"title":"一个例子","slug":"一个例子","link":"#一个例子","children":[]},{"level":3,"title":"面向栈计算机的代码生成","slug":"面向栈计算机的代码生成","link":"#面向栈计算机的代码生成","children":[]},{"level":3,"title":"运行生成的代码","slug":"运行生成的代码","link":"#运行生成的代码","children":[]}]},{"level":2,"title":"寄存器计算机","slug":"寄存器计算机","link":"#寄存器计算机","children":[{"level":3,"title":"寄存器计算机Reg的结构","slug":"寄存器计算机reg的结构","link":"#寄存器计算机reg的结构","children":[]},{"level":3,"title":"寄存器计算机Reg的指令集","slug":"寄存器计算机reg的指令集","link":"#寄存器计算机reg的指令集","children":[]},{"level":3,"title":"面向寄存器计算机的代码生成","slug":"面向寄存器计算机的代码生成","link":"#面向寄存器计算机的代码生成","children":[]},{"level":3,"title":"寄存器计算机的例子","slug":"寄存器计算机的例子","link":"#寄存器计算机的例子","children":[]},{"level":3,"title":"运行代码","slug":"运行代码","link":"#运行代码","children":[]}]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":5.54,"words":1663},"filePathRelative":"计算机基础/编译原理/6. 代码生成.md","localizedDate":"2024年4月12日","autoDesc":true}');export{v as comp,b as data};
