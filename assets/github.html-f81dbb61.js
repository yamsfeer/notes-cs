import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as u,a as n,b as s,d as t,e as p}from"./app-706bfe03.js";const l={},i=n("h2",{id:"github",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#github","aria-hidden":"true"},"#"),s(" github")],-1),k=n("p",null,"github 除了 git 管理代码仓库的能力，还提供了一些额外的功能。",-1),r=n("ul",null,[n("li",null,"Github Actions，用于 CI / CD"),n("li",null,"Github Packages，发布 NPM 包等"),n("li",null,"Github Pages，发布静态页面"),n("li",null,"Github Codespaces，线上代码开发"),n("li",null,"Github Gist，记录代码片段")],-1),h={href:"https://docs.github.com/",target:"_blank",rel:"noopener noreferrer"},g=p(`<h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> github actions</h2><p>github actions 可以设置你的 github 工作流，主要用于 CI / CD。</p><ul><li>持续集成 ( Continuous Integration, CI )，将代码集成到共享代码仓库，并自动化构建、测试和验证。</li><li>持续部署 ( Continuous Deployment, CD )，在 CI 的基础上，将代码自动交付到生产环境。</li></ul><p>下面是一个使用 vuepress 的博客仓库的工作流设置。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> build my blog

<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token comment"># 执行时机</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;master&quot;</span> <span class="token punctuation">]</span> <span class="token comment"># push 代码到 master 分支时执行</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;master&quot;</span> <span class="token punctuation">]</span> <span class="token comment"># merge 代码到 master 分支时执行</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span> <span class="token comment"># 允许手动执行</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span> <span class="token comment"># 一个工作流由一个或多个 job 组成</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span> <span class="token comment"># 一个称为 build 的 job</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest <span class="token comment"># 在最新版 Ubuntu 上操作</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3 <span class="token comment"># 从github下载代码</span>

      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2.2.2 <span class="token comment"># 用 pnpm 作为包管理</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> 8.1.1
          
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 设置 node 版本</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> <span class="token string">&#39;pnpm&#39;</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm i <span class="token comment"># 下载依赖</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vuepress build
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NODE_OPTIONS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>max_old_space_size=4096
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm run build <span class="token comment"># 执行打包命令</span>
        
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages <span class="token comment"># 将 gh-pages 分支代码</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist <span class="token comment"># 将打包结果发布到 github page</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token comment"># 在仓库的 setting 里可以设置一些私密信息</span>
</code></pre></div>`,5),m=n("code",null,"uses: actions/checkout@v3",-1),d={href:"https://github.com/actions",target:"_blank",rel:"noopener noreferrer"},b=p(`<h2 id="github-packages" tabindex="-1"><a class="header-anchor" href="#github-packages" aria-hidden="true">#</a> github packages</h2><p>首先明确 npm registry 的概念，npm、yarn、pnpm 等包管理工具下载 npm 包，默认 registry 都是 npm 官方提供的仓库，github 也提供了类似的仓库。此外还有其他镜像库，它们都是 npm registry。</p><ul><li>npm 官方仓库： https://registry.npmjs.org</li><li>github package 仓库：https://npm.pkg.github.com</li><li>其他 npm 仓库镜像：https://registry.npmmirror.com</li></ul><p>当然，无论是什么仓库，我们发布的都是 npm 包 ( 用 package.json 描述 )。</p><p>以下是发布 npm 包到 github package 的工作流设置。</p><div class="language-yaml" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> publish github packages

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>created<span class="token punctuation">]</span> <span class="token comment"># 发布 release 时执行工作流</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span> <span class="token comment"># 可手动执行</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">publish-gpkg</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">16</span>
          <span class="token comment"># 设置 registry 为 github reigistry</span>
          <span class="token comment"># 发布到 npm registry 则设置为 https://registry.npmjs.org/</span>
          <span class="token key atrule">registry-url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//npm.pkg.github.com
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm publish
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NODE_AUTH_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.GITHUB_TOKEN<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre></div><p>值得注意的是 git tag 和 github release 的区别。</p><p>tag 是 git 的概念，github 理所当然的也有 tag；但 release 是 github 提出的概念，主要是方便用户发布版本，版本中通常有 changelog 等信息，<strong>发布一个 release 需要指定一个 tag</strong>。</p><h2 id="github-as-picbed" tabindex="-1"><a class="header-anchor" href="#github-as-picbed" aria-hidden="true">#</a> github as picbed</h2><p>一个 github repository 除了可以存放代码之外，还可以专门用来存储图片。</p><p>创建名为 pic-bed ( 名称任意 ) 的 repository，提交 photo.png 到 master 分支，然后可以通过以下地址访问到该图片。</p><div class="language-text" data-ext="text"><pre class="language-text"><code>https://raw.githubusercontent.com/yamsfeer/pic-bed/master/photo.png
</code></pre></div>`,12);function y(_,v){const a=o("ExternalLinkIcon");return c(),u("div",null,[i,k,r,n("p",null,[n("a",h,[s("github docs"),t(a)]),s(" 中对这些功能都有详细介绍。")]),g,n("p",null,[s("工作流设置中经常见到类似 "),m,s(" 的设置，这是官方提供的预设，它们都存放在 "),n("a",d,[s("github 官方账号"),t(a)]),s("中。")]),b])}const N=e(l,[["render",y],["__file","github.html.vue"]]);export{N as default};
