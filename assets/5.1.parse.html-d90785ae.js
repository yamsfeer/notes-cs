import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="parse" tabindex="-1"><a class="header-anchor" href="#parse" aria-hidden="true">#</a> parse</h1><p>parser 需要完成词法分析和语法分析两个工作。</p><h2 id="词法分析" tabindex="-1"><a class="header-anchor" href="#词法分析" aria-hidden="true">#</a> 词法分析</h2><p>词法分析通常是用状态机来完成的，解析 vue 模板的状态机如下图。</p><p>先定义各个状态。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> State <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tagOpen</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tagName</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tagEnd</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token literal-property property">tagEndName</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>tokenize 过程就是从当前状态和字符，不断转移到下一个状态，并持续消耗 ( consume ) 当前字符的过程。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">tokenize</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tokens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> chars <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">let</span> state <span class="token operator">=</span> State<span class="token punctuation">.</span>data

  <span class="token keyword">while</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> char <span class="token operator">=</span> str<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// 当前字符</span>

    <span class="token function">swtich</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 判断当前状态</span>
      <span class="token keyword">case</span> State<span class="token punctuation">.</span>data<span class="token operator">:</span> 
        <span class="token keyword">if</span> <span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;&lt;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 判断当前字符</span>
          state <span class="token operator">=</span> State<span class="token punctuation">.</span>tagOpen
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isAlpha</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          state <span class="token operator">=</span> State<span class="token punctuation">.</span>text
          chars<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// consume 字符</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> State<span class="token punctuation">.</span>tagOpen<span class="token operator">:</span> <span class="token comment">// ...</span>
      <span class="token keyword">case</span> State<span class="token punctuation">.</span>tagName<span class="token operator">:</span> 
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isAlpha</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          chars<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>char<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>char <span class="token operator">===</span> <span class="token string">&#39;&gt;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          state <span class="token operator">=</span> State<span class="token punctuation">.</span>data
          token<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;tag&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> chars<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
          chars<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
        str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// consume</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
      <span class="token keyword">case</span> <span class="token operator">...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> tokens
<span class="token punctuation">}</span>
</code></pre></div><p>tokenize 函数的执行结果如下。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> tokens <span class="token operator">=</span> <span class="token function">tokenize</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;p&gt;vue&lt;/p&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>

<span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;tag&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;p&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;vue&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;tagEnd&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;p&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre></div><p>我们用正则表达式也可以完成相同的功能。实际上，正则表达式的本质就是状态机。</p><h2 id="构造-ast" tabindex="-1"><a class="header-anchor" href="#构造-ast" aria-hidden="true">#</a> 构造 AST</h2><p>假设有如下模板。</p><div class="language-html" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>vue<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>模板编译得到的 AST 是这样的。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Root&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Element&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Element&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&#39;p&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Text&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">&#39;vue&#39;</span> <span class="token punctuation">}</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>值得注意的是，AST 的根节点是 Root，它是逻辑上的根节点，模板中的节点都是 Root 的 children。</p><p>将 tokens 解析成 AST 的过程和 tokenize 有点类似，就是不断地 consume token，其中一些 token 会创建对应的 AST 节点，<strong>为了维护节点之间的父子关系</strong>，我们需要使用栈。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">analyse</span><span class="token punctuation">(</span><span class="token parameter">tokens</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Root&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  
  <span class="token keyword">while</span><span class="token punctuation">(</span>tokens<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> token <span class="token operator">=</span> tokens<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// consume</span>
    <span class="token keyword">const</span> parent <span class="token operator">=</span> stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
    
    <span class="token keyword">switch</span><span class="token punctuation">(</span>token<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token string">&#39;tag&#39;</span><span class="token operator">:</span>
        <span class="token keyword">const</span> elementNode <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">// 创建节点</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Element&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">tag</span><span class="token operator">:</span> token<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
          <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        parent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>elementNode<span class="token punctuation">)</span> <span class="token comment">// 栈维护父子关系</span>
        stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>elementNode<span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;text&#39;</span><span class="token operator">:</span>
        <span class="token keyword">const</span> textNode <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;Text&#39;</span><span class="token punctuation">,</span>
          <span class="token literal-property property">content</span><span class="token operator">:</span> token<span class="token punctuation">.</span>content
        <span class="token punctuation">}</span>
        parent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>textNode<span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token string">&#39;tagEnd&#39;</span><span class="token operator">:</span>
        stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> root
<span class="token punctuation">}</span>
</code></pre></div><p>tokenize 和 analyse 函数分别执行词法分析和语法分析的过程。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">parse</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> tokens <span class="token operator">=</span> <span class="token function">tokenize</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>
  <span class="token keyword">const</span> ast <span class="token operator">=</span> <span class="token function">analyse</span><span class="token punctuation">(</span>tokens<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> ast
<span class="token punctuation">}</span>
</code></pre></div>`,21),e=[o];function c(l,r){return s(),a("div",null,e)}const i=n(t,[["render",c],["__file","5.1.parse.html.vue"]]);export{i as default};
