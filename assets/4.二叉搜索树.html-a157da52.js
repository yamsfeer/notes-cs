import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-706bfe03.js";const p={},o=t(`<h1 id="二叉搜索树" tabindex="-1"><a class="header-anchor" href="#二叉搜索树" aria-hidden="true">#</a> 二叉搜索树</h1><h2 id="bst-基本特性" tabindex="-1"><a class="header-anchor" href="#bst-基本特性" aria-hidden="true">#</a> BST 基本特性</h2><p>二叉搜索树的特性：</p><ul><li>对任一个节点 node，左子树节点都小于 node，右子树节点都大于 node</li><li>对任一个节点 node，其左右子树都是 BST</li><li>BST 的中序遍历是有序的</li></ul><p>基于 BST 的数据结构有 AVL 树、红黑树、B+ 树、线段树等等。</p><h3 id="第-k-小元素-230" tabindex="-1"><a class="header-anchor" href="#第-k-小元素-230" aria-hidden="true">#</a> 第 k 小元素 ( 230 )</h3><p>查找 BST 中第 k 小的元素。算法很简单，根据 BST 中序遍历有序的特性，直接遍历找到目标元素。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">kthSmallest</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> k</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> rank <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

    <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    <span class="token comment">// 中序位置</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>rank <span class="token operator">===</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 每访问一个节点自增 1</span>
      <span class="token keyword">return</span> res <span class="token operator">=</span> root<span class="token punctuation">.</span>val <span class="token comment">// 找到则直接返回</span>
    <span class="token punctuation">}</span>
    <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre></div><p>这个算法的时间复杂度为 O(n)，我们可以优化到 O(logn)，但是需要在每个节点中维护额外信息。</p><div class="language-cpp" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
  <span class="token keyword">int</span> val<span class="token punctuation">;</span>
  <span class="token keyword">int</span> size<span class="token punctuation">;</span> <span class="token comment">// 以该节点为根的树的节点总数</span>
  TreeNode left<span class="token punctuation">;</span>
  TreeNode right<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>TreeNode 增加 size 字段，表示以该节点为根的树的节点总数。这样寻找第 k 小元素就类似二分查找，时间复杂度为 O(logn)。</p><p>当然，size 字段在增删元素的时候需要被正确维护。</p><h3 id="bst-转累加树-538" tabindex="-1"><a class="header-anchor" href="#bst-转累加树-538" aria-hidden="true">#</a> BST 转累加树 ( 538 )</h3><p>给定一棵 BST，该树的节点值各不相同，请转化为累加树。累加树的每个节点 node 的值等于原树中大于等于 node 的值之和。</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h5ttr1evknj20lj0ep3z3.jpg" style="zoom:50%;"><p>这个问题的解法有点巧妙。我们将中序遍历的代码改成先遍历右子树，即降序遍历 BST。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token comment">// 先遍历右子树</span>
  <span class="token comment">// 中序位置</span>
  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这样做的好处是，在中序位置，我们已经遍历完右子树，可以知道右子树的和。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">function</span> <span class="token function">traverse</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span>

  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token comment">// 先遍历右子树</span>
  <span class="token comment">// 中序位置</span>
  sum <span class="token operator">+=</span> root<span class="token punctuation">.</span>val <span class="token comment">// 累加</span>
  root<span class="token punctuation">.</span>val <span class="token operator">=</span> sum <span class="token comment">// 更新到当前节点</span>
  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">convertBST</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">traverse</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token keyword">return</span> root
<span class="token punctuation">}</span>
</code></pre></div><h2 id="bst-基本操作" tabindex="-1"><a class="header-anchor" href="#bst-基本操作" aria-hidden="true">#</a> BST 基本操作</h2><h3 id="判断合法性-98" tabindex="-1"><a class="header-anchor" href="#判断合法性-98" aria-hidden="true">#</a> 判断合法性 ( 98 )</h3><p>根据 BST 的左小右大特性，针对每个节点 node，它的左子树的所有节点都小于 node，右子树所有节点都大于 node。因此，不能只比较一个节点及其左右孩子。</p><p>我们可以通过 min、max 两个参数表示一棵树的值范围。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isValidBST</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">isValid</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span>

    <span class="token comment">// 不满足 [min, max] 范围则直接返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>min <span class="token operator">&amp;&amp;</span> root<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> min<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>max <span class="token operator">&amp;&amp;</span> root<span class="token punctuation">.</span>val <span class="token operator">&gt;=</span> max<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span>

    <span class="token keyword">return</span> <span class="token function">isValid</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> min<span class="token punctuation">,</span> root<span class="token punctuation">)</span>
        <span class="token operator">&amp;&amp;</span> <span class="token function">isValid</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> root<span class="token punctuation">,</span> max<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">isValid</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><blockquote><p>通过函数参数，将一些额外信息传递给子树，这是二叉树算法的一种技巧。</p></blockquote><h3 id="搜索元素-700" tabindex="-1"><a class="header-anchor" href="#搜索元素-700" aria-hidden="true">#</a> 搜索元素 ( 700 )</h3><p>在 BST 中搜索元素，类似二分查找。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">searchBST</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">===</span> target<span class="token punctuation">)</span>
    <span class="token keyword">return</span> root
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> target<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">searchBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
  <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> target<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">searchBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="插入元素-701" tabindex="-1"><a class="header-anchor" href="#插入元素-701" aria-hidden="true">#</a> 插入元素 ( 701 )</h3><p>数据结构的操作无非遍历 + 访问，遍历就是找，访问就是改。</p><p>具体到这个问题，插入一个数，就是找到插入位置，进行插入操作。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">insertBST</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token comment">// 相当于找到合适的位置</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token comment">// 插入操作</span>

  <span class="token comment">// BST 中一般不会插入已存在的元素</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> val<span class="token punctuation">)</span>
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">insertBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> val<span class="token punctuation">)</span>
    root<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">insertBST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
  <span class="token keyword">return</span> root
<span class="token punctuation">}</span>
</code></pre></div><h3 id="删除元素-450" tabindex="-1"><a class="header-anchor" href="#删除元素-450" aria-hidden="true">#</a> 删除元素 ( 450 )</h3><p>和插入元素类似，我们需要先找到目标元素，然后删除它。但难点在于删除节点后要保持 BST 的性质。</p><p>目标节点根据左右孩子可以分为三种情况：</p><ul><li><p>两个孩子为空：直接删除</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h5umliwae7j21dw0pg76d.jpg" style="zoom:20%;"></li><li><p>只有一个非空孩子：让非空孩子接替自己</p><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h5umlg02zmj211z0dcdh1.jpg" style="zoom:40%;"></li><li><p>有两个非空孩子：找到左子树的最大节点，或者右子树的最小节点接替自己</p></li></ul><img class="img-mid" src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h5umldz9q0j21hc0dcdhr.jpg"><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">===</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 情况1 或 情况2</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>left <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> root<span class="token punctuation">.</span>right
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>right <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> root<span class="token punctuation">.</span>left

    <span class="token comment">// 情况3</span>
    <span class="token keyword">const</span> min <span class="token operator">=</span> <span class="token function">getMin</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token comment">// 找到右子树最小节点</span>
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> min<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token comment">// 删除右子树最小节点</span>
    min<span class="token punctuation">.</span>left <span class="token operator">=</span> root<span class="token punctuation">.</span>left <span class="token comment">// 接替原节点</span>
    min<span class="token punctuation">.</span>right <span class="token operator">=</span> root<span class="token punctuation">.</span>right

    <span class="token keyword">return</span> min
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> val<span class="token punctuation">)</span>
    root<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> val<span class="token punctuation">)</span>
    root<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> val<span class="token punctuation">)</span>

  <span class="token keyword">return</span> root
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getMin</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// BST 最左边节点最小</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    root <span class="token operator">=</span> root<span class="token punctuation">.</span>left
  <span class="token keyword">return</span> root
<span class="token punctuation">}</span>
</code></pre></div><p>当然，第三种情况中，我们也可以用左子树的最大节点接替。</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> max <span class="token operator">=</span> <span class="token function">getMax</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
root<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">deleteNode</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> max<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
</code></pre></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>总的来说，利用二叉搜索树的两个特性：左小右大、中序有序可以解决很多问题。</p><p>在二叉树递归框架之上，扩展出 BST 代码框架：</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">BST</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">===</span> target<span class="token punctuation">)</span>
    <span class="token comment">// 找到目标，做点什么</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> target<span class="token punctuation">)</span>
    <span class="token constant">BST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>val <span class="token operator">&gt;</span> target<span class="token punctuation">)</span>
    <span class="token constant">BST</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> target<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>这个框架可以解决 BST 的增删改查等基本操作。</p>`,45),e=[o];function c(l,u){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","4.二叉搜索树.html.vue"]]);export{i as default};
