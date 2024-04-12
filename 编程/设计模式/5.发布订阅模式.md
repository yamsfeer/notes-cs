# 观察者模式 VS 发布订阅

观察者模式是设计模式的一种，发布订阅是软件架构中的一种消息范式。两者很类似但又有区别。

观察者模式有两个角色，而发布订阅至少需要三个角色。

* 观察者模式：观察者 ( observer )、被观察者 ( subject / observable )
* 发布订阅：发布者 ( publisher )、发布订阅中心 ( pubsub )、订阅者 ( subscriber )

观察者的重点是 subject，发布订阅的重点在于 pubsub。

## 观察者模式

观察者模式有两个角色：观察者 ( observer )、被观察者 ( subject / observable )。

subject 通常会持有一份 observer 列表，以便在合适的时候通知它们。

subject 有三个能力：添加、移除、通知 observer。

```javascript
class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    const idx = this.observers.findIndex(ob => ob === observer);
    this.observers.splice(idx, 1)
  }

  notify(...args) {
    this.observers.forEach(ob => ob.update(...args))
  }
}
```

observer 和 subject 两者约定一个函数叫 update，当 subject 需要通知时调用这个函数。

```javascript
class Observer {
  constructor(cb) {
    this.cb = cb
  }
  observe(subject) {
    subject.addObserver(this)
  }
  update(...args) {
    this.cb(...args)
  }
}
```

观察者模式使用起来大概是这样的。

```javascript
const subject = new Subject()

const ob1 = new Observer(msg => console.log(msg))
const ob2 = new Observer(msg => console.log(msg)

subject.addObserver(ob1) // 被观察者主动邀请
ob2.observe(subject) // 观察者主动观察

subject.notify('some content')
```

可以看出，“观察”这个动作就是 `addObserver`，它可以由两种方法产生

* `subject.addObserver`，相当于被观察者主动邀请观察者
* `observer.observe`，相当于观察者主动观察

subject 定义变化，observer 定义行为，addObserver 使他们建立联系。

## 发布订阅模式

观察者模式中，subject 需要维护 observer 的列表，并且在自身变化时，依次调用每个 observer 的 update 函数。

如果 subject 自身已经很复杂，这些工作可以抽离出来，成为一个发布订阅中心 pubsub，subject 只需要通知 pubsub 即可。

```javascript
class Publisher { // 发布者
  constructor(pubsub) {
    this.pubsub = pubsub
  }

  publish(type, content) {
    this.pubsub.publish(type, content)
  }
}
```

发布订阅模式下，最主要的工作是由 pubsub 完成的，它相当于中间人。

```javascript
class PubSub { // 发布订阅中心
  constructor() {
    this.subscribers = {}
    this.contents = {}
  }

  publish(type, content) {
		const content = this.contents[type]
    this.contents[type] = content // 也可以用数组存起来，看具体场景
  }

  subscribe(type, cb) {
    const subs = this.subscribers[type]
    if (!subs) {
      this.subscribers[type] = []
    }
    this.subscribers[type].push(cb)
  }

  notify(type) {
    const content = this.contents[type]
    const cbs = this.subscribers[type]
    cbs.forEach(cb => cb(content))
  }
}
```

```javascript
class Subscriber { // 订阅者
  constructor(pubsub) {
    this.pubsub = pubsub
  }

  subscribe(type, cb) {
    this.pubsub.subscribe(type, cb)
  }
}
```

发布订阅最终使用起来是这样的：

```javascript
const pubsub = new PubSub()
const subscriber = new Subscriber(pubsub)
const publisher = new Publisher(pubsub)

subscriber.subscribe('event', val => console.log(val))
publisher.publish('event', 'publisher is publishing a message')
```

## 总结

为方便理解，可以用卖家 ( seller )、中介 ( agent )、买家 ( buyer ) 三者类比。

* 卖家直接通知买家，这是观察者模式
* 有多个卖家买家则需要中介，卖家只管通知中介，中介再通知买家，卖家卖家互相不知道对方的信息。这是发布订阅模式

可以认为发布订阅就是两层的观察者模式。

这两个模式很常用，只是有不同的叫法，比如 watch、observer、listen、dispatch、trigger、emit、on、event、bus 等。当看到这些函数，就可以意识到这是观察者模式或发布订阅模式。

参考：[理解【观察者模式】和【发布订阅】的区别](https://juejin.cn/post/6978728619782701087)