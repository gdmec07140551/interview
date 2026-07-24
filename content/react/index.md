# React 高频面试题 · 目录

> 来源：[飞书 Wiki](https://w0hog67yl81.feishu.cn/wiki/PLICwMsqwiGkEuk01lWcdTXVn8e)

共 **38** 题，正文已从飞书 Wiki 同步。

## 第一部分：React 基础与核心思想

- [1.如何理解UI=f(state)这个公式？](/m/react/01-如何理解UI-f-state-这个公式)
- [2.虚拟DOM是什么？它解决了哪些实际问题？](/m/react/02-虚拟DOM是什么-它解决了哪些实际问题)
- [3.为什么说 JSX 不仅仅是模板语法，而是一种 JavaScript 的扩展？](/m/react/03-为什么说-JSX-不仅仅是模板语法-而是一种-JavaScript-的扩展)
- [4.函数组件和类组件的本质区别究竟是什么？](/m/react/04-函数组件和类组件的本质区别究竟是什么)
- [5.React 为什么如此强调 Props 的不可变性？](/m/react/05-React-为什么如此强调-Props-的不可变性)
- [6.React 的 Fiber 架构主要是为了解决什么问题？](/m/react/06-React-的-Fiber-架构主要是为了解决什么问题)
- [7.React 中的 ⁠key 属性有什么作用？](/m/react/07-React-中的-key-属性有什么作用)
- [8.React 的事件机制和合成事件是如何工作的？](/m/react/08-React-的事件机制和合成事件是如何工作的)
- [9.受控组件和非受控组件有什么区别？应该在什么场景下选择使用它们？](/m/react/09-受控组件和非受控组件有什么区别-应该在什么场景下选择使用它们)
- [10.为什么在React中“组合优于继承”](/m/react/10-为什么在React中-组合优于继承)
- [11. React 的严格模式 (StrictMode) 有什么作用？](/m/react/11-React-的严格模式-StrictMode-有什么作用)

## 第二部分：React 状态管理方案

- [1.useState 的更新是“异步”的吗？](/m/react/12-useState-的更新是-异步-的吗)
- [2.使用 useState 的函数式更新方式能带来哪些好处？](/m/react/13-使用-useState-的函数式更新方式能带来哪些好处)
- [3.状态提升的优缺点](/m/react/14-状态提升的优缺点)
- [4.useReducer 相比useState优势体现在哪？](/m/react/15-useReducer-相比useState优势体现在哪)
- [5.如何优化useContext带来的性能问题？](/m/react/16-如何优化useContext带来的性能问题)
- [6.说一下Redux的核心思想](/m/react/17-说一下Redux的核心思想)
- [7.为什么说 Immer.js 在现代 Redux 生态中扮演着如此重要的角色？](/m/react/18-为什么说-Immer-js-在现代-Redux-生态中扮演着如此重要的角色)
- [8.说说Redux的中间件（Middleware）的工作机制](/m/react/19-说说Redux的中间件-Middleware-的工作机制)
- [9.你是否了解像 Zustand、Jotai 这类新兴的状态管理库？它们各自有什么特点？](/m/react/20-你是否了解像-Zustand-Jotai-这类新兴的状态管理库-它们各自有什么特)
- [10.SWR 与 React Query：它们到底解决了什么问题？](/m/react/21-SWR-与-React-Query-它们到底解决了什么问题)
- [11.你是如何理解 Signals 的？它与 React 现有的状态管理方式有何不同？](/m/react/22-你是如何理解-Signals-的-它与-React-现有的状态管理方式有何不同)

## 第三部分：React Hooks 深度解析

- [1.useEffect 的执行时机具体是什么时候？它和 useLayoutEffect 有什么核心区别？](/m/react/23-useEffect-的执行时机具体是什么时候-它和-useLayoutEffec)
- [2.解释一下 useEffect 的依赖项？它背后的原理是什么？](/m/react/24-解释一下-useEffect-的依赖项-它背后的原理是什么)
- [3.在 useEffect 中，如何正确地处理异步请求并避免竞态条件（Race Condition）？](/m/react/25-在-useEffect-中-如何正确地处理异步请求并避免竞态条件-Race-Co)
- [4.什么时候使用 useCallback 和 useMemo？如果滥用它们会带来什么后果？](/m/react/26-什么时候使用-useCallback-和-useMemo-如果滥用它们会带来什么)
- [5.useRef 有哪些常见的应用场景？](/m/react/27-useRef-有哪些常见的应用场景)
- [6.forwardRef 和 useImperativeHandle 怎么用，解决了什么问题？](/m/react/28-forwardRef-和-useImperativeHandle-怎么用-解决了)
- [7.如何解决 SSR 场景下的 ID 冲突和可访问性问题的（useId)？](/m/react/29-如何解决-SSR-场景下的-ID-冲突和可访问性问题的-useId)
- [8.useTransition 和 useDeferredValue 是如何优化用户体验的？它们之间有什么区别？](/m/react/30-useTransition-和-useDeferredValue-是如何优化用户)
- [9.在设计自定义 Hooks 时，有哪些重要的原则和最佳实践？](/m/react/31-在设计自定义-Hooks-时-有哪些重要的原则和最佳实践)
- [10.解释一下 React Hooks 的执行顺序和依赖规则](/m/react/32-解释一下-React-Hooks-的执行顺序和依赖规则)

## 第四部分：React性能优化与新特性

- [1. React 18 中的自动批处理 Automatic Batching 如何工作？](/m/react/33-React-18-中的自动批处理-Automatic-Batching-如何工作)
- [2. React 19 中的 Activity 组件与 Suspense 有什么区别？](/m/react/34-React-19-中的-Activity-组件与-Suspense-有什么区别)
- [3. 说一下React 19 use Hook的工作原理](/m/react/35-说一下React-19-use-Hook的工作原理)
- [4.说一下React 19 对表单处理的改进：useActionState 和 useFormStatus？](/m/react/36-说一下React-19-对表单处理的改进-useActionState-和-us)
- [5.React 19 中如何直接在组件中渲染 meta 标签和样式表？](/m/react/37-React-19-中如何直接在组件中渲染-meta-标签和样式表)
- [6.React 19 特性： ref 作为 prop 传递](/m/react/38-React-19-特性-ref-作为-prop-传递)
