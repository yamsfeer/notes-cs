import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as t,c as a,b as i}from"./app-BzW9chhs.js";const l={},o=i(`<h1 id="摘要算法" tabindex="-1"><a class="header-anchor" href="#摘要算法"><span>摘要算法</span></a></h1><p>摘要算法也称为哈希函数，用于将任意长度的消息压缩为固定长度的摘要。常用的摘要算法包括：</p><ol><li>MD5（Message Digest Algorithm 5）：一种广泛使用的摘要算法，输出128位的摘要。</li><li>SHA-1（Secure Hash Algorithm 1）：一种安全性较高的摘要算法，输出160位的摘要。</li><li>SHA-256/SHA-512：SHA-2系列的算法，输出256位或512位的摘要，安全性更高。</li><li>HMAC（Hash-based Message Authentication Code）：一种基于摘要算法的消息认证码，常用于网络协议和数字签名。</li></ol><p>除了以上常用的摘要算法，还有一些其他的摘要算法，如RIPEMD，Whirlpool等。</p><h2 id="md5" tabindex="-1"><a class="header-anchor" href="#md5"><span>MD5</span></a></h2><p>MD5是一种广泛使用的摘要算法，其全称为“Message-Digest Algorithm 5”。MD5算法将任意长度的消息作为输入，输出128位的摘要，通常用于验证数据的完整性，或者作为数字签名等安全应用中的一部分。下面是MD5算法的详解：</p><ol><li>填充消息</li></ol><p>MD5算法将输入的消息分成若干个512位的数据块进行处理。如果输入的消息长度不是512位的整数倍，就需要先对消息进行填充，使其长度满足要求。填充的方法是在消息末尾添加一个“1”，然后再添加若干个“0”使得消息长度（单位为位）满足以下条件：(长度 + 64) % 512 = 0。其中，64表示一个64位的长度值，用来记录填充前的消息长度。</p><ol start="2"><li>初始化缓冲区</li></ol><p>MD5算法需要维护一个128位的缓冲区，用来保存计算中间结果。缓冲区被初始化为以下数值（用16进制表示）：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>A = 0x67452301
B = 0xEFCDAB89
C = 0x98BADCFE
D = 0x10325476
</code></pre></div><ol start="3"><li>处理数据块</li></ol><p>将填充后的消息分成若干个512位的数据块，对每个数据块进行处理。处理时，首先将缓冲区的四个寄存器的值复制到临时变量中。然后进行四轮计算，每轮计算包括16个步骤，每个步骤都根据当前数据块的一部分进行计算，最后将计算结果更新到缓冲区中。具体的计算过程较为复杂，涉及到位运算、模运算、加法等操作，这里不再详细解释。</p><ol start="4"><li>输出结果</li></ol><p>将缓冲区的四个寄存器中的值按照小端字节序拼接起来，得到128位的摘要结果。注意，MD5算法的输出结果是二进制数据，通常会将其转换为16进制或者64进制的字符串表示。</p><p>需要注意的是，MD5算法虽然在过去被广泛使用，但是在现代的密码学安全应用中已经不再安全，因为其已经被发现存在严重的碰撞攻击漏洞。因此，建议在实际应用中使用更安全的哈希算法，如SHA-256、SHA-512等。</p><h2 id="安全性" tabindex="-1"><a class="header-anchor" href="#安全性"><span>安全性</span></a></h2><p>摘要算法的安全性指的是算法能够抵抗不同类型攻击的能力，包括：</p><ol><li>预像攻击（preimage attack）：指在已知摘要的情况下，找到任意一个与其摘要相匹配的原始消息的难度。</li><li>第二像攻击（second preimage attack）：指在已知原始消息的情况下，找到另一个与其摘要相匹配的原始消息的难度。</li><li>碰撞攻击（collision attack）：指找到两个不同的原始消息，它们的摘要相同的难度。</li></ol><p>对于安全性高的摘要算法来说，预像攻击和第二像攻击应该是困难的，并且碰撞攻击的概率也应该非常小，这样才能确保算法在实际应用中不被攻击者利用。需要注意的是，随着计算机技术的不断进步，一些过去被认为安全的摘要算法已经被攻破，因此在选择摘要算法时需要考虑其安全性和抵抗攻击的能力。</p><h2 id="哈希函数和哈希表" tabindex="-1"><a class="header-anchor" href="#哈希函数和哈希表"><span>哈希函数和哈希表</span></a></h2><p>哈希函数（Hash Function）是一种将任意长度的输入数据（消息）映射到固定长度输出数据（哈希值）的函数。它的设计要求尽可能地满足两个条件：</p><ol><li>散列值应该尽可能地唯一和随机，以避免冲突和攻击。</li><li>哈希函数计算速度应该尽可能地快。</li></ol><p>哈希函数被广泛应用于密码学、数据结构、信息检索等领域。其中，数据结构中的哈希表（Hash Table）就是利用哈希函数实现的一种高效的数据结构，用于实现字典、集合等操作。</p><p>哈希表通常是由一个哈希函数和一个数组组成。哈希函数将每个键（key）映射到数组中的一个位置，然后将值（value）存储在该位置中。当需要查找一个键的值时，只需要将该键再次应用哈希函数，找到对应的位置，然后返回存储在该位置中的值即可。由于哈希函数的设计要求散列值唯一和随机，因此在大多数情况下，哈希表可以实现常数时间（O(1)）的查找效率。</p><p>需要注意的是，哈希函数和哈希表虽然名称相似，但是它们的应用场景和具体实现方式并没有必然的关系。在实际应用中，哈希函数和哈希表的实现可能涉及不同的数据结构和算法，因此需要根据具体情况进行选择。</p>`,26),r=[o];function s(n,p){return t(),a("div",null,r)}const d=e(l,[["render",s],["__file","摘要算法.html.vue"]]),m=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%80%9A%E8%AF%86/%E6%91%98%E8%A6%81%E7%AE%97%E6%B3%95.html","title":"摘要算法","lang":"zh-CN","frontmatter":{"description":"摘要算法 摘要算法也称为哈希函数，用于将任意长度的消息压缩为固定长度的摘要。常用的摘要算法包括： MD5（Message Digest Algorithm 5）：一种广泛使用的摘要算法，输出128位的摘要。 SHA-1（Secure Hash Algorithm 1）：一种安全性较高的摘要算法，输出160位的摘要。 SHA-256/SHA-512：SH...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%80%9A%E8%AF%86/%E6%91%98%E8%A6%81%E7%AE%97%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"摘要算法"}],["meta",{"property":"og:description","content":"摘要算法 摘要算法也称为哈希函数，用于将任意长度的消息压缩为固定长度的摘要。常用的摘要算法包括： MD5（Message Digest Algorithm 5）：一种广泛使用的摘要算法，输出128位的摘要。 SHA-1（Secure Hash Algorithm 1）：一种安全性较高的摘要算法，输出160位的摘要。 SHA-256/SHA-512：SH..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"摘要算法\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"MD5","slug":"md5","link":"#md5","children":[]},{"level":2,"title":"安全性","slug":"安全性","link":"#安全性","children":[]},{"level":2,"title":"哈希函数和哈希表","slug":"哈希函数和哈希表","link":"#哈希函数和哈希表","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":4.77,"words":1430},"filePathRelative":"计算机基础/计算机通识/摘要算法.md","localizedDate":"2024年4月12日","autoDesc":true}');export{d as comp,m as data};
