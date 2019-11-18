const env = process.env.NODE_ENV.toLocaleLowerCase();

// 开发环境
const isDev = env == 'development';

// 测试环境环境
const isRd = env == 'rd';

// 生产环境
const isPro = env == 'production';

// 非生产环境
const noPro = !isPro;

// 调试模式
const isDebugMode = noPro || (sessionStorage.getItem('debug') == '1');  

export default {
  isDev,
  isRd,
  isPro,
  noPro,
  isDebugMode,
};