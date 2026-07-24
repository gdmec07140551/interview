# 34. HTML中的kbd、samp、var标签分别用于什么？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

这三个标签都用于标记特殊类型的文本：

1. kbd标签（键盘输入）：

  ```html
<p>按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 复制文本。</p>
<p>使用 <kbd>Alt</kbd> + <kbd>Tab</kbd> 切换窗口。</p>
<p>输入命令：<kbd>npm install</kbd></p>
```

2. samp标签（程序输出）：

  ```html
<p>程序输出：<samp>Hello, World!</samp></p>
<p>错误信息：<samp>File not found</samp></p>
<pre><samp>
$ ls -la
total 64
drwxr-xr-x  8 user  staff   256 Dec 25 10:30 .
</samp></pre>
```

3. var标签（变量）：

  ```html
<p>方程式：<var>y</var> = <var>mx</var> + <var>b</var></p>
<p>在函数 <code>calculate(<var>x</var>, <var>y</var>)</code> 中...</p>
<p>设 <var>n</var> 为正整数。</p>
```

4. 组合使用：

  ```html
<p>
    在终端中输入 <kbd>node <var>filename</var>.js</kbd>，
    将输出 <samp>Script executed successfully</samp>。
</p>
```

---
