# 16. CSS预处理器（Sass/Less）的优势是什么？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

主要优势：

1. 变量（Variables）：

```scss
// Sass
$primary-color: #3498db;
$font-size: 16px;

.button {
    background-color: $primary-color;
    font-size: $font-size;
}
```

2. 嵌套（Nesting）：

```scss
.navbar {
    background: #333;
    
    ul {
        margin: 0;
        padding: 0;
    }
    
    li {
        list-style: none;
        
        a {
            text-decoration: none;
            color: white;
            
            &:hover {
                color: #ccc;
            }
        }
    }
}
```

3. 混合（Mixins）：

```scss
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    border-radius: $radius;
}

.button {
    @include border-radius(5px);
}
```

4. 继承（Inheritance）：

```scss
.message {
    border: 1px solid #ccc;
    padding: 10px;
    color: #333;
}

.success {
    @extend .message;
    border-color: green;
}
```

5. 函数和运算：

```scss
$base-font-size: 16px;

.title {
    font-size: $base-font-size * 1.5;
    margin-bottom: $base-font-size / 2;
}
```

6. 模块化：

```scss
// _variables.scss
$primary-color: #3498db;

// _mixins.scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

// main.scss
@import 'variables';
@import 'mixins';
```

其他优势：

- 更好的代码组织和维护
- 减少代码重复
- 支持条件语句和循环
- 丰富的内置函数
- 更好的团队协作

---
