# 17. 如何在 Node.js 中连接和操作数据库？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

MongoDB（使用 Mongoose）：

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// 创建用户
const user = new User({ name: 'John', email: 'john@example.com' });
await user.save();

// 查询用户
const users = await User.find({ name: 'John' });
```

MySQL（使用 mysql2）：

```javascript
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

const [rows] = await connection.execute(
  'SELECT * FROM users WHERE name = ?',
  ['John']
);
```
