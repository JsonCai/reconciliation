
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabs/index","pages/popup/index","pages/pull-scroll/index"],"window":{"backgroundTextStyle":"light","navigationBarBackgroundColor":"#ffffff","navigationBarTitleText":"s-ui-demo","navigationBarTextStyle":"black","backgroundColor":"#efefef"},"tabBar":{"color":"#999","backgroundColor":"#fafafa","selectedColor":"#406BDC","borderStyle":"white","list":[{"text":"选项卡","pagePath":"pages/tabs/index","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home-active.png"},{"text":"弹框","pagePath":"pages/popup/index","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home-active.png"},{"text":"加载","pagePath":"pages/pull-scroll/index","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home-active.png"}],"position":"bottom"},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"tabs选项卡，s-tabs示例","compilerVersion":"2.6.9","entryPagePath":"pages/tabs/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabs/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"选项卡"}},{"path":"/pages/popup/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"弹框"}},{"path":"/pages/pull-scroll/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"下拉刷新，上拉加载"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0,global:void 0}}}});
