import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c as o,a,b as e,d as c,e as p}from"./app-706bfe03.js";const l={},d=p(`<h1 id="博客问题汇总" tabindex="-1"><a class="header-anchor" href="#博客问题汇总" aria-hidden="true">#</a> 博客问题汇总</h1><h2 id="打包内存不足" tabindex="-1"><a class="header-anchor" href="#打包内存不足" aria-hidden="true">#</a> 打包内存不足</h2><p>markdown 文件多了以后，除了打包时间加长以外，还会有内存不足的问题。</p><div class="language-text" data-ext="text"><pre class="language-text"><code> Compiling with vite
&lt;--- Last few GCs ---&gt;

[12287:0x7fc62092b000] 60958 ms: Scavenge 2010.3 (2082.5) -&gt; 2005.5 (2084.0) MB, 7.4 / 0.0 ms (average mu = 0.807, current mu = 0.719) allocation failure;
...

&lt;--- JS stacktrace ---&gt;

FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
...
</code></pre></div><p>这是因为 node 对内存的使用的默认上限为 1.7G，文件过多而内存不足时打包失败。解决办法就是手动提高上限。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">node</span> --max-old-space-size<span class="token operator">=</span><span class="token number">4096</span> build.js
</code></pre></div><p>或者直接修改环境变量。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">NODE_OPTIONS</span><span class="token operator">=</span>--max_old_space_size<span class="token operator">=</span><span class="token number">4096</span>
</code></pre></div><p>如果使用 github 工作流，修改方法如下：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>name: Build project
env:
  NODE_OPTIONS: --max_old_space_size=4096
run: npm run build
</code></pre></div><h2 id="图床" tabindex="-1"><a class="header-anchor" href="#图床" aria-hidden="true">#</a> 图床</h2><p>原来使用新浪微博作为图床，上传和访问图片都很方便，但微博开启防盗链后，线上图片全部 403。</p><p>要想绕过防盗链也相对容易，只需在 http 请求头加入</p><div class="language-http" data-ext="http"><pre class="language-http"><code><span class="token header"><span class="token header-name keyword">referrer</span><span class="token punctuation">:</span> <span class="token header-value">noreferrer</span></span>
</code></pre></div><p>但这只是暂时解决，要想保护图片的安全，最好是自己搭建图床。</p><p>七牛云提供免费的 10G 对象存储空间，足够存放博客的图片，但要想公网访问，需要绑定域名，而购买使用域名需要备案，备案又需要提供一个 ECS 的 IP 地址。</p>`,16),i={href:"https://github.com/yamsfeer/update-pic-bed",target:"_blank",rel:"noopener noreferrer"};function h(u,_){const n=t("ExternalLinkIcon");return r(),o("div",null,[d,a("p",null,[e("综上，由于种种原因，目前我暂时使用 github 仓库作为图床，七牛云做图片备份。另外，我写了一个"),a("a",i,[e("脚本"),c(n)]),e("，提取文章中的图片地址并下载，然后自动上传到 github 仓库和云对象存储。")])])}const x=s(l,[["render",h],["__file","博客问题汇总.html.vue"]]);export{x as default};
