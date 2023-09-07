import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as p,a as n,b as s,e}from"./app-706bfe03.js";const c={},o=n("h1",{id:"控制流分析",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#控制流分析","aria-hidden":"true"},"#"),s(" 控制流分析")],-1),l=n("h2",{id:"控制流图",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#控制流图","aria-hidden":"true"},"#"),s(" 控制流图")],-1),u=n("p",null,[s("控制流图是一个有向图"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"G"),n("mo",null,"="),n("mo",{stretchy:"false"},"("),n("mi",null,"V"),n("mo",{separator:"true"},","),n("mi",null,"E"),n("mo",{stretchy:"false"},")")]),n("annotation",{encoding:"application/x-tex"},"G = (V, E)")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.6833em"}}),n("span",{class:"mord mathnormal"},"G"),n("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),n("span",{class:"mrel"},"="),n("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),n("span",{class:"mopen"},"("),n("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"V"),n("span",{class:"mpunct"},","),n("span",{class:"mspace",style:{"margin-right":"0.1667em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E"),n("span",{class:"mclose"},")")])])]),s("，其中节点"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"V")]),n("annotation",{encoding:"application/x-tex"},"V")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.6833em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"V")])])]),s("是基本块，边"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"E")]),n("annotation",{encoding:"application/x-tex"},"E")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.6833em"}}),n("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E")])])]),s("是基本块之间的跳转关系。")],-1),i=e(`<p><strong>基本块</strong>是语句的一个序列块，从第一条语句执行到最后一条，不能从中间进入或退出，跳转指令只能出现在最后。</p><p>举个例子，以下是一段三地址代码：</p><div class="language-assembly" data-ext="assembly"><pre class="language-assembly"><code># if (x &lt; y) { z = 6 } else { z = 7 }
Cjmp(x &lt; y, L1, L2);
L1:
	z = 6;
	jump L3;
L2:
	z = 7;
	jump L3;
L3:
	printi(z)
</code></pre></div><p>用控制流图表示如下：</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gtfad40tamj60cj096mxc02.jpg" alt=""></p><p>以<code>L1</code>块来说，<code>L1</code>是基本块的名字，包含两个语句<code>z = 6; jmp L3;</code>，jmp语句总出现在最后。</p><p>前面提到过，<strong>控制流图是一个有向图</strong>。因此标准的图论算法都可以用在控制流图的操作上：比如各种遍历算法、生成树算法等。</p><p>基于控制流图我们可以对程序进行控制流分析。</p><h3 id="控制流图的数据结构" tabindex="-1"><a class="header-anchor" href="#控制流图的数据结构" aria-hidden="true">#</a> 控制流图的数据结构</h3><p>控制流图中包含语句、跳转、基本块等，用上下文无关文法给出控制流图的文法定义：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>S -&gt; x = n               // 语句
   | x = y + z
   | x = y
   | x = f(x1, ..., xn)
J -&gt; jmp L               // 跳转
   | cjmp(x, L1, L2)
   | return x
B -&gt; Label L;            // 基本块
     S1; S2; ...; Sn
     J
F -&gt; f() { B1, ..., Bn } // 函数
P -&gt; F1, ..., Fn         // 程序
</code></pre></div><p>以基本块为例，不难得出控制流图的基本块的数据结构为：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">Block</span> <span class="token punctuation">{</span>
  Label label<span class="token punctuation">;</span>
  List stms<span class="token punctuation">;</span>
  Jump jump<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="三地址码生成控制流图" tabindex="-1"><a class="header-anchor" href="#三地址码生成控制流图" aria-hidden="true">#</a> 三地址码生成控制流图</h3><ul><li>如果高层语言具有特别规整的控制流结构（比如<code>Java</code>），直接从抽象语法树生成控制流图会比较容易</li><li>对于类似<code>C语言</code>包含<code>goto</code>这样的非结构化控制流语句的语言来说，应该生成三地址码再生成控制流图。</li></ul><p>从三地址码生成控制流图的算法伪代码如下：</p><div class="language-c" data-ext="c"><pre class="language-c"><code>List stms<span class="token punctuation">;</span> <span class="token comment">// 三地址码中所有语句</span>
List blocks<span class="token punctuation">;</span> <span class="token comment">// 基本块链表</span>
Block block <span class="token operator">=</span> new <span class="token function">Block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 一个初始的空基本块</span>

<span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span>s in stms<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>s is Label<span class="token punctuation">)</span> <span class="token comment">// s是Label</span>
      block<span class="token punctuation">.</span>label <span class="token operator">=</span> L<span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s is jmup<span class="token punctuation">)</span> <span class="token comment">// s是跳转指令</span>
      block<span class="token punctuation">.</span>jump <span class="token operator">=</span> s<span class="token punctuation">;</span>
    	blocks<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>block<span class="token punctuation">)</span><span class="token punctuation">;</span>
    	block <span class="token operator">=</span> new <span class="token function">Block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span> <span class="token comment">// s是普通指令</span>
      block<span class="token punctuation">.</span>stms<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="死基本块的删除" tabindex="-1"><a class="header-anchor" href="#死基本块的删除" aria-hidden="true">#</a> 死基本块的删除</h3><p>这里用深度/广度优先搜索算法进行死基本块的删除优化。假设有以下一段代码：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">printi</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token function">printi</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>它的控制流图如下：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gtf8tjdrbtj606y0bwglu02.jpg" style="zoom:80%;"><p>这个图中基本块<code>L3</code>的入度为0，即任何情况下都没办法执行<code>L3</code>里的代码，它是一个死基本块。</p><p>删除控制流图中死基本块：</p><div class="language-c" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">dead_block_elim</span><span class="token punctuation">(</span>graph<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">dfs</span><span class="token punctuation">(</span>graph<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 深度优先搜索控制流图</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span>each node in graph<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">visited</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token function">delete</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 没有办法遍历到的基本块是死基本块</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,25),r=[o,l,u,i];function k(m,d){return t(),p("div",null,r)}const x=a(c,[["render",k],["__file","7.2 控制流分析.html.vue"]]);export{x as default};
