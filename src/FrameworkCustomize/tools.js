import tools from '@/Framework/Tools';

// 用户自定义工具库
const newTools = {
  getParamSearchByName: tools.getParam,
};

tools.init(newTools);