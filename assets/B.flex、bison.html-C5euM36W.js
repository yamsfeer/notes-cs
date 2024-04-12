import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as e,o,c,a as n,d as a,e as t,b as l}from"./app-BzW9chhs.js";const r={},i=l(`<h1 id="flex、bison" tabindex="-1"><a class="header-anchor" href="#flex、bison"><span>flex、bison</span></a></h1><p>早期 Unix 的 lex / YACC，发展为 flex / bison，新版本的程序是向上兼容的，现常用 flex 和 bison。</p><p>flex 是词法分析器生成器，词法分析器可以将文本转化为一个个 token，这些 tokens 可以用 bison 处理。</p><h2 id="flex" tabindex="-1"><a class="header-anchor" href="#flex"><span>flex</span></a></h2><p>安装 flex 命令：</p><div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ brew <span class="token function">install</span> flex
$ flex <span class="token parameter variable">-V</span>
flex <span class="token number">2.5</span>.35 Apple<span class="token punctuation">(</span>flex-32<span class="token punctuation">)</span>
$
</code></pre></div><h3 id="一个-flex-程序" tabindex="-1"><a class="header-anchor" href="#一个-flex-程序"><span>一个 flex 程序</span></a></h3><p>flex 的输入是一个 <code>.l</code> (.lex) 文件，下面通过一个 flex 程序实现类似 Unix 系统中的 <code>wc</code> 命令。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// wc.l</span>
<span class="token operator">%</span><span class="token punctuation">{</span>
<span class="token keyword">int</span> chars <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> words <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> lines <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token operator">%</span><span class="token punctuation">}</span>

<span class="token operator">%</span><span class="token operator">%</span>
<span class="token punctuation">[</span>a<span class="token operator">-</span>zA<span class="token operator">-</span>Z<span class="token punctuation">]</span><span class="token operator">+</span>  <span class="token punctuation">{</span> words<span class="token operator">++</span><span class="token punctuation">;</span> chars <span class="token operator">+=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>yytext<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
\\n         <span class="token punctuation">{</span> chars<span class="token operator">++</span><span class="token punctuation">;</span> lines<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">.</span>          <span class="token punctuation">{</span> chars<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token operator">%</span><span class="token operator">%</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">yylex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;lines = %d, words = %d, chars = %d\\n&quot;</span><span class="token punctuation">,</span> lines<span class="token punctuation">,</span> words<span class="token punctuation">,</span> chars<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>具体的 flex 文件内容会在后面介绍。执行以下命令：</p><div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ flex wc.l
$ cc lex.yy.c <span class="token parameter variable">-ll</span>
$ ./a.out
The boy stood on the burning deck
shelling peanuts by the peck
^D
lines <span class="token operator">=</span> <span class="token number">2</span> words <span class="token operator">=</span> <span class="token number">12</span> chars <span class="token operator">=</span> <span class="token number">63</span>
$
</code></pre></div><p><code>flex wc.l</code> 命令可以得到 flex 生成的词法分析器 <code>lex.yy.c</code>，这是一个 C 程序。使用 gcc 编译器编译执行 <code>lex.yy.c</code>。</p><h3 id="flex-文件结构" tabindex="-1"><a class="header-anchor" href="#flex-文件结构"><span>flex 文件结构</span></a></h3><p>flex 文件的内容大部分是 C 语言，它主要包含三部分：</p><div class="language-C" data-ext="C" data-title="C"><pre class="language-C"><code>%{
/* declarations section */
%}

%%
/* patterns and actions section */
/* pattern { action } */
%%

/* C code */
</code></pre></div><p>第一段主要写一些变量、函数声明，或者 <code>#include</code> 一些文件；</p><p>第二段由多条 pattern 和对应的 action 组成，其中 pattern 是正则表达式，action 是一段 C 代码，当解析到对应 pattern 的token 就会执行对应的 action；</p><p>第三段也是 C 代码，它会被直接复制到生成的分析器代码 <code>lex.yy.c</code> 中。</p><h2 id="bison" tabindex="-1"><a class="header-anchor" href="#bison"><span>bison</span></a></h2><p>安装 bison：</p><div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ brew <span class="token function">install</span> bison
$ bison <span class="token parameter variable">-V</span>
bison <span class="token punctuation">(</span>GNU Bison<span class="token punctuation">)</span> <span class="token number">2.3</span>
Written by Robert Corbett and Richard Stallman.

Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2006</span> Free Software Foundation, Inc.
This is <span class="token function">free</span> software<span class="token punctuation">;</span> see the <span class="token builtin class-name">source</span> <span class="token keyword">for</span> copying conditions.  There is NO
warranty<span class="token punctuation">;</span> not even <span class="token keyword">for</span> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
$
</code></pre></div><h3 id="bison-文件结构" tabindex="-1"><a class="header-anchor" href="#bison-文件结构"><span>bison 文件结构</span></a></h3><p>bison 的文件结构和 flex 文件一样有三个部分，分别是 声明、规则和 C 语言部分，这不是巧合。</p><p>其中声明部分的代码会被复制到生成的语法分析器的代码开头。</p><p>和 flex 文件不同的是，bison 文件里有 %token 声明，用来告诉 bison 词法分析生成的 token 符号，</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token operator">%</span><span class="token punctuation">{</span>
<span class="token comment">/* declarations section */</span>
<span class="token operator">%</span><span class="token punctuation">}</span>

<span class="token comment">/* declare tokens */</span>
<span class="token comment">/* %token ADD */</span>

<span class="token operator">%</span><span class="token operator">%</span>
<span class="token comment">/* rules in BNF */</span>
A <span class="token operator">-&gt;</span> a1 <span class="token punctuation">{</span> action <span class="token punctuation">}</span>
  <span class="token operator">|</span> a2  <span class="token punctuation">{</span> action <span class="token punctuation">}</span>
  <span class="token operator">|</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token operator">|</span> an  <span class="token punctuation">{</span> action <span class="token punctuation">}</span>
<span class="token operator">%</span><span class="token operator">%</span>

<span class="token comment">/* C code */</span>
</code></pre></div><p>第二部分主要是简化的 BNF（形式更像是 EBNF）以及产生式对应的语义动作，语义动作是 C 语言编写。</p><p>在产生式的语义动作中，冒号左边的用 <code>$$</code> 表示，其余用 <code>$1</code>、<code>$2</code>等符号表示。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code>exp<span class="token operator">:</span> factor       <span class="token comment">/* default $$ = $1 */</span>
 <span class="token operator">|</span> exp ADD factor <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">1</span> <span class="token operator">+</span> $<span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token operator">|</span> exp SUB factor <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">1</span> <span class="token operator">-</span> $<span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token punctuation">;</span>
</code></pre></div><h2 id="结合-flex-和-bison" tabindex="-1"><a class="header-anchor" href="#结合-flex-和-bison"><span>结合 flex 和 bison</span></a></h2><p>flex 和 bison 的协作关系：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gxozrxriqij30ib0avwez.jpg" style="zoom:80%;"><p>以四则运算为例，用 flex 和 bison 写一个运算器。</p><p>定义词法：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">/* calc.l */</span>
<span class="token operator">%</span><span class="token punctuation">{</span>
  <span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;calc.tab.h&quot;</span></span>
<span class="token operator">%</span><span class="token punctuation">}</span>

<span class="token operator">%</span><span class="token operator">%</span>
<span class="token string">&quot;+&quot;</span>    <span class="token punctuation">{</span> <span class="token keyword">return</span> ADD<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token string">&quot;-&quot;</span>    <span class="token punctuation">{</span> <span class="token keyword">return</span> SUB<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token string">&quot;*&quot;</span>    <span class="token punctuation">{</span> <span class="token keyword">return</span> MUL<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token string">&quot;/&quot;</span>    <span class="token punctuation">{</span> <span class="token keyword">return</span> DIV<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token string">&quot;|&quot;</span>    <span class="token punctuation">{</span> <span class="token keyword">return</span> ABS<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token operator">+</span> <span class="token punctuation">{</span> yylval <span class="token operator">=</span> <span class="token function">atoi</span><span class="token punctuation">(</span>yytext<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">return</span> NUMBER<span class="token punctuation">;</span> <span class="token punctuation">}</span>
\\n     <span class="token punctuation">{</span> <span class="token keyword">return</span> EOL<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">[</span> \\t<span class="token punctuation">]</span>  <span class="token punctuation">{</span> <span class="token comment">/* ignore whitespace */</span> <span class="token punctuation">}</span>
<span class="token punctuation">.</span>      <span class="token punctuation">{</span> <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Mystery character %c\\n&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>yytext<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token operator">%</span><span class="token operator">%</span>
</code></pre></div><p>定义语法：</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">/* calc.y */</span>
<span class="token operator">%</span><span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token keyword">int</span> <span class="token function">yylex</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">yyerror</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">%</span><span class="token punctuation">}</span>

<span class="token comment">/* declare tokens */</span>
<span class="token operator">%</span>token NUMBER
<span class="token operator">%</span>token ADD SUB MUL DIV ABS
<span class="token operator">%</span>token EOL

<span class="token operator">%</span><span class="token operator">%</span>

calclist<span class="token operator">:</span> <span class="token comment">/* nothing */</span>                       <span class="token comment">/* matches at beginning of input */</span>
 <span class="token operator">|</span> calclist exp EOL <span class="token punctuation">{</span> <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;= %d\\n&quot;</span><span class="token punctuation">,</span> $<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token comment">/* EOL is end of an expression */</span>
 <span class="token punctuation">;</span>

exp<span class="token operator">:</span> factor       <span class="token comment">/* default $$ = $1 */</span>
 <span class="token operator">|</span> exp ADD factor <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">1</span> <span class="token operator">+</span> $<span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token operator">|</span> exp SUB factor <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">1</span> <span class="token operator">-</span> $<span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token punctuation">;</span>

factor<span class="token operator">:</span> term       <span class="token comment">/* default $$ = $1 */</span>
 <span class="token operator">|</span> factor MUL term <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">1</span> <span class="token operator">*</span> $<span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token operator">|</span> factor DIV term <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">1</span> <span class="token operator">/</span> $<span class="token number">3</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
 <span class="token punctuation">;</span>

term<span class="token operator">:</span> NUMBER  <span class="token comment">/* default $$ = $1 */</span>
 <span class="token operator">|</span> ABS term   <span class="token punctuation">{</span> $$ <span class="token operator">=</span> $<span class="token number">2</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token operator">?</span> $<span class="token number">2</span> <span class="token operator">:</span> <span class="token operator">-</span> $<span class="token number">2</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">;</span>
<span class="token operator">%</span><span class="token operator">%</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span>argv<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">yyparse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">yyerror</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">fprintf</span><span class="token punctuation">(</span><span class="token constant">stderr</span><span class="token punctuation">,</span> <span class="token string">&quot;error: %s\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>写个 makefile 方便测试：</p><div class="language-makefile" data-ext="makefile" data-title="makefile"><pre class="language-makefile"><code><span class="token target symbol">all</span><span class="token punctuation">:</span> clean calc
<span class="token target symbol">calc</span><span class="token punctuation">:</span> calc.l calc.y
	bison -d calc.y
	flex -o calc.lex.yy.c calc.l
	cc -o <span class="token variable">$@</span> calc.tab.c calc.lex.yy.c -ll
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	rm -f calc calc.lex.yy.c calc.tab.c calc.tab.h
</code></pre></div><p>执行：</p><div class="language-bash" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">make</span>
$ ./calc
<span class="token number">2</span>+3*2
<span class="token operator">=</span> <span class="token number">8</span>
<span class="token number">1</span>+a
Mystery character a
error: syntax error
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,42),u={href:"https://www.oreilly.com/library/view/flex-bison/9780596805418/ch01.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://zhuanlan.zhihu.com/p/120812270",target:"_blank",rel:"noopener noreferrer"};function d(f,m){const s=e("ExternalLinkIcon");return o(),c("div",null,[i,n("p",null,[n("a",u,[a("flex & bison by John Levine"),t(s)])]),n("p",null,[n("a",k,[a("Flex(scanner)/Bison(parser)工作原理"),t(s)])])])}const h=p(r,[["render",d],["__file","B.flex、bison.html.vue"]]),g=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/B.flex%E3%80%81bison.html","title":"flex、bison","lang":"zh-CN","frontmatter":{"description":"flex、bison 早期 Unix 的 lex / YACC，发展为 flex / bison，新版本的程序是向上兼容的，现常用 flex 和 bison。 flex 是词法分析器生成器，词法分析器可以将文本转化为一个个 token，这些 tokens 可以用 bison 处理。 flex 安装 flex 命令： 一个 flex 程序 flex 的输...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BC%96%E8%AF%91%E5%8E%9F%E7%90%86/B.flex%E3%80%81bison.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"flex、bison"}],["meta",{"property":"og:description","content":"flex、bison 早期 Unix 的 lex / YACC，发展为 flex / bison，新版本的程序是向上兼容的，现常用 flex 和 bison。 flex 是词法分析器生成器，词法分析器可以将文本转化为一个个 token，这些 tokens 可以用 bison 处理。 flex 安装 flex 命令： 一个 flex 程序 flex 的输..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"flex、bison\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"flex","slug":"flex","link":"#flex","children":[{"level":3,"title":"一个 flex 程序","slug":"一个-flex-程序","link":"#一个-flex-程序","children":[]},{"level":3,"title":"flex 文件结构","slug":"flex-文件结构","link":"#flex-文件结构","children":[]}]},{"level":2,"title":"bison","slug":"bison","link":"#bison","children":[{"level":3,"title":"bison 文件结构","slug":"bison-文件结构","link":"#bison-文件结构","children":[]}]},{"level":2,"title":"结合 flex 和 bison","slug":"结合-flex-和-bison","link":"#结合-flex-和-bison","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":3.07,"words":921},"filePathRelative":"计算机基础/编译原理/B.flex、bison.md","localizedDate":"2024年4月12日","autoDesc":true}');export{h as comp,g as data};
