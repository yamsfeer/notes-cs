import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-706bfe03.js";const p={},o=t(`<h1 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> computed</h1><p>computed 使用起来大概是这样的：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> obj<span class="token punctuation">.</span>bar<span class="token punctuation">)</span>

sum<span class="token punctuation">.</span>value <span class="token comment">// 3</span>
obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">2</span>
sum<span class="token punctuation">.</span>value <span class="token comment">// 4</span>
</code></pre></div><p>computed 函数接受一个 getter 函数，getter 函数将访问 reactive 对象的属性并返回一个计算值，当 reactive 对象变化时，computed 可以自动获得新的计算值。</p><h2 id="基本实现" tabindex="-1"><a class="header-anchor" href="#基本实现" aria-hidden="true">#</a> 基本实现</h2><p>回顾之前的 effect 函数。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 立即执行</span>
  <span class="token keyword">return</span> effectFn
<span class="token punctuation">}</span>
</code></pre></div><p>可以看到 effectFn 在注册时是立即执行一次的 ( <strong>调度器控制的是这之外的执行</strong> )。</p><p>为实现 computed，需要以下几点准备工作。</p><p>首先，我们不希望 effectFn 暂不执行，对此可通过增加 <code>options.lazy</code> 属性做到这一点。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 非 lazy 时才立即执行</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> effectFn
<span class="token punctuation">}</span>
</code></pre></div><p>然后我们需要拿到 effectFn 的返回值，继续修改上面的代码。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> res <span class="token comment">// 返回值</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 非 lazy 时才立即执行</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> effectFn
<span class="token punctuation">}</span>
</code></pre></div><p>到这一步，我们已经可以懒执行 effectFn 并拿到它的返回值。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> obj<span class="token punctuation">.</span>bar<span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>有了以上两步准备工作，接下来就可以实现 computed了。</p><p>总的来说，computed 函数包含一个 laze 的 effectFn，通过返回对象的 getter 访问器控制 effectFn 的执行。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// lazy effect</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 获取 value 时执行 effectFn</span>
      <span class="token keyword">return</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>用 computed 函数创建一个计算属性。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> obj<span class="token punctuation">.</span>bar<span class="token punctuation">)</span>

sum<span class="token punctuation">.</span>value <span class="token comment">// 访问 value 触发 effectFn 执行</span>
</code></pre></div><p>值得注意的是，传入 computed 的 getter 函数访问的需要是 reactive 对象，因为 computed 内部是用 effect 实现的，而 effect 函数需要访问的是 reactive 对象。</p><h2 id="缓存-computed-值" tabindex="-1"><a class="header-anchor" href="#缓存-computed-值" aria-hidden="true">#</a> 缓存 computed 值</h2><p>目前的 computed 会在访问 value 时计算值，我们需要 computed 能缓存上一次计算的值，只在依赖的 reactive 对象属性变化时才重新计算。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token keyword">let</span> value <span class="token comment">// 缓存计算结果</span>
  <span class="token keyword">let</span> dirty <span class="token operator">=</span> <span class="token boolean">true</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// dirty 时才计算</span>
        dirty <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> value <span class="token comment">// dirty 为 false 时使用缓存值</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面代码中我们新增了 value 用于缓存上一次计算的值，dirty 标识是否需要重新计算。当 dirty 为 true 时重新计算，否则返回缓存值。</p><p>但还有问题，看如下代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">bar</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> obj<span class="token punctuation">.</span>bar<span class="token punctuation">)</span>

sum<span class="token punctuation">.</span>value <span class="token comment">// 3</span>
obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">2</span>
sum<span class="token punctuation">.</span>value <span class="token comment">// 3</span>
</code></pre></div><p>可以看到，当我们修改 obj.foo 后，computed 并没有重新计算。这是因为第一次访问 sum.value 后，dirty 值便被设为 false，且不再改变。</p><p>为此，当 obj 改变时，我们用 scheduler 控制 dirty 为 true。从语义上也是很好理解的，obj 改变后就 dirty 了，需要重新计算。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      dirty <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 用调度器设置 dirty 为 true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token keyword">let</span> value
  <span class="token keyword">let</span> dirty <span class="token operator">=</span> <span class="token boolean">true</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// dirty 时才计算</span>
        dirty <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> value <span class="token comment">// dirty 为 false 时使用缓存值</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="在-effect-中读取-computed-的值" tabindex="-1"><a class="header-anchor" href="#在-effect-中读取-computed-的值" aria-hidden="true">#</a> 在 effect 中读取 computed 的值</h2><p>来看一段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">foo</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> sum <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> obj<span class="token punctuation">.</span>foo <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// effect 中读取 computed 的值</span>
obj<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 修改依赖的值</span>
</code></pre></div><p>当 obj.foo 变化时，我们期待 effectFn 重新执行，然而事实上并没有。</p><p>究其原因，<strong>effect 中读取 computed 的值，其本质上是 effect 的嵌套</strong>。</p><p>computed 实际上是一个 lazy effect，getter 函数访问 reactive 对象只会触发 computed 内部的 effectFn 做依赖收集。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// getter: () =&gt; obj.foo + 1</span>
  <span class="token comment">// getter 触发 track 依赖收集，将这个 effectFn 加入</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><strong>effect 嵌套时，外层 effect 不会被内层 effect 中的响应式数据收集</strong>。</p><p>以上面的例子来说，就是 <code>() =&gt; sum.value</code> 不会被 obj.foo 收集。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 这里的 effectFn 不会被 obj.foo 收集</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>既然如此，为解决这个问题，我们需要手动设置 computed 内的依赖收集。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token parameter">getter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> effectFn <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span>getter<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">scheduler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dirty <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token comment">// computed 的依赖数据变化时，手动 trigger</span>
        <span class="token function">trigger</span><span class="token punctuation">(</span>computedObj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  
  <span class="token keyword">const</span> computedObj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        value <span class="token operator">=</span> <span class="token function">effectFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        dirty <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// 读取 computed 的值时，手动 track</span>
      <span class="token function">track</span><span class="token punctuation">(</span>computedObj<span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> comptutedObj
<span class="token punctuation">}</span>
</code></pre></div><p>注意，以上代码中，手动 track 时，activeEffect 是 <code>() =&gt; sum.value</code>。</p><p>相当于执行以下代码时：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>建立下图关系。</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/reactivity-嵌套effect.svg" alt=""></p>`,47),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","2.1.computed.html.vue"]]);export{i as default};
