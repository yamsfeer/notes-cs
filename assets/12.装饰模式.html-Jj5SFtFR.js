import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,b as t}from"./app-BzW9chhs.js";const p={},o=t(`<h1 id="装饰模式" tabindex="-1"><a class="header-anchor" href="#装饰模式"><span>装饰模式</span></a></h1><p>在不改变对象自身的基础上，给对象动态地添加职责，称为装饰者 ( decorator ) 模式。</p><p>在 JavaScript 中，为对象动态添加属性很简单，直接修改对象或继承另一个对象。函数也是对象，为函数动态添加职责是装饰模式的主要目的。</p><p>以 window.onload 事件为例，在不改变原来的回调函数的情况下，可以用一个新函数包裹回调函数，从而添加新功能。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> loadHandler <span class="token operator">=</span> window<span class="token punctuation">.</span>onload <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 旧回调函数</span>
window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">loadHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 直接调用，上下文仍是 window</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;新功能&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这段代码是符合开放封闭原则的，增加新功能的同时并没有修改原来的 window.onload 代码，但是存在以下两个问题：</p><ul><li><p>需要维护中间变量 loadHandler，如果函数的装饰链较长，或需要装饰的函数变多，中间变量的数量也会越来越多</p></li><li><p>this 被劫持，虽然 loadHandler 正常执行，在其他例子中是需要重新绑定上下文的。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> _getById <span class="token operator">=</span> document<span class="token punctuation">.</span>getElementById
document<span class="token punctuation">.</span><span class="token function-variable function">getElementById</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;新功能&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token function">_getId</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>document<span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></li></ul><p>用函数包裹被装饰函数的方式不太方便，语义上也不是特别清晰。</p><h2 id="aop-装饰函数" tabindex="-1"><a class="header-anchor" href="#aop-装饰函数"><span>AOP 装饰函数</span></a></h2><p>用面向切面 ( AOP ) 实现装饰函数大概如下，值得需要注意的是函数执行时的上下文。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">before</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">beforeFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">beforeFn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span> <span class="token comment">// this 是最未经装饰的函数</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">after</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">afterFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token function">afterFn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">return</span> ret
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>有了 before 和 after 这两个函数，实现函数装饰就比较简洁了。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span>onload <span class="token operator">=</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>onload <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token comment">// ...</span>
</code></pre></div><p>如果不希望对 Function.prototype 挂载函数，可以用函数代替。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">.</span> beforeFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">beforeFn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">before</span><span class="token punctuation">(</span>
  <span class="token function">before</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre></div><h2 id="装饰模式的例子" tabindex="-1"><a class="header-anchor" href="#装饰模式的例子"><span>装饰模式的例子</span></a></h2><h3 id="数据统计上报" tabindex="-1"><a class="header-anchor" href="#数据统计上报"><span>数据统计上报</span></a></h3><p>分离业务代码和数据统计代码，无论在什么语言中，都是 AOP 的经典应用之一。</p><p>现页面中有个登录 button，点击按钮会弹出登录框，同时上报一次点击。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">showLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  dialog<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">report</span><span class="token punctuation">(</span><span class="token string">&#39;点击登录按钮&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
btn<span class="token punctuation">.</span>onclick <span class="token operator">=</span> showLogin
</code></pre></div><p>这两件事被耦合在一个函数中，用 AOP 实现如下：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">showLogin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  dialog<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
btn<span class="token punctuation">.</span>onclick <span class="token operator">=</span> showLogin<span class="token punctuation">.</span><span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">report</span><span class="token punctuation">(</span><span class="token string">&#39;点击登录按钮&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="动态改变函数的参数" tabindex="-1"><a class="header-anchor" href="#动态改变函数的参数"><span>动态改变函数的参数</span></a></h3><p>观察 before 函数的代码，可以发现在执行原始函数前，我们可以对 args 做些处理。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">before</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">beforeFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// 装饰与被装饰函数共用一个 args</span>
    <span class="token function">beforeFn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>现有一个全局共用 ajax 请求函数，防止 CSRF 攻击，我们在在其参数中添加一个 token 参数。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">ajax</span><span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  param<span class="token punctuation">.</span>token <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Token</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> param<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>然而，并不是所有的请求都需要加上 token，这里的改动影响了所有的请求。</p><p>用 AOP 处理如下。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> myAjax <span class="token operator">=</span> ajax<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">url<span class="token punctuation">,</span> param</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> param<span class="token punctuation">.</span>token <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Token</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token function">myAjax</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> param<span class="token punctuation">)</span>
</code></pre></div><p>可以看到，用 AOP 的方式给 ajax 函数动态装饰上 token 参数，保证了 ajax 函数相对纯净，提高了可复用性。</p><h3 id="插件式表单验证" tabindex="-1"><a class="header-anchor" href="#插件式表单验证"><span>插件式表单验证</span></a></h3><p>传统的表单提交函数大概是这样的。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>username <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>password <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  
  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://xxx.com&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
btn<span class="token punctuation">.</span>onclick <span class="token operator">=</span> submit
</code></pre></div><p>这里的 submit 函数承担了两个职责：表单验证、ajax 提交。这种代码不仅会造成函数臃肿，职责混乱，且无法复用。我们需要分离这两部分职责。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>username <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>password <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://xxx.com&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>现在姑且分开了，但 submit 函数仍要调用 validate 函数，不够纯粹。</p><p>用 AOP 实现如下。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">before</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">beforefn</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">beforefn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token comment">// beforefn 返回 false 则不再执行原函数</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code>btn<span class="token punctuation">.</span>onclick <span class="token operator">=</span> submit<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span>validate<span class="token punctuation">)</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>在 JavaScript 中用 AOP 实现装饰模式是非常方便的。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">before</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">beforeFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">beforeFn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">after</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">afterFn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> ret <span class="token operator">=</span> <span class="token function">afterFn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token keyword">return</span> ret
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,45),e=[o];function c(u,l){return a(),s("div",null,e)}const r=n(p,[["render",c],["__file","12.装饰模式.html.vue"]]),d=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/12.%E8%A3%85%E9%A5%B0%E6%A8%A1%E5%BC%8F.html","title":"装饰模式","lang":"zh-CN","frontmatter":{"description":"装饰模式 在不改变对象自身的基础上，给对象动态地添加职责，称为装饰者 ( decorator ) 模式。 在 JavaScript 中，为对象动态添加属性很简单，直接修改对象或继承另一个对象。函数也是对象，为函数动态添加职责是装饰模式的主要目的。 以 window.onload 事件为例，在不改变原来的回调函数的情况下，可以用一个新函数包裹回调函数，从...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/12.%E8%A3%85%E9%A5%B0%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"装饰模式"}],["meta",{"property":"og:description","content":"装饰模式 在不改变对象自身的基础上，给对象动态地添加职责，称为装饰者 ( decorator ) 模式。 在 JavaScript 中，为对象动态添加属性很简单，直接修改对象或继承另一个对象。函数也是对象，为函数动态添加职责是装饰模式的主要目的。 以 window.onload 事件为例，在不改变原来的回调函数的情况下，可以用一个新函数包裹回调函数，从..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"装饰模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"AOP 装饰函数","slug":"aop-装饰函数","link":"#aop-装饰函数","children":[]},{"level":2,"title":"装饰模式的例子","slug":"装饰模式的例子","link":"#装饰模式的例子","children":[{"level":3,"title":"数据统计上报","slug":"数据统计上报","link":"#数据统计上报","children":[]},{"level":3,"title":"动态改变函数的参数","slug":"动态改变函数的参数","link":"#动态改变函数的参数","children":[]},{"level":3,"title":"插件式表单验证","slug":"插件式表单验证","link":"#插件式表单验证","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":3.34,"words":1002},"filePathRelative":"编程/设计模式/12.装饰模式.md","localizedDate":"2024年4月12日","autoDesc":true}');export{r as comp,d as data};
