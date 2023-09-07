import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as s,e}from"./app-706bfe03.js";const p={},t=e(`<h1 id="webp" tabindex="-1"><a class="header-anchor" href="#webp" aria-hidden="true">#</a> WebP</h1><p>WebP 是 google 开发的一种旨在取代 JPEG 的有损图像格式。</p><p>同等质量下，WebP 比 JPEG 文件更小。后来引入了无损压缩、Alpha 通道和动画等。</p><p>WebP 的有损压缩是基于 VP8 视频编解码器中压缩视频关键帧的算法的。</p><p>与 JPEG 类似，WebP 以块为单位进行操作，并且也有亮度和色度的划分。WebP 的 luma 块是 16x16，chroma 块是 8x8，这些宏块被进一步细分为 4x4 的子块。</p><p>WebP 与 JPEG 的根本不同之处在于两个特点：块预测和自适应块量化。</p><h2 id="块预测" tabindex="-1"><a class="header-anchor" href="#块预测" aria-hidden="true">#</a> 块预测</h2><p>块预测：每个色度和亮度块的内容是根据其周围区块来预测的，具体来说是当前块的上方和左方块。</p><p>用简单的语言来说：如果当前块上方有蓝色，左侧有蓝色，就假设这个块是蓝色。</p><p>事实上，PNG 和 JPEG 在某种程度上也做了这种预测。WebP的独特之处在于，它对周围块进行采样，然后通过不同的预测模式来填充当前区块，将每种模式的结果与真实图像比较，选择最接近的预测模式。</p><img src="https://web-dev.imgix.net/image/cGQxYFGJrUUaUZyWhyt9yo5gHhs1/t8neUw7UOsUNTF3uxe08.png?auto=format" alt="A diagram of WebP’s various block prediction methods." style="zoom:67%;"><p>预测不会完全正确，所以块的预测值和实际值之间的差异会被编码在文件中。</p><p>对图像进行解码时，渲染引擎使用相同的数据，相同的预测逻辑，导致每个块的预测值相同。预测值和文件中编码的预期图像之间的差异，然后应用在预测值上。</p><p>假设我们有一份真实图像数据。</p><div class="language-text" data-ext="text"><pre class="language-text"><code>111151111
122456389
</code></pre></div><p>使用块预测编码后的内容为：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>111111111
123456789
</code></pre></div><p>预测的数据和实际数据很接近。当然，不是完全吻合，实际数据有几个块与预测值不同。</p><p>因此，我们发送的编码还包括任何与预测值不同的块的差异值：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>_ _ _ _ +4 _ _ _ _
_ _ -1 _ _ _ -4 _ _
</code></pre></div><p>整个过程大概如下：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>111111111
123456789
    +
_ _ _ _ +4 _ _ _ _
_ _ -1 _ _ _ -4 _ _
    =
111151111
122456389 
</code></pre></div><p>最终，我们只需要把预测模型和差值传输就可以了。</p><h2 id="自适应块量化" tabindex="-1"><a class="header-anchor" href="#自适应块量化" aria-hidden="true">#</a> 自适应块量化</h2><p>JPEG压缩是一个全面的操作，对图像中的每一个块都应用相同的量化水平。</p><p>在实践中，这意味着我们的JPEG压缩设置不是由高频细节决定的，在那里JPEG压缩是最出色的，而是由我们图像中最有可能出现压缩伪影的部分决定的。</p><p>为了避免这种情况，WebP采取了一种自适应的量化方法：一幅图像被分成最多四个视觉上相似的片段，这些片段的压缩参数被单独调整。用WebP进行同样的大面积压缩：</p><p>这两个图像文件的大小是差不多的。</p><h2 id="使用-webp" tabindex="-1"><a class="header-anchor" href="#使用-webp" aria-hidden="true">#</a> 使用 WebP</h2><p>WebP 也可以用 0~100 的数值表示图像质量。google 提供了 cwebp、Squoosh 等 webp 相关工具。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ cwebp <span class="token parameter variable">-q</span> <span class="token number">80</span> butterfly.jpg <span class="token parameter variable">-o</span> butterfly.webp

Saving <span class="token function">file</span> <span class="token string">&#39;butterfly.webp&#39;</span>
File:  	butterfly.jpg
Dimension: <span class="token number">1676</span> x <span class="token number">1418</span>
Output:	<span class="token number">208418</span> bytes Y-U-V-All-PSNR <span class="token number">41.00</span> <span class="token number">43.99</span> <span class="token number">44.95</span>   <span class="token number">41.87</span> dB
       	<span class="token punctuation">(</span><span class="token number">0.70</span> bpp<span class="token punctuation">)</span>
block count:    intra4:     <span class="token number">7644</span>  <span class="token punctuation">(</span><span class="token number">81.80</span>%<span class="token punctuation">)</span>
          	   Intra16:     <span class="token number">1701</span>  <span class="token punctuation">(</span><span class="token number">18.20</span>%<span class="token punctuation">)</span>
          	   Skipped:       <span class="token number">63</span>  <span class="token punctuation">(</span><span class="token number">0.67</span>%<span class="token punctuation">)</span>
bytes used:  header:            <span class="token number">249</span>  <span class="token punctuation">(</span><span class="token number">0.1</span>%<span class="token punctuation">)</span>
         	  mode-partition:  <span class="token number">36885</span>  <span class="token punctuation">(</span><span class="token number">17.7</span>%<span class="token punctuation">)</span>
Residuals bytes  <span class="token operator">|</span>segment <span class="token number">1</span><span class="token operator">|</span>segment <span class="token number">2</span><span class="token operator">|</span>segment <span class="token number">3</span><span class="token operator">|</span>segment <span class="token number">4</span><span class="token operator">|</span>  total
macroblocks:     <span class="token operator">|</span>       <span class="token number">8</span>%<span class="token operator">|</span>      <span class="token number">22</span>%<span class="token operator">|</span>      <span class="token number">26</span>%<span class="token operator">|</span>      <span class="token number">44</span>%<span class="token operator">|</span>   <span class="token number">9345</span>
quantizer:       <span class="token operator">|</span>      <span class="token number">27</span> <span class="token operator">|</span>      <span class="token number">25</span> <span class="token operator">|</span>      <span class="token number">21</span> <span class="token operator">|</span>      <span class="token number">13</span> <span class="token operator">|</span>
filter level:    <span class="token operator">|</span>       <span class="token number">8</span> <span class="token operator">|</span>       <span class="token number">6</span> <span class="token operator">|</span>      <span class="token number">19</span> <span class="token operator">|</span>      <span class="token number">16</span> <span class="token operator">|</span>
</code></pre></div>`,31),o=[t];function r(c,l){return n(),s("div",null,o)}const k=a(p,[["render",r],["__file","WebP.html.vue"]]);export{k as default};
