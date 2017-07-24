7.24

1.  [修复]7.21(1)。
    判断是tab.page绑定的touchmove没有stop。没有stop的touchmove可能在上层节点（然而并未找到）被preventDefault了导致不能滑动。而如果单纯的stop又会导致子tab的事件不能传递到父tab。因此最后touchmove中只有id=父tab才会被stop。


7.21

1.  [优化]7.18(3)(6)
    使用left代替translateX，解决了transform导致子元素fixed失效的问题。尽管这样的架构是不应该的。


7.12

> git init

[新增模块]

1. Index.vue(L1 页面组件): 首页，不包括底栏
2. Personal.vue(L1 页面组件): 个人中心，暂无内容
3. Searchbar.vue(L2 局部组件): 搜索栏，暂无交互
4. Tabfooter.vue(L0 全局组件): APP底栏，使用vue-router
5. Tab.vue(L1 局部组件): 标签栏，有可滑动标签bar、‘标签选择’弹出层、和可滑动切换的标签页。
6. EventHub.js: 全局范围的事件注册监听用。

[无用模块]

1. vue-slider: 暂未用到

[项目配置]

1. 修改了config/index.js 的导出目录到cordova的资源目录。