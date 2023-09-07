import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as e,c,a as s,b as n,d as l,e as a}from"./app-706bfe03.js";const r={},u=a(`<h1 id="hmr" tabindex="-1"><a class="header-anchor" href="#hmr" aria-hidden="true">#</a> HMR</h1><p>HMR ( hot module replacement ) 是 webpack 的一个强大功能，它能使我们在修改代码后 ( 如修改 css 代码 ) 部分更新页面而不是重新刷新，这提供了良好的开发体验。</p><p>webpack 开启 hmr 有两种方式，一个是使用命令</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ webpack-dev-server <span class="token parameter variable">--hot</span>
</code></pre></div><p>还有一种方法是通过配置文件。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">hot</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>HotModuleReplacementPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><p>HMR 不是一个开箱即用的功能，我们需要告诉 webpack 模块代码更新之后需要做什么。</p><p>之所以修改样式文件可以实现热更新而不需添加其他代码，是因为 style-loader 已经做了这部分工作。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>module<span class="token punctuation">.</span>hot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>content<span class="token punctuation">.</span>locals <span class="token operator">||</span> module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span>invalidate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>
      <span class="token string">&quot;!!../node_modules/.pnpm/css-loader@6.7.1_webpack@5.74.0/node_modules/css-loader/dist/cjs.js!./style.css&quot;</span><span class="token punctuation">,</span>
      <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isEqualLocals</span><span class="token punctuation">(</span>oldLocals<span class="token punctuation">,</span> isNamedExport <span class="token operator">?</span> namedExport <span class="token operator">:</span> content<span class="token punctuation">.</span>locals<span class="token punctuation">,</span> isNamedExport<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">invalidate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        oldLocals <span class="token operator">=</span> isNamedExport <span class="token operator">?</span> namedExport <span class="token operator">:</span> content<span class="token punctuation">.</span>locals<span class="token punctuation">;</span>
        <span class="token function">update</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">dispose</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>对于样式代码来说，style-loader 只需要在代码变更后将 css 代码替换掉 style 标签的内容即可；但是对于 js 代码来说，没有很好的办法预测，所以需要使用者自己编写 <code>module.hot..accept</code> 里面的内容。</p><p>对于 js 代码，要想使用 HMR 过于复杂，相反，样式、图片等的热更新就相对容易了。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> imgSrc <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./img&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> imgSrc

<span class="token comment">// 热更新代码</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>module<span class="token punctuation">.</span>hot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span>hot<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token string">&#39;./img&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    img<span class="token punctuation">.</span>src <span class="token operator">=</span> imgSrc <span class="token comment">// 只需要重新设置 src 地址即可</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div>`,12),i={href:"https://webpack.docschina.org/guides/hot-module-replacement#other-code-and-frameworks",target:"_blank",rel:"noopener noreferrer"},k=a(`<p>使用 hmr 还有两个个问题要注意：</p><ul><li><p>如果 hmr 代码中有错误，是导致 hmr 失败，webpack 默认会回退到刷新浏览器的方式，这使得我们看不到 hmr 的代码报错。</p><p>解决办法也简单，设置 <code>devServer: { hotOnly: true }</code>，这个设置下，hmr 报错也不会刷新浏览器</p></li><li><p>hmr 这段代码是和业务无关的，不是 devServer 开发时，这写代码会被移除掉。</p></li></ul><h2 id="dev-server" tabindex="-1"><a class="header-anchor" href="#dev-server" aria-hidden="true">#</a> dev server</h2><p>devServer 会监听项目的文件， 当文件内容发生改版，则重新打包并通过内部的 http server 通知浏览器刷新。</p><p>值得的注意的是，devServer 打包项目后并不会生成打包文件，而是保存在内存中，从而减少文件读写，提高打包速度。</p><p>通过安装 webpack-dev-server 依赖，然后通过命令即可创建 devServer。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">pnpm</span> i webpack-dev-server
$ <span class="token function">pnpm</span> webpack-dev-server
</code></pre></div><h3 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> proxy</h3><p>devServer 有一个常用的功能是代理 API。</p><p>在开发过程中，本地的地址通常是 <code>localhost:8080</code>，假设我们要请求的线上地址是 <code>https://example.com/api/users</code>，则会产生跨域问题。</p><p>如果线上接口不支持跨域资源共享 ( CORS )，我们需要通过一个代理服务器来请求 API。</p><p>注意，服务器不支持 CORS 不代表服务器会拒绝该请求，我们遇到的跨域问题通常是浏览器端出于安全的考虑，拒绝客户端接收跨域请求的结果，这也是为什么我们需要代理服务发起请求。</p><p>总的来说，客户端不能获取跨域资源是浏览器做了拦截，代理服务器是能获取跨域资源的。</p><p>devServer 要启用代理只需做如下配置：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// http://localhost:8080/api/users =&gt; https://api.github.com/api/users</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;https://api.github.com&#39;</span><span class="token punctuation">,</span>
        <span class="token comment">// http://localhost:8080/api/users =&gt; https://api.github.com/users</span>
        <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 不能用 localhost: 8080 作为请求的主机名</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,15);function d(m,h){const p=o("ExternalLinkIcon");return e(),c("div",null,[u,s("p",null,[n("如果是成熟的框架，社区通常有相应的热更新方案，比如 "),s("a",i,[n("vue-loader"),l(p)]),n(" 就支持 vue 组件的 HMR，提供开箱即用体验。")]),k])}const y=t(r,[["render",d],["__file","11.hmr.html.vue"]]);export{y as default};
