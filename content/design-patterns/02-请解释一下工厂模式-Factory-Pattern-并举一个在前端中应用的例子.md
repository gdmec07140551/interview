# 问题 2：请解释一下工厂模式（Factory Pattern），并举一个在前端中应用的例子。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/CAAaw7kNBi8icxkzcFAcBRVVnje)

答案：

工厂模式是一种创建型设计模式，它提供了一种创建对象的最佳方式，而无需向客户端暴露创建逻辑。它定义一个用于创建对象的接口，让子类决定实例化哪一个类。

前端应用例子：

假设你需要根据不同的用户角色（如'admin', 'editor', 'guest'）创建不同的用户操作菜单组件。你可以创建一个菜单工厂函数：

```javascript
function createMenu(role) {
    switch (role) {
        case 'admin':
            return new AdminMenu(); // 返回管理员菜单组件
        case 'editor':
            return new EditorMenu(); // 返回编辑者菜单组件
        default:
            return new GuestMenu(); // 返回访客菜单组件
    }
}

const userMenu = createMenu(currentUser.role);
```

这样，创建具体菜单的逻辑被封装在工厂函数中，调用者只需关心传入正确的角色即可，代码更易于维护和扩展。

---
