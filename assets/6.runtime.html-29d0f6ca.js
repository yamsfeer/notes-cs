import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="runtime" tabindex="-1"><a class="header-anchor" href="#runtime" aria-hidden="true">#</a> runtime</h1><p>假设将项目代码如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// src/index.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> nameA <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./moduleA.js&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> nameB <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./moduleB.js&#39;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nameA<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>nameB<span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// src/moduleA.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> nameA <span class="token operator">=</span> <span class="token string">&#39;moduleA&#39;</span>

<span class="token comment">// src/moduleB.js</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> nameB <span class="token operator">=</span> <span class="token string">&#39;moduleB&#39;</span>
</code></pre></div><p>webpack 打包后的代码是个立即执行函数，整体 bootstrap 过程分 4 步。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">// webpackBootstrap</span>
  <span class="token comment">// 定义模块数组</span>
  <span class="token comment">// 定义 __webpack_require__ 函数</span>
  <span class="token comment">// 为 __webpack_require__ 函数挂载工具方法</span>
  <span class="token comment">// 使用 __webpack_require__ 函数导入模块</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> __webpack_modules__ <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token comment">/* 0 */</span><span class="token punctuation">,</span>
  <span class="token comment">/* 1 */</span>
  <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">__unused_webpack_module<span class="token punctuation">,</span> __webpack_exports__<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    __webpack_require__<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">)</span><span class="token punctuation">;</span>
    __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token comment">/* binding */</span> nameA<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> nameA <span class="token operator">=</span> <span class="token string">&#39;moduleA&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">/* 2 */</span>
  <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">__unused_webpack_module<span class="token punctuation">,</span> __webpack_exports__<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>

    __webpack_require__<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">)</span><span class="token punctuation">;</span>
    __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token comment">/* binding */</span> nameB<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> nameB <span class="token operator">=</span> <span class="token string">&#39;moduleB&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// The module cache</span>
<span class="token keyword">var</span> __webpack_module_cache__ <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token parameter">moduleId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Check if module is in cache</span>
  <span class="token keyword">var</span> cachedModule <span class="token operator">=</span> __webpack_module_cache__<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedModule <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cachedModule<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// Create a new module (and put it into the cache)</span>
  <span class="token keyword">var</span> module <span class="token operator">=</span> __webpack_module_cache__<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// no module.id needed</span>
    <span class="token comment">// no module.loaded needed</span>
    <span class="token literal-property property">exports</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// Execute the module function</span>
  __webpack_modules__<span class="token punctuation">[</span>moduleId<span class="token punctuation">]</span><span class="token punctuation">(</span>module<span class="token punctuation">,</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">,</span> __webpack_require__<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Return the exports of the module</span>
  <span class="token keyword">return</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* webpack/runtime/define property getters */</span>
<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// define getter functions for harmony exports</span>
  __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">d</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> definition</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> definition<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>__webpack_require__<span class="token punctuation">.</span><span class="token function">o</span><span class="token punctuation">(</span>definition<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>__webpack_require__<span class="token punctuation">.</span><span class="token function">o</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">get</span><span class="token operator">:</span> definition<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* webpack/runtime/hasOwnProperty shorthand */</span>
<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">o</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> prop<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* webpack/runtime/make namespace object */</span>
<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// define __esModule on exports</span>
  __webpack_require__<span class="token punctuation">.</span><span class="token function-variable function">r</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">exports</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> Symbol <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span> Symbol<span class="token punctuation">.</span>toStringTag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> Symbol<span class="token punctuation">.</span>toStringTag<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;Module&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> <span class="token string">&#39;__esModule&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> __webpack_exports__ <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.</span>
<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  __webpack_require__<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">var</span> _moduleA_js__WEBPACK_IMPORTED_MODULE_0__ <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 导入模块 1</span>
  <span class="token keyword">var</span> _moduleB_js__WEBPACK_IMPORTED_MODULE_1__ <span class="token operator">=</span> <span class="token function">__webpack_require__</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 导入模块 2</span>

  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_moduleA_js__WEBPACK_IMPORTED_MODULE_0__<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// index.js 的 console.log 调用</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>_moduleB_js__WEBPACK_IMPORTED_MODULE_1__<span class="token punctuation">.</span>name<span class="token punctuation">)</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>`,10),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","6.runtime.html.vue"]]);export{r as default};
