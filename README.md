# 简版vue3核心原理

## 包含功能

- vue3响应式库如何收集依赖，如何触发依赖
- 虚拟dom实现
- 虚拟dom的diff算法

## 环境
- vscode+live server插件
- 调试chrome控制台

## 心得

### vue2中的问题

- 初始化需要递归，速度慢（Object.defineProperty需要遍历对象的所有key，如果对象很大很深的话，需要递归遍历，速度慢；Proxy中则是懒处理）
- 依赖关系占用资源较多（需要构建watcher、deps等占用资源较多）
- 数组支持需要特殊实现（Object.defineProperty需要特殊实现；Proxy则原生支持）
- 动态增加、删除属性需要额外API（需要Vue.set等hacker技巧)
- 不支持Map、Set（Proxy原生支持）

