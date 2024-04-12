# tween 补间动画

动画是由一帧一帧的画面连续播放形成的。一个物体从起始点开始，每帧移动一小段距离，若干帧后到达目的地，整个过程构成一个动画。

一个小球从 0 移动到 10，小球每帧移动 1 的距离，10 帧后移动到终点。

补间的意思是，在初始值和目标值之间计算若干个中间值，这个中间值就是每一帧物体应在的位置。所以小球例子中，补间动画就是要计算 0~10 之间的若干个中间值如 1,2,3,...

小球每次移动的距离并非必须相同，比如第一帧移动到 2，第二帧移动到 6，第三帧移动到 7，这就形成了速度的不同，我们用一个函数描述这个速度，称为缓动函数 *( easing function )*。

## 缓动函数

我们经常能看到类似如下的函数。

```javascript
const tween = {
  linear: (t, b, c, d) => c * t / d + b,
  easeIn: (t, b, c, d) => c * ( t /= d ) * t + b,
  // easeOut ...
}
```

这些都是缓动函数。先介绍几个参数的含义：

* t ( timestamp )，动画当前帧的时间
* b ( begining )，初始值，小球初始位置为 0
* c ( change )，变化量，小球位置的变化为 10
* d ( duration )，动画持续时间

### 推导过程

下面来介绍这些函数是如何推导出来的。

* 用 $x$ 轴表示时间，时间的变化范围是 $0 \to d$，提取常数 $d$，即 $d\times(0 \to 1)$，所以 $x$ 轴的变化范围是 $0 \to 1$。
* 用 $y$ 轴表示小球位置的变化，变化范围是 $b \to b + c$，提取常数 $d$，即 $b + c \times (0 \to 1)$，所以 $y$ 轴的变化范围是 $0 \to 1$。
* $t$ 表示当前的时间点，将其变为动画完成的百分比，即 $\displaystyle\frac{t}{d}$

通过以上变换，tween 动画的速度可以描述为一个定义域和值域都为 $[0,1]$ 的函数。

### 缓动类型

* $y=x$ 是是最简单的缓动函数，表示匀速运动

  ![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAsFJREFUeF7t3T1S3EAQhuGP2LlDR76CnTlxChdwTmIOZCfkXACnJM7gCkSE5OQu1WrLqmX/pjUt9Uy/pMw0zffQWmnZ1V6Ir1AJXITqhmYESLA/AkAACZZAsHaYEECCJRCsHSYEkGAJBGuHCQEkWALB2mFCAAmWQLB2mJC6IJ8kfR5LPkt6KS0PSGlix9f/lPRN0p2kN0kPpeUBKU3s8Povkh7Hbw8gt4DUC7e00hRj2Hsj6Q+HrNIY66zfxfgq6clamkOWNbnNvqoYQ0FA7CDVMQAJhgGIDcRlMratcMgqQ3HFYEKCYQByPoj7ZHDICojBhJxGWWwymJDzMO4lfRyXzroCP/3jNis4y9qf1DAZW4xXSVdzng45FwOQYBiAvAdZbTJ4DAmIwYT8R1l9MpiQgBhMyOb/GaucTR0688p82hsOI/OEhMTIChIWIyNIaIxsIOExMoE0gZEFpBmMDCBNYfQO0hxGzyBNYvQK0ixGjyBNY/QG0jxGTyBdYPQC0g1GDyBdYbQO0h1GyyBdYrQK0i1GiyBdY7QG0j1GSyApMFoBSYPRAkgqjOgg6TAig6TEiAqSFiMiSGqMaCDpMSKBgDG+HD7Cq9/BmLw3YW0QMHbeKLImCBg7GGs+hoCxB2MtEDAOYKwBAsYRjKVBwDiBsSTIgLG9yfCi9w45I4NQS5Y4y5piDL/8InfVCZVyQTPeIGAUYHgfssAoxPAEAcOA4QUChhHDAwSMGRi1QcCYiVETBIwKGLVAwKiEUQMEjIoYc0CGTyO7lPRr0g9X4BVwrFfq3yVdS/ox9gBGBYw5EzKAfBhB/kr6Xamf9GWsEzL7AxTTJ38gACsIeTolAIhTsNaygFiTc9oHiFOw1rKAWJNz2geIU7DWsoBYk3PaB4hTsNaygFiTc9oHiFOw1rKAWJNz2geIU7DWsoBYk3Pa9w97c8RlvihwxAAAAABJRU5ErkJggg==)

* 指数函数可以构造出 easeIn 效果，意为缓慢进入

  ![img](data:image/png;base64,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)


* 指数函数做对称反转，可以得到 easeOut 效果，意为缓慢退出

  ![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABX1JREFUeF7tnWmoblMYx39XlMx0M2QsRO6XK9dM5lnG7r2GlGuMRMgsZJ6SImT4YOy6lEwZI0PmEMoHJENCCckXc//us2t3vd3es8/e73rWWs9Tp9M55917Pev/289ae631rHVmEOZKgRmuvAlnCCDOHoIAEkCcKeDMnYiQAOJMAWfuRIQEEGcKOHMnIiSAOFPAmTsRIQHEmQLO3Ck5QrYEZgK/Ae8DfzjTfqQ7pQIRiO2BNYGNgK+B74FveoSyDnAQsAawOrC+PQAqu7OunS/ssWJD3GooICsCuwD7AzsuxfHOuna+cAgVe75nn03WfhYN8y0aGlc/Bz4DRn3vVJ2SgXQSZImLZgNnAce0fv8DcL99fdRHIe17BJDRiqpPEAh9rWAfkfgNCEEZxALI/2U90UBsbn96HnjAYAwCISJktKx6K7sM2Nv+/AVwOXDf4BRaBUSELBbjeOAmYBXT5i6D8e0kYaisALIYxJkm/KcGYuGkQTTl1QxkC4uKfUyMW4ErgB9Twag5QuYajPWAT4BLgMdSgqg5QtRxX2oCvAYsANSBu7Damqw7gJNN+SeAQ4F/XJAwJ2oC8rhNf6jq9wLHegJRU5O1DPAmsI1V+ubWW5U7JqVHiGZ9tRaiqXHZSYDGGG6tZCCbAR8Dy5n6Gom/5ZZE4X2IxH+jJf5KwO/eYZQ6DtGU+Qc5wigRyFq2VNvwWBf4LofIKPUt69+W+Joa0dxUVlZSp/4LsGpOHfioJ6UUIIqEZkFpX+C5rMKi5WwJQF4CdrM6KQlhUa4wSujUHwSOymXQN86DknOE3AicbZU8B9DP2VuuQE4BbjP1rwPOz55ExiP1nQCtY8geBo4oBUaOfcgmliko398GtisJRm5AlLymUffygBLV1i4NRm5A3gG2NggbWkZ7cUxy6dTvAY4z9XcGXi+OREad+rXAeebv0cBDpcLIocnS+OJ6A3ABIDhFm+cmS02UmirZ7cCpRZNw3mTtCbxgPj4NHFgDDK9Nll5vBWMrWxMXDO0RrMI8Nll3AtqjIdNWsmerIOG0yVJWobILZRcDV9UEw1uTNceaqtUs8fmw2mB4AqKmU/3GHsBXwF6tOauquHjpQzTW0JhDdiSQbMNMavoegGjZtQGgRaYGTGptkpSfGoim09VU6fiLl62p+juJEk4KTQ3kUeBw4FeD8a4TXZK5kRKI5qautpprSbZ53U0mhoeCUwHRRstmwHd3ayDoQZOkPqQAoj0b6jeapGi94v6UVAVHhacAoojQRn2ZTk1oJhEdyZLOlUkDaafvVLG+MVW0kwSyrUXDyoDerrRXPGwJBSYFZFmDsSvwpb3iutkb7umpmBSQdtrnPOARTyJ48mUSQA4AnrJKF5X2OQTIoYFoj7hSdrQJ81U7QHKIehRzz6GBtM8ViVfcMR6bIYHsALwCqEO/ATh3DH+q/8iQQJQtovNtPwR2B36uXu0xBBgKyBmAzhSRabyhcUfYGAoMAWRjO8JCc1bKIGmOQxrDnfjIEECafX8xAOzwfPUNRMnQOuNWdkIrFbSDa3Ve0icQHVSvM0Y2tTVyJSuETVGBPoHcApxmaxvavP/eFH2Jj/d4bq/yqV40RYvZopziCekrQrQBU0foPQMcDPyZojIllNkHkIuAK4G/bCAYK4DTeDKmC2SWbRnQfa4BLpyGL3FpD33Ik7aZRqd+HpL6mO4SiHaNkA2A01tnjeg0BZ2qEDZNBboC0YnQSlLQvnFFif5bWVgPCnQFotlbDQQFRGvjOik6rAcFugJRk6VEaZn+Q1k1ewB70Hypt+gKZGi/qr1/AHGGPoAEEGcKOHMnIiSAOFPAmTsRIQHEmQLO3IkICSDOFHDmTkRIAHGmgDN3IkKcAfkPZy+5ZZYLmhEAAAAASUVORK5CYII=)

* 将两者结合，得到 easeInOut，即前期缓入，后期缓出

  ![img](data:image/png;base64,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)

easeIn、easeOut 表示的都是整体趋势，具体程度也有所不同。比如指数函数可以表示出 easeIn 效果，指数越高，速度变化越大。

<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/easeIn.svg" style="zoom: 50%" class="img-mid" />

以下整理了各种缓动效果和对应的函数类型。

缓动类型

*  Linear ( 线性 )
* aseIn ( 缓入 )
* EaseOut ( 缓出 )
* EaseInOut ( 缓入缓出 )

缓动程度

* Quadratic ( 二次 )、Cubic ( 三次 )、Quartic ( 四次 )、Quintic ( 五次 )
* Sinusoidal ( 正弦 )
* Exponential ( 指数 )
* Circular ( 圆形 )
* Elastic ( 弹性 )
* Back ( 回弹 )
* Bounce ( 回弹 )

缓动类型和缓动程度可以互相组合成各种缓动函数。

```javascript
const easing = {
  linear() {},
  quadratic: {
    in() {},
    out() {},
    inout() {}
  },
  quadratic: {
    // ...
  }
  // ...
}
```

所有的 easing function 效果及计算方法[参考网站](https://easings.net/)。

### tween.js

这是 tween.js 的官方例子，展示了 easing function 在动画中的使用。

```javascript
function animate(time) {
	requestAnimationFrame(animate)
	TWEEN.update(time)
}
requestAnimationFrame(animate)

const coords = {x: 0, y: 0} // 初始值 (0, 0)
const tween = new TWEEN.Tween(coords)
	.to({x: 300, y: 200}, 1000) // 移动到 (300, 200)，动画持续 1 秒
	.easing(TWEEN.Easing.Quadratic.Out) // easing function
	.onUpdate(() => {
		box.style.setProperty(
      'transform',
      `translate(${coords.x}px, ${coords.y}px)`
    )
	})
	.start()
```

## 三次贝塞尔曲线

从上面的介绍不难看出，无论是 easeIn 还是 easeOut，quadratic、cubic 或者 sinusoidal，它们都是一个曲线函数。

我们可以用三次贝塞尔曲线来表示更多的曲线。具体参考这个网站：[cubic-bezier](https://cubic-bezier.com/)
