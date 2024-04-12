# Promise

为深入理解 Promise，根据 [Promise / A+ 规范](https://promisesaplus.com/) ( [中文版](https://www.ituring.com.cn/article/66566) ) 手写 promise ( [完整代码](https://github.com/yamsfeer/toy-promise) )。

## 宏任务微任务

JavaScript 是单线程的，为了解决阻塞问题，JavaScript 有两种任务执行模式：同步模式 ( Synchronous ) 和异步模式 ( Asynchronous )。

异步模式有宏任务和微任务两种。

* 宏任务 ( Macrotask ) 称为 Task，由宿主 ( 浏览器、Node ) 发起
* 微任务 ( Microtask ) 称为 Job，由 JS 自身发起。

创建宏任务和微任务的方式：

| 宏任务 ( Macrotask )       | 微任务 ( Microtask )             |
| -------------------------- | -------------------------------- |
| setTimeout                 | requestAnimationFrame ( 有争议 ) |
| setInterval                | MutationObserver ( 浏览器环境 )  |
| MessageChannel             | Promise.[then/catch/finally]     |
| I/O，事件队列              | process.nextTick ( Node 环境 )   |
| setImmediate ( Node 环境 ) | queueMicrotask                   |
| script ( 代码块 )          |                                  |

由于 Promise 是创建微任务的，我们选择 [queueMicrotask](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide) 作为模拟 Promise 创建微任务的方式。

## 基本代码

根据 promise 的规范，我们总结以下几点：


>1. Promise 是一个类，new Promise 时需要传入一个执行函数，执行函数会立即执行
>2. Promise 有三种状态
>   * Pending 等待
>    * Fulfilled 完成
>    * Rejected 失败
>3. 状态只能由 Pending 转为 Fulfilled 或 Pending 转为 Rejected，且只能改变一次
>4. Promise 中使用 resolve 和 reject 函数来更改状态，这两个函数会传入执行函数
>5. then 方法会判断状态
>   * 如果状态是 Fulfilled，调用成功回调函数
>   * 如果状态是 Rejected，调用失败回调函数

先写一些基本代码，声明状态、resolve、reject 函数等。

```javascript
const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

class TPromise {
  constructor(executor) {
    // resolve、reject 函数传入执行器，使其能调用改变状态
    executor(this.resolve, this.reject)
  }
  
  state = PENDING // 当前状态
  value = null // fulfill 的值
  reason = null // reject 的原因
  
  // 存储状态改变的回调函数
  filfillCbs = []
  rejectCbs = []

  // 用箭头函数绑定上下文，使其指向 promise
  resolve = value => {}
  reject = reason => {}
  
  // 最重要的 then 函数
  then() {}
}
```

## resolve、reject 改变状态

resolve、reject 可以改变 promise 的状态，且只能改变一次。

then 函数会将 fulfill 或 reject 的回调函数存起来，当 promise 状态变化时，需要调用相应的回调函数。

```javascript
class TPromise {
  resolve = value => {
    if (this.state !== PENDING)
      return
    this.value = value
    this.state = FULFILLED // 改变状态
    
    // 清空 fulfill callback
    while (this.fulfillCbs.length) {
      this.fulfillCbs.shift()(value)
    }
  }
  reject = reason => {
    if (this.state !== PENDING)
      return
    this.reason = reason
    this.state = REJECTED // 改变状态
    
    // 清空 reject callback
    while (this.rejectCbs.length) {
      this.rejectCbs.shift()(reason)
    }
  }
}
```

## then 函数

then 函数的实现比较复杂，我们一步一步来实现。

### 存储回调函数

promise 每次调用 then 函数 ( 非链式调用 ) ，相当于指定相应的回调函数。

如果当前 promise 已经 resolve，则直接调用；如果是 PENDING 状态，则存入数组中，当状态改变时清空回调数组。

```javascript
class TPromise {
  then(onFulfill, onReject) {
    if (this.state === FULFILLED) {
      onFulfill(this.value)
    }
    if (this.state === REJECTED) {
      onReject(this.reason)
    }
    if (this.state === PENDING) {
      this.fulfillCbs.push(onFulfill)
      this.rejectCbs.push(onReject)
    }
  }
}
```

### then 链式调用

每当 promise 调用 then 函数，需要创建并返回一个新的 promise，以此实现链式调用。

如果 onFulfill 或 onReject 处理函数的返回值是一个 promise，则需要等这个 promise resolve。

```javascript
class TPromise {
  then(onFulfill, onReject) {
    const promise2 = new TPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        const x = onFulfill(this.value)
        resolvePromise(x, resolve, reject)
      }

      if (this.state === REJECTED) {
        const x = onReject(this.reason)
        resolvePromise(x, resolve, reject)
      }

      if (this.state === PENDING) {
        this.fulfillCbs.push(onFulfill)
        this.rejectCbs.push(onReject)
      }
    })
    return promise2 // then 函数返回新的 promise
  }
}
```

### resolvePromise

resolvePromise 中判断返回值是否为新 promise 或 thenable 对象，如果是则等待这个 promise  resolve。

```javascript
function resolvePromise(userReturn, resolve, reject) {
  userReturn instanceof TPromise || isThenable(userReturn)
    ? userReturn.then(resolve, reject) // then 函数返回 promise，需要等其 resolve
    : resolve(userReturn) // 普通值
}
```

*注意这里的 resolve 和 reject 是 then 函数创建的 promise 的 resolve 和 reject。*

isThenable 实现：

```javascript
function isThenable(p) {
  return (
    p !== null &&
    (typeof p === "object" || typeof p === "function") &&
    typeof p.then === "function"
  )
}
```

### queueMicrotask

按照规范，promise 创建的是微任务，我们用 `queueMicrotask` 来模拟。

```javascript
class TPromise {
  then(onFulfill, onReject) {
    const promise2 = new TPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          const x = onFulfill(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          const x = onReject(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }

      if (this.state === FULFILLED) fulfilledMicrotask()
      if (this.state === REJECTED) rejectedMicrotask()
      if (this.state === PENDING) {
        this.fulfillCbs.push(fulfilledMicrotask)
        this.rejectCbs.push(rejectedMicrotask)
      }
			return promise2
    })
  }
}
```

### 默认处理函数

promise 的回调函数可以不传，我们需要给一个默认的处理函数。

* 如果 fulfill，则直接返回 value

* 如果 reject，则直接抛出错误

```javascript
class TPromise {
  then(onFulfill, onReject) {
    onFulfill = typeof onFulfill === 'function'
      ? onFulfill
      : value => value
    onReject = typeof onReject === 'function'
      ? onReject
      : reason => { throw reason }
  }
}
```

## 捕获错误

在 promise 执行过程中，如果有未捕获的错误，promise 会自动 reject。

我们用 `try-catch` 语句对主要逻辑进行错误处理，当捕获到错误则调用 reject 函数。

使用者代码中可能出现错误的地方有两个：

* 执行器函数
* `onFulfill / onReject` 回调函数

```javascript
class TPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch(err) {
      this.reject(err)
    }
  }
  then() {
    // ...
    const fulfilledMicrotask = () => {
      queueMicrotask(() => {
        try {
          const x = onFulfill(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch(err) {
          reject(err)
        }
      })
    }
    // ...
  }
}
```

## ES6 的 promise

除了 promise/A+ 规范的内容外，ECMAScript 还提供了一些其他的 API，比如 `Promise.resolve`、`Promise.reject` 等，具体参考[标准文档](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-properties-of-the-promise-constructor)。下面来实现这些内容。

### Promise.resolve, Promise.reject

如果传入的是一个 promise，则直接返回这个 promise，否则，将其作为 resolve 值，用一个新的 promise 包装起来。

```javascript
class TPromise {
  static resolve(target) {
    return target instanceof TPromise
      ? target
      : new TPromise(resolve => resolve(target))
  }
}
```

`Promise.reject` 也类似。

```javascript
class TPromise {
  static reject(target) {
    return target instanceof TPromise
      ? target
      : new TPromise((resolve, reject) => reject(target))
  }
}
```

### all, race, any, allSettled

这四个 API 是非常类似的，它们都接受一个 promise 数组 ( 准确的说是 iterable 对象 ) ，返回一个新的 promise。

把返回的 promise 称为主 promise，数组中的元素称为子 promise，可以分为以下几种情况：

* Promise.all
  * 所有子 promise fulfill  ==>  主 promise  fulfill
  * 任意子 promise reject  ==>  主 promise 立即 reject
  * resolve 值是一个数组，数组元素和 promise 数组的顺序相同。
* Promise.race
  * 任意子 promise resolve ( 无论 fulfill 还是 reject )  ==>  主 promise  fulfill
* Promise.any
  * 任意子 promise fulfill  ==>  主 promise fulfill
  * 所有子 promise reject  ==>  主 promise reject
* Promise.allSettled
  * 所有子 promise resolve ( 无论 fulfill 还是 reject )  ==>  主 promise  fulfill
  * resolve 值是一个数组，数组元素结构为 `{ status: 'fulfilled', value: val }` 或 `{ status: 'rejected', reason: error }`


从代码实现上来说，也是非常类似的。

```javascript
function all(promises) {
  return new TPromise((resolve, reject) => {
    let result = []
    let count = 0
    let length = promises.length

    if (length === 0) {
      resolve(result)
    }

    promises.forEach((p, index) => {
      TPromise.resolve(p) // 防止数组中有非 promise
        .then(value => {
          result[index] = value // 与传入顺序相同，与 resolve 顺序无关
          count++

          if (count === length) { // 全部 fulfill，即 resolve
            resolve(result)
          }
        }, reason => reject(reason)) // 有任何 reject，即 reject
    })
  })
}
```

```javascript
function race(promises) {
  return new TPromise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve()
    }

    promises.forEach(p => {
      TPromise.resolve(p) // 防止有非 promise
        .then(
          value => resolve(value), // 任一子 promise fulfill，即 resolve
          reason => reject(reason) // 任一子 promise reject，即 reject
        )
    });
  })
  }
```

```javascript
function any(promises) {
  return new TPromise((resolve, reject) => {
    let count = 0
    let result = []
    let length = promises.length

    if (length === 0) {
      return resolve()
    }

    promises.forEach((p, index) => {
      TPromise.resolve(p)
        .then(
          value => resolve(value),
          reason => {
            result[index] = reason
            if (++count === length) {
              reject(result)
            }
          }
        )
    })
  })
}
```

```javascript
function allSettled(proimises) {
  return new TPromise(resolve => { // 除非本身有错误，否则不会 reject
    let count = 0
    let result = []
    let length = proimises.length

    if (length === 0) {
      return resolve(result)
    }

    proimises.forEach((p, index) => {
      const onFulfill = value => {
        result[index] = {
          status: 'fulfilled',
          value
        }
        if (++count === length) {
          resolve(result)
        }
      }
      const onReject = reason => {
        result[index] = {
          status: 'rejected',
          reason
        }
        if (++count === length) {
          resolve(result)
        }
      }
      TPromise.resolve(p).then(onFulfill, onReject)
    })
  })
}
```

值得一提的是，四个 API 都需要判断 promise 数组的长度，如果是空数组则需要直接 resolve，否则在 forEach 函数中将不会使主 promise resolve。另外，每个数组元素都需要用 `TPromise.resolve(p)` 包装，防止传入非 promise 对象。

### catch

catch 其实是 then(null, onReject) 的别名，用于指定发生错误时的回调。

```javascript
class TPromise {
  catch(onReject) {
    this.then(null, onReject)
  }
}
```

### finally

不管 promise 最后状态如何都会执行

```javascript
class TPromise {
  finally(fn) {
    const p = TPromise.resolve(fn())
    return this.then(
      value => p.then(() => value),
      error => p.then(() => { throw error })
    )
  }
}
```

## 总结

Promise 是观察者模式

* resolve, reject 函数

  将 state 转为 fulfilled 或 rejected，保存 value 或 reason，调用 then 方法保存的 callback 函数并传入 value 或 reason，callback 是用 queueMicrotask 包装的微任务
* then 函数

  把 onFilfill 或 onReject 处理函数包装成微任务，如果当前状态是 pending，则将微任务存入回调数组。

  提供默认 onFilfill 或 onReject 处理函数，将 fulfill value 或 reject reason 直接返回或抛出。
* resolvePromise

  resolvePromise 判断 onFilfill 或 onReject 处理函数的返回值，如果返回值 userReturn 是新的 promise，则等待这个 promise resolve，具体就是 `userReturn.then(resolve, reject)`。
* promise 的错误处理就是用 `try-catch` 语句，当捕获到错误，则调用 reject 函数。
* catch 是 then(null, rejection) 的别名，用于指定发生错误时的回调
* then、all、race 等方法都会返回一个新的 promise，以便实现链式调用

## 参考

[深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)

[手写promise，通俗版本](https://juejin.cn/post/6994594642280857630#heading-14)

[手写一个promise/A+](https://segmentfault.com/a/1190000023157856)



