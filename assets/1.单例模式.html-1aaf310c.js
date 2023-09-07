import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e as t}from"./app-706bfe03.js";const p={},o=t(`<h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h1><p>单例模式的定义是:保证一个类仅有一个实例，并提供一个访问它的全局访问点。</p><p>单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的 window 对象等。</p><p>来看一个例子，假设我们需要创建一个全局唯一的对话框，且无论调用多少次函数，都只创建一次。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createDialog</span><span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> instance <span class="token comment">// 如果已经创建过，则直接返回</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    div<span class="token punctuation">.</span>html <span class="token operator">=</span> html
    
    instance <span class="token operator">=</span> div
    <span class="token keyword">return</span> instance
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>使用起来是这样的。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> createDialog <span class="token operator">=</span> <span class="token function">singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">createDiv</span><span class="token punctuation">(</span><span class="token string">&#39;div1&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">createDiv</span><span class="token punctuation">(</span><span class="token string">&#39;div2&#39;</span><span class="token punctuation">)</span>

a <span class="token operator">===</span> b <span class="token comment">// true</span>
</code></pre></div><p>现在的 createDialog 既要管理单例，又要负责创建对话框，违反了单一职责原则。下面我们用代理将这两个功能分开。</p><h2 id="用代理实现单例" tabindex="-1"><a class="header-anchor" href="#用代理实现单例" aria-hidden="true">#</a> 用代理实现单例</h2><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createDialog</span><span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
  div<span class="token punctuation">.</span>html <span class="token operator">=</span> html
  <span class="token keyword">return</span> div
<span class="token punctuation">}</span>
</code></pre></div><p>现在的 createDialog 函数只负责一件事，非常简洁。我们再用缓存代理将他包起来。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> instance
    <span class="token punctuation">}</span>
    instance <span class="token operator">=</span> <span class="token function">createDialog</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
    <span class="token keyword">return</span> instance
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>这样就实现了缓存单例和创建对话框的解耦。缓存代理在后面的章节介绍。</p><h2 id="惰性单例" tabindex="-1"><a class="header-anchor" href="#惰性单例" aria-hidden="true">#</a> 惰性单例</h2><p>惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点，在实际开发中非常有用。</p><p>来看个例子：页面中有一个按钮，当点击时才创建对话框，且无论点击多少次，都只创建一次。</p><p>其实前面我们用代理实现的创建对话框已经是惰性单例了。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>button<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">proxy</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
</code></pre></div><p>但是还不够通用，因为我们将 createDialog 的函数调用写死在了返回的函数里面，将这部分逻辑抽离，即可实现一个通用的惰性单例函数。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 为一个函数赋予单例功能</span>
<span class="token keyword">function</span> <span class="token function">getSingle</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>将 createDialog 函数传入，即可包装成单例。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 包装成单例</span>
<span class="token keyword">const</span> createSingleDialog <span class="token operator">=</span> <span class="token function">getSingle</span><span class="token punctuation">(</span>createDialog<span class="token punctuation">)</span>

button<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">createSingleDialog</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>单例模式比较简单，只需直到通用的惰性单例函数。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getSingle</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,25),e=[o];function c(l,u){return a(),s("div",null,e)}const r=n(p,[["render",c],["__file","1.单例模式.html.vue"]]);export{r as default};
