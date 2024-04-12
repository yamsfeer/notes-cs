import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as a,c as l,a as t,d as e,e as r,b as i}from"./app-BzW9chhs.js";const g={},p=t("h1",{id:"乔姆斯基文法体系",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#乔姆斯基文法体系"},[t("span",null,"乔姆斯基文法体系")])],-1),c=t("strong",null,"乔姆斯基文法体系",-1),d={href:"https://zh.wikipedia.org/wiki/%E5%BD%A2%E5%BC%8F%E6%96%87%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},m=i('<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsytlqe202j309a052t8t.jpg" alt=""></p><p>它包括四个层次：</p><ul><li><p>0-型文法（无限制文法或短语结构文法）<strong>包括所有的文法</strong></p><p><strong>该类型文法能够产生所有可被图灵机识别的语言</strong>。</p><p>可被图灵机识别的语言是指能够<strong>使图灵机停机</strong>的字符串，这类语言又被称为<strong>递归可枚举语言</strong>。</p><p>注意递归可枚举语言与递归语言的区别，后者是前者的一个真子集，是能够被一个总停机的图灵机判定的语言。</p></li><li><p>1-型文法（<strong>上下文相关文法</strong>）生成<strong>上下文相关语言</strong></p><p>产生式规则取如 α<em>A</em>β -&gt; αγβ 一样的形式。<em>A</em> 是非终结符号，而 α, β 和 γ 是包含非终结符号与终结符号的字符串；α, β 可以是空串，但 γ 必须不能是空串；这种文法也可以包含规则 S-&gt;ε ，但此时文法的任何产生式规则都不能在右侧包含 S 。</p><p>这种文法规定的语言可以被<strong>线性有界非确定图灵机</strong>接受。</p></li><li><p>2-型文法（<strong>上下文无关文法</strong>）生成<strong>上下文无关语言</strong></p><p>产生式规则取如 <em>A</em> -&gt; γ 一样的形式。<em>A</em> 是非终结符号，γ 是包含非终结符号与终结符号的字符串。</p><p>这种文法规定的语言可以被<strong>非确定下推自动机</strong>接受。</p><p><strong>上下文无关语言为大多数程序设计语言的语法提供了理论基础</strong>。</p></li><li><p>3-型文法（正规文法）生成<strong>正则语言</strong></p><p>产生式的左侧只能包含一个非终结符号，产生式的右侧只能是空串、一个终结符号或者一个终结符号后随一个非终结符号；如果所有产生式的右侧都不含初始符号 S ，规则 S -&gt; ε 也允许出现。</p><p>这种文法规定的语言可以被<strong>有限状态自动机</strong>接受，也可以通过<strong>正则表达式</strong>来获得。</p><p><strong>正则语言通常用来定义检索模式或者程序设计语言中的词法结构。</strong></p></li></ul><p>下表总结了上述四种类型的文法的主要特点：</p><table><thead><tr><th style="text-align:center;">文法</th><th style="text-align:center;">语言</th><th style="text-align:center;">自动机</th><th style="text-align:center;">产生式规则</th><th style="text-align:center;">使用场景</th></tr></thead><tbody><tr><td style="text-align:center;">0-型（无限制文法）</td><td style="text-align:center;">递归可枚举语言</td><td style="text-align:center;">图灵机</td><td style="text-align:center;">α -&gt; β（无限制）</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">1-型（上下文相关文法）</td><td style="text-align:center;">上下文相关语言</td><td style="text-align:center;">线性有界非确定图灵机</td><td style="text-align:center;">α<em>A</em>β -&gt; αγβ</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">2-型（上下文无关文法）</td><td style="text-align:center;">上下文无关语言</td><td style="text-align:center;">非确定下推自动机</td><td style="text-align:center;"><em>A</em> -&gt; γ</td><td style="text-align:center;">描述语法结构</td></tr><tr><td style="text-align:center;">3-型（正规文法）</td><td style="text-align:center;">正则语言</td><td style="text-align:center;">有限状态自动机</td><td style="text-align:center;"><em>A</em> -&gt; <em>aB</em> <em>A</em> -&gt; <em>a</em></td><td style="text-align:center;">描述词法结构</td></tr></tbody></table><p>从3-型文法到0-型文法，内层文法是外层文法的<strong>真子集</strong>，且表达能力强越来越强。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>',7),E={href:"https://zh.wikipedia.org/wiki/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E8%B0%B1%E7%B3%BB",target:"_blank",rel:"noopener noreferrer"};function h(y,A){const n=o("ExternalLinkIcon");return a(),l("div",null,[p,t("p",null,[c,e("是计算机科学中刻画"),t("a",d,[e("形式文法"),r(n)]),e("表达能力的一个分类谱系，是由语言学家诺姆·乔姆斯基于1956年提出的。")]),m,t("p",null,[t("a",E,[e("乔姆斯基谱系"),r(n)])])])}const B=s(g,[["render",h],["__file","乔姆斯基文法体系.html.vue"]]),u=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E6%96%87%E6%B3%95%E4%BD%93%E7%B3%BB.html","title":"乔姆斯基文法体系","lang":"zh-CN","frontmatter":{"description":"乔姆斯基文法体系 乔姆斯基文法体系是计算机科学中刻画形式文法表达能力的一个分类谱系，是由语言学家诺姆·乔姆斯基于1956年提出的。 它包括四个层次： 0-型文法（无限制文法或短语结构文法）包括所有的文法 该类型文法能够产生所有可被图灵机识别的语言。 可被图灵机识别的语言是指能够使图灵机停机的字符串，这类语言又被称为递归可枚举语言。 注意递归可枚举语言与...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6/%E4%B9%94%E5%A7%86%E6%96%AF%E5%9F%BA%E6%96%87%E6%B3%95%E4%BD%93%E7%B3%BB.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"乔姆斯基文法体系"}],["meta",{"property":"og:description","content":"乔姆斯基文法体系 乔姆斯基文法体系是计算机科学中刻画形式文法表达能力的一个分类谱系，是由语言学家诺姆·乔姆斯基于1956年提出的。 它包括四个层次： 0-型文法（无限制文法或短语结构文法）包括所有的文法 该类型文法能够产生所有可被图灵机识别的语言。 可被图灵机识别的语言是指能够使图灵机停机的字符串，这类语言又被称为递归可枚举语言。 注意递归可枚举语言与..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsytlqe202j309a052t8t.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"乔姆斯基文法体系\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsytlqe202j309a052t8t.jpg\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":2.64,"words":793},"filePathRelative":"计算机基础/计算机科学/乔姆斯基文法体系.md","localizedDate":"2024年4月12日","autoDesc":true}');export{B as comp,u as data};
