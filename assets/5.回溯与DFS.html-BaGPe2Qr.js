import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as t}from"./app-BzW9chhs.js";const p={},o=t(`<h1 id="回溯" tabindex="-1"><a class="header-anchor" href="#回溯"><span>回溯</span></a></h1><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">permute</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token comment">// path 是已选择的路径</span>
  <span class="token keyword">function</span> <span class="token function">backtrack</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> path <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span>length <span class="token operator">===</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 完成一次穷举</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>path<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> num <span class="token keyword">of</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 不可重复选择</span>
        <span class="token keyword">continue</span>
      <span class="token punctuation">}</span>

      path<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// 做选择</span>
      <span class="token function">backtrack</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
      path<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token comment">// 回溯</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">backtrack</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span>

  <span class="token keyword">return</span> res
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="n-皇后" tabindex="-1"><a class="header-anchor" href="#n-皇后"><span>N 皇后</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">solveNQueens</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  <span class="token keyword">function</span> <span class="token function">backtrack</span><span class="token punctuation">(</span><span class="token parameter">board<span class="token punctuation">,</span> row <span class="token operator">=</span> <span class="token number">0</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>row <span class="token operator">===</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>board<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">row</span> <span class="token operator">=&gt;</span> row<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> col <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> col<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">willAttack</span><span class="token punctuation">(</span>board<span class="token punctuation">,</span> row<span class="token punctuation">,</span> col<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 冲突</span>
        <span class="token keyword">continue</span>
      <span class="token punctuation">}</span>
      board<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;Q&#39;</span> <span class="token comment">// 做选择</span>
      <span class="token function">backtrack</span><span class="token punctuation">(</span>board<span class="token punctuation">,</span> row <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
      board<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&#39;.&#39;</span><span class="token comment">// 回溯</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">backtrack</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> res
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">willAttack</span><span class="token punctuation">(</span><span class="token parameter">board<span class="token punctuation">,</span> row<span class="token punctuation">,</span> col</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> n <span class="token operator">=</span> board<span class="token punctuation">.</span>length

  <span class="token comment">// 当前位置为 board[row][col]</span>
  <span class="token comment">// 判断列</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> row<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>board<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;Q&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 注意，在斜方向上必须从 board[row][col] 往左上、右上方向延伸</span>
  <span class="token comment">// 从 board[0][0] 和 board[0][n - 1] 往 board[row][col] 靠拢是错误的</span>

  <span class="token comment">// 判断左斜方向</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> row <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">=</span> col <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">,</span> j<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>board<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;Q&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 判断右斜方向</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> row <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">=</span> col <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">,</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>board<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token string">&#39;Q&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>DFS 关注单个节点本身，动态规划关注整棵子树的结果，回溯关注节点之间的 edge。</p>`,7),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","5.回溯与DFS.html.vue"]]),d=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/leetcode/5.%E5%9B%9E%E6%BA%AF%E4%B8%8EDFS.html","title":"回溯","lang":"zh-CN","frontmatter":{"description":"回溯 N 皇后 总结 DFS 关注单个节点本身，动态规划关注整棵子树的结果，回溯关注节点之间的 edge。","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/leetcode/5.%E5%9B%9E%E6%BA%AF%E4%B8%8EDFS.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"回溯"}],["meta",{"property":"og:description","content":"回溯 N 皇后 总结 DFS 关注单个节点本身，动态规划关注整棵子树的结果，回溯关注节点之间的 edge。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"回溯\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"N 皇后","slug":"n-皇后","link":"#n-皇后","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.04,"words":312},"filePathRelative":"编程/leetcode/5.回溯与DFS.md","localizedDate":"2024年4月12日","autoDesc":true}');export{i as comp,d as data};
