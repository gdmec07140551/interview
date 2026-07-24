# 23. 什么是CSS-in-JS？有什么优缺点？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

CSS-in-JS定义：

CSS-in-JS是一种将CSS样式直接写在JavaScript代码中的技术，通常与React等组件化框架一起使用。

常见的CSS-in-JS库：

1. Styled-components：

```javascript
import styled from 'styled-components';

const Button = styled.button`
    background: ${props => props.primary ? 'blue' : 'white'};
    color: ${props => props.primary ? 'white' : 'blue'};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid blue;
    border-radius: 3px;
    cursor: pointer;
    
    &:hover {
        background: ${props => props.primary ? 'darkblue' : 'lightblue'};
    }
`;

// 使用
<Button primary>Primary Button</Button>
```

2. Emotion：

```javascript
import { css } from '@emotion/react';

const buttonStyle = css`
    background: hotpink;
    &:hover {
        background: pink;
    }
`;

<button css={buttonStyle}>Click me</button>
```

3. JSS：

```javascript
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    button: {
        background: 'blue',
        color: 'white',
        '&:hover': {
            background: 'darkblue'
        }
    }
});

function Button() {
    const classes = useStyles();
    return <button className={classes.button}>Click me</button>;
}
```

优点：

1. 组件化：

- 样式与组件紧密绑定
- 更好的封装性和可维护性

2. 动态样式：

```javascript
const Button = styled.button`
    background: ${props => props.theme.primary};
    opacity: ${props => props.disabled ? 0.5 : 1};
`;
```

3. 自动前缀：

- 自动添加浏览器前缀
- 处理兼容性问题

4. 死代码消除：

- 未使用的样式会被自动移除
- 减少最终打包大小

5. 主题支持：

```javascript
const theme = {
    primary: 'blue',
    secondary: 'green'
};

<ThemeProvider theme={theme}>
    <App />
</ThemeProvider>
```

缺点：

1. 学习成本：

- 需要学习新的API和语法
- 与传统CSS开发方式不同

2. 运行时开销：

- 样式在运行时生成
- 可能影响性能

3. 调试困难：

- 生成的类名不直观
- 调试工具支持有限

4. 服务端渲染复杂：

- SSR配置相对复杂
- 需要额外的设置

5. 工具链依赖：

- 依赖JavaScript构建工具
- 增加了项目复杂度

适用场景：

- React/Vue等组件化项目
- 需要动态样式的应用
- 大型团队协作项目
- 需要严格样式隔离的场景

---
