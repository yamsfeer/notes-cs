# flex、bison

早期 Unix 的 lex / YACC，发展为 flex / bison，新版本的程序是向上兼容的，现常用 flex 和 bison。

flex 是词法分析器生成器，词法分析器可以将文本转化为一个个 token，这些 tokens 可以用 bison 处理。

## flex

安装 flex 命令：

```shell
$ brew install flex
$ flex -V
flex 2.5.35 Apple(flex-32)
$
```

### 一个 flex 程序

flex 的输入是一个 `.l` (.lex) 文件，下面通过一个 flex 程序实现类似 Unix 系统中的 `wc` 命令。

```c
// wc.l
%{
int chars = 0;
int words = 0;
int lines = 0;
%}

%%
[a-zA-Z]+  { words++; chars += strlen(yytext); }
\n         { chars++; lines++; }
.          { chars++; }
%%

int main(int argc, char **argv)
{
  yylex();
  printf("lines = %d, words = %d, chars = %d\n", lines, words, chars);
}
```

具体的 flex 文件内容会在后面介绍。执行以下命令：

```shell
$ flex wc.l
$ cc lex.yy.c -ll
$ ./a.out
The boy stood on the burning deck
shelling peanuts by the peck
^D
lines = 2 words = 12 chars = 63
$
```

`flex wc.l` 命令可以得到 flex 生成的词法分析器 `lex.yy.c`，这是一个 C 程序。使用 gcc 编译器编译执行 `lex.yy.c`。

### flex 文件结构

flex 文件的内容大部分是 C 语言，它主要包含三部分：

```C
%{
/* declarations section */
%}

%%
/* patterns and actions section */
/* pattern { action } */
%%

/* C code */
```

第一段主要写一些变量、函数声明，或者 `#include` 一些文件；

第二段由多条 pattern 和对应的 action 组成，其中 pattern 是正则表达式，action 是一段 C 代码，当解析到对应 pattern 的token 就会执行对应的 action；

第三段也是 C 代码，它会被直接复制到生成的分析器代码 `lex.yy.c` 中。

## bison

安装 bison：

```shell
$ brew install bison
$ bison -V
bison (GNU Bison) 2.3
Written by Robert Corbett and Richard Stallman.

Copyright (C) 2006 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
$
```

### bison 文件结构

bison 的文件结构和 flex 文件一样有三个部分，分别是 声明、规则和 C 语言部分，这不是巧合。

其中声明部分的代码会被复制到生成的语法分析器的代码开头。

和 flex 文件不同的是，bison 文件里有 %token 声明，用来告诉 bison 词法分析生成的 token 符号，

```c
%{
/* declarations section */
%}

/* declare tokens */
/* %token ADD */

%%
/* rules in BNF */
A -> a1 { action }
  | a2  { action }
  | ...
  | an  { action }
%%

/* C code */
```

第二部分主要是简化的 BNF（形式更像是 EBNF）以及产生式对应的语义动作，语义动作是 C 语言编写。

在产生式的语义动作中，冒号左边的用 `$$` 表示，其余用 `$1`、`$2`等符号表示。

```c
exp: factor       /* default $$ = $1 */
 | exp ADD factor { $$ = $1 + $3; }
 | exp SUB factor { $$ = $1 - $3; }
 ;
```

## 结合 flex 和 bison

flex 和 bison 的协作关系：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gxozrxriqij30ib0avwez.jpg" style="zoom:80%;" />

以四则运算为例，用 flex 和 bison 写一个运算器。

定义词法：

```c
/* calc.l */
%{
  #include "calc.tab.h"
%}

%%
"+"    { return ADD; }
"-"    { return SUB; }
"*"    { return MUL; }
"/"    { return DIV; }
"|"    { return ABS; }
[0-9]+ { yylval = atoi(yytext); return NUMBER; }
\n     { return EOL; }
[ \t]  { /* ignore whitespace */ }
.      { printf("Mystery character %c\n", *yytext); }
%%
```

定义语法：

```c
/* calc.y */
%{
#include <stdio.h>
int yylex(void);
void yyerror(char*);
%}

/* declare tokens */
%token NUMBER
%token ADD SUB MUL DIV ABS
%token EOL

%%

calclist: /* nothing */                       /* matches at beginning of input */
 | calclist exp EOL { printf("= %d\n", $2); } /* EOL is end of an expression */
 ;

exp: factor       /* default $$ = $1 */
 | exp ADD factor { $$ = $1 + $3; }
 | exp SUB factor { $$ = $1 - $3; }
 ;

factor: term       /* default $$ = $1 */
 | factor MUL term { $$ = $1 * $3; }
 | factor DIV term { $$ = $1 / $3; }
 ;

term: NUMBER  /* default $$ = $1 */
 | ABS term   { $$ = $2 >= 0? $2 : - $2; }
;
%%
int main(int argc, char **argv) {
  yyparse();
}

void yyerror(char *s) {
  fprintf(stderr, "error: %s\n", s);
}
```

写个 makefile 方便测试：

```makefile
all: clean calc
calc: calc.l calc.y
	bison -d calc.y
	flex -o calc.lex.yy.c calc.l
	cc -o $@ calc.tab.c calc.lex.yy.c -ll
clean:
	rm -f calc calc.lex.yy.c calc.tab.c calc.tab.h
```

执行：

```shell
$ make
$ ./calc
2+3*2
= 8
1+a
Mystery character a
error: syntax error
```

## 参考

[flex & bison by John Levine](https://www.oreilly.com/library/view/flex-bison/9780596805418/ch01.html)

[Flex(scanner)/Bison(parser)工作原理](https://zhuanlan.zhihu.com/p/120812270)
