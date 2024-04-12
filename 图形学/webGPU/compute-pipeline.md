# compute pipeline 通用计算管线

## 并行计算

### 通讯模式

并行处理前后，数据的对应关系

* 映射 map
* 聚合 gather
* 分散 scaftter
* 模板 stencil
* 转换 transpose
* 压缩 reduce
* 重排 scan/sort

### 高效并行策略

* 规约
* 扫描/分段扫描

### shader 加载方式

1d,2d,3d 模式

### CPU/GPU同步以及协同

### 内存使用

### 性能优化

* 合并全局内存
* 避免线程发散

### MPI

集群

### 高维数据并行计算

## 数据传递

只能用 bind group

## 获取结果

创建 read buffer，这是一个临时共享 buffer

GPU 同步 readbuffer

cpu 建立映射
