# BNF、ABNF、EBNF

* `BNF` 是最原始，最简单的方法，主要用于理论背景的学术论文中，以与人类进行交流。BNF 没有确切的规范。

* `EBNF` （`Extended BNF` 扩展BNF）没有一个标准的 EBNF，因为每个作者或程序都定义了自己的稍有不同的 EBNF 变体。

* `ABNF` （ `augmented BNF` 增强BNF）的语法与 BNF 完全不同，但是更加标准化，利于解析器的翻译，但不利于阅读。

## BNF

BNF(Backus-Naur Form) 范式，在 1960 年提出，用于描述 ALGOL60语言。

BNF包含三个符号：

* `::=`，定义为
* `|`，或
* `<>`，非终结符使用尖括号

一个 BNF 例子：

```
<十进制数> ::= <无符号整数>
	| <小数>
	| <无符号整数><小数>
<无符号整数> ::= <数字> | <数字><无符号整数>
<小数> ::= .<无符号整数>
<数字> ::= 0|1|2|3|4|5|6|7|8|9
```

为了方便实用，BNF 后来增加了一些符号：

* 可选项：用 `[]` 表示，比如 `if 表达式 then 语句 [else 语句] endif`
* 重复项：用 `{}` 表示重复 0 次或多次
* 终结符加引号

## ABNF

ABNF 利于解析器的翻译，但不利于阅读。

|  规则  |                 形式定义                  |                  意义                   |
| :----: | :---------------------------------------: | :-------------------------------------: |
| ALPHA  |             %x41-5A / %x61-7A             |     大写和小写ASCII字母（A-Z, a-z）     |
| DIGIT  |                  %x30-39                  |               数字（0-9）               |
| HEXDIG | DIGIT / "A" / "B" / "C" / "D" / "E" / "F" |      十六进制数字（0-9, A-F, a-f）      |
| DQUOTE |                   %x22                    |                 双引号                  |
|   SP   |                   %x20                    |                  空格                   |
|  HTAB  |                   %x09                    |               横向制表符                |
|  WSP   |                 SP / HTAB                 |            空格或横向制表符             |
|  LWSP  |             *(WSP / CRLF WSP)             |          直线空白（晚于换行）           |
| VCHAR  |                  %x21-7E                  |            可见（打印）字符             |
|  CHAR  |                  %x01-7F                  | 任何7-位US-ASCII字符，不包括NUL（%x00） |
| OCTET  |                  %x00-FF                  |                 8位数据                 |
|  CTL   |              %x00-1F / %x7F               |                控制字符                 |
|   CR   |                   %x0D                    |                  回车                   |
|   LF   |                   %x0A                    |                  换行                   |
|  CRLF  |                   CR LF                   |             互联网标准换行              |
|  BIT   |                 "0" / "1"                 |               二进制数字                |

ABNF 例子：

```
postal-address = name-part street zip-part

name-part = *(personal-part SP) last-name [SP suffix] CRLF
name-part = / personal-part CRLF

personal-part = first-name / (initial ".")
first-name = *ALPHA
initial = ALPHA
last-name = *ALPHA
suffix = ("Jr." / "Sr." / 1*("I" / "V" / "X"))

street = [apt SP] house-num SP street-name CRLF
apt = 1*4DIGIT
house-num = 1*8（DIGIT / ALPHA）
street-name = 1*VCHAR

zip-part = town-name "," SP state 1*2SP zip-code CRLF
town-name = 1*(ALPHA / SP)
state = 2ALPHA
zip-code = 5DIGIT ["-" 4DIGIT]
```

## EBNF

EBNF 的推荐标准是 ISO-14977。符号定义如下表：

|   用途   | 符号表示  |
| :------: | :-------: |
|   定义   |     =     |
|   串接   |     ,     |
|   终止   |     ;     |
|   分隔   |    \|     |
|   可选   |  [ ... ]  |
|   重复   |  { ... }  |
|   分组   |  ( ... )  |
|  双引号  |  " ... "  |
|  单引号  |  ' ... '  |
|   注释   | (* ... *) |
| 特殊序列 |  ? ... ?  |
|   除外   |     -     |

一个 EBNF 例子：

```
(* a simple program in EBNF − Wikipedia *)
 program = 'PROGRAM' , white space , identifier , white space ,
            'BEGIN' , white space ,
            { assignment , ";" , white space } ,
            'END.' ;
 identifier = alphabetic character , [ { alphabetic character | digit } ] ;
 number = [ "-" ] , digit , [ { digit } ] ;
 string = '"' , { all characters − '"' } , '"' ;
 assignment = identifier , ":=" , ( number | identifier | string ) ;
 alphabetic character = "A" | "B" | "C" | "D" | "E" | "F" | "G"
                      | "H" | "I" | "J" | "K" | "L" | "M" | "N"
                      | "O" | "P" | "Q" | "R" | "S" | "T" | "U"
                      | "V" | "W" | "X" | "Y" | "Z" ;
 digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
 white space = ? white space characters ? ;
 all characters = ? all visible characters ? ;
```



## 三者的不同

`BNF`、`EBNF`、`ABNF` 三者的表达能力是等效的；只是语法上有差异。

* BNF 中，左式 和 右式 的分隔符通常是`::=`，在 EBNF 和 ABNF 中是 `=`；

* BNF 中，非终结符用尖括号括起来，例如，`<EXPR>`，终结符用普通字符表示。而在 ABNF 中，非终结符用普通字符表示，终结符需要用双引号括起来，例如"+" ；

* 在 BNF 和 EBNF 中，“或”符号是 `|`，在 ABNF 中是 `/`；

* EBNF 和 ABNF 还具有快捷语法语法，比如指定 0 或多个重复项。要将其用 BNF 表示，则需要引入更多规则。

通常，BNF 更适合教学、解释和理论讨论。EBNF 和 ABNF 经常用于语法定义和解析器解析，其中 ABNF 更加利于解析器解析；

在一些语言的语法定义中，会使用一些不同于以上三者的产生式定义形式，但是都会包含 “定义为“、”或“、”终结符”、“非终结符“ 这几个元素。

## 参考

[巴科斯范式](https://zh.wikipedia.org/wiki/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)

[扩充巴科斯范式](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%85%85%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)

[扩展巴科斯范式](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F)

[语法格式描述规范BNF、EBNF、ABNF](https://www.jianshu.com/p/15efcb0c06c8)

[Coursera-BNF范式](https://www.coursera.org/lecture/dmathgen/86-bnffan-shi-I1oLz)