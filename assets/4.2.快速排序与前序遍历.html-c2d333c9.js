import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="快速排序与前序遍历" tabindex="-1"><a class="header-anchor" href="#快速排序与前序遍历" aria-hidden="true">#</a> 快速排序与前序遍历</h1><p>快速排序的过程是一个构造二叉搜索树的过程。</p><p><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/gibkIz0MVqdGZy8ttAE2M0GxYNH54ibyAfce9pETnTkYCCtVibHibn11pA561CSfSERaN933CWCEjDEwCpeHL0DicsQ/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="Image"></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">quickSort</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">&gt;=</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 单个元素有序</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token function">partition</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
  <span class="token function">quickSort</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> p <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token function">quickSort</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> p <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">partition</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 暂时用第一个元素作为分割点，为防止退化成链表，可随机取 partition</span>
  <span class="token keyword">const</span> p <span class="token operator">=</span> nums<span class="token punctuation">[</span>l<span class="token punctuation">]</span>

  <span class="token comment">// 定义 [l, i) &lt; partition，(j, r] &gt;= partition</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> l <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">=</span> r
  <span class="token keyword">while</span><span class="token punctuation">(</span>l <span class="token operator">&lt;</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// i 指针往右，找到第一个大于 p 的值</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> r <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span> i<span class="token operator">++</span> <span class="token punctuation">}</span> <span class="token comment">// 循环结束时，nums[i] &gt;= p</span>
    <span class="token comment">// j 指针往左，找到第一个小于 p 的值</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">&gt;</span> l <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span> j<span class="token operator">--</span> <span class="token punctuation">}</span> <span class="token comment">// 循环结束时，nums[j] &lt; p</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> j<span class="token punctuation">)</span> <span class="token keyword">break</span>

    <span class="token function">swap</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> i<span class="token punctuation">,</span> j<span class="token punctuation">)</span> <span class="token comment">// 交换后，nums[i] &lt; p, nums[j] &gt;= p</span>
  <span class="token punctuation">}</span>

  <span class="token function">swap</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> j<span class="token punctuation">)</span> <span class="token comment">// 由于 nums[j] &gt;= p，所以最后 p 和 j 交换</span>
  <span class="token keyword">return</span> j
<span class="token punctuation">}</span>
</code></pre></div><p>处理边界细节的一个技巧就是，你要明确每个变量的定义以及区间的开闭情况。</p><p><code>[lo, i) &lt;= pivot, (j, hi] &gt; pivot</code>，之后都要正确维护这个边界区间的定义。</p>`,7),c=[o];function e(u,l){return s(),a("div",null,c)}const r=n(t,[["render",e],["__file","4.2.快速排序与前序遍历.html.vue"]]);export{r as default};
