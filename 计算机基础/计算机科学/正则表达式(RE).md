# 正则表达式(RE)

**正则表达式**（*Regular Expression*，常简写为*regex*、*regexp*或*RE*）是[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)的一个概念。

**正则表达式使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。**

```javascript
let regexp = /helloworld/
regexp.test('xxx-helloworld-xx') // true
```

## RE的定义和表示

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

给定一个字符集 $\Sigma = \{ a, b\}$ ，可以写出如下正则表达式：

1. $\varepsilon$（空串$\varepsilon$是正则表达式）
2. $a,b$
3. $\varepsilon|\varepsilon, \varepsilon|a,\varepsilon|b \dots$（选择）
4. $\varepsilon a,\varepsilon b, \varepsilon \varepsilon,ab,\dots,a(\varepsilon | a),\dots$（连接）
5. $\varepsilon^*, (a(\varepsilon|a))^*,\dots$（闭包）

## 语法糖

* `[c1 - cn]​` == ​ `c1|c2|...|cn​`
* `e+​` == 一个或多个`e`
* `e?​` == 零个或一个`e`，等价于$\varepsilon|e$
* `e{i, j}`​ == `i-j`个`e`的连接
* `.​` == 除`\n`外的任意字符
* ...

## 参考

[编译原理](https://mooc.study.163.com/course/1000002001?tid=2403024009)

[regexper](https://regexper.com/)
