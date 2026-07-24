# 24. Node.js 中如何实现定时任务？

> 来源：[飞书原文](https://w0hog67yl81.feishu.cn/wiki/PLaQwdS0Ri1zXdk0AlOcDwWMn1c)

参考答案：

1. 使用 node-cron：

```javascript
const cron = require('node-cron');

// 每分钟执行
cron.schedule('* * * * *', () => {
  console.log('每分钟执行的任务');
});

// 每天凌晨 2 点执行
cron.schedule('0 2 * * *', () => {
  console.log('每天凌晨 2 点执行数据备份');
});

// 每周一上午 9 点执行
cron.schedule('0 9 * * 1', () => {
  console.log('每周一上午 9 点发送周报');
});
```

2. 使用 node-schedule：

```javascript
const schedule = require('node-schedule');

// 在特定时间执行
const date = new Date(2024, 11, 21, 5, 30, 0);
schedule.scheduleJob(date, () => {
  console.log('在指定时间执行');
});

// 使用规则对象
const rule = new schedule.RecurrenceRule();
rule.minute = 30;
schedule.scheduleJob(rule, () => {
  console.log('每小时的 30 分执行');
});
```
