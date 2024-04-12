# https

https 的意思是安全的 http，s 表示 secure。

## SSL

https 在 http 协议的传输层和应用层间增加了一层，称为 SSL ( Secure Socket Layer 安全套接字层 ) 。

:::info

SSL 在 3.0 版本后被标准化，称为 TLS，为方便记忆，这里统称 SSL。

:::

SSL 的作用是使用非对称加密算法传递一个随机字符串，再将这个随机字符串作为对称加密的密钥传递数据。

大致流程如下：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/SSL握手.png" style="zoom:85%;" class="img-mid" />

1. client 发起请求
2. server 发送公钥 ( 其实是证书，后面会介绍 ) 给 client
3. client 用发过来的公钥加密随机字符串 key，然后发送给 server
4. server 用私钥解密，得到 key
5. key 作为对称加密的密钥，双方用对称加密传输数据

一句话总结以上过程就是：**非对称加密传输密钥，对称加密传输数据**。

## 中间人攻击

使用非对称加密算法，都会有中间人攻击 ( man-in-the-middle MITM ) 的问题。

如果一开始，攻击者用自己的 public key 代替 server 的 public 发送给客户端，而 client 在不知情的情况下，使用攻击者的 public key 加密，攻击者就可以作为 client 和 server 两端的中间人，分别伪装成两方进行通信，从而窃取所有信息。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/中间人攻击.png" style="zoom:70%;" class="img-mid" />

如果 client 能确保收到的 public key 是真正的 server public key，攻击者就无法伪装了。这需要第三方机构作保证。

## CA证书

CA ( Certificate Authority，证书授权) 是一个第三方机构。

服务端把域名、组织名、和公钥等数据发送给 CA，CA 用**私钥**对数据加密得到密文，称为签名，然后将签名和原始明文发送回服务器，签名和原始明文加在一起称为 CA 证书。

客户端收到证书，用 CA 的**公钥**解密，比对解密后的公钥和原始明文中的公钥，即可判断公钥是否是正确的。



<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/https-CA.png" style="zoom:80%;" class="img-mid" />

在 chrome 浏览器中，可以在开发者工具的 security 面板中，点击 `view certificate` 按钮，查看当前网站的证书信息。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/CA证书.png" alt="iCA证书" style="zoom:45%;" class="img-mid" />

也可以通过 `chrome://settings/security` 页面的 `Manage device certificates` 按钮查看当前系统的证书。

### 证书透明 CT

为防止 CA 机构颁发错误的证书，我们需要用去中心化手段实现证书透明 ( Certificate Transparency ) 。

具体来说就是：

* CA 每颁发一个证书，都需要向日志服务 LOG 提交证书的详情
* LOG 记录后，向 CA返回 SCT 数据，SCT 中包含了用 LOG 私钥加密的数据，相当于 LOG 的签名

* CA 将 SCT 作为拓展加入证书中发给服务器，服务器再发给客户端

* 客户端收到证书后，不仅需要向 CA 验证证书的真实性，还需要向 LOG 验证 SCT

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/https-CA-CT.png" style="zoom:85%;" class="img-mid" />

为了实现 CA 的证书透明，在 CA 机制基础上添加了一层 CT 机制，CT 机制的原理如下：

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/https-CT.png" style="zoom:80%;" class="img-mid" />

CA 每次颁发证书都是一条记录，每两条记录分别计算其 hash 值组合成父节点，最终直到根节点，根节点的 hash 值称为 root hash，只需检查 root hash 就可以判断 CA 是否颁发了错误的节点。

## 参考

[https技术鉴赏](https://www.bilibili.com/video/BV1uY4y1D7Ng/?spm_id_from=333.788&vd_source=0de1212e1a5de639602eb19cc0aacc0b)
