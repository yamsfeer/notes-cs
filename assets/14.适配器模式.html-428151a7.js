import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h1><p>适配器模式主要用来解决两个已有接口之间不匹配的问题，它不需要改变已有的接口，就能够使它们协同作用。</p><p>来看一个例子，假设我们正在编写一个渲染广东省地图的页面，后端接口的数据格式是这样的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;shenzhen&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">11</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;guangzhou&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">12</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// ...</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>我们根据数据格式写出如下渲染代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">cities</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> city <span class="token keyword">of</span> cities<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>city<span class="token punctuation">.</span>name<span class="token punctuation">,</span> city<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token function">getCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>后来的某一天，后端改变了数据的格式。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">newGetCity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">shenzhen</span><span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
    <span class="token literal-property property">guangzhou</span><span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>render 函数接受的是对象数组，而新接口返回的是一个对象，为了使 render 函数正常运行，我们需要一个适配器。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">adapter</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> newFormatData <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> oldFormatData <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>newFormatData<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>name<span class="token punctuation">,</span> id<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      name<span class="token punctuation">,</span>
      id
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> oldFormatData
<span class="token punctuation">}</span>

<span class="token keyword">const</span> cities <span class="token operator">=</span> <span class="token function">adapter</span><span class="token punctuation">(</span>newGetCity<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">render</span><span class="token punctuation">(</span>cities<span class="token punctuation">)</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>适配器模式是相对简单的模式。</p><p>装饰者模式、代理模式、外观模式跟适配器模式结构非常相似，它们都属于“包装模式”，都是由一个对象来包装另一个对象。</p><p>区别它们的关键仍然是模式的意图：</p><ul><li><p>适配器模式：解决两个已有接口之间不匹配的问题</p></li><li><p>装饰者模式：给对象增加功能</p></li><li><p>代理模式：控制对对象的访问</p></li><li><p>外观模式倒是和适配器比较相似，有人把外观模式看成一组对象的适配器，但外观模式的显著特点是定义了新的接口，其他三种模式都不改变原有的接口。</p></li></ul>`,15),e=[o];function c(u,l){return a(),s("div",null,e)}const k=n(t,[["render",c],["__file","14.适配器模式.html.vue"]]);export{k as default};
