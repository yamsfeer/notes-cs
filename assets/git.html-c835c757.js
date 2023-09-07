import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as c,c as r,a,b as s,d as e,e as t}from"./app-706bfe03.js";const l={},i=t(`<h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> git</h1><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/git工作流.jpg" alt=""></p><div class="language-text" data-ext="text"><pre class="language-text"><code>- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库
</code></pre></div><div class="language-text" data-ext="text"><pre class="language-text"><code>start a working area (see also: git help tutorial)
   clone             Clone a repository into a new directory
   init              Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add               Add file contents to the index
   mv                Move or rename a file, a directory, or a symlink
   restore           Restore working tree files
   rm                Remove files from the working tree and from the index
   sparse-checkout   Initialize and modify the sparse-checkout

examine the history and state (see also: git help revisions)
   bisect            Use binary search to find the commit that introduced a bug
   diff              Show changes between commits, commit and working tree, etc
   grep              Print lines matching a pattern
   log               Show commit logs
   show              Show various types of objects
   status            Show the working tree status

grow, mark and tweak your common history
   branch            List, create, or delete branches
   commit            Record changes to the repository
   merge             Join two or more development histories together
   rebase            Reapply commits on top of another base tip
   reset             Reset current HEAD to the specified state
   switch            Switch branches
   tag               Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch             Download objects and refs from another repository
   pull              Fetch from and integrate with another repository or a local branch
   push              Update remote refs along with associated objects
</code></pre></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><p>git basic:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init <span class="token operator">&lt;</span>directory<span class="token operator">&gt;</span> <span class="token comment"># 在指定⽬录创建repo，不带参数将在当前⽬录创建</span>
$ <span class="token function">git</span> clone <span class="token operator">&lt;</span>repo<span class="token operator">&gt;</span> <span class="token comment"># 克隆⼀个repo到本地，repo可以是本地⽂件系统、HTTP或SSH地址</span>
$ <span class="token function">git</span> config user.name <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token comment"># 针对当前repo配置⽤户名，--global 配置全局⽤户名</span>

$ <span class="token function">git</span> status <span class="token comment"># 显示哪些⽂件已被staged、未被staged以及未跟踪(untracked)</span>
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span> <span class="token comment"># 将所有修改加⼊到 stage</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token operator">&lt;</span>message<span class="token operator">&gt;</span> <span class="token comment"># 提交暂存区的修改，message 作为提交信息</span>
$ <span class="token function">git</span> log <span class="token comment"># 以缺省格式显示全部commit历史</span>
</code></pre></div><p>git diff:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token comment"># ⽐较⼯作区和暂存区的修改。</span>
$ <span class="token function">git</span> <span class="token function">diff</span> HEAD <span class="token comment"># ⽐较⼯作区和上⼀次commit后的修改。</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span> <span class="token comment"># ⽐较暂存区和上⼀次commit后的修改。</span>
$ <span class="token function">git</span> show <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span> <span class="token comment"># 查看某个commit的修改</span>
</code></pre></div><p>rewriting git history:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token operator">&lt;</span>message<span class="token operator">&gt;</span> <span class="token parameter variable">--amend</span> <span class="token comment"># 将当前staged修改合并到最近⼀次的commit中</span>
$ <span class="token function">git</span> rebase <span class="token operator">&lt;</span>base<span class="token operator">&gt;</span> <span class="token comment"># 基于base对当前分⽀rebase，base可以是commit、分⽀名、tag或commit</span>
$ <span class="token function">git</span> reflog <span class="token comment"># 显示所有commit⽇志，包括版本回退的历史</span>
</code></pre></div><p>git branchs:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token comment"># 显示本地所有分⽀</span>
$ <span class="token function">git</span> branch <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 创建一个新分支</span>
$ <span class="token function">git</span> switch <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 切换到已有分支</span>
$ <span class="token function">git</span> switch <span class="token parameter variable">-c</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 创建并切换到&lt;branch&gt;分⽀</span>
$ <span class="token function">git</span> merge <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 将指定 branch 分⽀合并到当前分⽀</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 删除分支</span>
</code></pre></div><p>remote repositories:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">add</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span> <span class="token comment"># 添加新的远程仓库，添加后可使⽤name作为远程连接的名称。</span>
$ <span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># 下载远端仓库的一个分支，去掉branch将抓取所有分⽀。</span>
$ <span class="token function">git</span> pull <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token comment"># 从指定&lt;remote&gt;抓取所有分⽀的commit并⽴刻合并到本地repo。</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span> <span class="token comment"># push本地分支到远端，如果远端没有对应的分⽀，将⾃动创建分⽀</span>
</code></pre></div><p>git config:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token comment"># 配置⽤户名</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token operator">&lt;</span>email<span class="token operator">&gt;</span> <span class="token comment"># 配置⽤户Email</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.<span class="token operator">&lt;</span>alias-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>git-command<span class="token operator">&gt;</span> <span class="token comment"># 配置别名</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--system</span> core.editor <span class="token operator">&lt;</span>editor<span class="token operator">&gt;</span> <span class="token comment"># 配置⽂本编辑器，默认vi编辑器</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--edit</span> <span class="token comment"># 编辑器打开git全局配置</span>
</code></pre></div><p>git log:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log -<span class="token operator">&lt;</span>limit<span class="token operator">&gt;</span> <span class="token comment"># 限制log的显示数量。例如：”git log -5”仅显示最新5条commit。</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token comment"># 每⾏显示⼀条commit。</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token comment"># 使⽤--graph参数显示图形化的branch信息。</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--grep</span><span class="token operator">=</span><span class="token operator">&lt;</span>pattern<span class="token operator">&gt;</span> <span class="token comment"># 按指定内容搜索并显示commit。</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token operator">&lt;</span>pattern<span class="token operator">&gt;</span> <span class="token comment"># 按提交者名字搜索并显示commit。</span>
$ <span class="token function">git</span> log --<span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> <span class="token comment"># 仅显示包含指定⽂件修改的commit。</span>
$ <span class="token function">git</span> log <span class="token operator">&lt;</span>since<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>until<span class="token operator">&gt;</span> <span class="token comment"># 显示指定范围的commit。可以是commit ID、分⽀名称、HEAD</span>
</code></pre></div><p>git reset:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> reset <span class="token comment"># 清除暂存区，⼯作区状态不变</span>
$ <span class="token function">git</span> reset <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span> <span class="token comment"># 将file从暂存区移除，⼯作区不变</span>
$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token comment"># 清空暂存区和工作区的所有修改</span>
$ <span class="token function">git</span> reset <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span> <span class="token comment"># 当前分⽀回滚到指定commit，清除暂存区，⼯作区状态不变</span>
$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span> <span class="token comment"># 当前分⽀回滚到指定commit，清除暂存区和工作区</span>
</code></pre></div><p>git rebase:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>startpoint<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>endpoint<span class="token operator">&gt;</span> <span class="token comment"># 以交互模式rebase。</span>
</code></pre></div><p>git pull / git push:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> pull <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token comment"># 抓取所有远程分⽀并merge</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token parameter variable">--force</span> <span class="token comment"># 将本地分⽀推送到远程，慎用--force参数</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote<span class="token operator">&gt;</span> <span class="token parameter variable">--tags</span> <span class="token comment"># push命令不会⾃动将本地tag推送到远程。需要--tags</span>
</code></pre></div><p>git tag:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> tag <span class="token comment"># 查看所有标签</span>
$ <span class="token function">git</span> tag <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span> <span class="token comment"># 新建标签，默认为指向 HEAD，也可以指定 commit id</span>
$ <span class="token function">git</span> tag <span class="token parameter variable">-a</span> <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;tag message&quot;</span> <span class="token comment"># 指定标签信息，-a 指定标签名</span>
$ <span class="token function">git</span> show <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># 查看一个 tag 的信息</span>

$ <span class="token function">git</span> push origin <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># push 本地标签</span>
$ <span class="token function">git</span> push origin <span class="token parameter variable">--tags</span> <span class="token comment"># 推送全部未推送过的本地标签</span>
$ <span class="token function">git</span> tag <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># 删除本地标签</span>
$ <span class="token function">git</span> push origin :refs/tags/<span class="token operator">&lt;</span>tagname<span class="token operator">&gt;</span> <span class="token comment"># 删除远程标签。</span>
</code></pre></div><h2 id="工作区和暂存区" tabindex="-1"><a class="header-anchor" href="#工作区和暂存区" aria-hidden="true">#</a> 工作区和暂存区</h2><p>一个 git repo 是由 <code>.git</code> 文件夹管理的，里面有暂存区( stage 或 index )，各个分支( branch )，以及指向版本的 HEAD 指针，<code>.git</code> 之外的称为工作区。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ ll .git
total <span class="token number">96</span>
-rw-r--r--    <span class="token number">1</span> yams  staff     4B  <span class="token number">5</span> <span class="token number">15</span> <span class="token number">16</span>:09 COMMIT_EDITMSG
-rw-r--r--    <span class="token number">1</span> yams  staff   101B  <span class="token number">5</span> <span class="token number">12</span> <span class="token number">20</span>:25 FETCH_HEAD
-rw-r--r--    <span class="token number">1</span> yams  staff    23B  <span class="token number">8</span> <span class="token number">17</span>  <span class="token number">2021</span> HEAD
-rw-r--r--    <span class="token number">1</span> yams  staff    41B  <span class="token number">5</span> <span class="token number">11</span> <span class="token number">21</span>:08 ORIG_HEAD
-rw-r--r--    <span class="token number">1</span> yams  staff   377B  <span class="token number">5</span> <span class="token number">12</span> <span class="token number">20</span>:25 config
-rw-r--r--    <span class="token number">1</span> yams  staff    73B <span class="token number">11</span> <span class="token number">19</span>  <span class="token number">2019</span> description
drwxr-xr-x   <span class="token number">33</span> yams  staff   <span class="token number">1</span>.0K <span class="token number">11</span> <span class="token number">20</span>  <span class="token number">2019</span> hooks
-rw-r--r--    <span class="token number">1</span> yams  staff    19K  <span class="token number">5</span> <span class="token number">15</span> <span class="token number">16</span>:09 index
drwxr-xr-x    <span class="token number">3</span> yams  staff    96B <span class="token number">11</span> <span class="token number">19</span>  <span class="token number">2019</span> info
drwxr-xr-x    <span class="token number">4</span> yams  staff   128B <span class="token number">11</span> <span class="token number">15</span>  <span class="token number">2021</span> lfs
drwxr-xr-x    <span class="token number">4</span> yams  staff   128B <span class="token number">11</span> <span class="token number">19</span>  <span class="token number">2019</span> logs
drwxr-xr-x  <span class="token number">255</span> yams  staff   <span class="token number">8</span>.0K  <span class="token number">5</span> <span class="token number">15</span> <span class="token number">16</span>:09 objects
-rw-r--r--    <span class="token number">1</span> yams  staff   114B  <span class="token number">8</span> <span class="token number">23</span>  <span class="token number">2021</span> packed-refs
drwxr-xr-x    <span class="token number">5</span> yams  staff   160B <span class="token number">11</span> <span class="token number">19</span>  <span class="token number">2019</span> refs
</code></pre></div><p>工作区的所有修改，比如增加文件，删除文件，修改文件内容，都需要添加到暂存区，然后才能 commit。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init
$ <span class="token function">touch</span> hello
$ <span class="token function">git</span> <span class="token function">add</span> hello
</code></pre></div><ol><li><p>如果修改了工作区文件的内容，需要丢弃工作区的修改，使用命令 <code>git checkout -- file</code></p></li><li><p>如果不但修改了工作区文件的内容，还添加到了暂存区，需要丢弃修改，先用命令 <code>git reset HEAD &lt;file&gt;</code> 回到第一种情况，然后 <code>git checkout -- file</code></p></li><li><p>已经提交了不合适的修改到版本库时，想要撤销本次提交，此时需要版本回退，使用命令 <code>git reset --hard HEAD^</code>，前提是没有推送到远程库。</p></li></ol><p><code>git checkout</code> 就是用版本库( 暂存区或已经 commit )版本替换工作区版本，无论工作区是修改还是删除，都可以替换。</p><h2 id="远程仓库-remote" tabindex="-1"><a class="header-anchor" href="#远程仓库-remote" aria-hidden="true">#</a> 远程仓库( remote )</h2><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>                          <span class="token comment"># 查看已有远程仓库</span>
$ <span class="token function">git</span> remote <span class="token function">add</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>repo-url<span class="token operator">&gt;</span>       <span class="token comment"># 添加远程仓库，可以是 https 或 ssh 地址</span>
$ <span class="token function">git</span> remote set-url <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>repo-url<span class="token operator">&gt;</span>   <span class="token comment"># 修改一个远程仓库的地址</span>
$ <span class="token function">git</span> remote <span class="token function">rename</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>new-name<span class="token operator">&gt;</span>    <span class="token comment"># 重命名一个已有的远程仓库名</span>
$ <span class="token function">git</span> remote <span class="token function">rm</span> <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span>                   <span class="token comment"># 移除一个远程仓库</span>
</code></pre></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">rm</span> hello
</code></pre></div><p>从存储库中删除远程 URL 只会取消本地和远程存储库的链接。 它不会删除远程存储库。</p><p>来做个小实验，先初始化一个 repo：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init vscode
$ <span class="token builtin class-name">cd</span> vscode
</code></pre></div><p>此时还没有远程仓库，将 vscode 作为远程仓库地址，命名为 origin：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:microsoft/vscode.git
$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>
origin	git@github.com:microsoft/vscode.git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin	git@github.com:microsoft/vscode.git <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre></div><p>如果有 commit 需要 push 到 github 的远程仓库的 master 分支：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push origin master
</code></pre></div><p>将 origin 改名为 vscode：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token function">rename</span> origin vscode
$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>
vscode	git@github.com:microsoft/vscode.git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
vscode	git@github.com:microsoft/vscode.git <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre></div><p>push 命令要相应改为</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> push vscode master
</code></pre></div><p>将 https 协议改为 ssh 地址：</p><div class="language-sshell" data-ext="sshell"><pre class="language-sshell"><code>$ git remote set-url vscode https://github.com/microsoft/vscode.git
$ git remote -v
vscode	https://github.com/microsoft/vscode.git (fetch)
vscode	https://github.com/microsoft/vscode.git (push)
</code></pre></div><p>删除远程仓库：</p><div class="language-text" data-ext="text"><pre class="language-text"><code>$ git remote rm vscode
</code></pre></div><p>从存储库中删除远程 URL 只会取消本地和远程存储库的链接。 它不会删除远程存储库。</p><h2 id="git-变基-rebase" tabindex="-1"><a class="header-anchor" href="#git-变基-rebase" aria-hidden="true">#</a> git 变基( rebase )</h2><p><code>git rebase</code> 可以对一段 commit 历史进行编辑，合理使用可以使提交历史变得简洁。</p><p>同时，和所有会改变提交历史的命令一样，在 commit 已经 push 到远端仓库的情况下不建议使用，否则会造成麻烦。</p><p>我们可以用 <code>git rebase</code> 合并多个 commit。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase <span class="token parameter variable">-i</span> <span class="token punctuation">[</span>startpoint<span class="token punctuation">]</span> <span class="token punctuation">[</span>endpoint<span class="token punctuation">]</span>
</code></pre></div><p>其中 <code>--interactive</code> 表示弹出交互式界面来编辑具体合并操作，<code>[startpoint] [endpoint]</code> 则指定了 rebase 的编辑区间，<code>[endpoint]</code> 默认是 <code>HEAD</code>。( 注意这是一个<strong>左开右闭</strong>区间 )</p><p>假设当前有 4 个 commit，我们将新的 2 个 commit 合并为 1 个：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
77b14bc <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> commit4
f7233cf commit3
61a55fb commit2
4af1183 commit1
</code></pre></div><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> rebase <span class="token parameter variable">-i</span> 61a55fb <span class="token comment"># 61a55fb 是 commit2 的 commit id</span>
</code></pre></div><p>交互式编辑界面如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pick f7233cf commit3
pick 77b14bc commit4

<span class="token comment"># Rebase 61a55fb..77b14bc onto 61a55fb (2 commands)</span>
<span class="token comment">#</span>
<span class="token comment"># Commands:</span>
<span class="token comment"># p, pick &lt;commit&gt; = use commit</span>
<span class="token comment"># r, reword &lt;commit&gt; = use commit, but edit the commit message</span>
<span class="token comment"># e, edit &lt;commit&gt; = use commit, but stop for amending</span>
<span class="token comment"># s, squash &lt;commit&gt; = use commit, but meld into previous commit</span>
<span class="token comment"># f, fixup &lt;commit&gt; = like &quot;squash&quot;, but discard this commit&#39;s log message</span>
<span class="token comment"># x, exec &lt;command&gt; = run command (the rest of the line) using shell</span>
<span class="token comment"># b, break = stop here (continue rebase later with &#39;git rebase --continue&#39;)</span>
<span class="token comment"># d, drop &lt;commit&gt; = remove commit</span>
<span class="token comment"># l, label &lt;label&gt; = label current HEAD with a name</span>
<span class="token comment"># t, reset &lt;label&gt; = reset HEAD to a label</span>
<span class="token comment"># m, merge [-C &lt;commit&gt; | -c &lt;commit&gt;] &lt;label&gt; [# &lt;oneline&gt;]</span>
<span class="token comment"># .       create a merge commit using the original merge commit&#39;s</span>
<span class="token comment"># .       message (or the oneline, if no original merge commit was</span>
<span class="token comment"># .       specified). Use -c &lt;commit&gt; to reword the commit message.</span>
<span class="token comment">#</span>
<span class="token comment"># These lines can be re-ordered; they are executed from top to bottom.</span>
<span class="token comment">#</span>
<span class="token comment"># If you remove a line here THAT COMMIT WILL BE LOST.</span>
<span class="token comment">#</span>
<span class="token comment"># However, if you remove everything, the rebase will be aborted.</span>
<span class="token comment">#</span>
</code></pre></div><p>可以看到 commit2 本身并不在其中，这验证了前面提到的左开右闭区间的特点。</p><p>上面注释中有各种操作的说明，比如</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>p, pick <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span> <span class="token operator">=</span> use commit
<span class="token punctuation">..</span>.
s, squash <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span> <span class="token operator">=</span> use commit, but meld into previous commit
</code></pre></div><p>这里选几个操作说明。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pick     <span class="token comment"># 使用 commit</span>
reword   <span class="token comment"># 使用 commit，修改该 commit 的 message</span>
edit     <span class="token comment"># 使用 commit，并修改该 commit 的内容（不仅仅是 commit message）</span>
squash   <span class="token comment"># 将该 commit 和前一个 commit 合并</span>
fixup    <span class="token comment"># 类似于 squash，但不保留 commit message</span>
<span class="token builtin class-name">exec</span>     <span class="token comment"># 执行 shell 命令</span>
drop     <span class="token comment"># 丢弃该 commit</span>
</code></pre></div><p>为了合并 commit，编辑效果如下：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>pick f7233cf commit3
squash 77b14bc commit4
</code></pre></div><p>保存后会提示编辑合并后的 commit message。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># This is a combination of 2 commits.</span>
<span class="token comment"># This is the 1st commit message:</span>

commit3

<span class="token comment"># This is the commit message #2:</span>

commit4

<span class="token comment"># Please enter the commit message for your changes. Lines starting</span>
<span class="token comment"># with &#39;#&#39; will be ignored, and an empty message aborts the commit.</span>
<span class="token comment">#</span>
<span class="token comment"># Date:      Sun May 15 20:32:00 2022 +0800</span>
<span class="token comment">#</span>
<span class="token comment"># interactive rebase in progress; onto 61a55fb</span>
<span class="token comment"># Last commands done (2 commands done):</span>
<span class="token comment">#    pick f7233cf commit3</span>
<span class="token comment">#    squash 77b14bc commit4</span>
<span class="token comment"># No commands remaining.</span>
<span class="token comment"># You are currently rebasing branch &#39;master&#39; on &#39;61a55fb&#39;.</span>
<span class="token comment">#</span>
<span class="token comment"># Changes to be committed:</span>
<span class="token comment">#       new file:   file3</span>
<span class="token comment">#       new file:   file5</span>
</code></pre></div><p>输入 “combine commit” 后保存即可完成 rebase。rebase 后的提交历史：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>
8de4399 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> combine commit
61a55fb commit2
4af1183 commit1
</code></pre></div><p>由于 git 历史记录被更改，因此通常的 <code>git push origin</code> <strong>不起</strong>作用。 此时需要“强制推送”：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Don&#39;t override changes</span>
$ <span class="token function">git</span> push origin main --force-with-lease

<span class="token comment"># Override changes</span>
$ <span class="token function">git</span> push origin main <span class="token parameter variable">--force</span>
</code></pre></div><p>强制推送具有严重的影响，因为它会更改分支提交的历史顺序。 请谨慎使用，尤其是多人协作时。</p><h2 id="凭证系统-credentials-system" tabindex="-1"><a class="header-anchor" href="#凭证系统-credentials-system" aria-hidden="true">#</a> 凭证系统( credentials system )</h2><p>在 clone 仓库时，如果使用的是 https 协议，则每次 push 或 pull 都需要输入账户密码。</p><p>git 默认是不缓存用户名密码的，需要一些配置。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper         <span class="token comment"># 查看当前缓存模式</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper <span class="token punctuation">[</span>mode<span class="token punctuation">]</span>  <span class="token comment"># 设置缓存模式</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> credential.helper <span class="token comment"># 移除缓存模式</span>
</code></pre></div><h3 id="git-内置凭证-cache-和-store" tabindex="-1"><a class="header-anchor" href="#git-内置凭证-cache-和-store" aria-hidden="true">#</a> git 内置凭证：cache 和 store</h3><p>git 提供了两种模式：<code>cache</code> 和 <code>store</code>。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper cache
</code></pre></div><p><code>cache</code> 模式下，git 会把登录信息保存在机器<strong>内存</strong>中一段时间，时间过后将被从内存中移除。一般是15分钟，可以添加参数自定义过期时间，比如 <code>--timeout 30000</code>。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper store
</code></pre></div><p><code>store</code> 模式下，git 会把登录信息保留在<strong>硬盘</strong>中，且<strong>没有失效时间</strong>，除非修改密码或主动取消该模式。</p><p>该模式存在安全问题，<strong>密码信息是用明文保存的</strong>。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> ~/.git-credentials 
https://username:ghp_Wkl<span class="token punctuation">..</span><span class="token punctuation">..</span>.xxxx@github.com
</code></pre></div><h3 id="其他凭证系统" tabindex="-1"><a class="header-anchor" href="#其他凭证系统" aria-hidden="true">#</a> 其他凭证系统</h3><h4 id="oxskeychain-模式-mac" tabindex="-1"><a class="header-anchor" href="#oxskeychain-模式-mac" aria-hidden="true">#</a> oxskeychain 模式( mac )</h4><p>此模式下会将登录凭证加密处理并存储在 mac 的 osxkeychain 中。可以用 Keychain Access 查看。</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/oxskeychain.jpg" alt=""></p><p>也可以通过命令删除凭据：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> credential-osxkeychain erase
<span class="token assign-left variable">host</span><span class="token operator">=</span>github.com
<span class="token assign-left variable">protocol</span><span class="token operator">=</span>https
<span class="token operator">&gt;</span> <span class="token punctuation">[</span>Press Return<span class="token punctuation">]</span>
</code></pre></div><h4 id="wincred-模式-windows" tabindex="-1"><a class="header-anchor" href="#wincred-模式-windows" aria-hidden="true">#</a> wincred 模式( windows )</h4><p>该模式会将凭证信息加密处理放入到 windows 凭据管理器中。</p><h4 id="manager-模式-windows" tabindex="-1"><a class="header-anchor" href="#manager-模式-windows" aria-hidden="true">#</a> manager 模式( windows )</h4>`,99),m=a("code",null,"manager",-1),g=a("code",null,"Git Credential Manager for Windows",-1),d={href:"https://github.com/Microsoft/Git-Credential-Manager-for-Windows.",target:"_blank",rel:"noopener noreferrer"},k=a("code",null,"osxkeychain",-1),h=t(`<h4 id="gcm-凭证助手-推荐" tabindex="-1"><a class="header-anchor" href="#gcm-凭证助手-推荐" aria-hidden="true">#</a> GCM 凭证助手( 推荐 )</h4><p>GCM 是微软开发的凭证助手 <code>Git Credential Manager Core</code> 的简称。</p><p>安装命令：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ brew <span class="token function">install</span> <span class="token parameter variable">--cask</span> git-credential-manager-core
</code></pre></div><p>对于 mac，不需要运行 <code>git config</code>，GCM 会自动配置 git。</p><p>首次验证成功后，凭据会存储在 mac 的 osxkeychain 中，每次克隆 HTTPS URL 时都会使用。 Git 不会要求在命令行中再次键入凭据，除非更改凭据。</p><h3 id="store模式-修改密码后如何处理" tabindex="-1"><a class="header-anchor" href="#store模式-修改密码后如何处理" aria-hidden="true">#</a> store模式，修改密码后如何处理？</h3><p>store 模式下，凭证被存储到本地硬盘中。修改密码后，本地还存储着旧的凭证，导致仓库权限认证失败。</p><p>输入命令移除凭证：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> credential.helper
</code></pre></div><p>需要注意的是，这条命令不会把已缓存的凭证删除，因此需要手动删除旧凭证。</p><p>windows 保存在 <code>C:\\Users\\xxx\\.git-credentials</code>，linux 为 <code>~/.git-credentials</code>。</p><p>删除后，重新设置 store 模式，然后执行 pull /push 操作会提示输入凭证，输入新密码就可以了。</p><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3><table><thead><tr><th style="text-align:center;">登录凭证存储</th><th style="text-align:center;">linux</th><th style="text-align:center;">mac</th><th style="text-align:center;">windows</th></tr></thead><tbody><tr><td style="text-align:center;">内存中，短期失效</td><td style="text-align:center;">cache</td><td style="text-align:center;">cache</td><td style="text-align:center;">cache</td></tr><tr><td style="text-align:center;">硬盘，明文存储，永久</td><td style="text-align:center;">store</td><td style="text-align:center;">store</td><td style="text-align:center;">store</td></tr><tr><td style="text-align:center;">硬盘，加密存储，永久（推荐）</td><td style="text-align:center;">GCM</td><td style="text-align:center;">osxkeychain、GCM</td><td style="text-align:center;">wincred、manager、GCM</td></tr></tbody></table><h2 id="几个技巧" tabindex="-1"><a class="header-anchor" href="#几个技巧" aria-hidden="true">#</a> 几个技巧</h2><h3 id="修改最后一次-commit" tabindex="-1"><a class="header-anchor" href="#修改最后一次-commit" aria-hidden="true">#</a> 修改最后一次 commit</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;new message&quot;</span>
</code></pre></div><p>以上命令可以将本次提交覆盖上一次提交。</p><p>使用场景有两个，比如上一次提交有个小错误，修复后没必要提交一个新的 commit，又或者想修改上一个 commit message，都可以用 <code>--amend</code> 修正。</p><p>需要注意的是，既然是覆盖上一个 commit，如果覆盖前的历史已经 push 到远端，在多人协作开发的情况下，可能会造成严重的冲突，此时不宜使用。</p><h3 id="修复-bug" tabindex="-1"><a class="header-anchor" href="#修复-bug" aria-hidden="true">#</a> 修复 bug</h3><p>如果开发过程中，暂存区和工作区都有未 commit 的修改，此时需要切换到另一个分支修复 bug。为保存这些还未完成的工作，有两个做法：</p><ul><li>临时 commit 一次，以后再用 <code>git commit --amend</code> 修正</li><li>用 <code>git stash</code> 将工作现场保存下来</li></ul><p>需要注意的是，<code>git stash</code> 不会保存工作区的修改，因此需要先执行 <code>git add .</code> 将所有内容保存到 stage。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
$ <span class="token function">git</span> stash <span class="token comment"># 保存工作现场</span>
Saved working directory and index state WIP on master: e8d5a34 commit1
$ <span class="token function">git</span> stash list <span class="token comment"># 查看已保存的工作现场</span>
stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: WIP on master: e8d5a34 commit1
</code></pre></div><p>可以看到生成了一条 stash 记录，<code>git stash</code> 可以执行多次，以栈的方式存储起来。</p><p>此时可以切换到其他分支进行工作，完成之后再恢复状态。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash apply <span class="token comment"># 恢复但不删除</span>
$ <span class="token function">git</span> stash pop   <span class="token comment"># 恢复并删除</span>
Dropped refs/stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span> <span class="token punctuation">(</span>a22b6c9e3b56ee789b89b5f307c3e63408e0d723<span class="token punctuation">)</span>
</code></pre></div><h4 id="cherry-pick" tabindex="-1"><a class="header-anchor" href="#cherry-pick" aria-hidden="true">#</a> cherry-pick</h4><p>假设你在 master 分支修复了 bug，并回到当前 dev 分支，很明显 dev 分支还有没修复这个 bug。</p><p>为此，可以执行：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commit-id<span class="token operator">&gt;</span>
</code></pre></div><p>将 master 分支上修复 bug 的 commit 在当前分支重做一次，并进行一次新的提交。注意这两个commit只是改动相同，但它们是两个不同的commit。</p><h3 id="别名" tabindex="-1"><a class="header-anchor" href="#别名" aria-hidden="true">#</a> 别名</h3><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.<span class="token operator">&lt;</span>alias-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>git-command<span class="token operator">&gt;</span>
</code></pre></div><p>以上命令可以为一个命令起一个简短的别名，比如：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.glog log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span>
</code></pre></div><p>此时以下两个命令是等效的。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> glog
$ <span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span>
</code></pre></div><p><code>--global</code> 表示对当前用户起作用，不加则只针对当前仓库。</p><p>别名配置可以在 <code>~/.gitconfig</code> 中查看，配置别名也可以直接编辑这个文件。</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> ~/.gitconfig
<span class="token punctuation">[</span>user<span class="token punctuation">]</span>
	name <span class="token operator">=</span> xxx
	email <span class="token operator">=</span> xxx@gmail.com
<span class="token punctuation">[</span>core<span class="token punctuation">]</span>
	quotepath <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">[</span>credential<span class="token punctuation">]</span>
	helper <span class="token operator">=</span> cache
<span class="token punctuation">[</span>alias<span class="token punctuation">]</span>
  glog <span class="token operator">=</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span>
</code></pre></div><h3 id="快速-clone-大仓库" tabindex="-1"><a class="header-anchor" href="#快速-clone-大仓库" aria-hidden="true">#</a> 快速 clone 大仓库</h3><p>一些项目经过长时间的持续开发，积累了很长的历史记录，clone 这样一个 repo 需要消耗相当长时间。</p><p>如果我们不关心具体的提交历史，只关心最新提交的代码，以 chromium 为例：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> clone https://github.com/chromium/chromium.git <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre></div><p>这样 clone 完成后，仓库中只包含了最后一次 commit 的信息，下载速度和仓库体积都大幅减小。</p><p>如果需要下载某个 tag，先在本地创建一个 repo：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> init chromium
$ <span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/chromium/chromium.git
</code></pre></div><p>然后执行：</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载特定 tag 的最后一次 commit</span>
$ <span class="token function">git</span> <span class="token parameter variable">-c</span> <span class="token assign-left variable">protocol.version</span><span class="token operator">=</span><span class="token number">2</span> fetch origin <span class="token number">104.0</span>.5061.0 <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>
$ <span class="token function">git</span> checkout FETCH_HEAD <span class="token comment"># checkout 到这个 tag</span>
</code></pre></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,53),u={href:"https://docs.github.com/cn/get-started/getting-started-with-git",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.panyanbin.com/article/7a09727c.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.liaoxuefeng.com/wiki/896043488029600",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html",target:"_blank",rel:"noopener noreferrer"};function x($,w){const n=p("ExternalLinkIcon");return c(),r("div",null,[i,a("p",null,[m,s(" 模式需要安装名为 "),g,s(" 的 "),a("a",d,[s("Git凭证助手程序"),e(n)]),s("。该模式与 "),k,s(" 模式类似，都会对凭证信息加密处理。")]),h,a("p",null,[a("a",u,[s("GitHub Docs"),e(n)])]),a("p",null,[a("a",b,[s("git自动保存账号密码"),e(n)])]),a("p",null,[a("a",f,[s("git 教程"),e(n)])]),a("p",null,[a("a",v,[s("常用 Git 命令清单"),e(n)])])])}const E=o(l,[["render",x],["__file","git.html.vue"]]);export{E as default};
