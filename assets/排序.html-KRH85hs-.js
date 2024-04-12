import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,b as t}from"./app-BzW9chhs.js";const p={},o=t(`<h1 id="排序算法" tabindex="-1"><a class="header-anchor" href="#排序算法"><span>排序算法</span></a></h1><h2 id="冒泡排序" tabindex="-1"><a class="header-anchor" href="#冒泡排序"><span>冒泡排序</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">bubbleSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// n - 1 轮比较</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 每轮 0 ~ (n - 1 - i)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> arr<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> j<span class="token punctuation">,</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr
<span class="token punctuation">}</span>
</code></pre></div><p>时间复杂度：O(n * n)，空间复杂度：O(1)，稳定排序</p><h2 id="选择排序" tabindex="-1"><a class="header-anchor" href="#选择排序"><span>选择排序</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">selectionSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// n - 1 轮</span>
    <span class="token keyword">let</span> minIndex <span class="token operator">=</span> i

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 未排序的元素中找到最小值</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>minIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        minIndex <span class="token operator">=</span> j
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">swap</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> i<span class="token punctuation">,</span> minIndex<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr
<span class="token punctuation">}</span>
</code></pre></div><h2 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序"><span>插入排序</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">insertionSort</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 第一个默认有序</span>
    <span class="token comment">// 在已排序的序列中找到自己的位置</span>
    <span class="token keyword">let</span> preIndex <span class="token operator">=</span> i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> cur <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>preIndex <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> cur <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>preIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      arr<span class="token punctuation">[</span>preIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>preIndex<span class="token punctuation">]</span>
      preIndex<span class="token operator">--</span>
    <span class="token punctuation">}</span>
    arr<span class="token punctuation">[</span>preIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> cur
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> arr
<span class="token punctuation">}</span>
</code></pre></div><h2 id="归并排序" tabindex="-1"><a class="header-anchor" href="#归并排序"><span>归并排序</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>l <span class="token operator">&gt;=</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">const</span> m <span class="token operator">=</span> l <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>r <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> left <span class="token operator">=</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> m<span class="token punctuation">)</span>
  <span class="token keyword">const</span> right <span class="token operator">=</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> <span class="token function">merge</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> m<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token parameter">nums<span class="token punctuation">,</span> l<span class="token punctuation">,</span> m<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> temp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div>`,11),e=[o];function c(l,r){return a(),s("div",null,e)}const i=n(p,[["render",c],["__file","排序.html.vue"]]),d=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F.html","title":"排序算法","lang":"zh-CN","frontmatter":{"description":"排序算法 冒泡排序 时间复杂度：O(n * n)，空间复杂度：O(1)，稳定排序 选择排序 插入排序 归并排序","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%AE%97%E6%B3%95/%E6%8E%92%E5%BA%8F.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"排序算法"}],["meta",{"property":"og:description","content":"排序算法 冒泡排序 时间复杂度：O(n * n)，空间复杂度：O(1)，稳定排序 选择排序 插入排序 归并排序"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"排序算法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"冒泡排序","slug":"冒泡排序","link":"#冒泡排序","children":[]},{"level":2,"title":"选择排序","slug":"选择排序","link":"#选择排序","children":[]},{"level":2,"title":"插入排序","slug":"插入排序","link":"#插入排序","children":[]},{"level":2,"title":"归并排序","slug":"归并排序","link":"#归并排序","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.82,"words":247},"filePathRelative":"编程/数据结构算法/排序.md","localizedDate":"2024年4月12日","autoDesc":true}');export{i as comp,d as data};
