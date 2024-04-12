import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as d,c as i,a as e,d as a,e as n,b as r}from"./app-BzW9chhs.js";const c={},o=r(`<h1 id="x86架构" tabindex="-1"><a class="header-anchor" href="#x86架构"><span>x86架构</span></a></h1><h2 id="寄存器" tabindex="-1"><a class="header-anchor" href="#寄存器"><span>寄存器</span></a></h2><p><img src="https://img-blog.csdnimg.cn/2021012013384568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW94aW5neXVuMDUwNA==,size_16,color_FFFFFF,t_70" alt=""></p><h3 id="flag-寄存器" tabindex="-1"><a class="header-anchor" href="#flag-寄存器"><span>FLAG 寄存器</span></a></h3><table><thead><tr><th>标志</th><th>说明</th></tr></thead><tbody><tr><td>CF</td><td>进位标志 (Carry), 如果运算的最高为产生进位或借位, 则CF=1</td></tr><tr><td>PF</td><td>奇偶位 (Parity), 如果运算结果的低8 位中的1的个数(二进制)为偶数个, 则PF=1</td></tr><tr><td>AF</td><td>辅助进位标志 (Auxiliary), 当运算结果的低4 位产生一个进位或借位, 则AF=1</td></tr><tr><td>ZF</td><td>零标志 (Zero), 若运算结果为0, 则ZF=1</td></tr><tr><td>SF</td><td>符号标志 (Signed), 当数据用补码表示时, 最高为表示符号为, SF与运算结果最高为相同</td></tr><tr><td>OF</td><td>溢出标志 (Overflow), 若运算中产生了溢出, 则OF=1</td></tr><tr><td>DF</td><td>方向标志 (Direction), 用于控制串操作指令, 如果DF=0, 则串操作过程中地址会增大, 否则地址会减小</td></tr><tr><td>IF</td><td>中断允许标志 (Interrupt), 若IF=0, 则CPU不能对可屏蔽中断做出响应, 否则CPU可以接受可屏蔽中断</td></tr><tr><td>TF</td><td>单步标志 (Trap), 如果TF=1, 则CPU按跟踪方式执行指令</td></tr></tbody></table><h2 id="指令集" tabindex="-1"><a class="header-anchor" href="#指令集"><span>指令集</span></a></h2><h3 id="数据传输指令" tabindex="-1"><a class="header-anchor" href="#数据传输指令"><span>数据传输指令</span></a></h3><p>在存储器和寄存器、寄存器和输入输出端口之间传送数据。</p><ol><li>通用数据传输指令：</li></ol><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>MOV     传送字或字节.  
MOVSX   先符号扩展,再传送.  
MOVZX   先零扩展,再传送.  
PUSH    把字压入堆栈.  
POP     把字弹出堆栈.  
PUSHA   把AX,CX,DX,BX,SP,BP,SI,DI依次压入堆栈.  
POPA    把DI,SI,BP,SP,BX,DX,CX,AX依次弹出堆栈.  
PUSHAD  把EAX,ECX,EDX,EBX,ESP,EBP,ESI,EDI依次压入堆栈.  
POPAD   把EDI,ESI,EBP,ESP,EBX,EDX,ECX,EAX依次弹出堆栈.  
BSWAP   交换32位寄存器里字节的顺序  
XCHG    交换字或字节.(至少有一个操作数为寄存器,段寄存器不可作为操作数)  
CMPXCHG 比较并交换操作数.(第二个操作数必须为累加器AL/AX/EAX)  
XADD    先交换再累加.(结果在第一个操作数里)  
XLAT    字节查表转换.----BX指向一张256字节的表的起点,AL为表的索引值(0-255,即0-FFH);
        返回AL为查表结果.([BX+AL]-&gt;AL)
</code></pre></div><ol start="2"><li><p>输入输出端口传送指令.</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>IN      I/O端口输入. ( 语法: IN   累加器,    {端口号│DX} )  
OUT     I/O端口输出. ( 语法: OUT {端口号│DX},累加器 )输入输出端口由立即方式指定时,    其范围是 0-255; 由寄存器 DX 指定时,其范围是    0-65535.
</code></pre></div></li><li><p>目的地址传送指令</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>LEA     装入有效地址.例: LEA DX,string ;把偏移地址存到DX.  
LDS     传送目标指针,把指针内容装入DS.例: LDS SI,string   ;把段地址:偏移地址存到DS:SI.  
LES     传送目标指针,把指针内容装入ES.例: LES DI,string   ;把段地址:偏移地址存到ES:DI.  
LFS     传送目标指针,把指针内容装入FS.例: LFS DI,string   ;把段地址:偏移地址存到FS:DI.  
LGS     传送目标指针,把指针内容装入GS.例: LGS DI,string   ;把段地址:偏移地址存到GS:DI.  
LSS     传送目标指针,把指针内容装入SS.例: LSS DI,string   ;把段地址:偏移地址存到SS:DI.
</code></pre></div></li><li><p>标志传送指令.</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>LAHF    标志寄存器传送,把标志装入AH.  
SAHF    标志寄存器传送,把AH内容装入标志寄存器.  
PUSHF   标志入栈.  
POPF    标志出栈.  
PUSHD   32位标志入栈.  
POPD    32位标志出栈.
</code></pre></div></li></ol><h3 id="算术运算指令" tabindex="-1"><a class="header-anchor" href="#算术运算指令"><span>算术运算指令</span></a></h3><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>ADD     加法.  
ADC     带进位加法.  
INC     加 1.  
AAA     加法的ASCII码调整.  
DAA     加法的十进制调整.  
SUB     减法.  
SBB     带借位减法.  
DEC     减 1.  
NEG     求反(以    0 减之).  
CMP     比较.(两操作数作减法,仅修改标志位,不回送结果).  
AAS     减法的ASCII码调整.  
DAS     减法的十进制调整.  
MUL     无符号乘法.结果回送AH和AL(字节运算),或DX和AX(字运算),  
IMUL    整数乘法.结果回送AH和AL(字节运算),或DX和AX(字运算),  
AAM     乘法的ASCII码调整.  
DIV     无符号除法.结果回送:商回送AL,余数回送AH, (字节运算);或 商回送AX,余数回送DX, (字运算).  
IDIV    整数除法.结果回送:商回送AL,余数回送AH, (字节运算);或 商回送AX,余数回送DX, (字运算).  
AAD     除法的ASCII码调整.  
CBW     字节转换为字. (把AL中字节的符号扩展到AH中去)  
CWD     字转换为双字. (把AX中的字的符号扩展到DX中去)  
CWDE    字转换为双字. (把AX中的字符号扩展到EAX中去)  
CDQ     双字扩展. (把EAX中的字的符号扩展到EDX中去)
</code></pre></div><h3 id="逻辑运算指令" tabindex="-1"><a class="header-anchor" href="#逻辑运算指令"><span>逻辑运算指令</span></a></h3><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>AND     与运算.  
OR      或运算.  
XOR     异或运算.  
NOT     取反.  
TEST    测试.(两操作数作与运算,仅修改标志位,不回送结果).  
SHL     逻辑左移.  
SAL     算术左移.(=SHL)  
SHR     逻辑右移.  
SAR     算术右移.(=SHR)  
ROL     循环左移.  
ROR     循环右移.  
RCL     通过进位的循环左移.  
RCR     通过进位的循环右移.  
          以上八种移位指令,其移位次数可达255次.  
          移位一次时, 可直接用操作码. 如 SHL AX,1.  
          移位&gt;1次时, 则由寄存器CL给出移位次数.  
          如 MOV CL,04   SHL AX,CL
</code></pre></div><h3 id="串指令" tabindex="-1"><a class="header-anchor" href="#串指令"><span>串指令</span></a></h3><p>DS:SI 源串段寄存器 :源串变址. ES:DI 目标串段寄存器:目标串变址. CX 重复次数计数器. AL/AX 扫描值. D标志 0表示重复操作中SI和DI应自动增量; 1表示应自动减量. Z标志 用来控制扫描或比较操作的结束.</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>MOVS    串传送.( MOVSB 传送字符. MOVSW 传送字. MOVSD 传送双字. )  
CMPS    串比较.( CMPSB 比较字符. CMPSW 比较字. )  
SCAS    串扫描.把AL或AX的内容与目标串作比较,比较结果反映在标志位.  
LODS    装入串.把源串中的元素(字或字节)逐一装入AL或AX中.( LODSB 传送字符. LODSW 传送字.    LODSD 传送双字. )  
STOS    保存串.是LODS的逆过程.  
REP         当CX/ECX&lt;&gt;0时重复.  
REPE/REPZ   当ZF=1或比较结果相等,且CX/ECX&lt;&gt;0时重复.  
REPNE/REPNZ 当ZF=0或比较结果不相等,且CX/ECX&lt;&gt;0时重复.  
REPC        当CF=1且CX/ECX&lt;&gt;0时重复.  
REPNC       当CF=0且CX/ECX&lt;&gt;0时重复.
</code></pre></div><h3 id="程序转移指令" tabindex="-1"><a class="header-anchor" href="#程序转移指令"><span>程序转移指令</span></a></h3><ol><li><p>无条件转移指令 (长转移)</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>JMP         无条件转移指令  
CALL        过程调用  
RET/RETF    过程返回.
</code></pre></div></li><li><p>条件转移指令 (短转移,-128到+127的距离内)( 当且仅当(SF XOR OF)=1时,OP1&lt;OP2 )</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>JA/JNBE     不小于或不等于时转移.  
JAE/JNB     大于或等于转移.  
JB/JNAE     小于转移.  
JBE/JNA     小于或等于转移.  
    以上四条,测试无符号整数运算的结果(标志C和Z).  
JG/JNLE     大于转移.  
JGE/JNL     大于或等于转移.  
JL/JNGE     小于转移.  
JLE/JNG     小于或等于转移.  
    以上四条,测试带符号整数运算的结果(标志S,O和Z).  
JE/JZ       等于转移.  
JNE/JNZ     不等于时转移.  
JC          有进位时转移.  
JNC         无进位时转移.  
JNO         不溢出时转移.  
JNP/JPO     奇偶性为奇数时转移.  
JNS         符号位为 &quot;0&quot; 时转移.  
JO          溢出转移.  
JP/JPE      奇偶性为偶数时转移.  
JS          符号位为 &quot;1&quot; 时转移.
</code></pre></div></li><li><p>循环控制指令(短转移)</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>LOOP            CX不为零时循环.  
LOOPE/LOOPZ     CX不为零且标志Z=1时循环.  
LOOPNE/LOOPNZ   CX不为零且标志Z=0时循环.  
JCXZ            CX为零时转移.  
JECXZ           ECX为零时转移.
</code></pre></div></li><li><p>中断指令</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>INT         中断指令  
INTO        溢出中断  
IRET        中断返回
</code></pre></div></li><li><p>处理器控制指令</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>HLT         处理器暂停,  直到出现中断或复位信号才继续.  
WAIT        当芯片引线TEST为高电平时使CPU进入等待状态.  
ESC         转换到外处理器.  
LOCK        封锁总线.  
NOP         空操作.  
STC         置进位标志位.  
CLC         清进位标志位.  
CMC         进位标志取反.  
STD         置方向标志位.  
CLD         清方向标志位.  
STI         置中断允许位.  
CLI         清中断允许位.
</code></pre></div></li></ol><h3 id="伪指令" tabindex="-1"><a class="header-anchor" href="#伪指令"><span>伪指令</span></a></h3><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>DW          定义字(2字节).  
PROC        定义过程.  
ENDP        过程结束.  
SEGMENT     定义段.  
ASSUME      建立段寄存器寻址.  
ENDS        段结束.  
END         程序结束.
</code></pre></div><h3 id="标志处理指令" tabindex="-1"><a class="header-anchor" href="#标志处理指令"><span>标志处理指令</span></a></h3><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>CLC     进位位置0指令  
CMC     进位位求反指令  
STC     进位位置为1指令  
CLD     方向标志置1指令  
STD     方向标志位置1指令  
CLI     中断标志置0指令  
STI     中断标志置1指令  
NOP     无操作  
HLT     停机  
WAIT    等待  
ESC     换码  
LOCK    封锁
</code></pre></div><h2 id="寻址方式" tabindex="-1"><a class="header-anchor" href="#寻址方式"><span>寻址方式</span></a></h2><p>立即寻址</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>MOV AX, 1234H # 将 1234H 存入寄存器AX, （AH = 12H, AL = 34H）
</code></pre></div><p>寄存器寻址</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>MOV AX, BX # 将BX中的数据放入AX
</code></pre></div><p>直接寻址</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>MOV AX, [1000H] # 将 1000H 地址的数据放入 AX
</code></pre></div><p>寄存器间接寻址</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>MOV AX, [BX] # BX 存放的是地址，将内存地址中的数据放入 AX
</code></pre></div><p>相对寄存器寻址</p><div class="language-assembly" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>MOV AX, [BX+2H]
MOV AX, [BX+SI+2H]
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,36),p={href:"https://dassein.github.io/2020/05/21/assembly/8086%E6%8C%87%E4%BB%A4%E9%9B%86/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://devld.me/2017/10/29/8086-assembly-01/",target:"_blank",rel:"noopener noreferrer"};function A(h,x){const t=s("ExternalLinkIcon");return d(),i("div",null,[o,e("p",null,[e("a",p,[a("8086汇编指令集"),n(t)])]),e("p",null,[e("a",g,[a("8086 汇编笔记"),n(t)])])])}const X=l(c,[["render",A],["__file","2.1.x86架构.html.vue"]]),m=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84/2.1.x86%E6%9E%B6%E6%9E%84.html","title":"x86架构","lang":"zh-CN","frontmatter":{"description":"x86架构 寄存器 FLAG 寄存器 指令集 数据传输指令 在存储器和寄存器、寄存器和输入输出端口之间传送数据。 通用数据传输指令： 输入输出端口传送指令. 目的地址传送指令 标志传送指令. 算术运算指令 逻辑运算指令 串指令 DS:SI 源串段寄存器 :源串变址. ES:DI 目标串段寄存器:目标串变址. CX 重复次数计数器. AL/AX 扫描值....","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-cs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84/2.1.x86%E6%9E%B6%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"x86架构"}],["meta",{"property":"og:description","content":"x86架构 寄存器 FLAG 寄存器 指令集 数据传输指令 在存储器和寄存器、寄存器和输入输出端口之间传送数据。 通用数据传输指令： 输入输出端口传送指令. 目的地址传送指令 标志传送指令. 算术运算指令 逻辑运算指令 串指令 DS:SI 源串段寄存器 :源串变址. ES:DI 目标串段寄存器:目标串变址. CX 重复次数计数器. AL/AX 扫描值...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdnimg.cn/2021012013384568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW94aW5neXVuMDUwNA==,size_16,color_FFFFFF,t_70"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T15:44:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T15:44:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"x86架构\\",\\"image\\":[\\"https://img-blog.csdnimg.cn/2021012013384568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW94aW5neXVuMDUwNA==,size_16,color_FFFFFF,t_70\\"],\\"dateModified\\":\\"2024-04-12T15:44:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"寄存器","slug":"寄存器","link":"#寄存器","children":[{"level":3,"title":"FLAG 寄存器","slug":"flag-寄存器","link":"#flag-寄存器","children":[]}]},{"level":2,"title":"指令集","slug":"指令集","link":"#指令集","children":[{"level":3,"title":"数据传输指令","slug":"数据传输指令","link":"#数据传输指令","children":[]},{"level":3,"title":"算术运算指令","slug":"算术运算指令","link":"#算术运算指令","children":[]},{"level":3,"title":"逻辑运算指令","slug":"逻辑运算指令","link":"#逻辑运算指令","children":[]},{"level":3,"title":"串指令","slug":"串指令","link":"#串指令","children":[]},{"level":3,"title":"程序转移指令","slug":"程序转移指令","link":"#程序转移指令","children":[]},{"level":3,"title":"伪指令","slug":"伪指令","link":"#伪指令","children":[]},{"level":3,"title":"标志处理指令","slug":"标志处理指令","link":"#标志处理指令","children":[]}]},{"level":2,"title":"寻址方式","slug":"寻址方式","link":"#寻址方式","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712936658000,"updatedTime":1712936658000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":8.03,"words":2410},"filePathRelative":"计算机基础/体系结构/2.1.x86架构.md","localizedDate":"2024年4月12日","autoDesc":true}');export{X as comp,m as data};
