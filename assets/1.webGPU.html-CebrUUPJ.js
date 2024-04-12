import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as i,c as s,a as e,d as r,e as n,b as d}from"./app-BzW9chhs.js";const p={},h=d('<h1 id="webgpu" tabindex="-1"><a class="header-anchor" href="#webgpu"><span>webgpu</span></a></h1><h2 id="架构" tabindex="-1"><a class="header-anchor" href="#架构"><span>架构</span></a></h2><h3 id="adapter" tabindex="-1"><a class="header-anchor" href="#adapter"><span>adapter</span></a></h3><h3 id="device" tabindex="-1"><a class="header-anchor" href="#device"><span>device</span></a></h3><h3 id="buffer" tabindex="-1"><a class="header-anchor" href="#buffer"><span>buffer</span></a></h3><h2 id="shader" tabindex="-1"><a class="header-anchor" href="#shader"><span>shader</span></a></h2><p>浏览器将把你的 WGSL 编译成底层系统期望的东西。这可能是 DirectX 12 的 HLSL，Metal 的 MSL 和 Vulkan 的 SPIR-V。</p><h3 id="vertex-shader" tabindex="-1"><a class="header-anchor" href="#vertex-shader"><span>vertex shader</span></a></h3><h3 id="fragment-shader" tabindex="-1"><a class="header-anchor" href="#fragment-shader"><span>fragment shader</span></a></h3><h3 id="compute-shader" tabindex="-1"><a class="header-anchor" href="#compute-shader"><span>compute shader</span></a></h3><p>浏览器将把你的 WGSL 编译成底层系统期望的东西。这可能是 DirectX 12 的 HLSL，Metal 的 MSL 和 Vulkan 的 SPIR-V。</p><h2 id="pipeline" tabindex="-1"><a class="header-anchor" href="#pipeline"><span>pipeline</span></a></h2><h3 id="render-pipeline" tabindex="-1"><a class="header-anchor" href="#render-pipeline"><span>render pipeline</span></a></h3><ul><li>vertex stage</li><li>fragment stage</li></ul><h3 id="computed-pipeline" tabindex="-1"><a class="header-anchor" href="#computed-pipeline"><span>computed pipeline</span></a></h3><ul><li>compute stage</li></ul><h3 id="光线追踪-pipeline" tabindex="-1"><a class="header-anchor" href="#光线追踪-pipeline"><span>光线追踪 pipeline</span></a></h3><h2 id="commandencoder" tabindex="-1"><a class="header-anchor" href="#commandencoder"><span>commandEncoder</span></a></h2><h3 id="command-buffer" tabindex="-1"><a class="header-anchor" href="#command-buffer"><span>command buffer</span></a></h3><h3 id="render-pass-渲染通道" tabindex="-1"><a class="header-anchor" href="#render-pass-渲染通道"><span>render pass 渲染通道</span></a></h3><h3 id="compute-pass-计算通道" tabindex="-1"><a class="header-anchor" href="#compute-pass-计算通道"><span>compute pass 计算通道</span></a></h3><h2 id="draw" tabindex="-1"><a class="header-anchor" href="#draw"><span>draw</span></a></h2><p>点，线，三角形 -&gt; texture</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>',24),c={href:"https://webgpufundamentals.org/webgpu/lessons/zh_cn/",target:"_blank",rel:"noopener noreferrer"},o={href:"https://www.cnblogs.com/onsummer/p/webgpu-core-concept-and-main-mechanism.html",target:"_blank",rel:"noopener noreferrer"};function m(u,f){const a=l("ExternalLinkIcon");return i(),s("div",null,[h,e("p",null,[e("a",c,[r("WebGPU 理论基础"),n(a)])]),e("p",null,[e("a",o,[r("WebGPU 导入[2] - 核心概念与重要机制解读 "),n(a)])])])}const v=t(p,[["render",m],["__file","1.webGPU.html.vue"]]),x=JSON.parse('{"path":"/%E5%9B%BE%E5%BD%A2%E5%AD%A6/webGPU/1.webGPU.html","title":"webgpu","lang":"zh-CN","frontmatter":{"description":"webgpu 架构 adapter device buffer shader 浏览器将把你的 WGSL 编译成底层系统期望的东西。这可能是 DirectX 12 的 HLSL，Metal 的 MSL 和 Vulkan 的 SPIR-V。 vertex shader fragment shader compute shader 浏览器将把你的 WGSL ...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E5%9B%BE%E5%BD%A2%E5%AD%A6/webGPU/1.webGPU.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"webgpu"}],["meta",{"property":"og:description","content":"webgpu 架构 adapter device buffer shader 浏览器将把你的 WGSL 编译成底层系统期望的东西。这可能是 DirectX 12 的 HLSL，Metal 的 MSL 和 Vulkan 的 SPIR-V。 vertex shader fragment shader compute shader 浏览器将把你的 WGSL ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"webgpu\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"架构","slug":"架构","link":"#架构","children":[{"level":3,"title":"adapter","slug":"adapter","link":"#adapter","children":[]},{"level":3,"title":"device","slug":"device","link":"#device","children":[]},{"level":3,"title":"buffer","slug":"buffer","link":"#buffer","children":[]}]},{"level":2,"title":"shader","slug":"shader","link":"#shader","children":[{"level":3,"title":"vertex shader","slug":"vertex-shader","link":"#vertex-shader","children":[]},{"level":3,"title":"fragment shader","slug":"fragment-shader","link":"#fragment-shader","children":[]},{"level":3,"title":"compute shader","slug":"compute-shader","link":"#compute-shader","children":[]}]},{"level":2,"title":"pipeline","slug":"pipeline","link":"#pipeline","children":[{"level":3,"title":"render pipeline","slug":"render-pipeline","link":"#render-pipeline","children":[]},{"level":3,"title":"computed pipeline","slug":"computed-pipeline","link":"#computed-pipeline","children":[]},{"level":3,"title":"光线追踪 pipeline","slug":"光线追踪-pipeline","link":"#光线追踪-pipeline","children":[]}]},{"level":2,"title":"commandEncoder","slug":"commandencoder","link":"#commandencoder","children":[{"level":3,"title":"command buffer","slug":"command-buffer","link":"#command-buffer","children":[]},{"level":3,"title":"render pass 渲染通道","slug":"render-pass-渲染通道","link":"#render-pass-渲染通道","children":[]},{"level":3,"title":"compute pass 计算通道","slug":"compute-pass-计算通道","link":"#compute-pass-计算通道","children":[]}]},{"level":2,"title":"draw","slug":"draw","link":"#draw","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.51,"words":154},"filePathRelative":"图形学/webGPU/1.webGPU.md","localizedDate":"2024年4月12日","autoDesc":true}');export{v as comp,x as data};
