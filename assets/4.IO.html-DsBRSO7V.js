import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as a,b as n}from"./app-BzW9chhs.js";const o={},s=n(`<h1 id="io" tabindex="-1"><a class="header-anchor" href="#io"><span>IO</span></a></h1><p>计算机操作外设，都是通过 CPU 往设备的控制器（显卡）中的寄存器中写入内容，设备会根据这些内容进行工作。</p><p>显卡工作完成后，向 CPU 发起一个中断，根据中断的类型，CPU 也会进行响应操作，比如将设备工作的结果写入内存。</p><p>由于各种设备的寄存器地址，内容格式等操作各不相同，为了方便操作，操作系统需要用一层文件视图，屏蔽底层细节。</p><div class="language-c" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token keyword">int</span> fd <span class="token operator">=</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token string">&quot;/dev/xxx&quot;</span><span class="token punctuation">)</span>
</code></pre></div><p>有了文件视图这一层，CPU 操作设备都会抽象成对文件的打开，关闭，和读写操作。</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>open,read,write,close
</code></pre></div><p>比如，printf 需要在屏幕显示文本，在操作系统的底层中，其实就是访问显示器设备对应的文件，这个文件中包含了控制器的地址，内容格式等信息。</p><h2 id="显示器" tabindex="-1"><a class="header-anchor" href="#显示器"><span>显示器</span></a></h2><h2 id="键盘" tabindex="-1"><a class="header-anchor" href="#键盘"><span>键盘</span></a></h2>`,10),r=[s];function c(p,i){return t(),a("div",null,r)}const m=e(o,[["render",c],["__file","4.IO.html.vue"]]),h=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/4.IO.html","title":"IO","lang":"zh-CN","frontmatter":{"description":"IO 计算机操作外设，都是通过 CPU 往设备的控制器（显卡）中的寄存器中写入内容，设备会根据这些内容进行工作。 显卡工作完成后，向 CPU 发起一个中断，根据中断的类型，CPU 也会进行响应操作，比如将设备工作的结果写入内存。 由于各种设备的寄存器地址，内容格式等操作各不相同，为了方便操作，操作系统需要用一层文件视图，屏蔽底层细节。 有了文件视图这一...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/4.IO.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"IO"}],["meta",{"property":"og:description","content":"IO 计算机操作外设，都是通过 CPU 往设备的控制器（显卡）中的寄存器中写入内容，设备会根据这些内容进行工作。 显卡工作完成后，向 CPU 发起一个中断，根据中断的类型，CPU 也会进行响应操作，比如将设备工作的结果写入内存。 由于各种设备的寄存器地址，内容格式等操作各不相同，为了方便操作，操作系统需要用一层文件视图，屏蔽底层细节。 有了文件视图这一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IO\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"显示器","slug":"显示器","link":"#显示器","children":[]},{"level":2,"title":"键盘","slug":"键盘","link":"#键盘","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.81,"words":242},"filePathRelative":"计算机基础/操作系统/4.IO.md","localizedDate":"2024年4月12日","autoDesc":true}');export{m as comp,h as data};
