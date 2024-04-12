import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as t}from"./app-BzW9chhs.js";const p={},e=t(`<h1 id="eventemitter" tabindex="-1"><a class="header-anchor" href="#eventemitter"><span>EventEmitter</span></a></h1><p>eventEmitter 是发布订阅模式的一种实现。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">EventEmitter</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listener <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">on</span><span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token function">emit</span><span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=&gt;</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">off</span><span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> fns <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fns<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> idx <span class="token operator">=</span> fns<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item <span class="token operator">===</span> fn<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>idx <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fns<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>idx<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>fns<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listener<span class="token punctuation">[</span>event<span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> emitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span>
emitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token parameter">data</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// { foo: &#39;bar&#39; }</span>
emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,4),o=[e];function c(u,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","eventEmitter.html.vue"]]),m=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81/eventEmitter.html","title":"EventEmitter","lang":"zh-CN","frontmatter":{"description":"EventEmitter eventEmitter 是发布订阅模式的一种实现。","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81/eventEmitter.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"EventEmitter"}],["meta",{"property":"og:description","content":"EventEmitter eventEmitter 是发布订阅模式的一种实现。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"EventEmitter\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.3,"words":89},"filePathRelative":"编程/手写代码/eventEmitter.md","localizedDate":"2024年4月12日","autoDesc":true}');export{r as comp,m as data};
