8.16

// 由于项目快要截止，这大概是最后一次bug更新了，增加了几项可以展望的新功能，也把之前的bug都提升过来了。
> 1. [重要][Tab]应该要用上inobounce
2. [重要][Detail]app跳转的逻辑：跳转后应删除剪切板内容、没有安装app的情况、以及要为商品增加淘口令。
3. [优化][Confirm]确认或取消的弹窗，并不是notification（仅显示消息），可能需要用到promise。
4. [重要][Listview]数据接口，应该传入参数。
5. [重要][Profile]功能顺序应该根据实现情况进行调整
> 6. [新功能][Detail]收藏功能，比较容易实现。
7. [新功能][Message]消息功能(系统消息，朋友消息)
8. [新功能][动态]动态功能
9. [新功能][换肤]换肤（颜色）功能
10. [困境][淘口令]淘口令转换应该也是限制次数的。所以讲道理其实是点击跳转时才请求对应商品的淘口令，后台再请求API进行转换并返回。后台其实可以在淘口令上做缓存。但由于后台崩了，所以只能拿假的淘口令来了，淘口令也是一开始就有的，而非点击时由后台实时转换。


8.15

> 1. [重要][Login]第一次登录会没有效果，要重新再登录一次。 // 加了preventDefault
2. [重要][Notification]notification会先在右边出现。
> 3. [重要][MyData]App刚打开，且在登录状态时，点开个人资料保存会没用。// 居然也是因为没加preventDefault，以后这些改装的submit要记得加。


8.14

> 1. [重要][Login]登录注册的时候会有没有返回结果的bug，可能是未处理的php错误。


8.12

> 1. [重要][Swiper]在同学机子上vue-awesome-swiper没有css，经比较发现是swiper版本不同，2.5可用。
> 2. [重要][Tween]某些情况下Tween里的this可能会失效，导致获取不到tween的参数。调整了写法。
> 3. [重要][状态栏]cordova-plugin-statusbar的更改字体为黑色的API只支持ios。因此对安卓的白色顶栏用灰色代替。
> 4. [优化][Login]登录界面的弹出动画还是有点问题。

8.6

> 1. [重要][Tab]在从别的路由跳转回index时应该恢复index中每个page的scrollTop。 //  其实由于keep-alive，data并不会重置，只要把滚动高度存下来（scrolls.pageScroll），在index的routeEnter钩子中emit初始化事件，再在tab中监听并把高度恢复即可。且现在为每一个page都增加了id（'p' + this.cpntId + index），很容易查找。


8.3

1. [重要][Tab]子tab的上下bounce是黑的，切换的时候也会卡一下黑色。  // 已提升到8.16.2
> 2. [重要][Searchbar]点击首页的searchbar会先弹出输入框再跳转。   // input改为div
> 3. [重要][Search]搜索结果还没分src。    // 8.16解决
4. [重要][Listview]数据传输与组件重用的问题。  // 已提升到8.16.9
> 5. [设计][Notification]可能需要一个notification组件。接受选项和内容，触发确认、取消事件。定位在全局。    // 已提升到8.16.8
> 6. [重要][Search]结果的src.id要和父tab的相同。    // 8.16解决
> 7. [设计][Search]排序需求。      // 后台不支持，忽略
> 8. [优化][Tab][7.18.5]tab-indicator在要超出view的时候tab也能自动滑动过去。  // 在Tab里watch了tabIndicator的变化。
> 9. [重要][路由]Tabfooter来回点的路由记录不应该被存储。而search、detail页面的路由应该被存储。      //router-link增加了replace属性


8.1

> 1. [重要][Tab]子tab在overflow:hidden变为scroll时会卡顿。 //  见8.3.1
> 2. [重要][Tab]sonScrollable/sonScrollTop是针对父tab的所有子tab来的。这是错误的。 //  将这两个值改为数组存取，tab交换时要修改这两个数组。
> 3. [重要][Tab]由8.1.2引发，在choosenTabs交换、增添时，sonScrollTop和sonScrollable数组的次序也应该交换。
> 4. [重要][子Tab]判断是组件懒重用问题。由于引用相同的Listview，当choosenTabs交换时，虽然PageWrapper交换了，但ListView好像没有交换。 //见8.3.4
5. [微调][Tab]为tab增加了一个msg属性作为测试，以后要移除。


7.24
> 1. [重要][Slider]在修改了一些swiper的配置后，swiper的滑动没有stopPropagation了。


7.21

> 1. [重要][Tab.page滑动]接7.21.6：事件委托比较复杂而且感觉事件传递可能会因为延迟导致对及时性有很高要求的滑动不流畅。于是使用了再套一层div的办法。然后出现在模拟器上page不能上下滑动的严重bug（browser正常）。正在排查。

7.20

> 1. [重要][滑动]tab栏在模拟机上不能上下拖动。   //  更换为-webkit-overflow-scroll: touch后可以滑动了
> 2. [重要][状态栏]iOS11上，虽然状态栏不见了，但底栏也上移了   // 暂时移除了隐藏顶栏的代码
> 3. [优化][OptionLink]左右可以由一点点的溢出。
> 4. [优化][Tab.content]平移时会暂时去除transition
> 5. [优化][Tab.content]滑动时，用flag在第一次touchmove时就判断方向，彻底解决了滑动方向判定可能有问题的bug，很暴力。
> 6. [重要][Tab.page]好像由于v-for加:is选项导致事件绑定不上。可能要用事件委托然后为每个子组件单独绑定事件，Tab里集中处理；或者再套一层div？


7.18

> 1. [重要]子tab栏的bar不能滑动。
> 2. [重要][滑动]子栏未到顶时滑动子栏，子栏会滑动，不太合适。
> 3. [重要][定位]弹出的fullPage高度和位置不合适，由于“transform属性导致子元素fixed失效变为absolute（在Chrome下）”问题导致。
> 4. [优化]tab栏滑动到头可以有一个提示。   // 加了-webkit-overflow-scrolling：touch后正常了
> 5. [优化]tab-indicator在要超出view的时候tab也能自动滑动过去。   //已转至8.3.8
> 6. [重要][定位]virtual-tab也是fixed的，和3一样，位置有错。


7.17

> 1. 嵌套可以实现，但css还没有改正。
> 2. [优化]tab栏依然可以拖动页面。


7.15

> 1. 顶栏和底栏可以拖拽。
> 2. +号未显示，图片路径问题。
> 3. page在左右滑动时会因为上下滑动而中断。
> 4. [优化]顶栏未沉浸（判断是因为使用iOS11的sdk问题），安装了cordova-status插件使用Status.hide也没有用。
> 5. [重要]elementsFromPoint函数无效，tab不能拖拽。