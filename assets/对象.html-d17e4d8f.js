import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-706bfe03.js";const p={},e=t(`<h1 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h1><h2 id="浅拷贝与深拷贝" tabindex="-1"><a class="header-anchor" href="#浅拷贝与深拷贝" aria-hidden="true">#</a> 浅拷贝与深拷贝</h2><h2 id="object-assign" tabindex="-1"><a class="header-anchor" href="#object-assign" aria-hidden="true">#</a> Object.assign</h2><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isNullOrUndefined</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> target <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> target <span class="token operator">===</span> <span class="token keyword">undefined</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Assign</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> <span class="token operator">...</span>sources</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNullOrUndefined</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;target is null or undefined&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  target <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
  sources<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">source</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isNullOrUndefined</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    source <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>

    <span class="token keyword">const</span> descriptors <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperties</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> descriptors<span class="token punctuation">)</span>


  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> target
<span class="token punctuation">}</span>
</code></pre></div>`,4),o=[e];function c(u,r){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","对象.html.vue"]]);export{k as default};
