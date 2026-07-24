# 46. HTML中的draggable属性如何实现拖拽功能？

> 来源：[飞书原文](https://my.feishu.cn/docx/GcXLdcs8LoZ1ARxtlVvcPUVUnOb)

参考答案：

draggable属性配合拖拽事件可以实现拖拽功能：

1. 基本拖拽：

  ```html
<div draggable="true" ondragstart="drag(event)" id="drag1">
    拖拽我
</div>

<div ondrop="drop(event)" ondragover="allowDrop(event)" style="width:200px;height:200px;border:1px solid #ccc;">
    放置区域
</div>

<script>
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
</script>
```

2. 拖拽列表项：

  ```html
<ul id="sortable">
    <li draggable="true">项目 1</li>
    <li draggable="true">项目 2</li>
    <li draggable="true">项目 3</li>
    <li draggable="true">项目 4</li>
</ul>

<script>
const sortable = document.getElementById('sortable');
let draggedElement = null;

sortable.addEventListener('dragstart', function(e) {
    draggedElement = e.target;
    e.target.style.opacity = '0.5';
});

sortable.addEventListener('dragend', function(e) {
    e.target.style.opacity = '';
});

sortable.addEventListener('dragover', function(e) {
    e.preventDefault();
});

sortable.addEventListener('drop', function(e) {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        sortable.insertBefore(draggedElement, e.target.nextSibling);
    }
});
</script>
```

3. 文件拖拽上传：

  ```html
<div id="dropZone" style="width:300px;height:200px;border:2px dashed #ccc;text-align:center;line-height:200px;">
    拖拽文件到这里
</div>

<script>
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '#f0f0f0';
});

dropZone.addEventListener('dragleave', function(e) {
    this.style.backgroundColor = '';
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '';
    
    const files = e.dataTransfer.files;
    for (let file of files) {
        console.log('文件名:', file.name);
        console.log('文件大小:', file.size);
    }
});
</script>
```

---
