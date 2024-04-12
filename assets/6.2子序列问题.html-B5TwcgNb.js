import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,b as t}from"./app-BzW9chhs.js";const p={},o=t(`<h1 id="子序列问题与动态规划" tabindex="-1"><a class="header-anchor" href="#子序列问题与动态规划"><span>子序列问题与动态规划</span></a></h1><p>对于两个字符串求子序列的问题，都是用两个指针i和j分别在两个字符串上移动，大概率是动态规划思路。</p><h2 id="最长递增子序列" tabindex="-1"><a class="header-anchor" href="#最长递增子序列"><span>最长递增子序列</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">lengthOfLIS</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 定义 dp[i] 为以 nums[i] 为结尾的 LIS 长度</span>
  <span class="token keyword">const</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 针对比 nums[i] 小的元素</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> i<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&lt;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// dp[i] = 比 nums[i] 小的元素中，dp 值最大的 + 1</span>
        dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 找出 dp 数组中的最大值</span>
  <span class="token keyword">return</span> dp<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res<span class="token punctuation">,</span> len</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="最大子数组和" tabindex="-1"><a class="header-anchor" href="#最大子数组和"><span>最大子数组和</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">maxSubArray</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// dp[i] 表示以 nums[i] 为结尾的子数组的最大和</span>
  <span class="token comment">// dp[i] = max(dp[i - 1], nums[i]) 要么接入前一个子数组，要么自身作为子数组</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> dp <span class="token operator">=</span> <span class="token punctuation">[</span>nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> dp<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> cur<span class="token punctuation">)</span><span class="token punctuation">,</span> Number<span class="token punctuation">.</span><span class="token constant">MIN_SAFE_INTEGER</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">maxSubArray</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> cur <span class="token operator">=</span> prev <span class="token operator">=</span> res <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

  <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cur <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>prev <span class="token operator">+</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
    prev <span class="token operator">=</span> cur
    res <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> cur<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> res
<span class="token punctuation">}</span>
</code></pre></div><h2 id="最长公共子序列-1143" tabindex="-1"><a class="header-anchor" href="#最长公共子序列-1143"><span>最长公共子序列 ( 1143 )</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">longestCommonSubsequence</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">text1<span class="token punctuation">,</span> text2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 对于 text1 和 text2 的同一位置的字符，要么相等，要么不等</span>

  <span class="token keyword">const</span> memo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// i,j 分别表示 text1 和 text2 从 i,j 到末尾的 LCS 长度</span>
  <span class="token keyword">function</span> <span class="token function">dp</span><span class="token punctuation">(</span><span class="token parameter">i<span class="token punctuation">,</span> j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// base case</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">||</span> j <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">0</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>memo<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>j<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> memo<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>j<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>text1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> text2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> res <span class="token operator">=</span> <span class="token function">dp</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span>
      memo<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>j<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
      <span class="token keyword">return</span> res
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> res <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>
      <span class="token function">dp</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// text1[i] 不在 LCS 中，跳过</span>
      <span class="token function">dp</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// text2[j] 不在 LCS 中，跳过</span>
      <span class="token comment">// dp(i - 1, j - 1), // 如果 text1[i] 和 text2[j] 都不在，则没必要继续算</span>
    <span class="token punctuation">)</span>

    memo<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>j<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> res<span class="token punctuation">)</span>
    <span class="token keyword">return</span> res
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">dp</span><span class="token punctuation">(</span>text1<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> text2<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,9),e=[o];function c(u,l){return s(),a("div",null,e)}const r=n(p,[["render",c],["__file","6.2子序列问题.html.vue"]]),m=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B/leetcode/6.2%E5%AD%90%E5%BA%8F%E5%88%97%E9%97%AE%E9%A2%98.html","title":"子序列问题与动态规划","lang":"zh-CN","frontmatter":{"description":"子序列问题与动态规划 对于两个字符串求子序列的问题，都是用两个指针i和j分别在两个字符串上移动，大概率是动态规划思路。 最长递增子序列 最大子数组和 最长公共子序列 ( 1143 )","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E7%BC%96%E7%A8%8B/leetcode/6.2%E5%AD%90%E5%BA%8F%E5%88%97%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"子序列问题与动态规划"}],["meta",{"property":"og:description","content":"子序列问题与动态规划 对于两个字符串求子序列的问题，都是用两个指针i和j分别在两个字符串上移动，大概率是动态规划思路。 最长递增子序列 最大子数组和 最长公共子序列 ( 1143 )"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"子序列问题与动态规划\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"最长递增子序列","slug":"最长递增子序列","link":"#最长递增子序列","children":[]},{"level":2,"title":"最大子数组和","slug":"最大子数组和","link":"#最大子数组和","children":[]},{"level":2,"title":"最长公共子序列 ( 1143 )","slug":"最长公共子序列-1143","link":"#最长公共子序列-1143","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.52,"words":455},"filePathRelative":"编程/leetcode/6.2子序列问题.md","localizedDate":"2024年4月12日","autoDesc":true}');export{r as comp,m as data};
