import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as t,b as i}from"./app-BzW9chhs.js";const r={},s=i('<h1 id="图形渲染管线-graphics-pipeline" tabindex="-1"><a class="header-anchor" href="#图形渲染管线-graphics-pipeline"><span>图形渲染管线 ( Graphics Pipeline )</span></a></h1><p>图形渲染管线是指一系列操作，它们将空间中的顶点描述的模型转换成二维平面中的图像。</p><p>总的来说，图形渲染管线主要有三步：顶点操作 ( 模型变换 )、光栅化、着色。</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h3qoob0wi2j210q0ok41o.jpg" alt="image-20220630232010469" style="zoom:50%;max-width:1100px;"><p>上图就是图形渲染管线的过程。三维空间中的顶点经空间变换后投影到屏幕空间，然后将顶点连成的三角形进行光栅化，然后对光栅化得到的像素点进行着色。</p><p>以上这些算法操作都已经在硬件层面写好，由显卡中的 GPU 执行。</p><p><em>( 图形管线可以有不同的分法，不一定是上图表示的 5 步，但整体流程是一样的 )</em></p><h2 id="顶点处理" tabindex="-1"><a class="header-anchor" href="#顶点处理"><span>顶点处理</span></a></h2><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h3qoocg12hj211g0mstal.jpg" alt="image-20220630232102496" style="zoom:50%;max-width:1100px;"><p>顶点处理是指对所有顶点进行 MVP 变换，最终得到投影到二维平面的坐标信息。超出观察空间的内容会被剪裁掉。</p><p>在一开始定义顶点时，也会定义哪些顶点构成三角形，第二步的三角形处理就是将这些顶点按定义连成三角形交给光栅化处理。</p><h2 id="光栅化" tabindex="-1"><a class="header-anchor" href="#光栅化"><span>光栅化</span></a></h2><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h3qoobm4nrj20za0mimzv.jpg" alt="image-20220630232146945" style="zoom:50%;max-width:1100px;"><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h3qoo8evp5j20z60mowgk.jpg" alt="image-20220630232218715" style="zoom:50%;max-width:1100px;"><h2 id="着色" tabindex="-1"><a class="header-anchor" href="#着色"><span>着色</span></a></h2><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h3qooams3nj20y60mugns.jpg" alt="image-20220630232248540" style="zoom:50%;max-width:1100px;"><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h3qoo9obb0j20zw0mmjul.jpg" alt="image-20220630232343311" style="zoom:50%;max-width:1100px;"><h2 id="可编程渲染管线" tabindex="-1"><a class="header-anchor" href="#可编程渲染管线"><span>可编程渲染管线</span></a></h2><h3 id="shader-program" tabindex="-1"><a class="header-anchor" href="#shader-program"><span>shader program</span></a></h3>',19),m=[s];function o(p,c){return a(),t("div",null,m)}const l=e(r,[["render",o],["__file","3.4图形渲染管线.html.vue"]]),d=JSON.parse('{"path":"/%E5%9B%BE%E5%BD%A2%E5%AD%A6/games101/3.4%E5%9B%BE%E5%BD%A2%E6%B8%B2%E6%9F%93%E7%AE%A1%E7%BA%BF.html","title":"图形渲染管线 ( Graphics Pipeline )","lang":"zh-CN","frontmatter":{"description":"图形渲染管线 ( Graphics Pipeline ) 图形渲染管线是指一系列操作，它们将空间中的顶点描述的模型转换成二维平面中的图像。 总的来说，图形渲染管线主要有三步：顶点操作 ( 模型变换 )、光栅化、着色。 image-20220630232010469 上图就是图形渲染管线的过程。三维空间中的顶点经空间变换后投影到屏幕空间，然后将顶点连成的...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E5%9B%BE%E5%BD%A2%E5%AD%A6/games101/3.4%E5%9B%BE%E5%BD%A2%E6%B8%B2%E6%9F%93%E7%AE%A1%E7%BA%BF.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"图形渲染管线 ( Graphics Pipeline )"}],["meta",{"property":"og:description","content":"图形渲染管线 ( Graphics Pipeline ) 图形渲染管线是指一系列操作，它们将空间中的顶点描述的模型转换成二维平面中的图像。 总的来说，图形渲染管线主要有三步：顶点操作 ( 模型变换 )、光栅化、着色。 image-20220630232010469 上图就是图形渲染管线的过程。三维空间中的顶点经空间变换后投影到屏幕空间，然后将顶点连成的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"图形渲染管线 ( Graphics Pipeline )\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"顶点处理","slug":"顶点处理","link":"#顶点处理","children":[]},{"level":2,"title":"光栅化","slug":"光栅化","link":"#光栅化","children":[]},{"level":2,"title":"着色","slug":"着色","link":"#着色","children":[]},{"level":2,"title":"可编程渲染管线","slug":"可编程渲染管线","link":"#可编程渲染管线","children":[{"level":3,"title":"shader program","slug":"shader-program","link":"#shader-program","children":[]}]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.41,"words":423},"filePathRelative":"图形学/games101/3.4图形渲染管线.md","localizedDate":"2024年4月12日","autoDesc":true}');export{l as comp,d as data};
