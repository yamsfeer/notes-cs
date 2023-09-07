import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as p,c as l,a as n,b as e,d as s,e as o}from"./app-706bfe03.js";const r={},i=o(`<h1 id="词法分析" tabindex="-1"><a class="header-anchor" href="#词法分析" aria-hidden="true">#</a> 词法分析</h1><h2 id="词法分析的任务" tabindex="-1"><a class="header-anchor" href="#词法分析的任务" aria-hidden="true">#</a> 词法分析的任务</h2><p>词法分析的任务就是<strong>将字符流转化成token流</strong>。</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsxy8rv2mxj30dq021wef.jpg" alt=""></p><p>针对以下一段代码：</p><div class="language-c++" data-ext="c++"><pre class="language-c++"><code>// helloworld.cpp
if (x &gt; 10) {
  cout &lt;&lt; &quot;hello world&quot; &lt;&lt; endl;
}
</code></pre></div><p>在计算机里，保存的是每个字符的<code>ASCII码</code>，除了英文字母和标点符号，还包括空格、换行符、文件结束符等等。</p><p><strong>词法分析器（<em>lexer</em>）<strong>的任务，就是</strong>把字符流识别并划分为一个个有意义的词法单元，称为token。</strong></p><p>上述代码，经词法分析后得到token流：<code>if</code>、<code>(</code>、<code>x</code>、<code>&gt;</code>、<code>10</code>、<code>)</code>、<code>{</code>、<code>cout</code>、<code>&lt;&lt;</code>、<code>&quot;hello world&quot;</code>、<code>&lt;&lt;</code>、<code>endl</code>、<code>;</code>、<code>}</code>。</p><p>token在lexer中可能的数据结构表示：</p><div class="language-c++" data-ext="c++"><pre class="language-c++"><code>enum TYPE {
  KEYWORD,  // 关键字
  VARIABLE, // 标识符
  OPERATOR, // 操作符
  BRACKET,  // 括号
  BOOLEAN,  // 布尔型
  // ...
}

struct token {
  enum TYPE type,
  char *lexeme
}

// 关键字if的数据表示
token { type = KEYWORD, lexeme = &#39;if&#39; }
</code></pre></div><p>小结一下：</p><ul><li>词法分析的任务是将字符流转化为token流。</li></ul><ul><li>字符流：代码文本中的字符组成，和文本的编码方式有关（比如<code>ASCII</code>、<code>Unicode</code>）</li><li>token流：编译器内部定义的数据结构，编码所识别出的词法单元。</li></ul><h2 id="词法分析器的实现方法" tabindex="-1"><a class="header-anchor" href="#词法分析器的实现方法" aria-hidden="true">#</a> 词法分析器的实现方法</h2><p>要获得一个词法分析器，主要有两种方案，它们各有特点：</p>`,16),d=n("li",null,"可以精确控制实现细节，运行效率高",-1),u=n("li",null,"手工实现复杂，容易出错",-1),k={href:"https://zh.wikipedia.org/wiki/GCC",target:"_blank",rel:"noopener noreferrer"},h={href:"https://zh.wikipedia.org/wiki/LLVM",target:"_blank",rel:"noopener noreferrer"},_=n("li",null,"可快速实现，代码量少，只需要提供一些词法规则的声明",-1),g=n("li",null,"难控制实现细节",-1),f={href:"https://zh.wikipedia.org/wiki/Lex",target:"_blank",rel:"noopener noreferrer"},m={href:"https://zh.wikipedia.org/wiki/Flex%E8%A9%9E%E6%B3%95%E5%88%86%E6%9E%90%E5%99%A8",target:"_blank",rel:"noopener noreferrer"},x=o(`<h3 id="编写词法分析器" tabindex="-1"><a class="header-anchor" href="#编写词法分析器" aria-hidden="true">#</a> 编写词法分析器</h3><p>下面以判断<code>C语言</code>标识符为例，简单介绍词法分析器的实现。</p><p><code>C语言</code>标识符规定：</p><ul><li>以字母或下划线开头</li><li>由字母、数字、下划线组成</li></ul><p>相关的有限状态机如下图：</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsuq0ow2tuj30ek03jgll.jpg" alt=""></p><div class="language-c" data-ext="c"><pre class="language-c"><code>token <span class="token function">nextToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  c <span class="token operator">=</span> <span class="token function">getChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">switch</span> c <span class="token punctuation">{</span>
    <span class="token comment">// ... 其他符号的case</span>
    <span class="token keyword">case</span> <span class="token punctuation">[</span>a<span class="token operator">-</span>z_A<span class="token operator">-</span>Z<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token comment">// 如果是字母或下划线，则从状态0转到状态1</span>
      c <span class="token operator">=</span> <span class="token function">getChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">while</span> c in <span class="token punctuation">[</span>a<span class="token operator">-</span>z_A<span class="token operator">-</span>Z0<span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span> <span class="token comment">// 如果是[a-z_A-Z0-9]中的字符，保持在状态1</span>
        c <span class="token operator">=</span> <span class="token function">getChar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>从语法角度，关键字的集合是标识符集合的一个子集。比如<code>if</code>、<code>for</code>等可以看成特殊的标识符。</p><p>判断关键字可以使用<code>关键字表算法</code>：</p><ul><li>对给定语言中所有的关键字，构建关键字哈希表H</li><li>对所有标识符和关键字，按标识符的状态机识别</li><li>识别完成后，查表H看是否是关键字</li><li>通过合理的构造哈希表H（完美哈希），可以O(1)时间完成</li></ul><p>当然，也可以在状态机中区分判断标识符和关键字，具体不再介绍。</p><h3 id="使用lexer生成器" tabindex="-1"><a class="header-anchor" href="#使用lexer生成器" aria-hidden="true">#</a> 使用lexer生成器</h3><p>详见下节。</p>`,13);function w(E,b){const a=c("ExternalLinkIcon");return p(),l("div",null,[i,n("ul",null,[n("li",null,[e("手工编写 "),n("ul",null,[d,u,n("li",null,[n("a",k,[e("gcc"),s(a)]),e("、"),n("a",h,[e("LLVM"),s(a)]),e("使用这种方式")])])]),n("li",null,[e("lexer生成器 "),n("ul",null,[_,g,n("li",null,[e("lexer生成器工具有"),n("a",f,[e("lex"),s(a)]),e("、"),n("a",m,[e("flex"),s(a)]),e("等")])])])]),x])}const v=t(r,[["render",w],["__file","2. 词法分析.html.vue"]]);export{v as default};
