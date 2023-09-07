import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h1><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2><p>vue 的源码都在 src 目录下。</p><div class="language-text" data-ext="text"><pre class="language-text"><code>src
├── compiler   # 编译相关
├── core       # 核心代码
├── platforms  # 不同平台的支持
├── server     # 服务端渲染
├── sfc        # .vue 文件解析
├── shared     # 共享代码
</code></pre></div><ul><li><p><strong>compiler</strong></p><p>包含所有编译相关的代码。包括把 vue 模板解析成 ast ，ast 优化，代码生成等功能。</p><p>编译可以在构建时(使用 webpack、vue-loader 等)，或在运行时做（使用包含 compiler 的版本）。</p><p>编译是一项耗性能的工作，所以推荐使用离线编译。</p></li><li><p><strong>core</strong>：vue 的核心代码，包括全局 API ，vue 实例化、observer、虚拟 DOM 等等。</p></li><li><p><strong>platforms</strong>：vue 是一个跨平台的 MVVM 框架，包含 web 和 weex 两个运行平台。</p></li><li><p><strong>server</strong></p><p>vue 2.0 开始支持服务端渲染，服务端渲染就是把组件在服务端渲染为 HTML 字符串，并将它们直接发送到浏览器。</p><p><strong>注意，这部分代码是运行在服务端的 Node.js，和浏览器端的 vue 代码不同。</strong></p></li><li><p><strong>sfc</strong>：将 <code>.vue</code> 文件解析成一个 JavaScript 对象。</p></li><li><p><strong>shared</strong>：包含一些平台无关的共享工具方法。</p></li></ul><h2 id="构建" tabindex="-1"><a class="header-anchor" href="#构建" aria-hidden="true">#</a> 构建</h2><p>vue 的构建工具是 <code>rollup</code>，构建命令在 <code>package.json</code> 中。</p><div class="language-json" data-ext="json"><pre class="language-json"><code><span class="token comment">// package.json</span>
scripts<span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node scripts/build.js&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>构建 vue 就是执行 <code>scripts/build.js</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// scripts/build.js</span>
<span class="token keyword">let</span> builds <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./config&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAllBuilds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 构建各种情况下的 vue</span>
<span class="token function">build</span><span class="token punctuation">(</span>builds<span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">build</span> <span class="token punctuation">(</span><span class="token parameter">builds</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> built <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">const</span> <span class="token function-variable function">next</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">buildEntry</span><span class="token punctuation">(</span>builds<span class="token punctuation">[</span>built<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">buildEntry</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> output <span class="token operator">=</span> config<span class="token punctuation">.</span>output
  <span class="token keyword">return</span> rollup<span class="token punctuation">.</span><span class="token function">rollup</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span> <span class="token comment">// rollup 构建</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">bundle</span> <span class="token operator">=&gt;</span> bundle<span class="token punctuation">.</span><span class="token function">generate</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p><code>build.js</code> 就是从 <code>config.js</code> 中获取所有的配置，然后依次调用 <code>rollup</code> 进行构建。</p><p>来看下 <code>config.js</code> 的代码：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// scripts/config</span>
<span class="token keyword">const</span> builds <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&#39;web-full-cjs-dev&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Runtime+compiler CommonJS build (CommonJS)</span>
  <span class="token string-property property">&#39;web-full-esm&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 整理成 rollup 所需的配置格式并返回</span>
<span class="token keyword">function</span> <span class="token function">genConfig</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> builds<span class="token punctuation">[</span>name<span class="token punctuation">]</span>
  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">input</span><span class="token operator">:</span> opts<span class="token punctuation">.</span>entry<span class="token punctuation">,</span>
    <span class="token literal-property property">external</span><span class="token operator">:</span> opts<span class="token punctuation">.</span>external<span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token comment">/* ... */</span><span class="token punctuation">,</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">onwarn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> warn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ...</span>
  <span class="token keyword">return</span> config
<span class="token punctuation">}</span>

exports<span class="token punctuation">.</span>getBuild <span class="token operator">=</span> genConfig
exports<span class="token punctuation">.</span><span class="token function-variable function">getAllBuilds</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>builds<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>genConfig<span class="token punctuation">)</span>
</code></pre></div><p>在 <code>config.js</code> 中，包含了各种情况下的配置，比如 web 或 weex 平台，是否包含 <code>compiler</code>，dev 或 prod，cjs 或 esm 等可能的组合情况。</p><p><code>genConfig</code> 函数会将这些配置整理成 <code>rollup</code> 所需的格式后返回。</p><h2 id="初始化前的准备" tabindex="-1"><a class="header-anchor" href="#初始化前的准备" aria-hidden="true">#</a> 初始化前的准备</h2><p>在 <code>import vue</code> 时，引入的是打包构建完成的 <code>vue</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
</code></pre></div><p>对于 <code>runtime + compiler</code> 版本的构建来说，入口文件是 <code>entry-runtime-with-compiler.js</code>。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// scripts/config</span>
<span class="token keyword">const</span> builds <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// Runtime+compiler ES modules build (for bundlers)</span>
  <span class="token string-property property">&#39;web-full-esm&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">dest</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.esm.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><p>来看下 <code>entry-runtime-with-compiler.js</code> 的主体结构：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// platforms/web/entry-runtime-with-compiler.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./runtime/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> compileToFunctions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./compiler/index&#39;</span>

<span class="token keyword">const</span> mount <span class="token operator">=</span> <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$mount
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> hydrating</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span>

Vue<span class="token punctuation">.</span>compile <span class="token operator">=</span> compileToFunctions
<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre></div><p><code>entry-runtime-with-compiler.js</code> 主要是 <code>import vue</code> ，并在<code>vue</code> 和 <code>vue.prototype</code> 上挂载一些函数。</p><p>可以看到 <code>vue</code> 来自于 <code>platforms/web/runtime/index</code> 文件。如此依次找下去：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// platforms/web/runtime/index</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;core/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> patch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./patch&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mountComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/instance/lifecycle&#39;</span>

<span class="token comment">// install platform specific utils</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>mustUseProp <span class="token operator">=</span> mustUseProp
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isReservedTag <span class="token operator">=</span> isReservedTag
<span class="token comment">// ...</span>

<span class="token comment">// install platform runtime directives &amp; components</span>
<span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>directives<span class="token punctuation">,</span> platformDirectives<span class="token punctuation">)</span>
<span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">,</span> platformComponents<span class="token punctuation">)</span>

<span class="token comment">// install platform patch function</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__patch__ <span class="token operator">=</span> inBrowser <span class="token operator">?</span> patch <span class="token operator">:</span> noop

<span class="token comment">// public mount method</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> hydrating</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> inBrowser <span class="token operator">?</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">undefined</span>
  <span class="token keyword">return</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/index</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./instance/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initGlobalAPI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./global-api/index&#39;</span>

<span class="token function">initGlobalAPI</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$isServer&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$ssrContext&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Vue<span class="token punctuation">,</span> <span class="token string">&#39;FunctionalRenderContext&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string">&#39;__VERSION__&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre></div><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/instance/index</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./init&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./state&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./render&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./events&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./lifecycle&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> warn <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>

<span class="token keyword">function</span> <span class="token function">Vue</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vue</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;Vue is a constructor and should be called with the \`new\` keyword&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre></div><p>最终，在 <code>core/instance/index</code> 中找到了 <code>vue</code> 的本体，它是一个函数。</p><p>这段代码主要是定义了 <code>function Vue() {}</code>，然后用 <code>mixin</code> 函数对 <code>Vue.prototype</code> 拓展一些方法。</p><p>为了将 <code>vue</code> 的功能分散到多个模块中实现，<code>vue</code> 用 <code>function</code> 而不是 <code>class</code> 定义，这样方便代码的维护。</p><h3 id="initglobalapi" tabindex="-1"><a class="header-anchor" href="#initglobalapi" aria-hidden="true">#</a> initGlobalAPI</h3><p>vue 初始化过程中，除了在 prototype 上扩展方法，还会给 Vue 本身扩展全局的静态方法。</p><p>Vue 官网中关于全局 API 都可以在这里找到。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// core/global-api/index</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&#39;../config&#39;</span>
<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Vue<span class="token punctuation">,</span> <span class="token string">&#39;config&#39;</span><span class="token punctuation">,</span> configDef<span class="token punctuation">)</span>

  Vue<span class="token punctuation">.</span>util <span class="token operator">=</span> <span class="token punctuation">{</span>
    warn<span class="token punctuation">,</span>
    extend<span class="token punctuation">,</span>
    mergeOptions<span class="token punctuation">,</span>
    defineReactive
  <span class="token punctuation">}</span>

  Vue<span class="token punctuation">.</span>set <span class="token operator">=</span> <span class="token keyword">set</span>
  Vue<span class="token punctuation">.</span>delete <span class="token operator">=</span> del
  Vue<span class="token punctuation">.</span>nextTick <span class="token operator">=</span> nextTick

  <span class="token comment">// 2.6 explicit observable API</span>
  Vue<span class="token punctuation">.</span><span class="token function-variable function">observable</span> <span class="token operator">=</span> <span class="token parameter">obj</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
    <span class="token keyword">return</span> obj
  <span class="token punctuation">}</span>

  Vue<span class="token punctuation">.</span>options <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    Vue<span class="token punctuation">.</span>options<span class="token punctuation">[</span>type <span class="token operator">+</span> <span class="token string">&#39;s&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// this is used to identify the &quot;base&quot; constructor to extend all plain-object</span>
  <span class="token comment">// components with in Weex&#39;s multi-instance scenarios.</span>
  Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>_base <span class="token operator">=</span> Vue

  <span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">,</span> builtInComponents<span class="token punctuation">)</span>

  <span class="token function">initUse</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initExtend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initAssetRegisters</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>以 <code>runtime + compiler</code> 版本为例，查找 <code>vue</code> 的过程如下图：</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gycc4n7c3cj30df0a8mxo.jpg" alt=""></p><p><code>vue</code> 在初始化之前，会在 <code>Vue</code> 或 <code>Vue.prototype</code> 上挂载 <code>state、events、lifecycle、render</code> 等相关的函数。</p>`,38),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(t,[["render",c],["__file","1.准备工作.html.vue"]]);export{r as default};
