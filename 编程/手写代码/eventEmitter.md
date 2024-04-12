# EventEmitter

eventEmitter 是发布订阅模式的一种实现。

```javascript
class EventEmitter {
  constructor() {
    this.listener = {}
  }

  on(event, fn) {
    if (this.listener[event]) {
      return this.listener[event].push(fn)
    }
    this.listener[event] = []
  }

  emit(event, ...args) {
    if (this.listener[event]) {
      return this.listener[event].forEach(fn => fn(...args))
    }
  }

  off(event, fn) {
    const fns = this.listener[event]
    if (fns) {
      const idx = fns.findIndex(item => item === fn)
      if (idx !== -1) {
        fns.splice(idx, 1)
      }
      if (fns.length === 0) {
        delete this.listener[event]
      }
    }
  }
}
```

```javascript
const emitter = new EventEmitter
emitter.on('data', data => console.log(data)) // { foo: 'bar' }
emitter.emit('data', { foo: 'bar' })
```
