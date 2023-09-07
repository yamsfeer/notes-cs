import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-706bfe03.js";const t={},o=p(`<h1 id="createcompiler" tabindex="-1"><a class="header-anchor" href="#createcompiler" aria-hidden="true">#</a> createCompiler</h1><p>从用户角度，使用 webpack 打包的代码大概如下：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;webpack&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./webpack.config.js&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> compiler <span class="token operator">=</span> <span class="token function">webpack</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>

compiler<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>webpack 函数会调用 createCompiler 函数创建 compiler，它包含了大部分初始化工作。</p><p>createCompiler 函数主要做了以下几个工作：</p><ul><li>初始化参数</li><li>创建 Compiler 对象</li><li>注册用户插件和内置插件</li></ul><p>createCompiler 函数在源码中的调用关系如下图：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/createCompiler.svg" style="zoom:90%;"><p>这里值得注意的有两点：创建 compiler 对象和注册内置插件。</p><ul><li>webpack 内置的插件非常多，需要注意的是 EntryOptionsPlugin，它处理的是入口相关的逻辑。</li></ul><h3 id="new-compiler" tabindex="-1"><a class="header-anchor" href="#new-compiler" aria-hidden="true">#</a> new Compiler</h3><p>compiler 对象上挂载了很多 hooks，它涵盖了构建过程的整个生命周期。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Compiler</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hooks <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">// compilation hook</span>
      <span class="token comment">// make hook</span>
      <span class="token comment">// seal hook</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>插件通过监听 compiler 对象上的 hooks，可以在合适的时候介入编译打包过程。</p><h3 id="注册插件" tabindex="-1"><a class="header-anchor" href="#注册插件" aria-hidden="true">#</a> 注册插件</h3><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">WebpackOptionsApply</span> <span class="token punctuation">{</span>
  <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">ooptions<span class="token punctuation">,</span> compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根据用户配置挂载插件</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>externals<span class="token punctuation">)</span> <span class="token keyword">new</span> <span class="token class-name">ExternalsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
    <span class="token comment">// ...</span>

    <span class="token comment">// 挂载内置插件</span>
    <span class="token keyword">new</span> <span class="token class-name">ChunkPrefetchPreloadPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
    <span class="token comment">// ...</span>

    <span class="token comment">// 处理多入口、动态入口的插件，主要功能是添加事件，相当于 addEventListener</span>
    <span class="token keyword">new</span> <span class="token class-name">EntryOptionPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
    <span class="token comment">// 触发 entryOption，处理入口文件，相当于 trigger</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span><span class="token function">entryOption</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>context<span class="token punctuation">,</span> options<span class="token punctuation">.</span>entry<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在初始化阶段，需要注意的是 EntryOptionPlugin，是用于处理入口逻辑。</p><h3 id="处理入口文件" tabindex="-1"><a class="header-anchor" href="#处理入口文件" aria-hidden="true">#</a> 处理入口文件</h3><p>在单文件入口的情况下，EntryOptionPlugin 会应用 EntryPlugin。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">EntryOptionPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>entryOption<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span><span class="token string">&#39;EntryOptionPlugin&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> entry</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> entry <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 动态入口</span>
        <span class="token keyword">new</span> <span class="token class-name">DynamicEntryPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 多文件入口或单文件入口，这里只考虑单入口</span>
        <span class="token keyword">new</span> <span class="token class-name">EntryPlugin</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> entry<span class="token punctuation">,</span> <span class="token string">&#39;main&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>compiler<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>EntryPlugin 主要做了三件事：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">EntryPlugin</span> <span class="token punctuation">{</span>
  <span class="token function">apply</span><span class="token punctuation">(</span><span class="token parameter">compiler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>compilation<span class="token punctuation">.</span><span class="token function">tap</span><span class="token punctuation">(</span>
      <span class="token string">&#39;EntryPlugin&#39;</span><span class="token punctuation">,</span>
      <span class="token comment">// 指定 NormalModuleFactory，后面创建模块时需要用</span>
      <span class="token punctuation">(</span><span class="token parameter">compilation<span class="token punctuation">,</span> <span class="token punctuation">{</span> normalModuleFactory <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        compilation<span class="token punctuation">.</span>dependencyFactories<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>
          EntryDependency<span class="token punctuation">,</span>
          normalModuleFactory
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token punctuation">{</span> entry<span class="token punctuation">,</span> options<span class="token punctuation">,</span> context <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
    <span class="token comment">// 创建 Dependency，入口文件对应的是 EntryDependency 类型</span>
    <span class="token keyword">const</span> dep <span class="token operator">=</span> EntryPlugin<span class="token punctuation">.</span><span class="token function">createDependency</span><span class="token punctuation">(</span>entry<span class="token punctuation">,</span> options<span class="token punctuation">)</span>

    <span class="token comment">// 注册 make hook，执行 compilation.addEntry</span>
    compiler<span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>make<span class="token punctuation">.</span><span class="token function">tapAsync</span><span class="token punctuation">(</span><span class="token string">&#39;EntryPlugin&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">compilation</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      compilation<span class="token punctuation">.</span><span class="token function">addEntry</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> dep<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>EntryPlugin 在 <code>compiler.hooks.make</code> 上挂载了监听函数，当调用 <code>compiler.run</code> 方法时会触发 make hook，进入 make 阶段。</p><h3 id="compiler-run" tabindex="-1"><a class="header-anchor" href="#compiler-run" aria-hidden="true">#</a> compiler.run</h3><p><code>compiler.run</code> 方法会调用 <code>compiler.compile</code> 方法，除了触发上面提到的 make hook 之外，compile 方法还会创建 compilation 对象处理编译工作。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Compiler</span> <span class="token punctuation">{</span>
  <span class="token function">compile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建 compilation</span>
    <span class="token keyword">const</span> params <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newCompilationParams</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> compilation <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">newCompilation</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>

    <span class="token comment">// 触发 make hook，进入 make 阶段</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hooks<span class="token punctuation">.</span>make<span class="token punctuation">.</span><span class="token function">callAsync</span><span class="token punctuation">(</span>compilation<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// make 完成后，进入 seal 阶段</span>
      compilation<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3><p>初始化阶段中，createCompiler 函数的主要工作：</p><ul><li>初始化参数，对 webpack.config.js 或 shell 命令传过来的参数进行 normalize 操作</li><li>创建 compiler 对象，初始化各种 hooks</li><li>注册内置插件和用户插件</li><li>创建 compilation 对象</li><li>触发 make hook，进入 make 阶段</li></ul>`,29),c=[o];function e(l,u){return s(),a("div",null,c)}const r=n(t,[["render",e],["__file","2.createCompiler.html.vue"]]);export{r as default};
