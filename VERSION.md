8.1

1. [重构]添加了-webkit-overlow-scrolling: touch， 使滑动更为流畅。tab中，使用scroll代替touchmove，使滑动到临界点的事件可以被监听到。
2. [重构]为了横向滑动性能，和能开启GPU加速（看了ISUX的一篇文，大概理解是absolute+left的滑动很慢且不适合GPU加速）还是使用了transform+translateX。
3. [重构]tab-indicator为了提高性能也换成了transform，由于indicator使用的是百分比定位（相对父元素），所以换成transform（百分比相对自身）出不一样，在计算属性indicator-left中用了一些计算。
4. [重构]换成transform的影响计算fullpage以及其中的virtual-tab的fixed属性失效了。解决方案是：
    1. fullpage使用absolute，仅覆盖自身所属的tab，且屏蔽其上的滑动。
    2. virtual-tab由于touch event只能获得相对于全局的坐标，所以必须要计算。left没有变化，主要是高度。
    高度同样改为相对于自身的高度，需要把全局坐标减去顶栏高度，再减去子tab相对顶栏的高度（即父tab高度-父tab已滑动高度）。
    顶栏高度可以直接得到。
    而tab相对顶栏高度的变化，可以在父tab的scroll事件中监听，并为tab新增了一个sonScrollTop属性来向子tab（同样需要经过Taobao和Jindong组件）传值。其初始化放在mounted钩子中。

7.24

1.  [修复]7.21(1)。
    判断是tab.page绑定的touchmove没有stop。没有stop的touchmove可能在上层节点（然而并未找到）被preventDefault了导致不能滑动。而如果单纯的stop又会导致子tab的事件不能传递到父tab。因此最后touchmove中只有id=父tab才会被stop。
2.  [新增]shop和item的100%宽度的条目。


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