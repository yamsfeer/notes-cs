# JSON

JSON 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null。它基于 JavaScript 语法，但与之不同。JavaScript 不是 JSON，JSON 也不是 JavaScript。相关标准参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)。

JSON 对象有两个方法：`JSON.stringify` 和 `JSON.parse`，分别用于序列化成 JSON 字符串和解析 JSON。

## JSON.stringify

```javascript
JSON.stringify(value[, replacer [, space]])
```

```javascript
function stringify(data) {
  if(typeof data === 'bigint') {
    throw new TypeError(`BigInt value can't be serialized in JSON`)
  } 
  if(typeof data === 'string') {
    return `"${data}"`
  } 
  if(typeof data === 'function') {
    return undefined
  }
  if(data !== data) {
    return 'null'
  }
  if(data === Infinity) {
    return 'null'
  }
  if(data === -Infinity) {
    return 'null'
  }
  if(typeof data === 'number') {
   return `${data}`
  }
  if(typeof data === 'boolean') {
    return `${data}`
  }
  if(data === null) {
    return 'null'
  }
  if(data === undefined) {
    return 'null'
  }
  if(typeof data === 'symbol') {
    return 'null'
  }
  if(data instanceof Date) {
    return `"${data.toISOString()}"`
  }

  if(Array.isArray(data)) {
    return `[${data.map(item => stringify(item)).join(',')}]`
  }
  if(typeof data === 'object') {
    const arr = Object.entries(data).reduce((acc, [key, value]) => {
      if(value === undefined) {
        return acc
      }
      acc.push(`"${key}":${stringify(value)}`)
      return acc
    }, [])
    return `{${arr.join(',')}}`
  }
}

let b = {}
let a = {
  x: b
}
b.x = {}
// console.log(JSON.stringify(a))
console.log(stringify(a))
```



## JSON.parse



```javascript
function parse(str) {
  const [head] = str

  if (head === `'`) throw new SyntaxError()
  if (str === '') throw new SyntaxError()

  if(str === 'null') return null
  if(str === '{}') return {}
  if(str === '[]') return []
  if(str === 'true') return true
  if(str === 'false') return false

  if(head === '"') return str.slice(1, -1)
  if(!Number.isNaN(Number(str))) return Number(str)

  if (head === '{') {
    return str.slice(1, -1).split(',').reduce((acc, pair) => {
      const index = pair.indexOf(':')
      const key = pair.slice(0, index)
      const value = pair.slice(index + 1)

      acc[parse(key)] = parse(value)

      return acc
    }, {})
  }
  if (head === '[') {
    return str.slice(1, -1).split(',').map(str => parse(str))
  }
}
```

