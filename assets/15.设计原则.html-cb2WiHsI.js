import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,b as p}from"./app-BzW9chhs.js";const t={},o=p(`<h1 id="设计原则" tabindex="-1"><a class="header-anchor" href="#设计原则"><span>设计原则</span></a></h1><p>设计原则指的是单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则。可以说设计模式都是为了让代码符合其中一个或多个原则而出现的。</p><p>下面将介绍三种设计原则：单一职责原则、最少知识原则、开放封闭原则。</p><h2 id="单一职责原则-srp" tabindex="-1"><a class="header-anchor" href="#单一职责原则-srp"><span>单一职责原则 ( SRP )</span></a></h2><p>如果有两个动机去改写一个方法，这个方法就具有两个职责。一个方法承担了越多职责，将来需要改写这个方法的可能性就越大。因此，SRP 原则体现为：<strong>一个对象只做一件事情</strong>。</p><h3 id="设计模式中的-srp-原则" tabindex="-1"><a class="header-anchor" href="#设计模式中的-srp-原则"><span>设计模式中的 SRP 原则</span></a></h3><p>代理模式、迭代器模式、单例模式、装饰者模式都体现了 SRP 原则。</p><h4 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式"><span>代理模式</span></a></h4><p>代理模式中我们介绍了图片预加载的例子。</p><p>虚拟代理负责预加载图片的职责。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Avatar<span class="token punctuation">.</span><span class="token function">setSrc</span><span class="token punctuation">(</span>img<span class="token punctuation">.</span>src<span class="token punctuation">)</span>
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function">setSrc</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Avatar<span class="token punctuation">.</span><span class="token function">setSrc</span><span class="token punctuation">(</span><span class="token string">&#39;loading.gif&#39;</span><span class="token punctuation">)</span>
      img<span class="token punctuation">.</span>src <span class="token operator">=</span> src
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>被代理的对象负责往页面中添加 img 标签。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Avatar <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;img&#39;</span><span class="token punctuation">)</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function">setSrc</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      node<span class="token punctuation">.</span>src <span class="token operator">=</span> src
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h4 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式"><span>迭代器模式</span></a></h4><p>迭代器模式中有这样一个例子。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">appendDiv</span><span class="token punctuation">(</span><span class="token parameter">items</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">of</span> items<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> item
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个函数有两个职责，遍历 items 数组、创建 div 。我们用数组的 forEach 函数作为迭代器负责迭代职责。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">appendDiv</span><span class="token punctuation">(</span><span class="token parameter">items</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    div<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> item
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h4 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式"><span>单例模式</span></a></h4><p>来看下面的惰性单例的例子：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">createDialog</span><span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> instance <span class="token comment">// 如果已经创建过，则直接返回</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    div<span class="token punctuation">.</span>html <span class="token operator">=</span> html
    
    instance <span class="token operator">=</span> div
    <span class="token keyword">return</span> instance
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个函数中有两个职责，单例维护、创建对话框。分离职责后是这样的。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getSingle</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> result <span class="token operator">||</span> <span class="token punctuation">(</span>result <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createDialog</span><span class="token punctuation">(</span><span class="token parameter">html</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
  div<span class="token punctuation">.</span>html <span class="token operator">=</span> html
  <span class="token keyword">return</span> div
<span class="token punctuation">}</span>
</code></pre></div><h4 id="装饰者模式" tabindex="-1"><a class="header-anchor" href="#装饰者模式"><span>装饰者模式</span></a></h4><p>装饰者模式中，我们介绍了表单验证的例子。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>username <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>password <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  
  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://xxx.com&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
btn<span class="token punctuation">.</span>onclick <span class="token operator">=</span> submit
</code></pre></div><p>同样的，这个函数有两个职责：表单验证、表单提交。分离职责后如下：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>username <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>password <span class="token operator">===</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">validate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://xxx.com&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code>btn<span class="token punctuation">.</span>onclick <span class="token operator">=</span> submit<span class="token punctuation">.</span><span class="token function">before</span><span class="token punctuation">(</span>validate<span class="token punctuation">)</span>
</code></pre></div><h3 id="何时应该分离职责" tabindex="-1"><a class="header-anchor" href="#何时应该分离职责"><span>何时应该分离职责</span></a></h3><p>SRP 原则是所有原则中最简单也是最难正确运用的原则之一。要明确的是，<strong>并不是所有职责都应该分离</strong>。</p><ul><li><p>如果两个职责总是同时变化，就不必分离。比如创建 xhr、发送 xhr 总是在一起的，没有必要分开。</p></li><li><p>如果两个职责已经耦合在一起，但没有改变的征兆，就没有必要过早分离，在需要重构的时候再分离不迟。</p></li></ul><p>jQuery 的 attr 是个非常庞大的方法，既负责赋值，又负责取值，对于维护者来说，会带来一些困难，但对于用户来说，却简化了使用。根据具体的应用环境，在方便性与稳定性之间要有取舍。</p><h3 id="srp-原则的优缺点" tabindex="-1"><a class="header-anchor" href="#srp-原则的优缺点"><span>SRP 原则的优缺点</span></a></h3><p>优点：降低了单个对象的复杂度，按照职责把对象分解， 有助于代码复用和单元测试。当一个职责变更时，不会影响到其他职责。</p><p>缺点：增加编写代码的复杂度。</p><h2 id="最少知识原则-lkp" tabindex="-1"><a class="header-anchor" href="#最少知识原则-lkp"><span>最少知识原则 ( LKP )</span></a></h2><p>最少知识原则：一个软件实体应尽可能少与其他实体发生相互作用。</p><p>最少知识原则体现为：<strong>尽量减少对象之间的交互</strong>。</p><ul><li><p>如无必要，对象间不要发生直接联系。</p></li><li><p>如果对象间需要交互，可以通过第三者对象来转发。</p></li></ul><h3 id="设计模式中的-lkp-原则" tabindex="-1"><a class="header-anchor" href="#设计模式中的-lkp-原则"><span>设计模式中的 LKP 原则</span></a></h3><p>最少知识原则在设计模式中体现得最多的地方是中介者模式和外观模式。</p><h4 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式"><span>中介者模式</span></a></h4><p>中介者模式很好地体现了最少知识原则。</p><p>通过增加中介者对象，所有相关对象都通过中介来通信，而不是互相引用。当一个对象发生改变时，只需通知中介即可。</p><h4 id="外观模式" tabindex="-1"><a class="header-anchor" href="#外观模式"><span>外观模式</span></a></h4><p>外观模式定义了一个高层接口，使子系统更加容易使用。</p><p>最简单的外观模式应该是类似下面的代码:</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">a1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">a2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">b1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">b2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">facade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token constant">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>洗衣机的一键洗衣按钮就是一个外观，它包含了浸泡、洗衣、漂洗、脱水这些子系统。不管洗衣机内部如何进化，客户要操作的，始终只是一个一键洗衣的按钮。</p><p>外观模式的作用主要有两点。</p><ul><li><p>为一组子系统提供一个简单便利的访问入口。</p></li><li><p>隔离客户与复杂子系统之间的联系，客户不用去了解子系统的细节。</p></li></ul><p>从第二点来看，外观模式是符合最少知识原则的。</p><h2 id="开放-封闭原则-ocp" tabindex="-1"><a class="header-anchor" href="#开放-封闭原则-ocp"><span>开放-封闭原则 ( OCP )</span></a></h2><p>开放-封闭的意思是，对拓展开放，对修改封闭。</p><p>开放封闭原则体现为：<strong>当程序需要改变功能或增加功能时，可以增加代码，但不应该改动源代码</strong>。</p><p>扩展 window.onload 函数是开放封闭原则的经典例子。当我们需要为 window.onload 事件添加处理时，不应修改事件处理函数代码，而是在原基础上增加代码。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原处理函数&#39;</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> handler <span class="token operator">=</span> window<span class="token punctuation">.</span>onload

window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;新功能&#39;</span><span class="token punctuation">)</span> <span class="token comment">// 在原基础上增加代码</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在面向对象程序设计中，<strong>开放封闭原则是最重要的一条原则</strong>。很多时候，一个程序具有良好的设计，往往是符合开放封闭原则的。</p><h3 id="封装变化" tabindex="-1"><a class="header-anchor" href="#封装变化"><span>封装变化</span></a></h3><p>符合开放封闭原则的秘籍：<strong>找出要发生变化的地方，把变化封装起来</strong>。</p><p>看下面这个函数：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cb</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token parameter">item</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token parameter">item</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>forEach 函数中，要遍历一个数组是不变的，对每个项的操作是可以变化的。forEach 函数通过回调函数，让变化从外部传入。</p><h3 id="设计模式中的开放-封闭原则" tabindex="-1"><a class="header-anchor" href="#设计模式中的开放-封闭原则"><span>设计模式中的开放-封闭原则</span></a></h3><p>可以这样说，开放封闭原则是编写好程序的目标，设计原则是达到目标的过程。</p><h4 id="发布订阅模式" tabindex="-1"><a class="header-anchor" href="#发布订阅模式"><span>发布订阅模式</span></a></h4><ul><li>当有新的订阅者出现时，发布者的代码不需要进行任何修改</li><li>当发布者需要改变时，也不会影响到之前的订阅者。</li></ul><h4 id="模板方法模式" tabindex="-1"><a class="header-anchor" href="#模板方法模式"><span>模板方法模式</span></a></h4><p>模板方法模式中，子类的方法执行顺序是不变的，不变的抽出来放到模板方法里；方法的具体实现是可变的，变化的逻辑被封装到子类中。</p><p>增加新的子类便能增加新的功能，并不需要改动抽象父类以及其他的子类，这也是符合开放封闭原则的。</p><h4 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式"><span>策略模式</span></a></h4><p>策略模式将各种算法封装成单独的策略类，策略之间是平行关系，可以很方便地添加新算法。</p><h4 id="代理模式-1" tabindex="-1"><a class="header-anchor" href="#代理模式-1"><span>代理模式</span></a></h4><p>代理对象为原对象做了额外的工作，这些额外工作就是可变化的部分。</p><h4 id="职责链模式" tabindex="-1"><a class="header-anchor" href="#职责链模式"><span>职责链模式</span></a></h4><p>回看职责链模式的订单例子。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> chain500 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Chain</span><span class="token punctuation">(</span>order500<span class="token punctuation">)</span>
<span class="token keyword">const</span> chain200 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Chain</span><span class="token punctuation">(</span>order200<span class="token punctuation">)</span>
<span class="token keyword">const</span> chainNormal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Chain</span><span class="token punctuation">(</span>orderNormal<span class="token punctuation">)</span>

chain500<span class="token punctuation">.</span><span class="token function">setSuccessor</span><span class="token punctuation">(</span>chain200<span class="token punctuation">)</span>
chain200<span class="token punctuation">.</span><span class="token function">setSuccessor</span><span class="token punctuation">(</span>orderNormal<span class="token punctuation">)</span>
</code></pre></div><p>当增加新类型的订单时，不需要改动原有的订单函数，只需要在链条中增加新的节点。</p><h3 id="开放-封闭原则的相对性" tabindex="-1"><a class="header-anchor" href="#开放-封闭原则的相对性"><span>开放-封闭原则的相对性</span></a></h3><p>实际上，保持完全封闭是不容易做到的。保持开放封闭的代价是引入更多的抽象，更多的抽象可能会增大代码的复杂度。更何况，有一些代码总会存在一些无法对其封闭的变化。我们可以做到的有下面两点。</p><ul><li><p>挑出最容易发生变化的地方，构造抽象来封闭这些变化。</p></li><li><p>不可避免时，尽量修改相对容易修改的地方。</p><p>拿开源库来说，修改配置文件总比修改源代码简单。</p></li></ul>`,86),e=[o];function c(l,u){return a(),s("div",null,e)}const r=n(t,[["render",c],["__file","15.设计原则.html.vue"]]),d=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/15.%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99.html","title":"设计原则","lang":"zh-CN","frontmatter":{"description":"设计原则 设计原则指的是单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则。可以说设计模式都是为了让代码符合其中一个或多个原则而出现的。 下面将介绍三种设计原则：单一职责原则、最少知识原则、开放封闭原则。 单一职责原则 ( SRP ) 如果有两个动机去改写一个方法，这个方法就具有两个职责。一个方法承担了越多职责，将来需要...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/15.%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"设计原则"}],["meta",{"property":"og:description","content":"设计原则 设计原则指的是单一职责原则、里氏替换原则、依赖倒置原则、接口隔离原则、合成复用原则和最少知识原则。可以说设计模式都是为了让代码符合其中一个或多个原则而出现的。 下面将介绍三种设计原则：单一职责原则、最少知识原则、开放封闭原则。 单一职责原则 ( SRP ) 如果有两个动机去改写一个方法，这个方法就具有两个职责。一个方法承担了越多职责，将来需要..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"设计原则\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"单一职责原则 ( SRP )","slug":"单一职责原则-srp","link":"#单一职责原则-srp","children":[{"level":3,"title":"设计模式中的 SRP 原则","slug":"设计模式中的-srp-原则","link":"#设计模式中的-srp-原则","children":[]},{"level":3,"title":"何时应该分离职责","slug":"何时应该分离职责","link":"#何时应该分离职责","children":[]},{"level":3,"title":"SRP 原则的优缺点","slug":"srp-原则的优缺点","link":"#srp-原则的优缺点","children":[]}]},{"level":2,"title":"最少知识原则 ( LKP )","slug":"最少知识原则-lkp","link":"#最少知识原则-lkp","children":[{"level":3,"title":"设计模式中的 LKP 原则","slug":"设计模式中的-lkp-原则","link":"#设计模式中的-lkp-原则","children":[]}]},{"level":2,"title":"开放-封闭原则 ( OCP )","slug":"开放-封闭原则-ocp","link":"#开放-封闭原则-ocp","children":[{"level":3,"title":"封装变化","slug":"封装变化","link":"#封装变化","children":[]},{"level":3,"title":"设计模式中的开放-封闭原则","slug":"设计模式中的开放-封闭原则","link":"#设计模式中的开放-封闭原则","children":[]},{"level":3,"title":"开放-封闭原则的相对性","slug":"开放-封闭原则的相对性","link":"#开放-封闭原则的相对性","children":[]}]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":6.93,"words":2078},"filePathRelative":"编程/设计模式/15.设计原则.md","localizedDate":"2024年4月12日","autoDesc":true}');export{r as comp,d as data};
