0.0.0

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