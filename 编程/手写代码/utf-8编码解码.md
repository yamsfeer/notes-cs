# utf-8 编码解码

```javascript
// 判断需要多少个字节存储
function getCodeBytes(code) {
  const codeSeg = [0x007f, 0x07ff, 0xffff, 0x10ffff]
  if (code > codeSeg[codeSeg.length - 1]) {
    throw new Error('超出编码范围')
  }
  for (let i = 0; i < codeSeg.length; i++) {
    if (code <= codeSeg[i]) {
      return i + 1;
    }
  }
}

function padEncodeStr(binCode, n) {
  binCode = binCode.padStart(n * 8 - (n + 1 + (n - 1) * 2), '0') // 补齐空位
  let encodeStr = ''
  let binPtr = binCode.length
  let i = n
  while (i-- > 1) { // 首字节另外填充
    //截取六位填充一个字节
    encodeStr = `10${binCode.substring(binPtr - 6, binPtr)}${encodeStr}`
    binPtr -= 6
  }
  // 当只有一个字节时，以0开头
  let start = n > 1 ? `${''.padStart(n, 1)}0` : '0'
  encodeStr = `${start}${binCode.substring(0, binPtr)}${encodeStr}`
  return encodeStr
}

function encode(char) {
  let code = char.charCodeAt(0)
  let binCode = code.toString(2) // 2进制字符串
  let bytes = getCodeBytes(code) // 需要bytes个字节存储
  return padEncodeStr(binCode, bytes)
}
```



```javascript
function sliceCode(binCode, n) {
  let segs = []
  let p = 0
  while (n--) {
    segs.push(`${binCode.substr(p + 2, 6)}`)
    p += 8
  }
  return segs.join('')
}

function decode(binCode) {
  let unicode = ''
  let p = 0
  let n = 0
  while (binCode[p++] != 0) {
    n++
  }
  n = Math.max(1, n) // 至少需要1个字节
  unicode += binCode.substring(p, 8)
  unicode += sliceCode(binCode.substring(8, (p - 1) * 8), n - 1)

  return String.fromCharCode(`0b${unicode}`)
}
```







```javascript
encode('文') === '111001101001011010000111')
encode('a') === '01100001'

decode('111001101001011010000111') === '文'
decode('01100001') === 'a'

decode(encode('文')) === '文'
decode(encode('0')) === '0'
```
