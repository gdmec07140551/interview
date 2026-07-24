# 5. never 类型在 TypeScript 中有什么用？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/RppqwPYuyiRxzLk2dPFc7oY4nzf)

参考答案:

never 类型表示的是那些永不存在的值的类型。它主要用于以下场景：

1. 总是抛出异常的函数: 如果一个函数总是抛出异常，那么它永远不会有返回值，其返回类型就是 never。

  ```typescript
function error(message: string): never {
    throw new Error(message);
}
```

2. 无限循环的函数: 如果一个函数中存在无法结束的循环（如 while(true) {}），它也永远不会返回，其返回类型也是 never。

3. 类型收窄的完备性检查: 在 switch 或 if/else 语句中，我们可以利用 never 类型的特性来确保我们已经处理了所有可能的情况。如果所有情况都被覆盖，never 类型可以被赋值；如果遗漏了某个情况，编译器会报错，因为一个具体的类型无法赋值给 never。

  ```typescript
type Shape = "square" | "circle";

function getArea(shape: Shape) {
    switch (shape) {
        case "square": return 1;
        case "circle": return Math.PI;
        default:
            const _exhaustiveCheck: never = shape; // 如果有新的 Shape 类型未处理，这里会报错
            return _exhaustiveCheck;
    }
}
```

---
