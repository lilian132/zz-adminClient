import config from '@/Framework/Config';
import envVariable from '../envVariable';
import constant from './constant';
import rd from './rd';
import pro from './pro';
import setConfigByUserAgent from './utils';

const { isPro } = envVariable;

let baseConfig = {
  // 环境变量
  env: envVariable,
  // 区分马甲的业务参数b值
  b: '605',
  // 区分马甲包的业务参数c值
  c: '2',
  // app包配置
  style_config: [{
    b: '605',
    c: '2',
    userAgent: 'zzapp_lbjj', // 对应app的userAgent
    config: {      
      // 在线客服
      onlineId: '20190823113512165183060117159937',
    },
  }],
};
baseConfig = setConfigByUserAgent(baseConfig);
Object.assign(baseConfig, constant, isPro ? pro : rd);
console.log('baseConfig', baseConfig);
config.init(baseConfig);
