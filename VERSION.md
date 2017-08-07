要本地存储的数据：
1. 每个tab栏的choosenTabs的顺序。

要请求的数据：
1. 搜索推荐
格式：字符串数组
长度：建议不大于10
顺序：可以按重要度排序或者标明最重要的
例：['', '', '']
拓展：可能需要拓展为对象数组。

2. 搜索源和联想词
格式：对象数组
长度：开放平台的数量，目前仅有淘宝和京东，即为2
顺序：无要求，前端会按用户设置的平台顺序展示
对象属性：
    1.  键: id
        值: 字符串
        要求：能表明源即可，最好是拼音
        例: id: 'taobao'
    2.  键: auto
        值: 字符串数组
        长度：建议不大于10或15
        顺序：可以按长度或者字母表顺序排序
        例：auto: ['裙子', '裙子长', '裙子白色']
        拓展：可能会有其它属性，如“是否为热门”，“是否置顶”（广告联想词？）
例：[{id: 'taobao', auto: ['裙子', '裙子长', '裙子白色']}, {id: 'jindong', auto: ['裙子', '裙子长的', '裙子黄色']}]
拓展：如果不方便一次请求多个平台，也可以由前端分别向后端请求单独平台的结果，则只需要返回一个对象即可。

3. 首页内容
同搜索结果
参数：请求时可能会提供一个分类字符串作为模糊的搜索参数
例：‘精选’，‘家居’，‘数码’
返回长度：最好为5-10个

3. 搜索结果
参数：请求时会提供一个字符串作为准确的搜索参数
格式：对象数组
长度：最好为5-10个
对象属性：
    1.  键：id
        值：字符串（也许是整数）
        例：id: '1251b5iuh'
    2.  键：name
        值：字符串
        例：name: '拖鞋拖鞋 好用的拖鞋 童叟无欺 绝对实惠'
    3.  键：price
        值：字符串或浮点数
        解释：应为商品原价
        例：price: '36.5'
    4.  键：discount
        值：字符串或整数或浮点数
        例：discount: '10'
    5.  键：volume
        值：整数或字符串
        解释：商品销量
        例：volume: 12051
    6.  键：item-url
        值：字符串
        解释：商品页面的url（用于跳转）
        例：item-url: 'http://taobao.com/item/1251b5iuh'
    7.  键：img-url
        值：字符串
        解释：商品的图片的url（用于在搜索结果中展示）
        例：img-url: 'https://taobao.com/image/1251b5iuh.png'
    8.  键：discount-require（可选）
        值：字符串或整数
        解释：券可能要满XX元才能优惠，如满50可用，或满50减10
        例：discount-require: 50
    9.  键：type（可选）
        值：字符串
        解释：如果同样可用搜索、展示店铺的话，需要用type来区分这个数据是店铺还是商品
        例：type: 'item'
例：listData: [
        {type: 'shop', name: '店铺名长长长长长长长长长长长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', assess: [3, 5, 4.4], shopUrl: 'dianpuURL'},
        {type: 'shop', name: '店铺名长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', assess: [3.5, 4.3, 2.1], shopUrl: 'dianpuURL'},
        {type: 'shop', name: '水果手机专卖店', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', assess: [5, 4.6, 3.9], shopUrl: 'dianpuURL'},
        {type: 'item', name: '商品名长长长长长长长长长长长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', price: 6.66, itemUrl: 'dianpuURL', volume: 5, discount: 10},
        {type: 'item', name: '商品名长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', price: 23.33, itemUrl: 'dianpuURL', volume: 780, discount: 10},
        {type: 'item', name: '商品名长', imgUrl: require('./assets/S.png'), price: 8088.00, itemUrl: 'dianpuURL', volume: 123102, discount: 10},
        {type: 'shop', name: '店铺名长长长长长长长长长长长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', assess: [3, 5, 4.4], shopUrl: 'dianpuURL'},
        {type: 'shop', name: '店铺名长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', assess: [3.5, 4.3, 2.1], shopUrl: 'dianpuURL'},
        {type: 'shop', name: '水果手机专卖店', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', assess: [5, 4.6, 3.9], shopUrl: 'dianpuURL'},
        {type: 'item', name: '商品名长长长长长长长长长长长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', price: 6.66, itemUrl: 'dianpuURL', volume: 5, discount: 10},
        {type: 'item', name: '商品名长长', imgUrl: 'http://taobao.com/image/1251b5iuh/index.png', price: 23.33, itemUrl: 'dianpuURL', volume: 780, discount: 10},
        {type: 'item', name: '商品名长', imgUrl: require('./assets/S.png'), price: 8088.00, itemUrl: 'dianpuURL', volume: 123102, discount: 10}
      ]

8.7

1. [新增]整合了Profile里的各个组件。
2. [优化]为router-link增加了replace选项，以使路由切换时不会重复叠加历史记录。


8.6

1. [新增]整合了Profile和浏览记录组件。使用localStorage存储浏览记录。
2. [优化]现在切换回index，每个page的滚动距离都会被恢复了。


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
5. [优化]将三个有关scroll的属性集中到了scrolls里，在交换父tab的标签后，scroll也会交换。子tab没有这项功能。

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