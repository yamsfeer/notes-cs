import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as t}from"./app-BzW9chhs.js";const p={},o=t(`<h1 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式"><span>中介者模式</span></a></h1><p>随着程序规模增大，对象越来越多，它们的关系也越来越复杂，难免形成网状的交叉引用。当我们改变或删除其中一个对象，很可能需要通知所有引用到它的对象，牵一发而动全身。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/中介模式前.png" class="img-mid" style="zoom:75%;"><p>中介者模式的作用就是解除对象与对象之间的紧耦合关系。中介者模式使网状的多对多关系变成了相对简单的一对多关系。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/中介模式后.png" class="img-mid" style="zoom:75%;"><h2 id="泡泡堂例子" tabindex="-1"><a class="header-anchor" href="#泡泡堂例子"><span>泡泡堂例子</span></a></h2><p>下面用一个小游戏的例子介绍中介者模式。先来看看不用中介模式的实现。</p><p>游戏之初只支持两个玩家对战，玩家的定义如下：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
  enemy <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token punctuation">}</span>
  <span class="token function">win</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">&#39;win&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token function">lose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">&#39;lose&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token function">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>enemey<span class="token punctuation">.</span><span class="token function">win</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>接下来创建两个玩家并设置对方为敌人。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> player1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> player2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span><span class="token string">&#39;B&#39;</span><span class="token punctuation">)</span>

player1<span class="token punctuation">.</span>enemy <span class="token operator">=</span> player2
player2<span class="token punctuation">.</span>enemy <span class="token operator">=</span> player1

player1<span class="token punctuation">.</span><span class="token function">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// A lose, B win</span>
</code></pre></div><h3 id="添加队伍" tabindex="-1"><a class="header-anchor" href="#添加队伍"><span>添加队伍</span></a></h3><p>我们增加玩家人数并可以设置队伍，当有一个玩家死亡时，需要检查其同队的其他玩家，如果全队阵亡，则对方游戏获胜。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
  partners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  enemies <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  state <span class="token operator">=</span> <span class="token string">&#39;live&#39;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> teamColor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>teamColor <span class="token operator">=</span> teamColor
  <span class="token punctuation">}</span>
  <span class="token function">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> isAllDead <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>partners<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span><span class="token parameter">partner</span> <span class="token operator">=&gt;</span> partner<span class="token punctuation">.</span>state <span class="token operator">===</span> <span class="token string">&#39;dead&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isAllDead<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>partners<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">partner</span> <span class="token operator">=&gt;</span> partners<span class="token punctuation">.</span><span class="token function">lose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>enemies<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">enemy</span> <span class="token operator">=&gt;</span> enemy<span class="token punctuation">.</span><span class="token function">win</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>添加一个工厂函数生成玩家对象，并为其设置队伍。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> players <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 保存游戏中的所有玩家</span>

<span class="token keyword">function</span> <span class="token function">createPlayer</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> teamColor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> newPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> teamColor<span class="token punctuation">)</span>
  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> player <span class="token keyword">of</span> players<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>player<span class="token punctuation">.</span>teamColor <span class="token operator">===</span> newPlayer<span class="token punctuation">.</span>teamColor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    newPlayer<span class="token punctuation">.</span>partners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span>
    player<span class="token punctuation">.</span>partners<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newPlayer<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    newPlayer<span class="token punctuation">.</span>enemies<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span>
    player<span class="token punctuation">.</span>enemies<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>newPlayer<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>上面勉强实现了游戏的基本逻辑，但远算不上优雅。创建一个新玩家时，需要遍历所有玩家，将新玩家设置成队友或敌人；当一位玩家死亡，也需要检查和通知其他玩家更新状态。</p><p>大型网络游戏中，有成百上千玩家，几十支队伍互相厮杀。一个玩家掉线，必须从所有其他玩家的队友列表或敌人列表中移除这个玩家。游戏还会有解散或转变队伍的功能，这些就不是循环能解决的问题了。</p><h3 id="用中介模式改造" tabindex="-1"><a class="header-anchor" href="#用中介模式改造"><span>用中介模式改造</span></a></h3><p>我们引入中介 director 管理整个游戏，player 不再负责具体的执行逻辑，而是把操作转交给 director。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Player</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> teamColor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>teamColor <span class="token operator">=</span> teamColor
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token string">&#39;alive&#39;</span>
  <span class="token punctuation">}</span>
  <span class="token function">win</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">&#39;win&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token function">lose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">&#39;lose&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

  <span class="token function">die</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> director<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token string">&#39;playerDead&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> director<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token string">&#39;playerRemove&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token function">changeTeam</span><span class="token punctuation">(</span><span class="token parameter">color</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> director<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token string">&#39;changeTeam&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">,</span> color<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>createPlayer 函数只需创建玩家对象，然后通知 director 即可。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">createPlayer</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> teamColor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> player <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Player</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> teamColor<span class="token punctuation">)</span>
  director<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token string">&#39;addPlayer&#39;</span><span class="token punctuation">,</span> player<span class="token punctuation">)</span>
  <span class="token keyword">return</span> player
<span class="token punctuation">}</span>
</code></pre></div><p>下面是最重要的 director 的实现。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> director <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> players <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 游戏内所有玩家，以 teamColor 划分</span>
  <span class="token keyword">const</span> ops <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">// 可执行的操作</span>
    <span class="token function">addPlayer</span><span class="token punctuation">(</span><span class="token parameter">player</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">removePlayer</span><span class="token punctuation">(</span><span class="token parameter">player</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> teamPlayers <span class="token operator">=</span> players<span class="token punctuation">[</span>player<span class="token punctuation">.</span>teamColor<span class="token punctuation">]</span>
      teamPlayers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>teamPlayers<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 找出并删除</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">changeTeam</span><span class="token punctuation">(</span><span class="token parameter">player<span class="token punctuation">,</span> newTeamColor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ops<span class="token punctuation">.</span><span class="token function">removePlayer</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span>
      player<span class="token punctuation">.</span>teamColor <span class="token operator">=</span> newTeamColor
      ops<span class="token punctuation">.</span><span class="token function">addPlayer</span><span class="token punctuation">(</span>player<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">playerDead</span><span class="token punctuation">(</span><span class="token parameter">player</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 和之前一样，队友全死亡算输</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  
  
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token function">receiveMessage</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 暴露接口</span>
      <span class="token keyword">let</span> op <span class="token operator">=</span> args<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 第一个参数是操作类型</span>
      ops<span class="token punctuation">[</span>op<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>中介模式是符合最少知识原则的，一个对象应尽可能少地了解另外的对象。</p><p>中介者模式使各个对象之间解耦，中介者和对象的一对多关系取代了对象之间的网状多对多关系。各个对象只需关注自身功能，对象之间的交互交给中介维护。</p>`,28),e=[o];function c(l,u){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","11.中介者模式.html.vue"]]),d=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/11.%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F.html","title":"中介者模式","lang":"zh-CN","frontmatter":{"description":"中介者模式 随着程序规模增大，对象越来越多，它们的关系也越来越复杂，难免形成网状的交叉引用。当我们改变或删除其中一个对象，很可能需要通知所有引用到它的对象，牵一发而动全身。 中介者模式的作用就是解除对象与对象之间的紧耦合关系。中介者模式使网状的多对多关系变成了相对简单的一对多关系。 泡泡堂例子 下面用一个小游戏的例子介绍中介者模式。先来看看不用中介模式...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/11.%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"中介者模式"}],["meta",{"property":"og:description","content":"中介者模式 随着程序规模增大，对象越来越多，它们的关系也越来越复杂，难免形成网状的交叉引用。当我们改变或删除其中一个对象，很可能需要通知所有引用到它的对象，牵一发而动全身。 中介者模式的作用就是解除对象与对象之间的紧耦合关系。中介者模式使网状的多对多关系变成了相对简单的一对多关系。 泡泡堂例子 下面用一个小游戏的例子介绍中介者模式。先来看看不用中介模式..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"中介者模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"泡泡堂例子","slug":"泡泡堂例子","link":"#泡泡堂例子","children":[{"level":3,"title":"添加队伍","slug":"添加队伍","link":"#添加队伍","children":[]},{"level":3,"title":"用中介模式改造","slug":"用中介模式改造","link":"#用中介模式改造","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":3.05,"words":916},"filePathRelative":"编程/设计模式/11.中介者模式.md","localizedDate":"2024年4月12日","autoDesc":true}');export{r as comp,d as data};
