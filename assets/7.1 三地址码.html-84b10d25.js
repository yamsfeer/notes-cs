import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-706bfe03.js";const p={},o=t(`<h1 id="三地址码" tabindex="-1"><a class="header-anchor" href="#三地址码" aria-hidden="true">#</a> 三地址码</h1><p>三地址码的基本思想是：</p><ul><li>给每个中间变量和计算结果命名，没有复合表达式</li><li>只有最基本的控制流，没有<code>if</code>、<code>while</code>、<code>for</code>等各种控制结构，只有<code>jump</code>、<code>call</code>等原子操作</li></ul><p><strong>三地址码已经很接近汇编指令，但是不与具体机器架构相关</strong>。所以三地址码可以看成是抽象或通用的指令集，比如通用的RISC。</p><p><strong>三地址码中每个指令不超过三个变量，因而称为三地址码。</strong></p><p>举个例子，考虑以下代码：</p><div class="language-c" data-ext="c"><pre class="language-c"><code>a <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token number">4</span> <span class="token operator">*</span> <span class="token number">5</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;</span> y<span class="token punctuation">)</span>
  z <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
  z <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
</code></pre></div><p>翻译成三地址码如下：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token comment">// a = a + 4 * 5</span>
x_1 <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
x_2 <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
x_3 <span class="token operator">=</span> x_1 <span class="token operator">*</span> x_2<span class="token punctuation">;</span>
x_4 <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
x_5 <span class="token operator">=</span> x_4 <span class="token operator">+</span> x_3<span class="token punctuation">;</span>
  a <span class="token operator">=</span> x_5<span class="token punctuation">;</span>

<span class="token comment">// if - else</span>
<span class="token function">Cjmp</span> <span class="token punctuation">(</span>x <span class="token operator">&lt;</span> y<span class="token punctuation">,</span> L_1<span class="token punctuation">,</span> L_2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 条件跳转</span>
L_1<span class="token operator">:</span>
	z <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
	jump L_3<span class="token punctuation">;</span> <span class="token comment">// 无条件跳转</span>
L_2<span class="token operator">:</span>
	z <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>
	jump L_3<span class="token punctuation">;</span>
L_3<span class="token operator">:</span>
	<span class="token comment">// ...</span>
</code></pre></div><h2 id="三地址码及其数据结构" tabindex="-1"><a class="header-anchor" href="#三地址码及其数据结构" aria-hidden="true">#</a> 三地址码及其数据结构</h2><p>给出以下三地址码的文法结构：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>s -&gt; x = n								// 常数赋值
   | x = y + z						// 二元运算，比如加减乘除
   | x = !y								// 一元运算
   | x = y								// 变量赋值
   | x[y] = z							// 内存写入
   | x = y[z]							// 内存读取
   | x = f(x1, ..., xn)		// 函数调用
   | Cjmp(x1, L1, L2)			// 条件跳转
   | Jmp L								// 无条件跳转
   | Label L							// 标号
   | Return x							// 函数返回
</code></pre></div><p>三地址码的数据结构的一种可能实现的伪代码：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">enum</span> <span class="token class-name">instruction_kind</span> <span class="token punctuation">{</span> <span class="token comment">// 三地址指令类型</span>
  INSTR_CONST<span class="token punctuation">,</span>
  INSTRU_MOVE<span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">Instr_t</span> <span class="token punctuation">{</span>
  <span class="token keyword">enum</span> <span class="token class-name">instr_kind</span> kind<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">Instr_Add</span> <span class="token punctuation">{</span>
  <span class="token keyword">enum</span> <span class="token class-name">instr_kind</span> kind<span class="token punctuation">;</span> <span class="token comment">// ADD</span>
  <span class="token keyword">char</span> <span class="token operator">*</span>x<span class="token punctuation">;</span> <span class="token keyword">char</span> <span class="token operator">*</span>y<span class="token punctuation">;</span> <span class="token keyword">char</span> <span class="token operator">*</span>z<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">struct</span> <span class="token class-name">Instr_Move</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre></div><h2 id="生成三地址码" tabindex="-1"><a class="header-anchor" href="#生成三地址码" aria-hidden="true">#</a> 生成三地址码</h2><p>给出以下<code>C--</code>语言：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>P -&gt; F*
F -&gt; f((T id,)*) { (T id;)* S* }
T -&gt; int
   | bool
S -&gt; x = E
   | printi(E)
   | printb(E)
   | f(E1, ..., En)
   | return E
   | if (E, S*)
   | while(E, S*)
E -&gt; n
   | id
   | true
   | false
   | E + E
   | E &amp;&amp; E
</code></pre></div><p>以语句中的<code>函数调用</code>和<code>if-else语句</code>为例：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token function">Gen_S</span><span class="token punctuation">(</span>S s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token function">f</span><span class="token punctuation">(</span>e1<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span> en<span class="token punctuation">)</span><span class="token operator">:</span>
      x1 <span class="token operator">=</span> <span class="token function">Gen_E</span><span class="token punctuation">(</span>e1<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// ...</span>
      xn <span class="token operator">=</span> <span class="token function">Gen_E</span><span class="token punctuation">(</span>en<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;f(x1, ..., xn)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">,</span> s1<span class="token punctuation">,</span> s2<span class="token punctuation">)</span><span class="token operator">:</span>
      x <span class="token operator">=</span> <span class="token function">Gen_E</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;Cjmp(x, L1, L2)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;Label L1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">Gen_SList</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;jmp L3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;Label L2:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">Gen_SList</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;jmp L3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&quot;Label L3:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>三地址码的优点：</p><ul><li>所有操作都是原子的，没有复合结构</li><li>控制流简单，只有跳转</li><li>是抽象的机器代码，向后做代码生成更容易</li></ul><p>三地址码的缺点：</p><ul><li>程序的控制流信息是隐式的</li><li>需要做进一步的控制流分析</li></ul>`,24),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","7.1 三地址码.html.vue"]]);export{r as default};
