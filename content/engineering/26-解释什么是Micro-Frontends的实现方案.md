# 26. 解释什么是Micro Frontends的实现方案？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

微前端的实现方案有多种，每种都有其适用场景：

1. 构建时集成：

```javascript
// 将微应用作为npm包发布
import MicroApp from '@company/micro-app';

function App() {
  return (
    <div>
      <MicroApp />
    </div>
  );
}
```

2. 运行时集成 - Single-SPA：

```javascript
// 注册微应用
registerApplication({
  name: 'vue-app',
  app: () => System.import('@company/vue-app'),
  activeWhen: '/vue'
});

// 启动Single-SPA
start();
```

3. Module Federation：

```javascript
// webpack.config.js - 主应用
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    mfApp: 'mfApp@http://localhost:3001/remoteEntry.js'
  }
});

// 使用远程模块
const RemoteComponent = React.lazy(() => import('mfApp/Component'));
```

4. Web Components：

```javascript
// 定义微前端组件
class MicroFrontend extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div>Micro Frontend Content</div>';
  }
}

customElements.define('micro-frontend', MicroFrontend);
```

5. iframe方案：

```html
<iframe 
  src="http://micro-app.com" 
  sandbox="allow-scripts allow-same-origin">
</iframe>
```
