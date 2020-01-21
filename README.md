# 微信小程序开发框架对比与选择

> 这里的 WePY 是 2 Alpha 版本, Taro 是 2.0.1 版本.

## 推荐 uni-app 和 Taro 这两个

选这两个主要是看用的人多, 长期维护下去的可能性较大, 更靠近 Vue/React 的开发风格.

这里放了各种小程序框以不同选项初始化后的项目.

有小程序默认框架的 mina.

有小程序框架增加型的 Mpx.

有 Vue 风格的 WePY/mpvue/uni-app/Megalo.

有 React 风格的 Taro/Nanachi.

有完全用 React 开发的 Remax. 真正的 React. 可惜编译太慢.

有 AOP(面向切面)设计风格的 @wxa. 各种装饰器.

有官方的 kbone 里有 Vue/React/Preact/omi 风格的.

最终我们代码风格, 开发效率, 还有未来是否会继续维护下去决定给大家推荐 uni-app 和 Taro 这两个.

uni-app 差不多完全是 Vue 的开发风格. Taro 也基本完全是 React 的风格. 支持的写法还是很多. 

如 uni-app 支持 Vue 里的过滤器. Taro 跟 Remax 相比虽然不是完整的 React 开发风格但却有更快的编译速度.

微信小程序的一些新增加的功能第三方框架不一定早早都有, 如微信小程序 2020-01-14 为 scroll-view 增加的自定义下拉刷新功能在这里的第三方小程序里都还没有.

微信官方那个只支持微信小程序与 Web 端, 增加了假的 DOM/BOM, 感觉目录结构文件组织不够整齐优雅.

uni-app 目测在跟着 Vue 版本在升级. mpvue 从去年 8 月多已不再维护. WePY 从去年中旬进入  alpha 版后到现在还是 alpha 版.

@2020-01-21 Peace
