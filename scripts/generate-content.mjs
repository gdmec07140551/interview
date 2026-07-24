/**
 * Generate interview-prep markdown for all modules.
 * Content is structured to match the Feishu「史上最全八股文」topic tree,
 * with sourceUrl retained for tracing. Answers are concise interview notes
 * for personal revision when Feishu body text cannot be fully exported.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.resolve(__dirname, '../content')

function page(title, sourceUrl, body) {
  return `# ${title}\n\n> 来源：[飞书文档](${sourceUrl})\n\n${body.trim()}\n`
}

function qa(q, a) {
  return `## ${q}\n\n<details>\n<summary>参考要点</summary>\n\n${a.trim()}\n\n</details>\n`
}

const meta = {
  title: '前端面试知识站',
  modules: [],
}

async function writeModule(mod) {
  const dir = path.join(contentDir, mod.id)
  await fs.mkdir(dir, { recursive: true })
  const docs = []
  for (const doc of mod.docs) {
    await fs.writeFile(path.join(dir, `${doc.slug}.md`), doc.content, 'utf8')
    docs.push({ slug: doc.slug, title: doc.title })
  }
  meta.modules.push({
    id: mod.id,
    title: mod.title,
    sourceUrl: mod.sourceUrl,
    docs,
  })
}

const modules = []

// ---- interview-prep ----
modules.push({
  id: 'interview-prep',
  title: '面试准备',
  sourceUrl: 'https://my.feishu.cn/docx/BTIkdAC4MorCtHxEP4DcnJqenWg',
  docs: [
    {
      slug: 'index',
      title: '面试该如何准备',
      content: page(
        '面试该如何准备',
        'https://my.feishu.cn/docx/BTIkdAC4MorCtHxEP4DcnJqenWg',
        `
## 从哪开始准备？

### 校招建议

- 能实习尽早实习，优先互联网公司（哪怕小厂）
- 互联网公司有成熟协作流程，能学到真实工程实践
- 找不到实习可做开源 / 模仿项目，如搭组件库

### 社招建议

- 不要等准备完才投：边练边投
- 用冷门岗位 / 中等强度团队做「试水」面试，调试答题状态
- 投递前确保简历无硬伤，项目描述不能只有「负责页面开发」

## 简历精修

- 一页纸，三段以内，每段控制在 4 行内
- 推荐结构：**职责 + 技术关键词 + 场景说明 + 结果数据**

### 示例

✅ 负责推荐策略可视化配置系统开发（React、TypeScript、GraphQL），支持运营拖拽配置推荐规则。上线后推荐点击率提升 12%，日均 PV 增加 30 万。

❌ 「负责开发页面功能」—— 无信息密度  
❌ 「参与某某项目」—— 面试官会追问「具体参与了什么」

## 项目答题准备

针对每个项目提炼：

1. 是什么项目
2. 解决什么问题
3. 用了什么技术
4. 你负责什么部分
5. 取得了什么成果

准备两个版本话术：

- **概述版**：介绍项目背景（1 分钟）
- **展开版**：遍历该项目可能被问到的细节

### 概述版示例

当时团队面临推荐策略每次调整都需研发介入、运营效率低的问题。我用 React + TypeScript + GraphQL 主导开发了推荐策略可视化配置平台，让运营可通过拖拽配置策略，降低技术门槛。上线后推荐点击率提升 12%，日均 PV 增加 30 万。
`,
      ),
    },
  ],
})

// ---- javascript ----
modules.push({
  id: 'javascript',
  title: 'JavaScript 系列知识点',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/NyLwwaMuaihlFikDr7Kcv8ypn2c',
  docs: [
    {
      slug: 'index',
      title: 'JavaScript 系列知识点',
      content: page(
        'JavaScript 系列知识点',
        'https://w0hog67yl81.feishu.cn/wiki/NyLwwaMuaihlFikDr7Kcv8ypn2c',
        [
          qa(
            '数据类型有哪些？如何判断？',
            `基本类型：\`undefined\` \`null\` \`boolean\` \`number\` \`string\` \`symbol\` \`bigint\`  
引用类型：\`object\`（含数组、函数、日期等）

\`\`\`js
typeof null // 'object'（历史 bug）
Object.prototype.toString.call([]) // '[object Array]'
Array.isArray([])
\`\`\``,
          ),
          qa(
            '什么是闭包？有什么用？',
            `闭包：函数能够访问并「记住」其词法作用域，即使在作用域外执行。

用途：数据私有、函数工厂、防抖节流中的状态保存。

注意：可能造成内存泄漏（意外持有大对象引用）。`,
          ),
          qa(
            '原型与原型链',
            `- 每个对象有 \`[[Prototype]]\`（\`__proto__\`）
- 函数有 \`prototype\`，\`new\` 出的实例 \`__proto__\` 指向该 \`prototype\`
- 属性查找沿原型链向上，直到 \`null\`

\`\`\`js
function Person() {}
const p = new Person()
p.__proto__ === Person.prototype // true
Person.prototype.__proto__ === Object.prototype
\`\`\``,
          ),
          qa(
            'this 绑定规则',
            `1. new 绑定  
2. 显式绑定（call/apply/bind）  
3. 隐式绑定（对象调用）  
4. 默认绑定（严格模式 undefined，非严格 window）  
箭头函数：继承外层词法 \`this\`，不能被 call 改掉。`,
          ),
          qa(
            '事件循环 Event Loop',
            `宏任务：script、setTimeout、setInterval、I/O、UI rendering  
微任务：Promise.then、MutationObserver、queueMicrotask

每一轮：执行一个宏任务 → 清空所有微任务 → 可能渲染 → 下一个宏任务。

\`\`\`js
console.log(1)
setTimeout(() => console.log(2))
Promise.resolve().then(() => console.log(3))
console.log(4)
// 1 4 3 2
\`\`\``,
          ),
          qa(
            '深拷贝与浅拷贝',
            `浅拷贝：\`Object.assign\` / 展开运算，只拷一层。  
深拷贝：\`structuredClone\`、递归、\`JSON.parse(JSON.stringify)\`（有局限）。

\`\`\`js
const clone = structuredClone(obj)
\`\`\``,
          ),
        ].join('\n'),
      ),
    },
  ],
})

// ---- css-layout ----
modules.push({
  id: 'css-layout',
  title: 'CSS 布局全解',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/Abt9w8NlGi0KJckWOU7cugyVnIb',
  docs: [
    {
      slug: 'index',
      title: 'CSS 布局全解',
      content: page(
        'CSS 布局全解',
        'https://w0hog67yl81.feishu.cn/wiki/Abt9w8NlGi0KJckWOU7cugyVnIb',
        [
          qa(
            'BFC 是什么？如何触发？',
            `Block Formatting Context：独立渲染区域，内部布局不影响外部。

触发：\`overflow\` 非 visible、\`float\`、\`position: absolute/fixed\`、\`display: inline-block/flex/grid\`、\`contain\` 等。

用途：清除浮动、阻止 margin 折叠、自适应两栏布局。`,
          ),
          qa(
            'Flex 常用属性',
            `容器：\`flex-direction\` \`justify-content\` \`align-items\` \`flex-wrap\` \`gap\`  
项目：\`flex-grow\` \`flex-shrink\` \`flex-basis\` \`align-self\` \`order\`

\`\`\`css
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
\`\`\``,
          ),
          qa(
            'Grid 适合什么场景？',
            `二维布局：仪表盘、杂志排版、复杂卡片网格。

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
\`\`\``,
          ),
          qa(
            '水平垂直居中的几种方式',
            `1. Flex：\`justify-content + align-items: center\`  
2. Grid：\`place-items: center\`  
3. 绝对定位 + transform  
4. 行高（单行文本）`,
          ),
        ].join('\n'),
      ),
    },
  ],
})

// ---- css ----
const cssQs = [
  ['盒模型有哪些？', '标准盒：`content-box`（宽高不含 padding/border）；IE 盒：`border-box`。生产常用 `* { box-sizing: border-box }`。'],
  ['选择器优先级', '行内 > ID > 类/伪类/属性 > 元素/伪元素。`!important` 最高但慎用。同优先级后写覆盖。'],
  ['重绘与回流', '回流（reflow）：几何变化；重绘（repaint）：外观变化但不影响布局。避免频繁读布局属性穿插写样式，用 `transform`/`opacity` 走合成。'],
  ['position 取值', '`static` `relative` `absolute` `fixed` `sticky`。absolute 相对最近定位祖先；fixed 相对视口（transform 祖先会改变含块）。'],
  ['如何实现三角形', '宽高 0 + 透明 border，只留一边有色。'],
  ['移动端 1px 问题', '用 `transform: scaleY(0.5)`、伪元素、或 `0.5px`（部分机型）、viewport 方案。'],
]
modules.push({
  id: 'css',
  title: 'CSS 面试题库（44）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde',
  docs: [
    {
      slug: 'index',
      title: 'CSS 面试题库',
      content: page(
        'CSS 面试题库（精选）',
        'https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde',
        cssQs.map(([q, a], i) => qa(`${i + 1}. ${q}`, a)).join('\n') +
          `\n> 完整 44 题见飞书原文，本地保留高频精选便于速记。\n`,
      ),
    },
  ],
})

// ---- html ----
const htmlQs = [
  ['语义化标签的好处', '可读性、SEO、无障碍、结构清晰。如 `header` `nav` `main` `article` `section` `footer`。'],
  ['script 的 defer / async', '`async`：下载完立刻执行，打乱顺序；`defer`：下载完等 HTML 解析完按序执行。模块脚本默认 defer 行为。'],
  ['src 与 href 区别', '`src` 替换/嵌入当前元素内容（img/script）；`href` 建立与资源的链接关系（a/link）。'],
  ['doctype 作用', '告诉浏览器用标准模式渲染，避免怪异模式。'],
  ['Canvas 与 SVG', 'Canvas：位图，适合游戏/大量像素操作；SVG：矢量 DOM，适合图标/可交互图形，缩放清晰。'],
]
modules.push({
  id: 'html',
  title: 'HTML 面试题库（50）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/UXLkwcSP6io0LJk6gInc1p3Ynxe',
  docs: [
    {
      slug: 'index',
      title: 'HTML 面试题库',
      content: page(
        'HTML 面试题库（精选）',
        'https://w0hog67yl81.feishu.cn/wiki/UXLkwcSP6io0LJk6gInc1p3Ynxe',
        htmlQs.map(([q, a], i) => qa(`${i + 1}. ${q}`, a)).join('\n'),
      ),
    },
  ],
})

// ---- browser ----
modules.push({
  id: 'browser',
  title: '浏览器原理',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/DraiwExLji1DOfkZiGucEljKnEb',
  docs: [
    {
      slug: 'index',
      title: '浏览器原理核心知识点',
      content: page(
        '浏览器原理核心知识点',
        'https://w0hog67yl81.feishu.cn/wiki/DraiwExLji1DOfkZiGucEljKnEb',
        [
          qa(
            '从输入 URL 到页面显示',
            `1. DNS 解析  
2. TCP / TLS 连接  
3. 发送 HTTP 请求  
4. 服务器响应  
5. 解析 HTML → DOM  
6. 解析 CSS → CSSOM  
7. 合成 Render Tree  
8. Layout → Paint → Composite`,
          ),
          qa(
            '浏览器缓存',
            `强缓存：\`Cache-Control\` / \`Expires\`（200 from cache）  
协商缓存：\`ETag\` / \`Last-Modified\`（304）  
还可配合 Service Worker、memory/disk cache。`,
          ),
          qa(
            '跨域与同源策略',
            `同源：协议 + 域名 + 端口。跨域限制读响应，不限制发请求。  
解决：CORS、代理、JSONP（老）、postMessage、nginx 反向代理。`,
          ),
          qa(
            '垃圾回收简述',
            `V8：新生代 Scavenge，老生代 Mark-Sweep / Mark-Compact，增量标记与并发标记减少卡顿。可达性分析找垃圾。`,
          ),
        ].join('\n'),
      ),
    },
  ],
})

// ---- es6 ----
modules.push({
  id: 'es6',
  title: 'ES6 高频（30）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/GctYwGIMRi3qNIk7caYck20hnof',
  docs: [
    {
      slug: 'index',
      title: 'ES6 高频面试题',
      content: page(
        'ES6 高频面试题',
        'https://w0hog67yl81.feishu.cn/wiki/GctYwGIMRi3qNIk7caYck20hnof',
        [
          qa('let / const / var', '`var` 函数作用域、可提升；`let/const` 块级、暂时性死区；`const` 绑定不可改，对象属性可变。'),
          qa(
            'Promise 与 async/await',
            `\`async\` 函数返回 Promise；\`await\` 暂停异步函数等待结果。错误用 try/catch。

\`\`\`js
async function load() {
  try {
    const data = await fetch('/api').then((r) => r.json())
    return data
  } catch (e) {
    console.error(e)
  }
}
\`\`\``,
          ),
          qa('解构与剩余参数', '`const {a, ...rest} = obj`；`function f(a, ...args)`；注意默认值与嵌套解构。'),
          qa('Map / Set / WeakMap', 'Set 去重；Map 任意类型键；WeakMap/WeakSet 弱引用键，利于 GC，不可遍历。'),
          qa('模块化', 'ESM：`import/export` 静态分析、严格模式、值引用；CJS：`require` 运行时加载、值拷贝（对象为引用）。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- react ----
const reactBasics = [
  ['如何理解 UI = f(state)？', 'UI 是状态的纯函数映射。状态变 → 重新计算视图。利于可预测、可测试、时间旅行调试。'],
  [
    '虚拟 DOM 解决了什么？',
    '用 JS 对象描述 UI，通过 Diff 算出最小变更再操作真实 DOM，降低直接操作 DOM 的成本，并统一跨端抽象。注意：虚拟 DOM 不是银弹，关键是批处理与声明式开发体验。',
  ],
  [
    'JSX 本质',
    '语法糖，编译为 `React.createElement` / `jsx` 运行时调用，本质是 JS 表达式，可嵌入逻辑。',
  ],
  [
    '函数组件 vs 类组件',
    '函数组件：闭包捕获 props/state，配合 Hooks；类组件：实例与生命周期方法。现代以函数组件为主。',
  ],
  [
    'Props 不可变',
    '单向数据流：子组件不应改 props；变更由父级 setState，保证可预测与对比优化（memo）。',
  ],
  [
    'Fiber 解决什么？',
    '可中断的增量渲染：把工作拆成小单元，可调度优先级，避免长任务阻塞主线程，实现并发特性基础。',
  ],
  [
    'key 的作用',
    '帮助 Diff 识别列表项身份。勿用随机数/不稳定 index（重排时出问题）。',
  ],
  [
    '合成事件',
    'React 在根节点委托监听，跨浏览器归一化事件对象；注意与原生事件混用时的执行顺序与池化历史差异（新版已变化）。',
  ],
  [
    '受控 vs 非受控',
    '受控：value + onChange 由 React 状态驱动；非受控：ref 读 DOM。表单校验、即时联动用受控。',
  ],
  ['StrictMode', '开发环境双调用部分逻辑，帮助发现副作用不纯、过时 API。'],
  ['组合优于继承', '用 props/children/render props/hooks 组合行为，避免组件继承树难维护。'],
]
const reactState = [
  ['父子 / 兄弟通信', '父→子 props；子→父回调；兄弟经共同父级提升状态；跨层 Context / 状态库。'],
  ['useState 函数式更新', '`setX(prev => prev+1)` 避免闭包陈旧，批量更新时更安全。'],
  ['状态提升利弊', '共享状态上移便于同步，但父组件变重；过大时考虑 Context 或状态库。'],
  ['useContext + useReducer', '可做轻量全局 store；注意拆分 Context 避免无用渲染。'],
  ['useReducer vs useState', '复杂状态转移、多子值相关更新用 reducer 更清晰。'],
]
const reactHooks = [
  [
    'useEffect 依赖与清理',
    '依赖变化重跑；返回清理函数取消订阅/定时器。别瞒依赖，用 eslint-plugin-react-hooks。',
  ],
  [
    'useMemo / useCallback',
    '缓存值/函数引用，减少子组件重渲染；先测量再优化，避免滥用。',
  ],
  [
    '自定义 Hooks',
    '复用状态逻辑，以 `use` 开头，内部可调其他 Hooks，保持纯逻辑与 UI 分离。',
  ],
  [
    'useRef 用途',
    '持有可变值不触发渲染；保存 DOM；保存上一轮值。',
  ],
]
const reactPerf = [
  [
    '常见性能手段',
    '`React.memo`、列表虚拟化、代码分割 `lazy/Suspense`、避免在 render 创建大对象、key 稳定、并发特性（startTransition）。',
  ],
  [
    'startTransition',
    '标记非紧急更新，保持输入等高优先级响应。',
  ],
  [
    'React 18+ 并发',
    '可中断渲染、自动批处理、Suspense 数据/代码加载等。',
  ],
]
modules.push({
  id: 'react',
  title: 'React 高频',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
  docs: [
    {
      slug: 'index',
      title: 'React 总览',
      content: page(
        'React 高频面试题 · 总览',
        'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
        `
按飞书目录分为四部分，建议顺序刷：

1. [基础与核心思想](/m/react/basics) — UI=f(state)、Fiber、事件、key…
2. [状态管理](/m/react/state) — Context、Reducer、选型
3. [Hooks 深度解析](/m/react/hooks) — Effect、自定义 Hooks
4. [性能优化与新特性](/m/react/perf) — memo、并发、Transition

原文目录页含完整题号列表，可对照飞书查漏。
`,
      ),
    },
    {
      slug: 'basics',
      title: '第一部分：基础与核心思想',
      content: page(
        '第一部分：React 基础与核心思想',
        'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
        `目标：建立扎实理论基础，理解设计哲学。\n\n` +
          reactBasics.map(([q, a], i) => qa(`${i + 1}. ${q}`, a)).join('\n'),
      ),
    },
    {
      slug: 'state',
      title: '第二部分：状态管理',
      content: page(
        '第二部分：React 状态管理方案',
        'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
        `目标：从局部到全局构建状态管理知识体系。\n\n` +
          reactState.map(([q, a], i) => qa(`${i + 1}. ${q}`, a)).join('\n'),
      ),
    },
    {
      slug: 'hooks',
      title: '第三部分：Hooks 深度解析',
      content: page(
        '第三部分：React Hooks 深度解析',
        'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
        reactHooks.map(([q, a], i) => qa(`${i + 1}. ${q}`, a)).join('\n'),
      ),
    },
    {
      slug: 'perf',
      title: '第四部分：性能优化与新特性',
      content: page(
        '第四部分：性能优化与新特性',
        'https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e',
        reactPerf.map(([q, a], i) => qa(`${i + 1}. ${q}`, a)).join('\n'),
      ),
    },
  ],
})

// ---- vue ----
modules.push({
  id: 'vue',
  title: 'Vue 高频',
  sourceUrl: 'https://my.feishu.cn/docx/YVtrdaQRboVBWjxuGM4cXpFAnMb',
  docs: [
    {
      slug: 'index',
      title: 'Vue 高频面试题',
      content: page(
        'Vue 高频面试题',
        'https://my.feishu.cn/docx/YVtrdaQRboVBWjxuGM4cXpFAnMb',
        [
          qa('Vue2 vs Vue3 响应式', 'Vue2：`Object.defineProperty`，无法监听新增/删除与数组下标需改 API；Vue3：`Proxy`，可拦截更多操作，配合 Reflect。'),
          qa('nextTick', 'DOM 更新是异步批量的；`nextTick` 在更新后执行回调，用于读取更新后的 DOM。'),
          qa('computed vs watch', 'computed：有缓存的派生值；watch：观察变化执行副作用（请求、打点）。'),
          qa('v-if vs v-show', 'v-if 真条件渲染（销毁/重建）；v-show 切换 CSS display。频繁切换用 show，条件很少为真用 if。'),
          qa('组件通信', 'props/emits、provide/inject、pinia/vuex、事件总线（不推荐）、v-model。'),
          qa(
            'keep-alive',
            '缓存组件实例，触发 `activated`/`deactivated`。配合 `include/exclude` 与路由。',
          ),
        ].join('\n'),
      ),
    },
  ],
})

// ---- typescript ----
modules.push({
  id: 'typescript',
  title: 'TypeScript（50）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf',
  docs: [
    {
      slug: 'index',
      title: 'TypeScript 面试题',
      content: page(
        'TypeScript 面试题（精选）',
        'https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf',
        [
          qa('any vs unknown vs never', '`any` 关闭检查；`unknown` 使用前需收窄；`never` 永不返回/不可达。'),
          qa(
            'interface vs type',
            'interface 可声明合并，偏对象形状；type 可联合/交叉/映射更灵活。现代两者都常用。',
          ),
          qa(
            '泛型用途',
            '参数化类型，复用且保持类型安全。如 `function identity<T>(x: T): T`。',
          ),
          qa(
            '类型收窄',
            '`typeof` `instanceof` 等值检查、可辨识联合、`in`、自定义类型守卫。',
          ),
          qa(
            '工具类型',
            '`Partial` `Required` `Pick` `Omit` `Record` `ReturnType` `Parameters` 等。',
          ),
        ].join('\n'),
      ),
    },
  ],
})

// ---- engineering ----
modules.push({
  id: 'engineering',
  title: '前端工程化（30）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l',
  docs: [
    {
      slug: 'index',
      title: '前端工程化面试题',
      content: page(
        '前端工程化面试题',
        'https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l',
        [
          qa('Vite 为什么快', '开发用原生 ESM + esbuild 预构建依赖；生产用 Rollup。按需编译，冷启动快。'),
          qa('Tree Shaking', '基于 ESM 静态结构删除未使用导出；注意副作用与 CommonJS 限制。'),
          qa('Babel 作用', '语法降级、polyfill（配合 preset-env）、插件转换 JSX 等。'),
          qa('CI/CD 在前端', 'lint/test/build → 产物上传 CDN → 发版；可用 GitHub Actions / GitLab CI。'),
          qa('Monorepo', 'pnpm workspace / turborepo：多包共享依赖与流水线，适合组件库+业务。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- cs-basics ----
modules.push({
  id: 'cs-basics',
  title: '网络 / OS / 数据结构（50）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc',
  docs: [
    {
      slug: 'index',
      title: '计算机基础面试题',
      content: page(
        '计算机网络 / OS / 数据结构',
        'https://w0hog67yl81.feishu.cn/wiki/SKQgwolgNiwW3BkoaQecUVXhnRc',
        [
          qa('HTTP vs HTTPS', 'HTTPS = HTTP + TLS，加密、完整性、身份认证；握手有额外 RTT，可用会话复用优化。'),
          qa('HTTP/2 特点', '多路复用、头部压缩、服务器推送（少用）、二进制分帧。'),
          qa('TCP 三次握手 / 四次挥手', '握手：SYN → SYN+ACK → ACK；挥手：FIN/ACK 双向关闭，TIME_WAIT 等待残留包。'),
          qa('进程 vs 线程', '进程资源隔离单位；线程调度单位，共享进程内存。浏览器多进程：浏览器/渲染/GPU/插件等。'),
          qa('常见结构复杂度', '哈希表均摊 O(1)；平衡树 O(log n)；数组随机访问 O(1)、中间插入 O(n)。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- nodejs ----
modules.push({
  id: 'nodejs',
  title: 'Node.js（30）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c',
  docs: [
    {
      slug: 'index',
      title: 'Node.js 面试题',
      content: page(
        'Node.js 面试题',
        'https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c',
        [
          qa('Node 事件循环阶段', 'timers → pending → idle/prepare → poll → check（setImmediate）→ close；微任务在阶段间优先。'),
          qa('require 缓存', '模块首次加载后缓存到 `require.cache`，再次 require 得同一导出。'),
          qa('流 Stream', '处理大文件不占满内存：Readable/Writable/Duplex/Transform；`pipeline` 处理错误。'),
          qa('集群与多核', '`cluster` / 多进程 PM2，主进程分发连接到 worker。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- performance ----
modules.push({
  id: 'performance',
  title: '性能优化（30）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf',
  docs: [
    {
      slug: 'index',
      title: '前端性能优化',
      content: page(
        '前端性能优化',
        'https://w0hog67yl81.feishu.cn/wiki/BVfzwnNBiibevfkIN1Acyaspnkf',
        [
          qa('指标', 'LCP、INP/FID、CLS、TTFB、FCP；工具：Lighthouse、Performance、Web Vitals。'),
          qa('加载优化', '压缩、CDN、HTTP/2、拆包、懒加载、预加载/预连接、图片 WebP/AVIF、响应式图。'),
          qa('运行时优化', '减少长任务、虚拟列表、防抖节流、`requestAnimationFrame`、Web Worker。'),
          qa('缓存策略', '静态资源 content-hash 长缓存；HTML 短缓存或协商缓存。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- miniprogram ----
modules.push({
  id: 'miniprogram',
  title: '小程序（10）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/QwmHwAqJYiktztkd3S9cRpQUn5r',
  docs: [
    {
      slug: 'index',
      title: '小程序八股文',
      content: page(
        '小程序八股文',
        'https://w0hog67yl81.feishu.cn/wiki/QwmHwAqJYiktztkd3S9cRpQUn5r',
        [
          qa('双线程模型', '逻辑层 JSEngine 与渲染层 WebView 分离，经原生桥通信；勿高频 setData。'),
          qa('setData 注意', '只传变更字段、合并更新、控制频率与数据体积。'),
          qa('分包与预下载', '主包控制体积，分包异步加载；配置 preloadRule 提升体验。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- design-patterns ----
modules.push({
  id: 'design-patterns',
  title: '设计模式（10）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje',
  docs: [
    {
      slug: 'index',
      title: '设计模式',
      content: page(
        '设计模式',
        'https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje',
        [
          qa('单例', '全局唯一实例，如弹窗管理器、配置中心。'),
          qa('观察者 / 发布订阅', '事件系统、Vue 响应式相关思想；解耦发布者与订阅者。'),
          qa('策略模式', '把算法封装成可替换策略，消除长 if-else（如表单校验规则表）。'),
          qa('装饰器 / HOC', '不改原对象增强行为；React HOC、TS decorator。'),
          qa('工厂', '封装创建逻辑，统一创建不同产品。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- security ----
modules.push({
  id: 'security',
  title: '前端安全（20）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh',
  docs: [
    {
      slug: 'index',
      title: '前端安全面试题',
      content: page(
        '前端安全面试题',
        'https://w0hog67yl81.feishu.cn/wiki/YQDHw5T6ViPKKwkwL9RcyXuZnSh',
        [
          qa('XSS', '存储型 / 反射型 / DOM 型。防：转义、CSP、HttpOnly Cookie、避免 `dangerouslySetInnerHTML` 灌入不可信内容。'),
          qa('CSRF', '利用登录态发起跨站请求。防：SameSite Cookie、CSRF Token、关键操作二次验证。'),
          qa('点击劫持', 'iframe 嵌套诱骗点击。防：`X-Frame-Options` / CSP `frame-ancestors`。'),
          qa('敏感信息', '别把密钥放前端；Token 存储权衡 localStorage vs Cookie；HTTPS 全站。'),
        ].join('\n'),
      ),
    },
  ],
})

// ---- js-handwrite ----
modules.push({
  id: 'js-handwrite',
  title: 'JS 手写题（50）',
  sourceUrl: 'https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww',
  docs: [
    {
      slug: 'index',
      title: 'JS 手写题',
      content: page(
        'JS 手写题（高频实现）',
        'https://w0hog67yl81.feishu.cn/wiki/WA8Cw0NJFiEDSWkfEnNciVmrnww',
        `
## 1. 防抖 debounce

\`\`\`js
function debounce(fn, wait = 300) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
}
\`\`\`

## 2. 节流 throttle

\`\`\`js
function throttle(fn, wait = 300) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= wait) {
      last = now
      fn.apply(this, args)
    }
  }
}
\`\`\`

## 3. 深拷贝（简版）

\`\`\`js
function deepClone(val, map = new WeakMap()) {
  if (val === null || typeof val !== 'object') return val
  if (map.has(val)) return map.get(val)
  const out = Array.isArray(val) ? [] : {}
  map.set(val, out)
  for (const key of Reflect.ownKeys(val)) {
    out[key] = deepClone(val[key], map)
  }
  return out
}
\`\`\`

## 4. Promise.all

\`\`\`js
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const list = [...iterable]
    const result = Array(list.length)
    let done = 0
    if (!list.length) return resolve([])
    list.forEach((p, i) => {
      Promise.resolve(p).then((v) => {
        result[i] = v
        if (++done === list.length) resolve(result)
      }, reject)
    })
  })
}
\`\`\`

## 5. 函数柯里化

\`\`\`js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args)
    return (...rest) => curried.apply(this, args.concat(rest))
  }
}
\`\`\`

## 6. instanceof

\`\`\`js
function myInstanceof(obj, Ctor) {
  let proto = Object.getPrototypeOf(obj)
  const target = Ctor.prototype
  while (proto) {
    if (proto === target) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
\`\`\`

## 7. new

\`\`\`js
function myNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype)
  const ret = Ctor.apply(obj, args)
  return ret !== null && (typeof ret === 'object' || typeof ret === 'function') ? ret : obj
}
\`\`\`

## 8. 数组扁平

\`\`\`js
function flatten(arr, depth = Infinity) {
  return depth > 0
    ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.slice()
}
\`\`\`

> 更多手写（bind/call、发布订阅、LRU、并发池等）对照飞书原文继续补全。
`,
      ),
    },
  ],
})

async function main() {
  // clean previous thin scrapes except meta will be rewritten
  for (const mod of modules) {
    await writeModule(mod)
    console.log('wrote', mod.id)
  }
  await fs.writeFile(path.join(contentDir, 'meta.json'), JSON.stringify(meta, null, 2), 'utf8')
  console.log('meta.json updated,', meta.modules.length, 'modules')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
