# 22. 什么是Webpack的Loader和Plugin？请举例说明。

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/WETYwNubfio3D3k8Q1Lcj8hgn1l)

答案：

Loader：

- 用于转换模块的源代码
- 在import或加载模块时预处理文件
- 从右到左（或从下到上）执行

常见Loader：

```javascript
module.exports = {
  module: {
    rules: [
      // 处理CSS文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 处理JavaScript文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // 处理图片文件
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
}
```

Plugin：

- 执行范围更广的任务
- 可以访问整个编译生命周期
- 通过钩子系统工作

常见Plugin：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    // 清理输出目录
    new CleanWebpackPlugin(),
    // 生成HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
```
