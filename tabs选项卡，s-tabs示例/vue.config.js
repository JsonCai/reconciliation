const pkg = require('./package.json');

// 环境
process.env.VUE_APP_ENV = process.env.NODE_ENV;
// 版本号
process.env.VUE_APP_VERSION = pkg.version;
// 编译时间
process.env.VUE_APP_TIME = new Date().valueOf();

// vue-cli对打包配置hash，import()等抽离都只认process.env.NODE_ENV = 'production'
if (process.env.NODE_ENV === 'test') {
  process.env.NODE_ENV = 'production';
}

module.exports = {
  productionSourceMap: false,
  configureWebpack (config) {
    // 取消控制台打包大小警告
    config.performance = {
      hints: false
    };
  }
};
