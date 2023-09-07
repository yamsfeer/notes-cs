import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-706bfe03.js";const p={},o=t(`<h1 id="bfs" tabindex="-1"><a class="header-anchor" href="#bfs" aria-hidden="true">#</a> BFS</h1><p>问题的本质就是让你在一幅「图」中找到从起点start到终点target的最近距离。</p><h2 id="二叉树的最小深度-111" tabindex="-1"><a class="header-anchor" href="#二叉树的最小深度-111" aria-hidden="true">#</a> 二叉树的最小深度 ( 111 )</h2><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">minDepth</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span>

  <span class="token keyword">const</span> q <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  <span class="token keyword">let</span> depth <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 单个节点算作 1</span>

  <span class="token keyword">while</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> levelLength <span class="token operator">=</span> q<span class="token punctuation">.</span>length
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> levelLength<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> cur <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取出当前 level 的节点</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>left <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> cur<span class="token punctuation">.</span>right <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 叶子结点</span>
        <span class="token keyword">return</span> depth
      <span class="token punctuation">}</span>

      <span class="token comment">// null 节点没必要入队</span>
      cur<span class="token punctuation">.</span>left <span class="token operator">&amp;&amp;</span> q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
      cur<span class="token punctuation">.</span>right <span class="token operator">&amp;&amp;</span> q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    depth<span class="token operator">++</span> <span class="token comment">// 处理完一层后，depth 加 1</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> depth
<span class="token punctuation">}</span>
</code></pre></div>`,4),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","5.3.BFS.html.vue"]]);export{i as default};
