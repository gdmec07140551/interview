/**
 * Expand JavaScript module secondary docs to match Feishu wiki catalog:
 * https://w0hog67yl81.feishu.cn/wiki/NyLwwaMuaihlFikDr7Kcv8ypn2c
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dir = path.join(root, 'content', 'javascript')
const sourceUrl = 'https://w0hog67yl81.feishu.cn/wiki/NyLwwaMuaihlFikDr7Kcv8ypn2c'

function page(title, body) {
  return `# ${title}\n\n> 来源：[飞书 · JavaScript 系列知识点](${sourceUrl})\n\n${body.trim()}\n`
}

function fold(summary, body) {
  return `<details>\n<summary>${summary}</summary>\n\n${body.trim()}\n\n</details>`
}

/** @type {{ slug: string, title: string, body: string }[]} */
const articles = [
  {
    slug: '01-var-let-const',
    title: '1. var, let, const 有什么区别？',
    body: `
## 核心对比

| | var | let | const |
|--|--|--|--|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | 会提升，初始化为 undefined | 提升但 TDZ | 提升但 TDZ |
| 重复声明 | 允许 | 不允许 | 不允许 |
| 重新赋值 | 可以 | 可以 | 绑定不可改 |

${fold(
  '参考要点',
  `
- \`const\` 保证的是**绑定不变**，对象/数组内部仍可变
- 暂时性死区（TDZ）：进入作用域到声明前访问会报错
- 面试常问：\`for\` 循环里 \`var\` 共享同一个绑定，\`let\` 每次迭代新绑定

\`\`\`js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)) // 3 3 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j)) // 0 1 2
}
\`\`\`
`,
)}
`,
  },
  {
    slug: '02-typeof-traps',
    title: '2. 数据类型和 typeof 的陷阱',
    body: `
## 七种基本类型 + Object

\`undefined\` \`null\` \`boolean\` \`number\` \`string\` \`symbol\` \`bigint\`，以及 \`object\`。

${fold(
  '参考要点',
  `
\`\`\`js
typeof null          // 'object'  历史 bug
typeof []            // 'object'
typeof function(){}  // 'function'（特殊）
typeof NaN           // 'number'
typeof undeclaredVar // 'undefined'（未声明也不报错）
\`\`\`

更稳妥的判断：

\`\`\`js
Object.prototype.toString.call(x) // '[object Array]' 等
Array.isArray(x)
Number.isNaN(x)
\`\`\`
`,
)}
`,
  },
  {
    slug: '03-value-vs-reference',
    title: '3. 值类型 vs 引用类型',
    body: `
## 本质区别

- **值类型**：赋值/传参拷贝的是值本身
- **引用类型**：拷贝的是引用（指向同一块堆内存）

${fold(
  '参考要点',
  `
\`\`\`js
let a = 1
let b = a
b = 2 // a 仍为 1

const o1 = { x: 1 }
const o2 = o1
o2.x = 2 // o1.x 也是 2
\`\`\`

函数参数同理：改对象属性会影响外部；重新赋值参数不会改外部绑定。
`,
)}
`,
  },
  {
    slug: '04-deep-shallow-copy',
    title: '4. 深浅拷贝的本质',
    body: `
## 浅拷贝 vs 深拷贝

- 浅拷贝：只复制一层（\`Object.assign\`、展开运算符、\`concat\`/\`slice\`）
- 深拷贝：递归复制所有层级，断开引用

${fold(
  '参考要点',
  `
\`\`\`js
const shallow = { ...obj }
const deep = structuredClone(obj)
// JSON 方案丢函数/undefined/Symbol，遇循环引用报错
\`\`\`

手写注意：循环引用用 \`WeakMap\`；特殊对象（Date、RegExp、Map、Set）要单独处理。
`,
)}
`,
  },
  {
    slug: '05-array-methods',
    title: '5. 数组常用方法背后的面试点',
    body: `
## 常考分类

| 会改原数组 | 不改原数组 |
|--|--|
| push/pop/shift/unshift/splice/sort/reverse | map/filter/slice/concat/flat/flatMap |

${fold(
  '参考要点',
  `
- \`map\` 必须有返回值，长度不变；\`forEach\` 侧重副作用
- \`reduce\` 初始值不传时，首元素当 acc，空数组会抛错
- \`find\` vs \`filter\`：找一个 vs 找一批
- \`some\`/\`every\` 短路；空数组 \`every\` 为 true、\`some\` 为 false
`,
)}
`,
  },
  {
    slug: '06-object-traverse',
    title: '6. 对象遍历方式对比（for in、Object.keys、Reflect）',
    body: `
## 对比

| 方式 | 内容 | 原型链 |
|--|--|--|
| for...in | 可枚举键 | 会遍历继承属性 |
| Object.keys | 自身可枚举字符串键 | 否 |
| Object.getOwnPropertyNames | 自身字符串键（含不可枚举） | 否 |
| Reflect.ownKeys | 自身所有键（含 Symbol） | 否 |

${fold(
  '参考要点',
  `
\`\`\`js
for (const k in obj) {
  if (!Object.hasOwn(obj, k)) continue // 过滤继承
}
\`\`\`

\`Object.keys\` 顺序：整数索引升序，其余按插入顺序（现代引擎约定）。
`,
)}
`,
  },
  {
    slug: '07-implicit-coercion',
    title: '7. 隐式类型转换有哪些坑？',
    body: `
## 常见坑

\`\`\`js
[] + []          // ''
[] + {}          // '[object Object]'
{} + []          // 0 或 '[object Object]'（看是否被当代码块）
true + true      // 2
'5' - 2          // 3
'5' + 2          // '52'
\`\`\`

${fold(
  '参考要点',
  `
- \`+\`：有字符串就拼串，否则 ToNumber
- \`-\` \`*\` \`/\`：偏向数字转换
- 对象转原始：\`Symbol.toPrimitive\` → \`valueOf\` → \`toString\`
- 面试题常考 \`[] == ![]\` 为 true（先算 \`![]\` → false → 0，再 \`[]\` → '' → 0）
`,
)}
`,
  },
  {
    slug: '08-eq-vs-strict-eq',
    title: '8. == 和 === 的核心考点',
    body: `
## 规则

- \`===\`：类型不同直接 false，不做转换
- \`==\`：会隐式转换，规则复杂（ToPrimitive / ToNumber）

${fold(
  '参考要点',
  `
\`\`\`js
null == undefined // true
null === undefined // false
NaN === NaN // false  → 用 Object.is / Number.isNaN
0 === -0 // true     → Object.is(0, -0) 为 false
\`\`\`

生产代码优先 \`===\`；只在有意兼容 \`null/undefined\` 时写 \`x == null\`。
`,
)}
`,
  },
  {
    slug: '09-execution-context-scope',
    title: '9. 执行上下文和作用域链是什么？',
    body: `
## 概念

- **执行上下文**：代码执行时的环境（变量环境、词法环境、this）
- **作用域**：标识符可见范围（词法作用域，定义时决定）
- **作用域链**：沿外层词法环境查找变量

${fold(
  '参考要点',
  `
创建函数时：创建执行上下文 → 压入调用栈 → 执行 → 弹出。  
全局上下文常驻栈底。

闭包 = 函数 + 其引用的外层词法环境（即使外层已返回）。
`,
)}
`,
  },
  {
    slug: '10-this-binding',
    title: '10. JS 中的 this 究竟指向谁？',
    body: `
## 绑定优先级

1. \`new\` 绑定  
2. 显式绑定：\`call\` / \`apply\` / \`bind\`  
3. 隐式绑定：\`obj.fn()\`  
4. 默认绑定：非严格 \`window\`，严格 \`undefined\`

${fold(
  '参考要点',
  `
箭头函数**没有自己的 this**，继承外层词法 this，且 \`call\` 改不了。

\`\`\`js
const obj = {
  x: 1,
  a() { return this.x },
  b: () => this.x, // 这里 this 多半是外层，不是 obj
}
\`\`\`

事件回调、\`setTimeout\` 容易丢 this，可用箭头或 bind。
`,
)}
`,
  },
  {
    slug: '11-closure',
    title: '11. 闭包到底是什么？如何判断？',
    body: `
## 定义

函数能够访问其词法作用域中的变量，即使该函数在定义它的作用域之外执行。

${fold(
  '参考要点',
  `
判断口诀：**内层函数引用了外层变量，并被带到外层之外使用**。

用途：封装私有状态、工厂函数、防抖节流、柯里化、模块模式。

风险：意外持有大对象导致内存难回收；循环中错误使用 \`var\`。
`,
)}
`,
  },
  {
    slug: '12-hof-curry',
    title: '12. 高阶函数和柯里化应用场景',
    body: `
## 概念

- 高阶函数：参数或返回值是函数（\`map\`、\`filter\`、\`debounce\`）
- 柯里化：把多参函数变成「一次收一个参」的链式调用

${fold(
  '参考要点',
  `
\`\`\`js
const add = (a) => (b) => a + b
add(1)(2) // 3
\`\`\`

场景：配置预设（\`request(base)(path)\`）、延迟传参、函数组合复用。
`,
)}
`,
  },
  {
    slug: '13-throttle-debounce',
    title: '13. 节流 vs 防抖，面试怎么考？',
    body: `
## 区别

| | 防抖 debounce | 节流 throttle |
|--|--|--|
| 思路 | 停下来才执行 | 固定间隔执行 |
| 场景 | 搜索框输入、resize 结束 | 滚动加载、按钮防连点 |

${fold(
  '参考要点',
  `
\`\`\`js
function debounce(fn, wait) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}
function throttle(fn, wait) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn.apply(this, args)
    }
  }
}
\`\`\`

进阶：leading/trailing、取消、\`requestAnimationFrame\` 版节流。
`,
)}
`,
  },
  {
    slug: '14-bind-call-apply',
    title: '14. bind、call、apply 的底层原理',
    body: `
## API 差异

- \`call(thisArg, a, b)\`：立刻调用，参数列表
- \`apply(thisArg, [a, b])\`：立刻调用，参数数组
- \`bind(thisArg, ...partial)\`：返回绑定后的新函数

${fold(
  '参考要点',
  `
bind 要点：固定 this、支持柯里化式预置参数、\`new\` 绑定时 this 被 new 覆盖（规范行为）。

手写 bind 见本系列第 17 题。
`,
)}
`,
  },
  {
    slug: '15-iife',
    title: '15. 立即执行函数 IIFE 是怎么工作的？',
    body: `
## 形式

\`\`\`js
(function () { /* ... */ })()
;(function () {})()
(() => {})()
\`\`\`

${fold(
  '参考要点',
  `
作用：制造独立作用域，避免污染全局（模块化普及前很常见）。  
分号前置是为了防止 ASI 把上一行与 \`(\` 粘在一起。
`,
)}
`,
  },
  {
    slug: '16-pure-fn',
    title: '16. 纯函数、副作用与函数式编程初识',
    body: `
## 纯函数

相同输入 → 相同输出；不修改外部状态、不做 I/O。

${fold(
  '参考要点',
  `
副作用：改全局、改入参对象、DOM、网络、时间随机数等。

好处：易测、易推理、可缓存（memoize）。  
React 中 reducer、\`useMemo\` 计算函数都偏好纯函数。
`,
)}
`,
  },
  {
    slug: '17-handwrite-bind',
    title: '17. 手写 bind 实现',
    body: `
\`\`\`js
Function.prototype.myBind = function (thisArg, ...preset) {
  const fn = this
  if (typeof fn !== 'function') throw new TypeError('not a function')
  const bound = function (...args) {
    // new 调用时 this 为实例，忽略绑定的 thisArg
    const ctx = new.target ? this : thisArg
    return fn.apply(ctx, preset.concat(args))
  }
  if (fn.prototype) {
    bound.prototype = Object.create(fn.prototype)
  }
  return bound
}
\`\`\`

${fold('面试要点', '要覆盖：typeof 检查、预置参数、new 场景、原型链。')}
`,
  },
  {
    slug: '18-handwrite-curry',
    title: '18. 手写柯里化函数',
    body: `
\`\`\`js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args)
    return (...rest) => curried.apply(this, args.concat(rest))
  }
}

function sum(a, b, c) { return a + b + c }
const csum = curry(sum)
csum(1)(2)(3) // 6
csum(1, 2)(3) // 6
\`\`\`

${fold('面试要点', '依赖 \`fn.length\`；不定参/默认参时 length 不准，可改为「显式 arity」或占位符方案。')}
`,
  },
  {
    slug: '19-fn-collection',
    title: '19. 「面试常问函数题」合集（组合、记忆化）',
    body: `
## compose / pipe

\`\`\`js
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)
\`\`\`

## memoize

\`\`\`js
function memoize(fn) {
  const cache = new Map()
  return (key) => {
    if (cache.has(key)) return cache.get(key)
    const val = fn(key)
    cache.set(key, val)
    return val
  }
}
\`\`\`

${fold('扩展', '多参数可用 \`JSON.stringify(args)\` 作 key（注意顺序与对象引用）；也可用 WeakMap 做对象键缓存。')}
`,
  },
  {
    slug: '20-settimeout-interval',
    title: '20. setTimeout 和 setInterval 的陷阱',
    body: `
${fold(
  '参考要点',
  `
- 最小延迟受浏览器限制（嵌套 timeout 可能被钳到 4ms）
- \`setInterval\` 不补偿回调耗时，可能堆积；更稳妥用「递归 setTimeout」
- 回调里的 this 默认不是你想的对象
- 页面后台标签页会降频
- clear 要用对应的 \`clearTimeout\` / \`clearInterval\`
`,
)}
`,
  },
  {
    slug: '21-event-loop',
    title: '21. 事件循环（Event Loop）完整解析',
    body: `
## 一轮循环

执行 **1 个宏任务** → 清空 **所有微任务** → 可能渲染 → 取下一个宏任务。

${fold(
  '参考要点',
  `
宏任务：script、setTimeout、setInterval、I/O、UI  
微任务：Promise.then、queueMicrotask、MutationObserver

\`\`\`js
console.log('1')
setTimeout(() => console.log('2'))
Promise.resolve().then(() => console.log('3'))
console.log('4')
// 1 4 3 2
\`\`\`

\`async/await\`：await 右侧先执行，之后的代码进微任务。
`,
)}
`,
  },
  {
    slug: '22-promise-basics',
    title: '22. Promise 基本语法 + 错误捕获',
    body: `
\`\`\`js
const p = new Promise((resolve, reject) => {
  // resolve(value) / reject(err)
})

p.then(onFulfilled, onRejected)
p.catch(onRejected)
p.finally(() => {})
\`\`\`

${fold(
  '参考要点',
  `
- 状态：pending → fulfilled / rejected，不可逆
- then 返回新 Promise，可链式
- 抛错或 reject 会被最近的 catch 捕获
- 未处理的 rejection 会在控制台报警
`,
)}
`,
  },
  {
    slug: '23-async-await',
    title: '23. async、await 的底层运行机制',
    body: `
${fold(
  '参考要点',
  `
- \`async\` 函数一定返回 Promise
- \`await\` 会暂停当前 async 函数，把后续放入微任务
- 可理解为生成器 + Promise 的语法糖（引擎实现不必深究，但面试常提）

\`\`\`js
async function f() {
  console.log('A')
  await null
  console.log('B')
}
f()
console.log('C')
// A C B
\`\`\`
`,
)}
`,
  },
  {
    slug: '24-promise-combinators',
    title: '24. Promise.all / allSettled / race / any 用法对比',
    body: `
| API | 成功条件 | 失败 | 结果 |
|--|--|--|--|
| all | 全部成功 | 一个失败即失败 | 按序数组 |
| allSettled | 全部结束 | 不短路 | {status,value}[] |
| race | 第一个落定 | 第一个 reject 也算 | 第一个结果 |
| any | 第一个成功 | 全部失败才失败 | AggregateError |

${fold('选型', '要全部数据用 all；要容错汇总用 allSettled；超时竞速用 race；多源备份用 any。')}
`,
  },
  {
    slug: '25-handwrite-promise',
    title: '25. 手写一个简化版 Promise',
    body: `
\`\`\`js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilled = []
    this.onRejected = []
    const resolve = (v) => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled'
      this.value = v
      this.onFulfilled.forEach((fn) => fn(v))
    }
    const reject = (e) => {
      if (this.state !== 'pending') return
      this.state = 'rejected'
      this.reason = e
      this.onRejected.forEach((fn) => fn(e))
    }
    try { executor(resolve, reject) } catch (e) { reject(e) }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = (cb, val, next) => {
        queueMicrotask(() => {
          try {
            if (typeof cb !== 'function') return next(val)
            resolve(cb(val))
          } catch (e) { reject(e) }
        })
      }
      if (this.state === 'fulfilled') handle(onFulfilled, this.value, resolve)
      else if (this.state === 'rejected') handle(onRejected, this.reason, reject)
      else {
        this.onFulfilled.push((v) => handle(onFulfilled, v, resolve))
        this.onRejected.push((e) => handle(onRejected, e, reject))
      }
    })
  }
}
\`\`\`

${fold('说明', '完整版还需 thenable 解析（PromiseResolutionProcedure）、穿透、链式返回自身检测等。')}
`,
  },
  {
    slug: '26-promise-task-queue',
    title: '26. 实战：用 Promise 重写 setTimeout 任务队列',
    body: `
\`\`\`js
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

async function runQueue(tasks, gap = 0) {
  for (const task of tasks) {
    await task()
    if (gap) await delay(gap)
  }
}

// 串行带间隔
runQueue([
  async () => console.log('a'),
  async () => console.log('b'),
], 100)
\`\`\`

${fold('扩展', '也可做并发池：维护 running 计数，空位时启动下一个 Promise。')}
`,
  },
  {
    slug: '27-async-error-handling',
    title: '27. 实战：Async、await 错误处理的 3 种方式',
    body: `
1. **try/catch**（最常用）  
2. **await promise.catch(...)**  
3. **包装成元组** \`const [err, data] = await to(promise)\`

\`\`\`js
async function to(promise) {
  try {
    return [null, await promise]
  } catch (e) {
    return [e, null]
  }
}
\`\`\`

${fold('注意', '多个 await 要决定是「一个失败全停」还是「局部捕获继续」。')}
`,
  },
  {
    slug: '28-async-output-order',
    title: '28. 「异步题大汇总」：输出顺序、陷阱解析',
    body: `
## 解题步骤

1. 标出同步代码  
2. 宏任务进队列  
3. 微任务进队列  
4. 同步跑完 → 清微任务 → 取宏任务再循环

${fold(
  '经典模板',
  `
\`\`\`js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() { console.log('async2') }
console.log('script start')
setTimeout(() => console.log('setTimeout'), 0)
async1()
new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => console.log('promise2'))
console.log('script end')
// script start → async1 start → async2 → promise1 → script end
// → async1 end → promise2 → setTimeout
\`\`\`
`,
)}
`,
  },
  {
    slug: '29-prototype-chain',
    title: '29. 什么是原型？什么是原型链？',
    body: `
${fold(
  '参考要点',
  `
- 每个对象有 \`[[Prototype]]\`
- 函数有 \`prototype\`，实例 \`__proto__\` 指向它
- 属性查找：自身 → 原型 → … → \`null\`

\`\`\`js
obj -> Ctor.prototype -> Object.prototype -> null
\`\`\`
`,
)}
`,
  },
  {
    slug: '30-new-mechanism',
    title: '30. 构造函数与 new 的机制',
    body: `
\`new F(...)\` 大致步骤：

1. 创建对象，\`[[Prototype]] = F.prototype\`  
2. 以该对象为 this 执行 F  
3. 若 F 返回对象/函数则用该返回值，否则用新对象

${fold('注意', '漏写 new 时 this 可能指向全局（非严格），产生意外副作用。')}
`,
  },
  {
    slug: '31-handwrite-new',
    title: '31. 手写 new 的实现逻辑',
    body: `
\`\`\`js
function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const result = Ctor.apply(obj, args)
  return result !== null && (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj
}
\`\`\`
`,
  },
  {
    slug: '32-instanceof',
    title: '32. instanceof 背后的原理',
    body: `
沿对象原型链查找，是否出现 \`Ctor.prototype\`。

\`\`\`js
function myInstanceof(obj, Ctor) {
  if (obj == null || (typeof obj !== 'object' && typeof obj !== 'function')) return false
  let proto = Object.getPrototypeOf(obj)
  const target = Ctor.prototype
  while (proto) {
    if (proto === target) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
\`\`\`

${fold('边界', '可被 \`Symbol.hasInstance\` 自定义；跨 iframe 的 Array 要用 \`Array.isArray\`。')}
`,
  },
  {
    slug: '33-object-create',
    title: '33. Object.create 是怎么实现继承的？',
    body: `
\`Object.create(proto)\` 创建一个以 proto 为原型的新对象。

\`\`\`js
function create(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}
\`\`\`

${fold('用途', '纯原型继承、指定 \`null\` 原型做字典（无继承属性干扰）。')}
`,
  },
  {
    slug: '34-class-sugar',
    title: '34. class 是语法糖吗？背后发生了什么？',
    body: `
大体是构造函数 + 原型的语法糖，但有差异：

- class 内部默认严格模式  
- 方法不可枚举  
- 必须 \`new\` 调用  
- 存在暂时性死区  
- 支持 \`extends\`、\`super\`、静态字段、私有字段 \`#\`

${fold('结论', '可以说「基于原型」，但不是简单 1:1 旧写法替换。')}
`,
  },
  {
    slug: '35-inheritance-compare',
    title: '35. JS 中常见继承方式对比总结',
    body: `
| 方式 | 特点 |
|--|--|
| 原型链继承 | 引用类型共享，不能传参 |
| 构造函数继承 | 能传参，方法难复用 |
| 组合继承 | 常用，调两次父构造 |
| 寄生组合 | 最优经典方案 |
| class extends | 现代推荐 |

\`\`\`js
function Child(...args) {
  Parent.call(this, ...args)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
\`\`\`
`,
  },
  {
    slug: '36-private-field',
    title: '36. 如何模拟类的 private 属性？',
    body: `
${fold(
  '参考要点',
  `
1. 约定下划线 \`_foo\`（不真正私有）  
2. 闭包 + 工厂/构造函数内部变量  
3. \`WeakMap\` 存实例私有数据  
4. 原生 \`#private\` 字段（真正私有）

\`\`\`js
const bag = new WeakMap()
class Person {
  constructor(name) {
    bag.set(this, { name })
  }
  getName() { return bag.get(this).name }
}
\`\`\`
`,
)}
`,
  },
  {
    slug: '37-event-emitter',
    title: '37. 实现一个简化版 EventEmitter',
    body: `
\`\`\`js
class EventEmitter {
  constructor() { this.map = new Map() }
  on(type, fn) {
    if (!this.map.has(type)) this.map.set(type, [])
    this.map.get(type).push(fn)
    return this
  }
  off(type, fn) {
    const list = this.map.get(type)
    if (!list) return this
    this.map.set(type, list.filter((f) => f !== fn))
    return this
  }
  emit(type, ...args) {
    ;(this.map.get(type) || []).slice().forEach((fn) => fn(...args))
    return this
  }
  once(type, fn) {
    const wrap = (...args) => {
      this.off(type, wrap)
      fn(...args)
    }
    return this.on(type, wrap)
  }
}
\`\`\`
`,
  },
  {
    slug: '38-map-reduce',
    title: '38. 实现 Array.prototype.map、reduce',
    body: `
\`\`\`js
Array.prototype.myMap = function (fn, thisArg) {
  const res = []
  for (let i = 0; i < this.length; i++) {
    if (i in this) res[i] = fn.call(thisArg, this[i], i, this)
  }
  return res
}

Array.prototype.myReduce = function (fn, init) {
  let i = 0
  let acc = init
  if (arguments.length < 2) {
    while (i < this.length && !(i in this)) i++
    if (i >= this.length) throw new TypeError('Reduce of empty array')
    acc = this[i++]
  }
  for (; i < this.length; i++) {
    if (i in this) acc = fn(acc, this[i], i, this)
  }
  return acc
}
\`\`\`
`,
  },
  {
    slug: '39-lru',
    title: '39. 模拟实现 LRU 缓存',
    body: `
\`\`\`js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()
  }
  get(key) {
    if (!this.map.has(key)) return -1
    const val = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, val) // 移到最新
    return val
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next().value
      this.map.delete(oldest)
    }
  }
}
\`\`\`

${fold('原理', '利用 Map 的插入顺序：读/写都删后重插，队头即最久未使用。')}
`,
  },
  {
    slug: '40-json-stringify',
    title: '40. 实现一个 JSON.stringify',
    body: `
\`\`\`js
function jsonStringify(value, seen = new WeakSet()) {
  if (value === null) return 'null'
  const t = typeof value
  if (t === 'number') return Number.isFinite(value) ? String(value) : 'null'
  if (t === 'boolean') return String(value)
  if (t === 'string') return '"' + value.replace(/"/g, '\\\\"') + '"'
  if (t === 'undefined' || t === 'function' || t === 'symbol') return undefined
  if (seen.has(value)) throw new TypeError('Converting circular structure')
  seen.add(value)
  if (Array.isArray(value)) {
    return '[' + value.map((v) => jsonStringify(v, seen) ?? 'null').join(',') + ']'
  }
  const body = Object.keys(value)
    .map((k) => {
      const v = jsonStringify(value[k], seen)
      return v === undefined ? null : jsonStringify(k) + ':' + v
    })
    .filter(Boolean)
    .join(',')
  return '{' + body + '}'
}
\`\`\`
`,
  },
  {
    slug: '41-is-equal',
    title: '40. 实现一个深比较 isEqual 函数',
    body: `
> 飞书目录里该题编号与上一题同为 40，本地用 slug \`41-is-equal\` 区分。

\`\`\`js
function isEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false
  if (seen.get(a) === b) return true
  seen.set(a, b)
  const ka = Reflect.ownKeys(a)
  const kb = Reflect.ownKeys(b)
  if (ka.length !== kb.length) return false
  for (const k of ka) {
    if (!kb.includes(k) || !isEqual(a[k], b[k], seen)) return false
  }
  return true
}
\`\`\`
`,
  },
  {
    slug: '45-debounce-throttle-combo',
    title: '45. 手写 debounce + throttle 的组合封装',
    body: `
\`\`\`js
function createLimiter(fn, { wait = 300, mode = 'debounce' } = {}) {
  let timer = null
  let last = 0
  const wrapped = function (...args) {
    const ctx = this
    if (mode === 'throttle') {
      const now = Date.now()
      if (now - last >= wait) {
        last = now
        fn.apply(ctx, args)
      }
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(ctx, args), wait)
  }
  wrapped.cancel = () => clearTimeout(timer)
  wrapped.flush = (...args) => {
    clearTimeout(timer)
    fn.apply(this, args)
  }
  return wrapped
}
\`\`\`
`,
  },
  {
    slug: '46-pubsub',
    title: '46. 实现一个发布订阅系统（观察者模式）',
    body: `
观察者模式：主题直接通知观察者。  
发布订阅：中间有事件中心解耦（类似 EventEmitter）。

实现可复用第 37 题 \`EventEmitter\`，业务侧：

\`\`\`js
const bus = new EventEmitter()
bus.on('login', (user) => console.log(user))
bus.emit('login', { id: 1 })
\`\`\`

${fold('对比', '观察者一对多紧耦合；发布订阅经通道，发布者不知订阅者是谁。')}
`,
  },
  {
    slug: '47-memory-leak',
    title: '47. JS 内存泄漏场景与排查',
    body: `
## 常见场景

1. 全局变量意外挂载  
2. 闭包长期持有大对象  
3. 忘记移除的 DOM / 事件监听 / 定时器  
4. 脱离 DOM 但仍被 JS 引用的节点  
5. 控制台保留的对象引用（调试时）

${fold(
  '排查',
  `
Chrome Performance / Memory：拍堆快照对比、Allocation instrumentation。  
看 Detached HTMLElement、持续增长的数组/Map。
`,
)}
`,
  },
]

async function main() {
  await fs.mkdir(dir, { recursive: true })

  const docsMeta = [{ slug: 'index', title: '目录总览' }]

  const indexLinks = articles
    .map((a) => `- [${a.title}](/m/javascript/${a.slug})`)
    .join('\n')

  const indexBody = page(
    'JavaScript 系列知识点 · 目录',
    `
按飞书 Wiki 二级目录整理，共 **${articles.length}** 篇。建议顺序：基础类型 → 函数/this/闭包 → 异步 → 原型继承 → 手写实战。

## 文章列表

${indexLinks}

> 目录页：[飞书原文](${sourceUrl})
`,
  )
  await fs.writeFile(path.join(dir, 'index.md'), indexBody, 'utf8')

  for (const a of articles) {
    await fs.writeFile(path.join(dir, `${a.slug}.md`), page(a.title, a.body), 'utf8')
    docsMeta.push({ slug: a.slug, title: a.title })
    console.log('wrote', a.slug)
  }

  const metaPath = path.join(root, 'content', 'meta.json')
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'))
  const mod = meta.modules.find((m) => m.id === 'javascript')
  if (!mod) throw new Error('javascript module missing in meta.json')
  mod.docs = docsMeta
  mod.sourceUrl = sourceUrl
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2), 'utf8')
  console.log('updated meta.json docs:', docsMeta.length)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
