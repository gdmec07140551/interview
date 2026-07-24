# 27. 如何在 Node.js 中实现单元测试？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

使用 Jest 进行测试：

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };

// math.test.js
const { add, multiply } = require('./math');

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  test('multiplies 3 * 4 to equal 12', () => {
    expect(multiply(3, 4)).toBe(12);
  });
});
```

测试 Express 应用：

```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /users', () => {
  test('should return users list', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200);
      
    expect(response.body).toHaveProperty('users');
    expect(Array.isArray(response.body.users)).toBe(true);
  });
});
```

异步函数测试：

```javascript
test('async function test', async () => {
  const data = await fetchUserData(1);
  expect(data).toEqual({
    id: 1,
    name: 'John Doe'
  });
});
```
