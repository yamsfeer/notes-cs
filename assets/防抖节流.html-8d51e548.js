import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-706bfe03.js";const p={},o=t(`<h1 id="防抖节流" tabindex="-1"><a class="header-anchor" href="#防抖节流" aria-hidden="true">#</a> 防抖节流</h1><h2 id="节流-throttle" tabindex="-1"><a class="header-anchor" href="#节流-throttle" aria-hidden="true">#</a> 节流 throttle</h2><p>节流是指：在一定时间间隔内，只执行一次，其余的调用忽略。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
<span class="token keyword">const</span> throttledFn <span class="token operator">=</span> <span class="token function">throttle</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;mousemove&#39;</span><span class="token punctuation">,</span> throttledFn<span class="token punctuation">)</span>
</code></pre></div><p>上面这段代码中，即使 mousemove 事件触发得再频繁，目标函数 <code>fn</code> 也只会每 300 毫秒执行一次。</p><p>函数节流适用于函数频繁调用的情况，例如 resize 、mousemove、上传进度等。</p><p>可以通过时间戳记录上一次的执行时间 prev，当函数调用时，对比 prev 和当前时间 now，如果大于等待时间，则执行函数，否则什么都不做。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> prev <span class="token operator">=</span> <span class="token number">0</span>
  
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> prev <span class="token operator">&gt;=</span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      prev <span class="token operator">=</span> now
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="防抖-debounce" tabindex="-1"><a class="header-anchor" href="#防抖-debounce" aria-hidden="true">#</a> 防抖 debounce</h2><p>防抖和节流差不多，区别在于，防抖在间隔时间内被调用，会重置计时。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
<span class="token keyword">const</span> debouncedFn <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span>

input<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> debouncedFn<span class="token punctuation">)</span>
</code></pre></div><p>上面这段代码，如果 input 事件的触发间隔不超过 300 毫秒，则目标函数 <code>fn</code> 不会被执行，直到超过 300 毫秒没有调用 <code>debouncedFn</code>。</p><p>防抖适用于等待用户操作的情况，input 输入框就是典型例子：输入内容期间不需要操作，直到输入完成后等待 300 毫秒。</p><p>我们可以通过定时器 timer 是否存在来判断。当 timer 存在时被调用，则清除上一个 timer，重新设置；如果不存在，则直接设置定时器。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
  
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token comment">// 清除上一个定时器</span>
    <span class="token punctuation">}</span>
    
    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// 设置定时器</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果想需要第一次触发回调事件就执行 fn，可以加上 <code>immediate</code> 参数。当 <code>immediate === true</code> 且 timer 不存在时，可以直接调用。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait<span class="token punctuation">,</span> immediate <span class="token operator">=</span> <span class="token boolean">true</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span>
  
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 只有第一次调用时 timer 为 null</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="合并防抖节流" tabindex="-1"><a class="header-anchor" href="#合并防抖节流" aria-hidden="true">#</a> 合并防抖节流</h2><p>对于防抖函数来说，如果用户操作非常频繁，不等延迟时间结束就进行下次操作，timer 会频繁的重置，导致 fn 一直没办法执行，表现为迟迟没有响应。</p><p>为此，需要实现：wait 时间内，可以重置定时器，但只要 wait 的时间到了，必须给用户一个响应。相当于结合 throttle 和 debounce。</p><p>实现：</p><ul><li><code>now - prev &lt; wait</code> 时，重置定时器，相当于把 debounce 代码放在了小于时间间隔部分</li><li><code>now - prev &gt;= wait</code> 时，执行一次，防止一直不执行</li></ul><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttleAndDebounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> wait</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> prev <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      timer <span class="token operator">=</span> <span class="token keyword">null</span>
  
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 间隔大于等待时间，执行一次，防止一直无响应</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> prev <span class="token operator">&gt;=</span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      prev <span class="token operator">=</span> now
      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 间隔小于等待时间，重置等待时间</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> prev <span class="token operator">&lt;</span> wait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span>
      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        prev <span class="token operator">=</span> now
        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> wait<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,23),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","防抖节流.html.vue"]]);export{r as default};
