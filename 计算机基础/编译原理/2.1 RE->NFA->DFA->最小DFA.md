# RE->NFA->DFA->最小DFA

要实现正则表达式，需要将RE逐步转换成最小DFA。它们之间的转换关系和相关算法如下图

![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsvlz5ftrlj30m0028t8q.jpg)

我们先来回想下RE的定义和表示方法：

对给定的字符集$\Sigma = \{ c_1, c_2, \dots, c_n \}$，归纳定义：

* 空串 $\varepsilon$ 是正则表达式
* 对于任意 $c \in \Sigma$，$c$ 是正则表达式
* 如果 $M$ 和 $N$ 是正则表达式，则以下也是正则表达式
  * 选择	$M \:| \: N = \{M,N \}$
  * 连接	$MN = \{ mn \:|\: m \in M, n \in N \}$
  * 闭包	$M^* = \{ \varepsilon, M,MM,MMM,\dots\}$

RE的形式表示：

```
e ->
   | ε
   | c        (基本形式)
----------------------
   | e | e    (归纳形式)
   | e e
   | e*
```

## Thompson算法

总的来说，`Thompson算法`有一种类似`数学归纳法`的思想。

- 基于对 RE 的结构做归纳
  - 对基本形式的 RE 直接构造
  - 对归纳（复合）形式的 RE 递归构造

针对字符集$\Sigma = \{A,B\}$，归纳转换过程如下图：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsvy4iiylbj30ii0d1q3k.jpg" style="zoom:80%;" />

### Thompson算法例子

构造与正则表达式`A(B|C)*`等价的NFA。构造过程如下图：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsw28hlmsbj30p60g5dgp.jpg" style="zoom:80%;" />

## 子集构造算法

`NFA`的状态转移不确定，在处理字符时往往需要**回溯**。我们一般使用**子集构造算法**，将`NFA`转换成`DFA`， 得到确定的状态转移图。

**构造与正则表达式`A(B|C)*`等价的NFA**例子中，我们已经通过`Thompson算法`得到了与`A(B|C)*`等价的`NFA`。

下面将`NFA`转换为`DFA`（以下用$s_n$表示`状态n`。）。

$\varepsilon$空串边表示一种零代价的转换，$s_1$可以在没有任何输入的情况下转入$s_2$，也就是说$s_1$和$s_2$是等价的，因此可以用一个新状态$q$来表示他们，$q= \{s1, s2\}$。

用这种方法，可以消除`NFA`中所有的$\varepsilon$空串边，$S = \{q_0, \dots,q_n\}$就是`DFA`的状态集合。

* 记$q_0 = \{s_0\}$

* $q_0 -A\to q_1, \quad q_1 = \{s_1,s_2,s_3,s_4,s_6,s_9\}$
* $q_1 -B\to q_2, \quad q_2=\{s_5,s_8,s_9,s_3,s_4,s_6\}$
* $q_1 -C\to q_3, \quad q_3=\{s_7,s_8,s_9,s_3,s_4,s_6\}$
* $q_2 -B\to \{s_5,s_8,s_9,s_3,s_4,s_6\} = q_2$

* $q_2 -C\to \{s_7,s_8,s_9,s_3,s_4,s_6\} = q_3$
* 重复步骤，直到不能得出新的子集
* $S = \{q_0, \dots,q_n\}$中，包含接受状态$s_9$的都是`DFA`的接受状态

介绍两个重要的概念：**边界**和**$\varepsilon$-闭包**：

* 边界

  一个状态经过$\varepsilon$能到达的所有状态的集合。比如$s_1$的边界是$\{s_2,s_3,s_4,s_6,s_9\}$

* $\varepsilon$-闭包

  将$q_1$中每个元素经过一个非$\varepsilon$字符后能到达的状态集合记为$delta(q_1)$，那么$delta(q_1) = \{s_5\}$，

  对$delta(q_1)$中每个元素求它的边界，得到的集合称为$q_1$的**$\varepsilon$-闭包**，记为$eps-closure(q_1)$。

  不难得出，$eps-closure(q_1) = q_2$。

整理一下得到`DFA`的状态转移表：

|  S \ $\Sigma$  |   A   |   B   |   C   |
| :------------: | :---: | :---: | :---: |
|     $q_0$      | $q_1$ |       |       |
| $q_1 (Accept)$ |       | $q_2$ | $q_3$ |
| $q_2 (Accept)$ |       | $q_2$ | $q_3$ |
| $q_3 (Accept)$ |       | $q_2$ | $q_3$ |

`DFA`如下图：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsx0ukqi1nj30b907tt8q.jpg" style="zoom:80%;" />

### 对算法的讨论

- 不动点算法

- - 算法可以提前运行终止，因为状态数是有限的

- 时间复杂度

- - 最坏的情况$O(2^N)$
  - 但是实际中不常发生，因为并不是每个子集都会出现
  - 上面的例子中，有$s_0$到$s_9$共十个元素，本来应该最多发生$2^{10}$次，实际上只发生了3次（$s_0,s_1,s_2$）

### ε-闭包的计算：深度优先

```c
/* ε-closure 基于深度优先遍历的算法 */
set closure = {};
void eps_closure(x){
  closure += {x};  // 集合的加法， 并
  foreach(y: x --ε--> y){  // y 是 x 通过 ε 转换到的 y。
    if(!visited(y)){     // 如果 y 还没有访问过，就访问 y
      eps_closure(y);
    }
  }
}
```

### ε-闭包的计算：宽度优先

```c
/* ε-closure： 基于宽度优先遍历的算法 */
set closure = {};
Q = []; // quenu 基于队列的概念，
void eps_closure(x) =
  Q = [x];
  while(Q not empty)
    q <- deQueue(Q)
    closure += q
    foreach(y: q --ε--> y)  // 将所有的从 Q 开始可以走到的 y 都加到 Q 里
      if(!visited(y))
        enQueue(Q,y)
```

### 子集构造算法：工作表算法

```c
q0 <- eps_closure(n0)   // q0 = {n0}
Q <- {q0}       // Q = {q0}
workList <- q0     // workList = [q0, ...]
while(workList != [])
  remove q from workList   // workList = [...]
  foreach(character c)     // c = a
    t <- e-closure(delta(q,c))   // delta(q0, a) = {n1}, t = {n1, n2, n3, n4, n6, n9}
    D[q,c] <- t    //   q1 = t
    if(t not in Q)    // Q = {q0, q1} , workList = [q1]
      add t to Q and workList
```

## Hopcroft算法

我们已经通过`子集构造算法`得到了与`A(B|C)*`等价的`DFA`。

事实上，这个`DFA`还存在改进的空间。比如`状态q2`和`状态q3`可以合并为一个状态，合并之后还可以继续合并。

合并过程见下图：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsx32a5d10j309z0a1dg1.jpg" style="zoom:90%;" />

最终，我们得到了最终的`A(B|C)*`等价的`最小DFA` 。

### Hopcroft算法具体过程

#### 算法过程

1. 根据是否为接受状态将所有节点分为`N`和`A`两个集合。 N 为非接受状态，A 为接受状态

2. 对`N`和`A`进行split划分，直到不能得出新的集合

3. split划分

   split划分是基于等价类思想的一个过程。

   对于状态集合$S$和字符集合$\Sigma$，如果$S$中的状态$s_1,s_2$对$\Sigma$中的字符$c$的行为是一致的，则$s_1,s_2$对$c$是等价的，它们可以划分为一组。

   ![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsxqf8efp6j309505d3yo.jpg)

   上图中，`1,2,3`经过`A`后分别进入`S2`和`S3`，那么`S1`可划分为`{1,2}`和`{3}`。

伪代码表示如下：

```c
split(S)
  foreach(character c) // 对字符集中每个字符都做判断
    if(c can split s) // 字符c可以划分s
      split s into T1, ..., Tk // 划分为k组

hopcroft()
  split all nodes into N, A
  while(set is still changes) // 直到不出现新的集合
    split(s)
```

#### `A(B|C)*`例子

回忆下`A(B|C)*`例子在经过`子集构造算法`后得到的`DFA`：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsx0ukqi1nj30b907tt8q.jpg" style="zoom:70%;" />

1. 根据是否接受划分为$N = \{q_0\}, \: A = \{q_1,q_2,q_3\}$

2. $N$不可再划分

3. 观察$A$，可得以下几点

   * $q_1,q_2,q_3 -B\to q_2, q_2 \in A$，所以`B`不可划分$A$
   * 同理，$q_1,q_2,q_3 -C\to q_3, q_3 \in A$，所以`C`不可划分$A$

4. 那么，$q_1,q_2,q_3$对字符`B`和字符`C`都是**等价**的，可以用一个新状态$q_4$等价替换它们。

5. 等价替换和得到`A(B|C)*`的`最小DFA`

   ![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsxqx6j53zj306g01tglf.jpg)

## `DFA`的数据结构表示

从概念上讲，`DFA`是一个有向图，可以用`邻接矩阵或邻接表`表示。

实际上，有不同的`DFA`的代码表示，具体选择哪种取决于在实际情况对时间空间的权衡。
- 转移表（类似于邻接矩阵）
- **跳转表**（大部分情况下，使用跳转表）
- 哈希表
- ...

### 转移表

上文我们已经得到`A(B|C)*`的`最小DFA`，如下图：

![](https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gsxqx6j53zj306g01tglf.jpg)

它的**状态转移表**如下：

| 状态 \ 字符 |  A   |  B   |  C   |
| :---------: | :--: | :--: | :--: |
|    0(q0)    |  1   |      |      |
|    1(q5)    |      |  1   |  1   |

可以用一个二维数组来表示这样的转移表。

```c
// 这个例子中只有{A,B,C}三个字符。M = 2, N = 3
// 实际例子中，比如ASCII码，N = 256
char table[M][N];

table[0]['a'] = 1;
table[1]['b'] = 1;
table[1]['c'] = 1;
// ...
```

`nextToken`函数可以最长匹配字符流中下一个`token`：

```c
nextToken()
  state = 0
  stack = [] // 用于实现最长匹配
  while(state != ERROR) //在上面的表格中表示为空
    c = getChar()
      if(state is ACCEPT)  // 接受状态,q1； 表格中表示为状态1，有（1,b）, (1,c)
        clear(stack)
    push(state)
    state = table[state][c]
  while(state is not ACCEPT)
    state = pop()
    rollback()
```

### 跳转表

同一个例子，用**跳转表**实现，伪代码如下：

```c
nextToken()
  state = 0
  stack = []
  goto q0
q0:
  c = getChar()
  if(state is ACCEPT)
    clear(stack)
  push(state)
  if(c == 'a')
    goto q1
q1:
  c = getChar()
  if(state id ACCEPT)
    clear(stack)
  push(state)
  if(c == 'b' || c == 'c')
    goto q1
```

跳转表有两个优点：

* 指定了转换的字符，可以提高转移的效率
* 不需要维护转移表，节省内存。转移表在字符集大（比如Unicode）和状态多时，占用内存大

大部分情况下，我们会使用跳转表。

## 参考

[正规式->最小化DFA说明](https://zhuanlan.zhihu.com/p/37900383)

[编译原理](https://mooc.study.163.com/course/1000002001?tid=2403024009)
