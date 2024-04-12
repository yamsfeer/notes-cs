import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as t,o as p,c as e,e as o,b as n}from"./app-BzW9chhs.js";const c={},l=n(`<h1 id="语义分析" tabindex="-1"><a class="header-anchor" href="#语义分析"><span>语义分析</span></a></h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>语义分析也称为<strong>类型检查</strong>、<strong>上下文相关分析</strong>。</p><p>语义分析负责检查程序（<strong>抽象语法树</strong>）的<strong>上下文相关属性</strong>，<strong>检查内容与具体的源语言相关</strong>，通常包括：</p><ul><li>变量先声明后使用</li><li>表达式都有合适的类型</li><li>函数调用和函数的定义一致</li><li>...</li></ul><p>以下面一段C语言代码为例，其中出现的错误是语义分析要检查的。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token operator">*</span>p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  x <span class="token operator">+=</span> <span class="token number">4</span><span class="token punctuation">;</span> <span class="token comment">// x未声明</span>
  <span class="token function">p</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// p是int指针类型，不能调用</span>
  <span class="token string">&quot;hello&quot;</span> <span class="token operator">+</span> <span class="token string">&quot;world&quot;</span><span class="token punctuation">;</span> <span class="token comment">// C语言中运算符“+”没有重载，不能对字符串操作</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// 函数f要接受参数，且没有返回值</span>
  <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">// 循环体中才能使用break</span>
  <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token comment">// main函数返回值为int</span>
<span class="token punctuation">}</span>
</code></pre></div><p>语义分析器在概念上的结构：</p>`,8),i=n(`<p>总的来说，语义分析器的任务就是：在语法分析得到<code>AST</code>后，根据程序语言的语义，检查<code>AST</code>中是否有语义错误；如果没有，传递<code>AST</code>给下一步；如果有，给出错误信息。</p><ul><li>经过语法分析后，“缺少分号”等语法错误已经被处理掉，语义分析只需专注于是否有语义错误</li><li>语义分析需要联系上下文，比如<code>return</code>语句要与函数的返回类型匹配，因此又叫上下文相关分析</li></ul><h2 id="语义规则的实现" tabindex="-1"><a class="header-anchor" href="#语义规则的实现"><span>语义规则的实现</span></a></h2><p>举个例子，假设有一个<code>C--</code>语言，它只有加法和逻辑与两种表达式运算，它的语法定义为：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>E -&gt; n
   | true
   | false
   | E + E
   | E &amp;&amp; E
</code></pre></div><h3 id="类型检查" tabindex="-1"><a class="header-anchor" href="#类型检查"><span>类型检查</span></a></h3><p>对于<code>C--</code>语言，类型合法或不合法的程序比如：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// 类型合法</span>
<span class="token number">3</span> <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">;</span>
true <span class="token operator">&amp;&amp;</span> false<span class="token punctuation">;</span>

<span class="token comment">// 类型不合法</span>
<span class="token number">3</span> <span class="token operator">+</span> true<span class="token punctuation">;</span>
true <span class="token operator">+</span> false<span class="token punctuation">;</span>
</code></pre></div><p>语义分析的任务之一是给出一个函数<code>Type check(e)</code>，返回表达式e的类型，如果类型不合法，则报错。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">enum</span> <span class="token class-name">Type</span> <span class="token punctuation">{</span> INT<span class="token punctuation">,</span> BOOL <span class="token punctuation">}</span><span class="token punctuation">;</span>
Type <span class="token function">check</span><span class="token punctuation">(</span>Exp e<span class="token punctuation">)</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> kind<span class="token punctuation">)</span>
    <span class="token keyword">case</span> EXP_INT<span class="token operator">:</span> <span class="token keyword">return</span> INT<span class="token punctuation">;</span>
		<span class="token keyword">case</span> EXP_TRUE<span class="token punctuation">,</span> EXP_FALSE<span class="token operator">:</span> <span class="token keyword">return</span> BOOL<span class="token punctuation">;</span>
		<span class="token keyword">case</span> EXP_ADD<span class="token operator">:</span>
      <span class="token comment">// AST的结构是 E &lt;-- ADD --&gt; E</span>
      <span class="token comment">// 这里是递归检查左右子树的类型，类似树的后序遍历</span>
			t1 <span class="token operator">=</span> <span class="token function">check</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> left<span class="token punctuation">)</span><span class="token punctuation">;</span>
			t2 <span class="token operator">=</span> <span class="token function">check</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>t1 <span class="token operator">!=</span> INT <span class="token operator">||</span> t2 <span class="token operator">!=</span> INT<span class="token punctuation">)</span>
        <span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;type mismatch&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 加法两边类型有非整型，报错</span>
      <span class="token keyword">return</span> INT
    <span class="token keyword">case</span> EXP_AND<span class="token operator">:</span>
			<span class="token comment">// ...</span>
</code></pre></div><h3 id="变量声明处理" tabindex="-1"><a class="header-anchor" href="#变量声明处理"><span>变量声明处理</span></a></h3><p>我们将<code>C--</code>语言拓展一下，它包含<code>程序(Program)</code>、<code>声明(Declaration)</code>、<code>类型(Type)</code>、<code>表达式(Expression)</code>。文法结构如下：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>P -&gt; D E
D -&gt; T id; D
   | 
T -&gt; int
   | bool
E -&gt; n
   | id
   | true
   | false
   | E + E
   | E &amp;&amp; E
</code></pre></div><p>此时对于<code>C--</code>语言，合法或不合法的程序比如：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// 类型合法</span>
<span class="token keyword">int</span> x<span class="token punctuation">;</span> x <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">;</span>
bool y<span class="token punctuation">;</span> false <span class="token operator">&amp;&amp;</span> y<span class="token punctuation">;</span>

<span class="token comment">// 类型不合法</span>
x <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// x未声明</span>
<span class="token keyword">int</span> x<span class="token punctuation">;</span> x <span class="token operator">+</span> false<span class="token punctuation">;</span> <span class="token comment">// “+”操作的数据类型不合法</span>
</code></pre></div><p>为了实现对变量声明的检查，需要用到符号表。</p><p>符号表的内容下文会介绍，目前只需知道符号表是用于查询的<code>key - value</code>字典结构。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">enum</span> <span class="token class-name">Type</span> <span class="token punctuation">{</span> INT<span class="token punctuation">,</span> BOOL <span class="token punctuation">}</span>
Table table<span class="token punctuation">;</span> <span class="token comment">// 符号表</span>
Type <span class="token function">check_program</span><span class="token punctuation">(</span>Declare d<span class="token punctuation">,</span> Exp e<span class="token punctuation">)</span>
  <span class="token comment">// 检查声明和表达式</span>
  <span class="token function">check_declare</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token function">check_exp</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
Table <span class="token function">check_declare</span><span class="token punctuation">(</span>Declare d<span class="token punctuation">)</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span>T id in d<span class="token punctuation">)</span> <span class="token comment">// 对每条声明，符号表新增一条记录，检查语句时查询</span>
		<span class="token function">table_enter</span><span class="token punctuation">(</span>table<span class="token punctuation">,</span> id<span class="token punctuation">,</span> T<span class="token punctuation">)</span>
Type <span class="token function">check_exp</span><span class="token punctuation">(</span>Exp e<span class="token punctuation">)</span>
	<span class="token keyword">switch</span><span class="token punctuation">(</span>e <span class="token operator">-&gt;</span> kind<span class="token punctuation">)</span>
    <span class="token keyword">case</span> EXP_ID<span class="token operator">:</span>
			t <span class="token operator">=</span> <span class="token function">Table_lookup</span><span class="token punctuation">(</span>table<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 查询符号表，如果变量没有声明，报错</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>id not exist<span class="token punctuation">)</span>
        <span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;id not found&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> t<span class="token punctuation">;</span>
</code></pre></div><h4 id="语句的处理" tabindex="-1"><a class="header-anchor" href="#语句的处理"><span>语句的处理</span></a></h4><p>我们再将<code>C--</code>语言拓展一下，使其包含\`语句(Statement)。文法结构如下：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>// program由声明和语句构成
P -&gt; D S
D -&gt; T id; D
	 |
T -&gt; int
   | bool

// 赋值语句和函数调用语句
S -&gt; id = E
   | printi(E)
   | printb(E)
E -&gt; n
   | id
   | true
   | false
   | E + E
   | E &amp;&amp; E
</code></pre></div><p>语句检查的实现伪代码如下：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">check_stm</span><span class="token punctuation">(</span>Table table<span class="token punctuation">,</span> Stm s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>s<span class="token operator">-&gt;</span>kind<span class="token punctuation">)</span>
    <span class="token keyword">case</span> STM_ASSIGN<span class="token operator">:</span> <span class="token comment">// 赋值语句</span>
  		t1 <span class="token operator">=</span> <span class="token function">Table_lookup</span><span class="token punctuation">(</span>s<span class="token operator">-&gt;</span>id<span class="token punctuation">)</span>
      t2 <span class="token operator">=</span> <span class="token function">check_exp</span><span class="token punctuation">(</span>table<span class="token punctuation">,</span> s<span class="token operator">-&gt;</span>exp<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>t1 <span class="token operator">!=</span> t2<span class="token punctuation">)</span> <span class="token comment">// 变量的声明和赋值需要是同一类型</span>
        <span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;type mismatch&quot;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> INT
    <span class="token keyword">case</span> STM_PRINTI<span class="token operator">:</span>
  		t1 <span class="token operator">=</span> <span class="token function">check_exp</span><span class="token punctuation">(</span>s<span class="token operator">-&gt;</span>exp<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>t1 <span class="token operator">!=</span> INT<span class="token punctuation">)</span> <span class="token comment">// printi只能接受int类型</span>
        <span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;type mismatch&quot;</span><span class="token punctuation">)</span>
        
    <span class="token keyword">case</span> STM_PRINTB<span class="token operator">:</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="符号表" tabindex="-1"><a class="header-anchor" href="#符号表"><span>符号表</span></a></h2><p>上文提到的表达式类型检查、变量声明、语句处理等都需要用到符号表作查询。因此，<strong>符号表的实现是语义检查的核心数据结构</strong>。</p><p><strong>符号表是用来存储程序中变量相关信息</strong>，包括</p><ul><li>类型</li><li>作用域</li><li>访问控制信息</li><li>...</li></ul><p><strong>符号表必须非常高效</strong>，因为程序中的变量规模会很大。</p><h3 id="符号表的数据结构和实现" tabindex="-1"><a class="header-anchor" href="#符号表的数据结构和实现"><span>符号表的数据结构和实现</span></a></h3><p>从整体来看，符号表主要有的接口函数包括创建、新增、查询等。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">TABLE_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">TABLE_H</span></span>
<span class="token keyword">typedef</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Table_t<span class="token punctuation">;</span> <span class="token comment">// 符号表的数据结构</span>

Table_t <span class="token function">Table_new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 新建符号表</span>
<span class="token keyword">void</span> <span class="token function">Table_enter</span><span class="token punctuation">(</span>Table_t<span class="token punctuation">,</span> Key_t<span class="token punctuation">,</span> Value_t<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 符号表插入一条数据</span>
Value_t <span class="token function">Table_lookup</span><span class="token punctuation">(</span>Table_t<span class="token punctuation">,</span> Key_t<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 符号表的查找</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre></div><p>符号表可以用多种数据结构实现，可以根据需要选择。符号表是典型的<code>key -&gt; value</code>字典结构。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">char</span> <span class="token operator">*</span>key<span class="token punctuation">;</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">value</span> <span class="token punctuation">{</span>
  Type_t type<span class="token punctuation">;</span> <span class="token comment">// 类型</span>
  Scope_t scope<span class="token punctuation">;</span> <span class="token comment">// 作用域</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span> value<span class="token punctuation">;</span>
</code></pre></div><p>整个符号表可以抽象成以下这张表格：</p><table><thead><tr><th style="text-align:center;">变量 \\ 映射</th><th style="text-align:center;">type</th><th style="text-align:center;">scope</th><th style="text-align:center;">...</th></tr></thead><tbody><tr><td style="text-align:center;">x</td><td style="text-align:center;">INT</td><td style="text-align:center;">0</td><td style="text-align:center;">...</td></tr><tr><td style="text-align:center;">y</td><td style="text-align:center;">BOOL</td><td style="text-align:center;">1</td><td style="text-align:center;">...</td></tr><tr><td style="text-align:center;">...</td><td style="text-align:center;">...</td><td style="text-align:center;">...</td><td style="text-align:center;">...</td></tr></tbody></table><p>高效的实现符号表，主要考虑两点：时间复杂度和空间复杂度，需要根据具体情况权衡。下面是常见的两种数据结构：</p><ul><li>使用哈希表等，查找时间复杂度为O(1)，占用空间大</li><li>使用红黑树等平衡树，查找时间复杂度为O(lg N)，节约空间</li></ul><h3 id="符号表处理作用域" tabindex="-1"><a class="header-anchor" href="#符号表处理作用域"><span>符号表处理作用域</span></a></h3><p>考虑以下代码的作用域：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">int</span> x<span class="token punctuation">;</span> <span class="token comment">// scope 0</span>
<span class="token keyword">int</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> x<span class="token punctuation">;</span> <span class="token comment">// scope 2</span>
    x <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> x<span class="token punctuation">;</span> <span class="token comment">// scope 2</span>
    x <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  x <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span> <span class="token comment">// scope 1</span>
<span class="token punctuation">}</span>
</code></pre></div><p>用符号表处理作用域，可以有以下两种方法：</p><ul><li>全局只使用一张符号表 <ul><li>进入作用域时插入元素</li><li>退出作用域时删除元素</li></ul></li><li>采用符号表构成的栈 <ul><li>进入作用域时插入新的符号表</li><li>退出作用域时删除栈顶符号表</li></ul></li></ul><h3 id="符号表处理命名空间" tabindex="-1"><a class="header-anchor" href="#符号表处理命名空间"><span>符号表处理命名空间</span></a></h3><p>考虑以下代码：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">list</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> x<span class="token punctuation">;</span>
  <span class="token keyword">struct</span> <span class="token class-name">list</span><span class="token operator">*</span> list<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token operator">*</span>list<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">walk</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">list</span><span class="token operator">*</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  list<span class="token operator">:</span> <span class="token comment">// label</span>
  	<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%d\\n&quot;</span><span class="token punctuation">,</span> list <span class="token operator">-&gt;</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 指针list</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">=</span> list <span class="token operator">-&gt;</span> list<span class="token punctuation">)</span> <span class="token comment">// 结构体内的list</span>
      <span class="token keyword">goto</span> list<span class="token punctuation">;</span> <span class="token comment">// 跳转到label位置</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面代码中，<code>list</code>出现了很多次，如何区分每个<code>list</code>就是命名空间要解决的问题。</p><p>解决办法就是：<strong>每个命名空间用一个表来处理</strong>。</p><h2 id="其他问题" tabindex="-1"><a class="header-anchor" href="#其他问题"><span>其他问题</span></a></h2><ul><li><p>类型相容性</p><p>类型检查的问题往往归结为判断两个类型是否相等<code>t1 == t2</code>，然而要判断是否相等是很复杂的问题。</p><ul><li>名字相等 VS 结构相等</li><li>面向对象的继承，需要维护类型间的继承关系</li></ul></li><li><p>错误诊断</p><ul><li><p>要给出尽可能准确、尽可能多的错误信息</p></li><li><p>准确的出错位置。程序代码的位置信息要从前端保留并传递过来</p></li></ul></li><li><p>代码翻译</p><p>现代的编译器中的语义分析模块，除了做语义分析外，还要负责生成中间代码或目标代码。</p><p>代码生成的过程也是对树的某种遍历过程。</p><p>因此，语义分析模块往往是编译器中最庞大也最复杂的模块。</p></li></ul>`,49);function u(k,r){const s=t("Mermaid");return p(),e("div",null,[l,o(s,{id:"mermaid-41",code:"eJxLL0osyFDwCeJSUHAMDtHQeNa198XGhS/Wr322eeqzBRM1NRV0de0UEvMScyqLU4s0NIAyT3Z2Pu1oezZvwtOZK6DyuZkpKTmpGhpPdqx9OX3Lk92Lny9o1NQEmllZWpkZ/XxF99Nd/UCdL1Y0QPTHopgKVJeck1hc7JKappBflJiXnqqQlpmTY6Xs5uZq5uysU1xSlJ+daqXsYm7pZGBgjaw8vSg1NQ+q2sXU1cLFBK7awsjJ2MzMmoszJzMvO7ikMidVwUDHUMdIAaJAtzwzpSTDyrCgAm4g1Bs6wIDQgbkN6iC4EpCHILZycQEAlTF6Og=="}),i])}const g=a(c,[["render",u],["__file","5. 语义分析.html.vue"]]),h=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/5.%20%E8%AF%AD%E4%B9%89%E5%88%86%E6%9E%90.html","title":"语义分析","lang":"zh-CN","frontmatter":{"description":"语义分析 简介 语义分析也称为类型检查、上下文相关分析。 语义分析负责检查程序（抽象语法树）的上下文相关属性，检查内容与具体的源语言相关，通常包括： 变量先声明后使用 表达式都有合适的类型 函数调用和函数的定义一致 ... 以下面一段C语言代码为例，其中出现的错误是语义分析要检查的。 语义分析器在概念上的结构： 总的来说，语义分析器的任务就是：在语法分...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/5.%20%E8%AF%AD%E4%B9%89%E5%88%86%E6%9E%90.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"语义分析"}],["meta",{"property":"og:description","content":"语义分析 简介 语义分析也称为类型检查、上下文相关分析。 语义分析负责检查程序（抽象语法树）的上下文相关属性，检查内容与具体的源语言相关，通常包括： 变量先声明后使用 表达式都有合适的类型 函数调用和函数的定义一致 ... 以下面一段C语言代码为例，其中出现的错误是语义分析要检查的。 语义分析器在概念上的结构： 总的来说，语义分析器的任务就是：在语法分..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"语义分析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"语义规则的实现","slug":"语义规则的实现","link":"#语义规则的实现","children":[{"level":3,"title":"类型检查","slug":"类型检查","link":"#类型检查","children":[]},{"level":3,"title":"变量声明处理","slug":"变量声明处理","link":"#变量声明处理","children":[]}]},{"level":2,"title":"符号表","slug":"符号表","link":"#符号表","children":[{"level":3,"title":"符号表的数据结构和实现","slug":"符号表的数据结构和实现","link":"#符号表的数据结构和实现","children":[]},{"level":3,"title":"符号表处理作用域","slug":"符号表处理作用域","link":"#符号表处理作用域","children":[]},{"level":3,"title":"符号表处理命名空间","slug":"符号表处理命名空间","link":"#符号表处理命名空间","children":[]}]},{"level":2,"title":"其他问题","slug":"其他问题","link":"#其他问题","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":6.34,"words":1902},"filePathRelative":"计算机基础/编译原理/5. 语义分析.md","localizedDate":"2024年4月12日","autoDesc":true}');export{g as comp,h as data};
