# 32. HTML中如何创建下拉菜单？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

使用select标签创建下拉菜单：

1. 基本下拉菜单：

  ```html
<select name="city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</select>
```

2. 分组选项：

  ```html
<select name="location">
    <optgroup label="直辖市">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
    </optgroup>
    <optgroup label="省会城市">
        <option value="guangzhou">广州</option>
        <option value="chengdu">成都</option>
    </optgroup>
</select>
```

3. 多选下拉菜单：

  ```html
<select name="skills" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="react">React</option>
</select>
```

4. 默认选中：

  ```html
<select name="country">
    <option value="cn" selected>中国</option>
    <option value="us">美国</option>
    <option value="uk">英国</option>
</select>
```

---
