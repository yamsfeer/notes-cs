# SSH

ssh ( secure shell ) 是一种**协议**，用于计算机之间的加密登录。ssh 有各种实现，本文针对的是 [OpenSSH](http://www.openssh.com/)。

用 ssh 远程登录，需要用户名和主机地址。

```shell
$ ssh user@host
```

ssh 的默认端口是 22，可以通过命令指定端口。

```shell
$ ssh -p 2222 user@host
```

ssh 的加密解密使用的是非对称加密算法，默认为 RSA 算法。

## 密码登录

第一次登录一台主机，会出现如下提示。

```bash
$ ssh yourname@12.18.429.21

The authenticity of host 'host (12.18.429.21)' can't be established.
RSA key fingerprint is 98:2e:d7:e0:de:9f:ac:67:28:c2:42:2d:37:16:58:4d.
Are you sure you want to continue connecting (yes/no)?
```

RSA 公钥的长度一般为 1024 位，为便于显示和比对，对其进行 MD5 计算得到一个 128 位的指纹。确认这个指纹和远程主机公开的公钥指纹一致后，用户可以接受这个公钥。公钥被接受后，会保存在 `~/.ssh/known_hosts` 文件中。

```bash
$ cat ~/.ssh/known_hosts

github.com ssh-rsa AAAAB3NzaC1yc2E...
```

接受主机公钥后，输入密码登录即可。

密码登录的过程：

1. 主机收到用户登录请求，把自己的公钥发给用户
2. 用户用主机公钥加密密码，然后发给主机
3. 主机用私钥解密

## 免密登录

密码登录每次都需要输入密码，用主机公钥加密后发送；免密登录只需第一次登录需要密码。

免密登录过程，假设 A 免密登录 B：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/ssh免密登录.png" class="img-mid" />

1. 将 A 的公钥储存在 B 上。
2. B 用 **A 的公钥**加密一段随机字符串并发送给 A
3. A 用**私钥解密**然后回传给 B
4. B 比对字符串

生成公私钥。

```bash
ssh-keygen
```

生成公钥后传输给远程主机。

```bash
ssh-copy-id user@host
```

查看远程主机的信任列表。

```bash
cat ~/.ssh/authorized_keys
```

公钥就是一段字符串，`authorized_keys` 里将包含你的公钥。

综上，`~/.ssh/` 下一般会有以下几个文件。

```bash
id_rsa      # 私钥
id_rsa.pub  # 公钥
known_hosts # 远程主机的公钥列表
authorized_keys # 可免密登录本机的公钥列表
```

## 参考

[SSH原理与运用（一）：远程登录](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
