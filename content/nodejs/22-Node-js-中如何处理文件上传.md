# 22. Node.js 中如何处理文件上传？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

使用 multer 中间件：

```javascript
const multer = require('multer');
const path = require('path');

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('只允许上传图片文件'));
    }
  }
});

// 单文件上传
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({ 
    message: '文件上传成功',
    file: req.file
  });
});

// 多文件上传
app.post('/uploads', upload.array('photos', 5), (req, res) => {
  res.json({
    message: '文件上传成功',
    files: req.files
  });
});
```
