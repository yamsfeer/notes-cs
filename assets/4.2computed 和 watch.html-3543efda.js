import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="computed-和-watch" tabindex="-1"><a class="header-anchor" href="#computed-和-watch" aria-hidden="true">#</a> computed 和 watch</h1><p>在 vue 中使用 computed 和 watch 的格式大约如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">firstname</span><span class="token operator">:</span> <span class="token string">&#39;f&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">lastname</span><span class="token operator">:</span> <span class="token string">&#39;l&#39;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">fullname</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstname <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>last<span class="token punctuation">.</span>name <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">name</span><span class="token punctuation">(</span><span class="token parameter">newName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newName<span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>下面介绍 computed 和 watch 的实现。</p><h2 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> computed</h2><p>computed 的初始化是在 vue 实例初始化阶段的 <code>initState</code> 函数中，</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/instance/state.js</span>

<span class="token keyword">const</span> computedWatcherOptions <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token comment">// computed 是惰性求值</span>

<span class="token keyword">function</span> <span class="token function">initComputed</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> <span class="token literal-property property">computed</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> watchers <span class="token operator">=</span> vm<span class="token punctuation">.</span>_computedWatchers <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> userDef <span class="token operator">=</span> computed<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">const</span> getter <span class="token operator">=</span> <span class="token keyword">typeof</span> userDef <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">?</span> userDef <span class="token operator">:</span> userDef<span class="token punctuation">.</span>get

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isSSR<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 创建 computed watcher，和其他 watcher 区别在于 lazy: true</span>
      watchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
        vm<span class="token punctuation">,</span>
        getter <span class="token operator">||</span> noop<span class="token punctuation">,</span>
        noop<span class="token punctuation">,</span>
        computedWatcherOptions
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 不和 data、methods 等重名</span>
      <span class="token function">defineComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> userDef<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>computed 是用 watcher 实现的，每个 vue 实例中的 computed watchers 都会放在 <code>vm._computedWatchers</code> 中。</p><p>initComputed 函数对每个 computed 属性创建一个 computed watcher，并调用 defineComputed。</p><p>computed watcher 和其他 watcher 区别在于惰性求值，后面会介绍。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/instance/state.js</span>

<span class="token keyword">const</span> sharedPropertyDefinition <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">get</span><span class="token operator">:</span> noop<span class="token punctuation">,</span>
  <span class="token literal-property property">set</span><span class="token operator">:</span> noop
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">defineComputed</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">target</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">userDef</span><span class="token operator">:</span> Object <span class="token operator">|</span> Function</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> shouldCache <span class="token operator">=</span> <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> userDef <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sharedPropertyDefinition<span class="token punctuation">.</span>get <span class="token operator">=</span> shouldCache
      <span class="token operator">?</span> <span class="token function">createComputedGetter</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token operator">:</span> <span class="token function">createGetterInvoker</span><span class="token punctuation">(</span>userDef<span class="token punctuation">)</span>
    sharedPropertyDefinition<span class="token punctuation">.</span>set <span class="token operator">=</span> noop
  <span class="token punctuation">}</span>
  <span class="token comment">// ...</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> sharedPropertyDefinition<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>defineComputed 需要注意的地方有两个：</p><ul><li><p><code>createComputedGetter(key)</code></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createComputedGetter</span> <span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">computedGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_computedWatchers <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_computedWatchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        watcher<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        watcher<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> watcher<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>createComputedGetter</code> 返回一个函数，它就是 computed 属性对应的 getter，即 vue 模板访问 fullname 时调用的取值函数。</p></li><li><p><code>Object.defineProperty(target, key, sharedPropertyDefinition)</code></p></li></ul><p>​ 这个很简单，就是给 vm 添加一个和 computed 属性同名的属性。</p><p>整个 computed 的初始化过程到此结束。</p><h3 id="computed-watcher-的-lazy-求值" tabindex="-1"><a class="header-anchor" href="#computed-watcher-的-lazy-求值" aria-hidden="true">#</a> computed watcher 的 lazy 求值</h3><p>computed watcher 的创建过程中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>watchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
  vm<span class="token punctuation">,</span>
  getter <span class="token operator">||</span> noop<span class="token punctuation">,</span>
  noop<span class="token punctuation">,</span>
  computedWatcherOptions <span class="token comment">// { lazy: true }</span>
<span class="token punctuation">)</span>
</code></pre></div><p>在 watcher 的构造函数中：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token comment">// 后面会用到</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy
  <span class="token operator">?</span> <span class="token keyword">undefined</span>
  <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>可以看出， <code>computed watcher</code> 会并不会立刻求值。当 <code>render</code> 函数访问到 <code>this.fullname</code> 时，会触发计算属性的 <code>getter</code>，也就是执行上面提到的 computedGetter：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">computedGetter</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_computedWatchers <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_computedWatchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher<span class="token punctuation">.</span>dirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      watcher<span class="token punctuation">.</span><span class="token function">evaluate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      watcher<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> watcher<span class="token punctuation">.</span>value
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>由于 <code>this.dirty = this.lazy</code> 所以这里会先调用 <code>watcher.evaluate</code>，然后调用 <code>watcher.depend</code>：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Watcher</span> <span class="token punctuation">{</span>
  <span class="token function">evaluate</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>dirty <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>this.get</code> 会执行 <code>value = this.getter.call(vm, vm)</code>，这实际上是执行了 computed 属性定义的 <code>getter</code> 函数，也就是执行了 <code>return this.firstname + this.lastname</code>。</p><p>需要特别注意的是，由于 <code>firstname</code> 和 <code>lastname</code> 都是响应式对象属性，这里会触发它们的 getter，根据之前的分析，它们会把自身持有的 <code>dep</code> 添加到当前正在计算的 <code>watcher</code> 中，这个时候 <code>Dep.target</code> 就是 <code>computed watcher</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Dep</span> <span class="token punctuation">{</span>
  <span class="token function">depend</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Dep<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Dep<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token function">addDep</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>注意，这时候的 <code>Dep.target</code> 是渲染 <code>watcher</code>，所以 <code>this.dep.depend()</code> 相当于渲染 <code>watcher</code> 订阅了这个 <code>computed watcher</code> 的变化。</p><h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2><p>watch 的初始化也是在 initState 中，initComputed 后调用 initWatch：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/instance/states</span>
<span class="token keyword">function</span> <span class="token function">initWatch</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span> <span class="token literal-property property">watch</span><span class="token operator">:</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> watch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> handler <span class="token operator">=</span> watch<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> handler<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> handler<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createWatcher</span> <span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
  <span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
  <span class="token literal-property property">handler</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> Object</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">return</span> vm<span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span>expOrFn<span class="token punctuation">,</span> handler<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>createWatcher 做了一些判断后，调用 <code>vm.$watch</code> 函数：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">stateMixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$watch</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">expOrFn</span><span class="token operator">:</span> string <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    <span class="token literal-property property">cb</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
    options<span class="token operator">?</span><span class="token operator">:</span> Object</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    options<span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">const</span> watcher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> watcher<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">handleError</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">callback for immediate watcher &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>watcher<span class="token punctuation">.</span>expression<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">unwatchFn</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      watcher<span class="token punctuation">.</span><span class="token function">teardown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>同样地，构建一个 watcher，由于 <code>options.user = true</code>，可见这是一个 user watcher。</p><p>一旦 <code>watch</code> 的数据变化，它会执行 <code>watcher</code> 的 <code>run</code> 方法，执行回调函数 <code>cb</code>，如果在 options 中设置了 immediate 为 true，则会立即求值。最后返回的是一个 unwatchFn 用于取消订阅。</p><h3 id="watcher-的类型" tabindex="-1"><a class="header-anchor" href="#watcher-的类型" aria-hidden="true">#</a> Watcher 的类型</h3><p>watcher 的构造函数中有一段代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>deep
  <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>user
  <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>lazy
  <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span>options<span class="token punctuation">.</span>sync
  <span class="token keyword">this</span><span class="token punctuation">.</span>before <span class="token operator">=</span> options<span class="token punctuation">.</span>before
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>deep <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lazy <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre></div><p>所以 <code>watcher</code> 总共有 5 种类型，其中 computed watcher 和 user watcher 上面已经介绍。</p><p>下面来看看另外几个类型的逻辑有哪些差别。</p><h3 id="deep-watcher" tabindex="-1"><a class="header-anchor" href="#deep-watcher" aria-hidden="true">#</a> deep watcher</h3><p>通常，如果我们想对一下对象做深度观测的时候，需要设置这个属性为 true，考虑到这种情况：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">a</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
vm<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
</code></pre></div><p>这里 watch 了 a 对象，只触发了 a 的 getter，并没有触发 <code>a.b</code> 的 getter，所以没有订阅它的变化。</p><p>为此，我们需要设置 deep watcher：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token literal-property property">watch</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">deep</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token function">handler</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newVal<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在 <code>watcher</code> 执行 <code>get</code> 求值的过程中有一段逻辑：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> value <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getter</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>deep<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">traverse</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/observer/traverse.js</span>

<span class="token keyword">const</span> seenObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">traverse</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">val</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">_traverse</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> seenObjects<span class="token punctuation">)</span>
  seenObjects<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">_traverse</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">val</span><span class="token operator">:</span> any<span class="token punctuation">,</span> <span class="token literal-property property">seen</span><span class="token operator">:</span> SimpleSet</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> i<span class="token punctuation">,</span> keys
  <span class="token keyword">const</span> isA <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">!</span>isA <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> Object<span class="token punctuation">.</span><span class="token function">isFrozen</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">||</span> val <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>val<span class="token punctuation">.</span>__ob__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> depId <span class="token operator">=</span> val<span class="token punctuation">.</span>__ob__<span class="token punctuation">.</span>dep<span class="token punctuation">.</span>id
    <span class="token keyword">if</span> <span class="token punctuation">(</span>seen<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>depId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    seen<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>depId<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isA<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">=</span> val<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token function">_traverse</span><span class="token punctuation">(</span>val<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> seen<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    i <span class="token operator">=</span> keys<span class="token punctuation">.</span>length
    <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token function">_traverse</span><span class="token punctuation">(</span>val<span class="token punctuation">[</span>keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> seen<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>traverse</code> 实际上就是对一个对象做深层递归遍历，因为遍历过程中就是对一个子对象的访问，会触发它们的 getter，这样就可以收集依赖。</p><p>这个函数实现还有一个小的优化，遍历过程中会把子响应式对象通过它们的 <code>dep id</code> 记录到 <code>seenObjects</code>，避免以后重复访问。</p><h3 id="sync-watcher" tabindex="-1"><a class="header-anchor" href="#sync-watcher" aria-hidden="true">#</a> sync watcher</h3><p>对 <code>setter</code> 的分析过程中，当响应式数据发送变化后，触发了 <code>watcher.update()</code>，只是把这个 <code>watcher</code> 推送到一个队列中，在 <code>nextTick</code> 后才会真正执行 <code>watcher</code> 的回调函数。而一旦我们设置了 <code>sync</code>，就可以在当前 <code>Tick</code> 中同步执行 <code>watcher</code> 的回调函数。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token function">update</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>lazy<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sync<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>只有当需要 watch 的值的变化到执行 <code>watcher</code> 的回调是同步过程时才会去设置该属性。</p>`,57),e=[o];function c(u,l){return a(),s("div",null,e)}const i=n(t,[["render",c],["__file","4.2computed 和 watch.html.vue"]]);export{i as default};
