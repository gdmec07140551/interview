# 44. CSS中的@property规则如何定义自定义属性？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/KrzqwnIMfiVDAAkVDHWc7fq9nde)

参考答案：

@property规则定义：

@property规则允许开发者明确定义CSS自定义属性（CSS变量）的语法、初始值、是否继承等特性，使自定义属性能够参与动画和过渡，并提供更好的类型安全性。

基本语法：

```css
@property --property-name {
    syntax: '<color>';
    initial-value: #000;
    inherits: false;
}
```

语法组成部分：

1. syntax（语法定义）：

```css
@property --my-color {
    syntax: '<color>'; /* 颜色类型 */
    initial-value: red;
    inherits: false;
}

@property --my-length {
    syntax: '<length>'; /* 长度类型 */
    initial-value: 0px;
    inherits: false;
}

@property --my-number {
    syntax: '<number>'; /* 数字类型 */
    initial-value: 0;
    inherits: false;
}

@property --my-percentage {
    syntax: '<percentage>'; /* 百分比类型 */
    initial-value: 0%;
    inherits: false;
}

@property --my-angle {
    syntax: '<angle>'; /* 角度类型 */
    initial-value: 0deg;
    inherits: false;
}
```

2. 复合语法类型：

```css
@property --gradient-colors {
    syntax: '<color>+'; /* 一个或多个颜色 */
    initial-value: red, blue;
    inherits: false;
}

@property --border-style {
    syntax: 'solid | dashed | dotted'; /* 枚举值 */
    initial-value: solid;
    inherits: false;
}

@property --transform-values {
    syntax: '<number> | <length> | <percentage>'; /* 多种类型 */
    initial-value: 0;
    inherits: false;
}

@property --any-value {
    syntax: '*'; /* 任意值 */
    initial-value: initial;
    inherits: true;
}
```

实际应用场景：

1. 可动画的颜色属性：

```css
@property --theme-color {
    syntax: '<color>';
    initial-value: #007bff;
    inherits: false;
}

@property --gradient-start {
    syntax: '<color>';
    initial-value: #ff6b6b;
    inherits: false;
}

@property --gradient-end {
    syntax: '<color>';
    initial-value: #4ecdc4;
    inherits: false;
}

.animated-gradient {
    background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
    transition: --gradient-start 0.5s ease, --gradient-end 0.5s ease;
}

.animated-gradient:hover {
    --gradient-start: #ff9ff3;
    --gradient-end: #54a0ff;
}
```

2. 可动画的数值属性：

```css
@property --rotation {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

@property --scale {
    syntax: '<number>';
    initial-value: 1;
    inherits: false;
}

@property --blur-radius {
    syntax: '<length>';
    initial-value: 0px;
    inherits: false;
}

.transformable-element {
    transform: rotate(var(--rotation)) scale(var(--scale));
    filter: blur(var(--blur-radius));
    transition: --rotation 0.3s ease, --scale 0.3s ease, --blur-radius 0.3s ease;
}

.transformable-element:hover {
    --rotation: 180deg;
    --scale: 1.2;
    --blur-radius: 2px;
}
```

3. 渐变动画：

```css
@property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

@property --gradient-position {
    syntax: '<percentage>';
    initial-value: 0%;
    inherits: false;
}

.animated-background {
    background: conic-gradient(
        from var(--gradient-angle),
        #ff6b6b var(--gradient-position),
        #4ecdc4 calc(var(--gradient-position) + 50%),
        #45b7d1 calc(var(--gradient-position) + 100%)
    );
    animation: rotateGradient 3s linear infinite;
}

@keyframes rotateGradient {
    from {
        --gradient-angle: 0deg;
        --gradient-position: 0%;
    }
    to {
        --gradient-angle: 360deg;
        --gradient-position: 100%;
    }
}
```

4. 主题系统：

```css
@property --primary-hue {
    syntax: '<number>';
    initial-value: 210; /* 蓝色色相 */
    inherits: true;
}

@property --primary-saturation {
    syntax: '<percentage>';
    initial-value: 100%;
    inherits: true;
}

@property --primary-lightness {
    syntax: '<percentage>';
    initial-value: 50%;
    inherits: true;
}

:root {
    --primary-color: hsl(var(--primary-hue), var(--primary-saturation), var(--primary-lightness));
    --primary-light: hsl(var(--primary-hue), var(--primary-saturation), 75%);
    --primary-dark: hsl(var(--primary-hue), var(--primary-saturation), 25%);
}

.theme-switcher {
    transition: --primary-hue 0.5s ease, --primary-saturation 0.5s ease, --primary-lightness 0.5s ease;
}

/* 主题变体 */
.theme-blue { --primary-hue: 210; }
.theme-green { --primary-hue: 120; }
.theme-red { --primary-hue: 0; }
.theme-purple { --primary-hue: 270; }

.theme-vibrant { --primary-saturation: 100%; }
.theme-muted { --primary-saturation: 50%; }

.theme-light { --primary-lightness: 70%; }
.theme-dark { --primary-lightness: 30%; }
```

5. 复杂动画效果：

```css
@property --wave-amplitude {
    syntax: '<length>';
    initial-value: 10px;
    inherits: false;
}

@property --wave-frequency {
    syntax: '<number>';
    initial-value: 1;
    inherits: false;
}

@property --wave-phase {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

.wave-effect {
    position: relative;
    overflow: hidden;
}

.wave-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
        transparent,
        var(--primary-color),
        transparent
    );
    transform: translateY(
        calc(
            var(--wave-amplitude) * 
            sin(var(--wave-phase) + var(--wave-frequency) * 360deg)
        )
    );
    animation: waveMotion 2s ease-in-out infinite;
}

@keyframes waveMotion {
    0% { --wave-phase: 0deg; }
    100% { --wave-phase: 360deg; }
}
```

6. 响应式数值：

```css
@property --container-padding {
    syntax: '<length>';
    initial-value: 16px;
    inherits: false;
}

@property --grid-columns {
    syntax: '<number>';
    initial-value: 1;
    inherits: false;
}

.responsive-container {
    padding: var(--container-padding);
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: calc(var(--container-padding) / 2);
    transition: --container-padding 0.3s ease, --grid-columns 0.3s ease;
}

@media (min-width: 768px) {
    .responsive-container {
        --container-padding: 24px;
        --grid-columns: 2;
    }
}

@media (min-width: 1200px) {
    .responsive-container {
        --container-padding: 32px;
        --grid-columns: 3;
    }
}
```

JavaScript交互：

```javascript
// 检测@property支持
function supportsPropertyRule() {
    return CSS.supports('@property', '--test: 0');
}

// 动态注册自定义属性
function registerProperty(name, syntax, initialValue, inherits = false) {
    if ('registerProperty' in CSS) {
        try {
            CSS.registerProperty({
                name: name,
                syntax: syntax,
                initialValue: initialValue,
                inherits: inherits
            });
        } catch (e) {
            console.warn('Failed to register property:', name, e);
        }
    }
}

// 注册动画属性
registerProperty('--dynamic-color', '<color>', '#000000');
registerProperty('--dynamic-size', '<length>', '0px');
registerProperty('--dynamic-opacity', '<number>', '1');

// 动态更新属性值
function animateProperty(element, property, fromValue, toValue, duration = 1000) {
    if (!supportsPropertyRule()) {
        // 回退到传统动画
        return;
    }
    
    element.style.setProperty(property, fromValue);
    element.style.transition = `${property} ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.setProperty(property, toValue);
    });
}

// 使用示例
const element = document.querySelector('.animated-element');
animateProperty(element, '--dynamic-color', '#ff0000', '#00ff00', 2000);
```

类型验证和错误处理：

```css
@property --validated-number {
    syntax: '<number>';
    initial-value: 0;
    inherits: false;
}

.validated-element {
    /* 有效值 */
    --validated-number: 42;
    transform: scale(var(--validated-number));
}

.invalid-element {
    /* 无效值会回退到initial-value */
    --validated-number: "not a number";
    transform: scale(var(--validated-number)); /* 使用initial-value: 0 */
}
```

性能优化：

```css
/* 避免过于复杂的语法 */
@property --simple-color {
    syntax: '<color>';
    initial-value: red;
    inherits: false;
}

/* 而不是 */
@property --complex-syntax {
    syntax: '<color> | <length> | <percentage> | <number>';
    initial-value: red;
    inherits: false;
}

/* 合理使用inherits */
@property --theme-base {
    syntax: '<color>';
    initial-value: #000;
    inherits: true; /* 主题色应该继承 */
}

@property --animation-value {
    syntax: '<number>';
    initial-value: 0;
    inherits: false; /* 动画值通常不需要继承 */
}
```

浏览器兼容性：

- Chrome 85+
- Firefox: 尚未支持
- Safari: 尚未支持
- IE不支持

Polyfill和回退方案：

```javascript
// 简单的polyfill概念
if (!('registerProperty' in CSS)) {
    // 为不支持的浏览器提供基础功能
    window.CSS = window.CSS || {};
    CSS.registerProperty = function(definition) {
        // 基础实现，仅设置初始值
        document.documentElement.style.setProperty(
            definition.name, 
            definition.initialValue
        );
    };
}
```

最佳实践：

- 为可动画的数值使用@property
- 选择合适的syntax类型提高性能
- 合理设置inherits属性
- 提供有意义的initial-value
- 为不支持的浏览器提供回退方案
- 避免过于复杂的语法定义
- 在大型项目中统一管理自定义属性定义

---
